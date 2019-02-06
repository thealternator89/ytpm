import { IQueueItem, IAutoQueueItem, IAutoQueueStatItem } from '../models/QueueItem';
import * as moment from 'moment';
import { youTubeClient } from '../api-client/YouTubeClient';
import { Constants } from '../constants';
import { PrivacyMode, PlayerState } from '../enums';
import { MessageBus } from '../util/MessageBus';
import { youTubeVideoDetailsCache } from '../api-client/YouTubeVideoDetailsCache';
import { userAuthHandler } from '../auth/UserAuthHandler';

const MIN_PLAYS_BEFORE_AVAILABLE_TO_AUTOPLAY = 50;

export class PlayerQueue {
    private queue: IQueueItem[] = [];
    private playHistory: string[] = [];

    private autoPlayItems: {[videoId: string]: IAutoQueueItem} = {};
    private autoQueueBlacklist: {[videoId: string]: number} = {};
    private shouldAutoPlay: boolean = true;

    private lastTouched: moment.Moment;

    private playerStatus: {status: PlayerState, updated: moment.Moment, currentItem?: {videoId: string, offset?: number, duration?: number}};

    private privacyMode: PrivacyMode = PrivacyMode.FULL_NAMES;

    public constructor(private key: string) {
        this.touched();
    }

    public getKey(): string {
        return this.key;
    }

    public updatePlayerState(newState: string, updateTime: moment.Moment, additionalData?: {videoId: string, position: number, duration: number}): void {
        this.touched();
        // The current playerStatus has a newer updateTime than the one we're setting. Ignore it
        if (this.playerStatus && moment.duration(this.playerStatus.updated.diff(updateTime)).asSeconds() > 0) {
            return;
        }

        const newPlayerState = PlayerState[newState];

        this.playerStatus = {
            status: newPlayerState,
            updated: updateTime,
        };

        if (additionalData) {
            this.playerStatus.currentItem = {
                videoId: additionalData.videoId,
                offset: additionalData.position,
                duration: additionalData.duration
            };
        } else {
            delete this.playerStatus.currentItem;
        }
    }

    public getPlayerState(): {playerState: PlayerState, videoId?: string, position?: number, duration?: number} {
        const currentItem = this.playerStatus.currentItem;
        
        let videoId;
        let position = this.getPositionFromPlayerState();
        let duration;
        
        if(currentItem){
            videoId = currentItem.videoId;
            duration = currentItem.duration;
        }

        return {
            playerState: this.playerStatus.status,
            videoId,
            position,
            duration,
        }
    }

    private getPositionFromPlayerState(): number|undefined {
        const playerStatus = this.playerStatus;

        if(playerStatus.status === PlayerState.PAUSED) {
            return playerStatus.currentItem.offset;
        } else if (playerStatus.status === PlayerState.PLAYING) {
            const secsSinceUpdate = moment.duration(moment().diff(playerStatus.updated)).asSeconds();
            const position = secsSinceUpdate + playerStatus.currentItem.offset;
            if (!Number.isNaN(position)) {
                return position;
            }
        } else {
            return undefined;
        }
    }

    public preventAutoPlay(videoId: string): void {
        this.autoQueueBlacklist[videoId] = -1;
    }

    public allowAutoPlay(videoId: string): void {
        delete this.autoQueueBlacklist[videoId];
    }

    public enqueue(item: IQueueItem): void {
        this.touched();
        this.queue.push(item);
        this.notifyAddedSong(item);
    }

    public addToFront(item: IQueueItem): void {
        this.touched();
        this.queue.unshift(item);
        this.notifyAddedSong(item);
    }

    public async notifyAddedSong(item: IQueueItem): Promise<void> {
        let video = await youTubeVideoDetailsCache.getFromCacheOrApi(item.videoId);
        let user = userAuthHandler.getNameForToken(item.user);
        this.updatePlayer({addedSong: {title: video.title, thumbnailUrl: video.thumbnailUrl, addedBy: user}});
    }

    public getSongToPlay(): IQueueItem|IAutoQueueItem|undefined {
        let song: IQueueItem | IAutoQueueItem = this.queue.shift() || this.getNextAutoPlaySong();

        if (!song){
            return undefined;
        }

        this.processPlayedSong(song); //Floating promise so we can just return the song to play without waiting to get all related songs.
        return song;
    }

    public dequeue(position = 0, token?: string): IQueueItem | undefined {
        if(token && this.queue[position].user !== token) {
            throw new Error('Item in queue not owned by the user');
        }
        this.touched();
        return this.queue.splice(position, 1)[0];
    }

    //DEPRECATED - once polling is working this should be removed
    public length(): number {
        return this.queue.length;
    }

    public isEmpty(): boolean {
        return this.queue.length === 0;
    }

    public findPosition(videoId: string): number {
        return this.queue.findIndex((item) => item.videoId === videoId);
    }

    public getAllQueuedItems(): IQueueItem[] {
        return [...this.queue];
    }

    public getAllPlayedVideoIds(): string[] {
        return [...this.playHistory];
    }

    public getNextAutoPlayItem(): string|undefined {
        if(!this.shouldAutoPlay) {
            return undefined;
        } else {
            const nextAutoPlaySong = this.getNextAutoPlaySong();
            return nextAutoPlaySong ? nextAutoPlaySong.videoId : undefined;
        }
    }

    public getTimeLastTouched(): moment.Moment {
        return this.lastTouched;
    }

    public setPlayerCommand(command: 'PAUSE'|'PLAY'|'NEXTTRACK'|'REPLAYTRACK'): void {
        this.updatePlayer({command: command});
    }

    public getShouldAutoPlay(): boolean {
        return this.shouldAutoPlay;
    }

    public setShouldAutoPlay(newValue: boolean): void {
        this.shouldAutoPlay = newValue;
    }

    public setPrivacyMode(newMode: PrivacyMode): void {
        this.privacyMode = newMode;
    }

    public getPrivacyMode(): PrivacyMode {
        return this.privacyMode;
    }

    public getAutoPlayState(): IAutoQueueStatItem[] {
        const autoQueue = [];

        for (const videoId in this.autoPlayItems) {
            if(!this.autoPlayItems.hasOwnProperty(videoId)) {
                continue;
            }

            const item = this.autoPlayItems[videoId];
            let blacklist = this.autoQueueBlacklist[videoId] || 0;

            if(blacklist !== -1) {
                blacklist -= this.playHistory.length;
                blacklist = blacklist < 0 ? 0 : blacklist;
            }

            autoQueue.push({
                videoId: item.videoId,
                score: item.score,
                numberOfSongsUntilAvailableToPlay: blacklist
            });
        }

        autoQueue.sort((o1, o2) => {
            // Items with '-1' blacklist are at the bottom of the list. These are permanently blacklisted.
            if(o1.numberOfSongsUntilAvailableToPlay === -1 && o2.numberOfSongsUntilAvailableToPlay !== -1) {
                return -1;
            } else if (o2.numberOfSongsUntilAvailableToPlay === -1 && o1.numberOfSongsUntilAvailableToPlay !== -1) {
                return 1;
            }

            // PRIMARY: Items are sorted by when they are available to play next. Lowest first
            if(o1.numberOfSongsUntilAvailableToPlay !== o2.numberOfSongsUntilAvailableToPlay) {
                return o1.numberOfSongsUntilAvailableToPlay - o2.numberOfSongsUntilAvailableToPlay;
            }

            // SECONDARY: Sort by score. Highest first
            return o2.score - o1.score;
        });

        return autoQueue;
    } 

    private updatePlayer(args: {command?: string, addedSong?: {title: string, thumbnailUrl: string, addedBy: string}}): void {
        MessageBus.emit(`poll:${this.key}`, {
            queueLength: this.queue.length,
            ...args,
        })
    }

    private async processPlayedSong(queueItem: IQueueItem | IAutoQueueItem): Promise<void> {
        this.autoQueueBlacklist[queueItem.videoId] = this.playHistory.length + MIN_PLAYS_BEFORE_AVAILABLE_TO_AUTOPLAY;
        this.playHistory.unshift(queueItem.videoId);

        // Short circuit if no influence on auto queue
        if (queueItem.autoQueueInfluence === Constants.AUTO_QUEUE_INFLUENCE.NO_INFLUENCE) {
            return;
        }

        const relatedVideos = await youTubeClient.searchRelatedVideos(queueItem.videoId)
        const musicVideos = await youTubeClient.filterOutUndesireableVideoIds(relatedVideos.map((video) => video.videoId));
        let score = 0;

        for(let i = relatedVideos.length - 1; i >= 0; i--) {
            if(!musicVideos.includes(relatedVideos[i].videoId)) {
                continue;
            }
            score++;
            const video = relatedVideos[i];
            const autoQueueItem = this.autoPlayItems[video.videoId];
            const influencedScore = (score * queueItem.autoQueueInfluence);

            if (autoQueueItem) {
                this.autoPlayItems[video.videoId].score += influencedScore;
            } else {
                this.autoPlayItems[video.videoId] = {
                    videoId: video.videoId,
                    score: influencedScore,
                    autoQueueInfluence: Constants.AUTO_QUEUE_INFLUENCE.AUTO_ADDED,
                }
            }
        }
    }

    private getNextAutoPlaySong(): IAutoQueueItem | undefined {
        if(!this.shouldAutoPlay) {
            return undefined;
        }

        const autoQueueItems = Object.values(this.autoPlayItems);
        autoQueueItems.sort((o1, o2) => o2.score - o1.score);

        return autoQueueItems.find((item) => {
            return !this.autoQueueBlacklist[item.videoId] ||                        // - Song not in blacklist, OR
                (this.autoQueueBlacklist[item.videoId] !== -1 &&                    //      - Song is not permanently blacklisted, AND
                this.autoQueueBlacklist[item.videoId] < this.playHistory.length)    //      - Song was blacklisted, but play count is high enough to play again
        });
    }

    // Update that this queue has been touched at this point in time.
    // Allows us to clean up queues that haven't been touched in a while.
    private touched():void {
        this.lastTouched = moment();
    }
}
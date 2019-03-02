import * as moment from 'moment';
import { youTubeClient } from '../api-client/YouTubeClient';
import { youTubeVideoDetailsCache } from '../api-client/YouTubeVideoDetailsCache';
import { userAuthHandler } from '../auth/UserAuthHandler';
import { Constants } from '../constants';
import { PlayerState, PrivacyMode } from '../enums';
import { IAutoQueueItem, IAutoQueueStatItem, IQueueItem } from '../models/QueueItem';
import { MessageBus } from '../util/MessageBus';

const MIN_PLAYS_BEFORE_AVAILABLE_TO_AUTOPLAY = 50;

export class PlayerQueue {
    private queue: IQueueItem[] = [];
    private playHistory: string[] = [];

    private autoPlayItems: {[videoId: string]: IAutoQueueItem} = {};
    private autoQueueBlacklist: {[videoId: string]: number} = {};
    private shouldAutoPlay: boolean = true;

    private lastTouched: moment.Moment;

    private playerStatus: {
        status: PlayerState,
        updated: moment.Moment,
        currentItem?: {
            videoId: string,
            offset?: number,
            duration?: number,
        },
    };

    private privacyMode: PrivacyMode = PrivacyMode.FULL_NAMES;

    public constructor(private key: string, private token: string) {
        this.touched();
    }

    public getKey(): string {
        return this.key;
    }

    public getPlayerToken(): string {
        return this.token;
    }

    public updatePlayerState(
        newState: string,
        updateTime: moment.Moment,
        additionalData?: {
            videoId: string,
            position: number,
            duration: number,
        }): void {
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
                duration: additionalData.duration,
                offset: additionalData.position,
                videoId: additionalData.videoId,
            };
        } else {
            delete this.playerStatus.currentItem;
        }
    }

    public getPlayerState(): {playerState: PlayerState, videoId?: string, position?: number, duration?: number} {
        const currentItem = this.playerStatus.currentItem;

        let videoId;
        const position = this.getPositionFromPlayerState();
        let duration;

        if (currentItem) {
            videoId = currentItem.videoId;
            duration = currentItem.duration;
        }

        return {
            duration: duration,
            playerState: this.playerStatus.status,
            position: position,
            videoId: videoId,
        };
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

    // TODO: remove dependence on youTubeVideoDetailsCache
    public async notifyAddedSong(item: IQueueItem): Promise<void> {
        const video = await youTubeVideoDetailsCache.getFromCacheOrApi(item.videoId);
        const user = userAuthHandler.getNameForToken(item.user);
        this.updatePlayer({addedSong: {title: video.title, thumbnailUrl: video.thumbnailUrl, addedBy: user}});
    }

    public getSongToPlay(): IQueueItem|IAutoQueueItem|undefined {
        const song: IQueueItem | IAutoQueueItem = this.queue.shift() || this.getNextAutoPlaySong();

        if (!song) {
            return undefined;
        }

        // Floating promise so we can just return the song to play without waiting to get all related songs.
        this.processPlayedSong(song);
        return song;
    }

    public dequeue(position = 0, token?: string): IQueueItem | undefined {
        if (token && this.queue[position].user !== token) {
            throw new Error('Item in queue not owned by the user');
        }
        this.touched();
        return this.queue.splice(position, 1)[0];
    }

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
        if (this.playerStatus.currentItem && this.playHistory[0] === this.playerStatus.currentItem.videoId) {
            return this.playHistory.slice(1);
        } else {
            return this.playHistory.slice(0);
        }
    }

    public getNextAutoPlayItem(): string|undefined {
        if (!this.shouldAutoPlay) {
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
            if (!this.autoPlayItems.hasOwnProperty(videoId)) {
                continue;
            }

            const item = this.autoPlayItems[videoId];
            let blacklist = this.autoQueueBlacklist[videoId] || 0;

            if (blacklist !== -1) {
                blacklist -= this.playHistory.length;
                blacklist = blacklist < 0 ? 0 : blacklist;
            }

            autoQueue.push({
                numberOfSongsUntilAvailableToPlay: blacklist,
                score: item.score,
                videoId: item.videoId,
            });
        }

        autoQueue.sort((o1, o2) => {
            // Items with '-1' blacklist are at the bottom of the list. These are permanently blacklisted.
            if (o1.numberOfSongsUntilAvailableToPlay === -1 && o2.numberOfSongsUntilAvailableToPlay !== -1) {
                return -1;
            } else if (o2.numberOfSongsUntilAvailableToPlay === -1 && o1.numberOfSongsUntilAvailableToPlay !== -1) {
                return 1;
            }

            // PRIMARY: Items are sorted by when they are available to play next. Lowest first
            if (o1.numberOfSongsUntilAvailableToPlay !== o2.numberOfSongsUntilAvailableToPlay) {
                return o1.numberOfSongsUntilAvailableToPlay - o2.numberOfSongsUntilAvailableToPlay;
            }

            // SECONDARY: Sort by score. Highest first
            return o2.score - o1.score;
        });

        return autoQueue;
    }

    private getPositionFromPlayerState(): number|undefined {
        const playerStatus = this.playerStatus;

        if (playerStatus.status === PlayerState.PAUSED) {
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

    private updatePlayer(args: {
        command?: string,
        addedSong?: {
            title: string,
            thumbnailUrl: string,
            addedBy: string,
        },
    }): void {
        MessageBus.emit(`poll:${this.key}`, {
            queueLength: this.queue.length,
            ...args,
        });
    }

    private async processPlayedSong(queueItem: IQueueItem | IAutoQueueItem): Promise<void> {
        this.autoQueueBlacklist[queueItem.videoId] = this.playHistory.length + MIN_PLAYS_BEFORE_AVAILABLE_TO_AUTOPLAY;
        this.playHistory.unshift(queueItem.videoId);

        // Short circuit if no influence on auto queue
        if (queueItem.autoQueueInfluence === Constants.AUTO_QUEUE_INFLUENCE.NO_INFLUENCE) {
            return;
        }

        const relatedVideos = await youTubeClient.searchRelatedVideos(queueItem.videoId);
        const musicVideos = await youTubeClient.filterOutUndesireableVideoIds(
            relatedVideos.map((video) => video.videoId),
        );
        let score = 0;

        for (let i = relatedVideos.length - 1; i >= 0; i--) {
            if (!musicVideos.includes(relatedVideos[i].videoId)) {
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
                    autoQueueInfluence: Constants.AUTO_QUEUE_INFLUENCE.AUTO_ADDED,
                    score: influencedScore,
                    videoId: video.videoId,
                };
            }
        }
    }

    private getNextAutoPlaySong(): IAutoQueueItem | undefined {
        if (!this.shouldAutoPlay) {
            return undefined;
        }

        const autoQueueItems = Object.values(this.autoPlayItems);
        autoQueueItems.sort((o1, o2) => o2.score - o1.score);

        return autoQueueItems.find((item) => {
            // - Song is not blacklisted, OR
            //     - Song is not permanently blacklisted, AND
            //     - Song was blacklisted, but play count is high enough to play again.
            return !this.autoQueueBlacklist[item.videoId] ||
                (this.autoQueueBlacklist[item.videoId] !== -1 &&
                this.autoQueueBlacklist[item.videoId] < this.playHistory.length);
        });
    }

    // Update that this queue has been touched at this point in time.
    // Allows us to clean up queues that haven't been touched in a while.
    private touched(): void {
        this.lastTouched = moment();
    }
}
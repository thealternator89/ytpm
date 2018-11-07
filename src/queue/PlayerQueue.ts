import { IQueueItem, IAutoQueueItem } from '../models/QueueItem';
import * as moment from 'moment';
import { youTubeClient } from '../api-client/YouTubeClient';
import { Constants } from '../constants';

const MIN_PLAYS_BEFORE_AVAILABLE_TO_AUTOPLAY = 50;

type PlayerState = 'UNKNOWN'|'UNSTARTED'|'ENDED'|'PLAYING'|'PAUSED'|'BUFFERING'|'CUED'|'NOTPLAYING';
type PlayerStateHealth = 'GOOD'|'OK'|'DEGRADED'|'BAD';

export class PlayerQueue {
    private queue: IQueueItem[] = [];
    private playHistory: string[] = [];

    private autoPlayItems: {[videoId: string]: IAutoQueueItem} = {};
    private autoQueueBlacklist: {[videoId: string]: number} = {};
    private nextAutoPlayVideoId: string;
    private shouldAutoPlay: boolean = true;

    private lastTouched: moment.Moment;

    private playerStatus: {playerState: PlayerState, videoId?: string, position?: number, duration?: number, updated: moment.Moment}|undefined;

    private command: 'PAUSE'|'PLAY'|'NEXTTRACK'|undefined = undefined;

    public constructor() {
        this.lastTouched = moment();
    }

    public setPlayerStatus(newState: {playerState: PlayerState, videoId?: string, position?: number, duration?: number}): void {
        this.playerStatus = {
            ...newState,
            updated: moment()
        };
    }

    public getPlayerStatus(): {playerState: PlayerState, videoId?: string, position?: number, duration?: number, health: PlayerStateHealth} {
        const secondsSinceUpdated = moment.duration(moment().diff(this.playerStatus.updated)).asSeconds();

        // SHORT-CIRCUIT: If we haven't received an update from the player in more than 30 seconds, respond with 'UNKNOWN' playerState.
        // The player has probably died, or is otherwise dead. Don't pretend to know where it is.
        if (secondsSinceUpdated >= 30) {
            return {
                playerState: 'UNKNOWN',
                health: 'BAD',
            }
        }

        let health;
        if (secondsSinceUpdated < 1){
            health = 'GOOD';
        } else if (secondsSinceUpdated < 5) {
            health = 'OK';
        } else if (secondsSinceUpdated < 10) {
            health = 'DEGRADED';
        } else {
            health = 'BAD';
        }

        // If we have the position, and the song is playing, add the seconds since updated so we get a time closer to the real time on-player
        let position = this.playerStatus.position;
        if(position && this.playerStatus.playerState === 'PLAYING') {
            position += secondsSinceUpdated;

            // Make sure we don't go over the duration of the video.
            if(position > this.playerStatus.duration) {
                position = this.playerStatus.duration;
            }
        }

        return {
            playerState: this.playerStatus.playerState,
            videoId: this.playerStatus.videoId,
            position,
            duration: this.playerStatus.duration,
            health,
        }
    }

    public enqueue(item: IQueueItem): void {
        this.lastTouched = moment();
        this.queue.push(item);
    }

    public addToFront(item: IQueueItem): void {
        this.lastTouched = moment();
        this.queue.unshift(item);
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
        this.lastTouched = moment();
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
        return [...this.playHistory];
    }

    public getNextAutoPlayItem(): string|undefined {
        if(!this.shouldAutoPlay) {
            return undefined;
        } else {
            return this.nextAutoPlayVideoId;
        }
    }

    public getTimeLastTouched(): moment.Moment {
        return this.lastTouched;
    }

    public setCommand(command: 'PAUSE'|'PLAY'|'NEXTTRACK'|'AUTOPLAY-DISABLE'|'AUTOPLAY-ENABLE'): void {
        if(command === 'AUTOPLAY-ENABLE') {
            this.setShouldAutoPlay(true);
            return;
        } else if (command === 'AUTOPLAY-DISABLE') {
            this.setShouldAutoPlay(false);
            return;
        }
        this.command = command;
    }

    public unsetCommand(): void {
        this.command = undefined;
    }

    public getCommand(persist = false): 'PAUSE'|'PLAY'|'NEXTTRACK'|undefined {
        const tmpCommand = this.command;
        if(!persist) {
            this.command = undefined;
        }
        return tmpCommand;
    }

    public getShouldAutoPlay(): boolean {
        return this.shouldAutoPlay;
    }

    public setShouldAutoPlay(newValue: boolean): void {
        this.shouldAutoPlay = newValue;
    }

    private async processPlayedSong(queueItem: IQueueItem | IAutoQueueItem): Promise<void> {
        this.autoQueueBlacklist[queueItem.videoId] = this.playHistory.length + MIN_PLAYS_BEFORE_AVAILABLE_TO_AUTOPLAY;
        this.playHistory.push(queueItem.videoId);

        // Short circuit if no influence on auto queue
        if (queueItem.autoQueueInfluence === Constants.AUTO_QUEUE_INFLUENCE.NO_INFLUENCE) {
            return;
        }

        const relatedVideos = await youTubeClient.searchRelatedVideos(queueItem.videoId)
        const musicVideos = await youTubeClient.getMusicVideoIds(relatedVideos.map((video) => video.videoId));
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

        const nextSong = this.getNextAutoPlaySong();
        this.nextAutoPlayVideoId = nextSong ? nextSong.videoId : undefined;
    }

    private getNextAutoPlaySong(): IAutoQueueItem | undefined {
        if(!this.shouldAutoPlay) {
            return undefined;
        }

        const autoQueueItems = Object.values(this.autoPlayItems);
        autoQueueItems.sort((o1, o2) => o2.score - o1.score);

        return autoQueueItems.find((item) => {
            return !this.autoQueueBlacklist[item.videoId] ||                        // Song not in blacklist, OR
                this.autoQueueBlacklist[item.videoId] < this.playHistory.length ||  // Song was blacklisted, but play count is high enough to play again, OR
                this.autoQueueBlacklist[item.videoId] === -1                        // Song is permanently blacklisted
        });
    }
}
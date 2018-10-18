import { IQueueItem, IAutoQueueItem } from './QueueItem';
import * as moment from 'moment';
import { youTubeClient } from '../api-client/YouTubeClient';

const MIN_PLAYS_BEFORE_AVAILABLE_TO_AUTOPLAY = 50;

export class PlayerQueue {
    private queue: IQueueItem[] = [];
    private playHistory: string[] = [];

    // value represents the minimum number of plays which must occur before the song with the videoId is available to be played.
    private autoPlayItems: {[videoId: string]: IAutoQueueItem} = {};
    private autoQueueBlacklist: {[videoId: string]: number} = {};

    private lastTouched: moment.Moment;
    private accessUrl: string = '';

    public constructor() {
        this.lastTouched = moment();
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

    public getTimeLastTouched(): moment.Moment {
        return this.lastTouched;
    }

    public getAccessUrl(): string {
        return this.accessUrl;
    }

    public setAccessUrl(url: string): void {
        this.accessUrl = url;
    }

    private async processPlayedSong(queueItem: IQueueItem | IAutoQueueItem): Promise<void> {
        this.autoQueueBlacklist[queueItem.videoId] = this.playHistory.length + MIN_PLAYS_BEFORE_AVAILABLE_TO_AUTOPLAY;
        this.playHistory.push(queueItem.videoId);

        const relatedVideos = await youTubeClient.searchRelatedVideos(queueItem.videoId)
        let score = 0;

        for(let i = relatedVideos.length - 1; i >= 0; i--) {
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
                    autoQueueInfluence: 1,
                }
            }
        }
    }

    private getNextAutoPlaySong(): IAutoQueueItem {
        const autoQueueItems = Object.values(this.autoPlayItems);
        autoQueueItems.sort((o1, o2) => o1.score - o2.score);

        return autoQueueItems.find((item) =>
            !this.autoQueueBlacklist[item.videoId] || this.autoQueueBlacklist[item.videoId] < this.playHistory.length
        );
    }
}
import { IQueueItem } from './QueueItem';
import * as moment from 'moment';

export class PlayerQueue {
    private queue: IQueueItem[] = [];
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

    public dequeue(position = 0, token?: string): IQueueItem | undefined {
        if(token && this.queue[position].user !== token) {
            throw new Error('Item in queue not owned by the user');
        }
        this.lastTouched = moment();
        return this.queue.splice(position, 1)[0];
    }

    public length(): number {
        this.lastTouched = moment();
        return this.queue.length;
    }

    public isEmpty(): boolean {
        this.lastTouched = moment();
        return this.queue.length === 0;
    }

    public findPosition(videoId: string): number {
        this.lastTouched = moment();
        return this.queue.findIndex((item) => item.videoDetails.videoId === videoId);
    }

    public getAllQueuedItems(): IQueueItem[] {
        this.lastTouched = moment();
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
}
import { IQueueItem } from './QueueItem';

class PlayerQueue {
    private queue: IQueueItem[] = [];

    public enqueue(item: IQueueItem): void {
        this.queue.push(item);
    }

    public addToFront(item: IQueueItem): void {
        this.queue.unshift(item);
    }

    public dequeue(position = 0): IQueueItem | undefined {
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
}

export const playerQueue = new PlayerQueue();
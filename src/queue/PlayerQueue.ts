import { IQueueItem } from './QueueItem';

class PlayerQueue {
    private queue: IQueueItem[] = [];

    public enqueue(item: IQueueItem): void {
        this.queue.push(item);
    }

    public addToFront(item: IQueueItem): void {
        this.queue.unshift(item);
    }

    public dequeue(position = 0, token?: string): IQueueItem | undefined {
        if(token && this.queue[position].user !== token) {
            throw new Error('Item in queue not owned by the user');
        }
        return this.queue.splice(position, 1)[0];
    }

    public length(): number {
        return this.queue.length;
    }

    public isEmpty(): boolean {
        return this.queue.length === 0;
    }

    public findPosition(videoId: string): number {
        return this.queue.findIndex((item) => item.videoDetails.videoId === videoId);
    }

    public getAllQueuedItems(): IQueueItem[] {
        return [...this.queue];
    }
}

export const playerQueue = new PlayerQueue();
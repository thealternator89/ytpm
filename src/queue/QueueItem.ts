export interface IQueueItem {
    videoId: string;
    user: string;
    autoQueueInfluence: number;
}

export interface IAutoQueueItem {
    videoId: string;
    score: number;
    autoQueueInfluence: number;
}
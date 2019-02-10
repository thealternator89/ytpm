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

export interface IAutoQueueStatItem {
    videoId: string;
    score: number;
    numberOfSongsUntilAvailableToPlay: number;
}

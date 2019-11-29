import { IYouTubeVideoDetails } from "./YouTubeVideoDetails";

export interface IQueueState {
    playerStatus: 'PLAYING'|'PAUSED'|'STOPPED'|'UNKNOWN';
    playingNow?: IYouTubeVideoDetails;
    upNext?: IUpNextYouTubeVideoDetails;
    playerCode: string;
    queueLength: number;
    lastUpdated: number;
}

interface IUpNextYouTubeVideoDetails extends IYouTubeVideoDetails {
    auto: boolean;
}

export enum QueueStateProperty { 
    PLAYER_STATUS,
    PLAYING_NOW,
    UP_NEXT
};
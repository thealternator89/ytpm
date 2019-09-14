import { IYouTubeVideoDetails } from "./YouTubeVideoDetails";

export interface IQueueState {
    playingNow?: IYouTubeVideoDetails,
    upNext?: IUpNextYouTubeVideoDetails,
    playerCode: string,
    lastUpdated: number
}

export interface IPartialQueueState {
    playingNow?: IYouTubeVideoDetails,
    upNext?: IUpNextYouTubeVideoDetails,
    playerCode?: string
}

interface IUpNextYouTubeVideoDetails extends IYouTubeVideoDetails {
    auto: boolean;
}

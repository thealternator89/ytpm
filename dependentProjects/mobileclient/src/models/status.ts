export interface QueueStatus {
    playerStatus: PlayerStatus;
    playingNow: Video;
    upNext: UpNextVideo;
    playerCode: string;
    queueLength: number;
    lastUpdated: number;
}

export interface Video {
    title: string;
    channelName: string;
    description: string;
    thumbnail: Thumbnails;
    videoId: string;
}

export interface UpNextVideo extends Video {
    auto: boolean;
}

export interface Thumbnails {
    big: string;
    normal: string;
}

type PlayerStatus = 
    'BUFFERING'|'CUED'|'ENDED'|'LOADED'|
    'NOTPLAYING'|'PAUSED'|'PLAYING'|
    'UNLOADED'|'UNSTARTED'|'UNKNOWN';
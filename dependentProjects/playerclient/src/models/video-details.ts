export interface IVideoDetails {
    videoId: string;
    title: string;
    description: string;
    thumbnail: IVideoDetailsThumbnail;
    channelName: string;
}

export interface IVideoDetailsThumbnail {
    normal?: string;
    big?: string;
}

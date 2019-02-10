export interface IYoutubeSearchResults {
    nextPageToken?: string;
    results: IYouTubeVideoDetails[];
}

export interface IYouTubeVideoDetails {
    videoId: string;
    title: string;
    description: string;
    thumbnailUrl?: string;
    thumbnailUrlBig?: string;
    channelName?: string;
}

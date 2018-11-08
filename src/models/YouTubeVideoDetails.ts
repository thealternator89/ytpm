export interface YoutubeSearchResults {
    continuationKey: string;
    results: YouTubeVideoDetails[];
}

export interface YouTubeVideoDetails {
    videoId: string;
    title: string;
    description: string;
    thumbnailUrl?: string;
    thumbnailUrlBig?: string;
    channelName?: string;
}
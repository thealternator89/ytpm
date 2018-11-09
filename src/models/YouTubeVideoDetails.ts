export interface YoutubeSearchResults {
    nextPageToken?: string;
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
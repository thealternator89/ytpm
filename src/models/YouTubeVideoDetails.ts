export interface IYoutubeSearchResults {
    nextPageToken?: string;
    results: IYouTubeVideoDetails[];
}

export interface IYouTubeVideoDetails {
    videoId: string;
    title: string;
    description: string;
    thumbnail: {
        normal?: string,
        big?: string,
    },
    channelName?: string;
}

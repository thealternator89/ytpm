import { YouTubeVideoDetails } from "../api-client/YouTubeVideoDetails";

export interface IQueueItem {
    videoDetails: YouTubeVideoDetails;
    user: string;
    autoQueueInfluence: number;
}
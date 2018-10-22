import { YouTubeVideoDetails } from "../models/YouTubeVideoDetails";
import { youTubeClient } from "./YouTubeClient";

class YouTubeVideoDetailsCache {
    private readonly detailsCache: {[videoId: string]: YouTubeVideoDetails} = {};

    public addOrReplaceInCache(item: YouTubeVideoDetails) {
        this.detailsCache[item.videoId] = item;
    }

    public async getFromCacheOrApi(videoId: string): Promise<YouTubeVideoDetails|undefined> {
        if (!this.detailsCache[videoId]){
            const videoDetails = await youTubeClient.getDetails(videoId);
            this.detailsCache[videoDetails.videoId] = videoDetails;
        }
        return this.detailsCache[videoId];
    }
}

export const youTubeVideoDetailsCache = new YouTubeVideoDetailsCache();
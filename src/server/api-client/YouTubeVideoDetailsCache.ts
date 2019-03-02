import { IYouTubeVideoDetails } from '../models/YouTubeVideoDetails';
import { youTubeClient } from './YouTubeClient';

class YouTubeVideoDetailsCache {
    private readonly detailsCache: {[videoId: string]: IYouTubeVideoDetails} = {};

    public addOrReplaceInCache(item: IYouTubeVideoDetails) {
        this.detailsCache[item.videoId] = item;
    }

    public async getFromCacheOrApi(videoId: string): Promise<IYouTubeVideoDetails|undefined> {
        if (!videoId) {
            return undefined;
        }
        if (!this.detailsCache[videoId]) {
            const videoDetails = await youTubeClient.getDetails(videoId);
            this.detailsCache[videoDetails.videoId] = videoDetails;
        }
        return this.detailsCache[videoId];
    }
}

export const youTubeVideoDetailsCache = new YouTubeVideoDetailsCache();

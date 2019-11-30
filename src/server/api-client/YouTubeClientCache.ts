import { IYouTubeVideoDetails } from '../models/YouTubeVideoDetails';
import { youTubeClient } from './YouTubeClient';
import { YouTubeChannel, YouTubeList } from '../models/YouTubeList';

const channels = require('../data/discovery/channels.json');
const lists = require('../data/discovery/playlists.json');

class YouTubeClientCache {
    private readonly detailsCache: {[videoId: string]: IYouTubeVideoDetails} = {};
    private channelCache: YouTubeChannel[] = [];
    private listCache: YouTubeList[] = [];

    public addOrReplaceVideoInCache(item: IYouTubeVideoDetails) {
        this.detailsCache[item.videoId] = item;
    }

    public async getVideoFromCacheOrApi(videoId: string): Promise<IYouTubeVideoDetails|undefined> {
        if (!videoId) {
            return undefined;
        }
        if (!this.detailsCache[videoId]) {
            const videoDetails = await youTubeClient.getVideoDetails(videoId);
            this.detailsCache[videoDetails.videoId] = videoDetails;
        }

        return this.detailsCache[videoId];
    }

    public async getListDetailsFromCacheOrApi(): Promise<YouTubeList[]> {
        if (this.listCache.length === 0) {
            this.listCache = (await youTubeClient.getListDetails(
                lists.map((list) => list.id)
            )).sort((l1, l2) => l1.name.localeCompare(l2.name));
        }
        return this.listCache;
    }

    public async getChannelDetailsFromCacheOrApi(): Promise<YouTubeChannel[]> {
        if (this.channelCache.length === 0) {
            this.channelCache = (await youTubeClient.getChannelDetails(
                channels.map((channel) => channel.id)
            )).sort((c1, c2) => c1.name.localeCompare(c2.name));
        }
        return this.channelCache;
    }
}

export const youTubeClientCache = new YouTubeClientCache();

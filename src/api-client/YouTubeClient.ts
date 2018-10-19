import * as ytsearch from 'youtube-search';
import { YouTubeVideoDetails } from './YouTubeVideoDetails';
import { youTubeVideoDetailsCache } from './YouTubeVideoDetailsCache';
import { envUtil } from '../util/EnvUtil';

class YouTubeClient {
    private readonly options: ytsearch.YouTubeSearchOptions = {
        key: envUtil.getYouTubeApiKey(),
        type: 'video',
        topicId: '/m/04rlf', // Music topic
    }

    public async search(query: string): Promise<YouTubeVideoDetails[]> {
        let response: {results: ytsearch.YouTubeSearchResults[], pageInfo: ytsearch.YouTubeSearchPageResults};
        try {
            response = await ytsearch(query, {
                ...this.options,
                maxResults: 30,
            });
        } catch (error) {
            throw new Error(`An error occurred retrieving search results: ${error.message}`);
        }
        
        const results = response.results
            .filter((result) => result.id !== result.channelId) //Exclude channel results
            .map((result) => {
                return {
                    videoId: result.id,
                    title: result.title,
                    thumbnailUrl: result.thumbnails.default.url,
                    channelName: result.channelTitle,
                };
            });

        // Add each item into the cache
        for(const result of results) {
            youTubeVideoDetailsCache.addOrReplaceInCache(result);
        }

        return results;
    }

    public async searchRelatedVideos(videoId: string): Promise<YouTubeVideoDetails[]> {
        let response: {results: ytsearch.YouTubeSearchResults[], pageInfo: ytsearch.YouTubeSearchPageResults};
        try {
            response = await ytsearch(undefined, {
                ...this.options,
                maxResults: 15,
                relatedToVideoId: videoId
            });
        } catch (error) {
            throw new Error(`An error occurred retrieving search results: ${error.message}`);
        }
        
        const results = response.results
            .map((result) => {
                return {
                    videoId: result.id,
                    title: result.title,
                    thumbnailUrl: result.thumbnails.default.url,
                    channelName: result.channelTitle,
                };
            });

        // Add each item into the cache
        for(const result of results) {
            youTubeVideoDetailsCache.addOrReplaceInCache(result);
        }

        return results;
        return null;
    }

    public async getDetails(videoId: string): Promise<YouTubeVideoDetails> {
        return null;
    }
}

export const youTubeClient = new YouTubeClient();
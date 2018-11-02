import * as YouTube from 'simple-youtube-api';
import { YouTubeVideoDetails } from '../models/YouTubeVideoDetails';
import { youTubeVideoDetailsCache } from './YouTubeVideoDetailsCache';
import { envUtil } from '../util/EnvUtil';

const SEARCH_RESULT_LIMIT_STANDARD = 30;
const SEARCH_RESULT_LIMIT_RELATED = 15;

class YouTubeClient {
    private readonly options: any = {
        type: 'video',
        topicId: '/m/04rlf', // Music topic
        regionCode: 'NZ'
    }

    private readonly youtube: YouTube;

    public constructor() {
        this.youtube = new YouTube(envUtil.getYouTubeApiKey());
    }

    public async search(query: string): Promise<YouTubeVideoDetails[]> {
        let response: any[];
        try {
            response = await this.youtube.search(query, SEARCH_RESULT_LIMIT_STANDARD, {
                ...this.options,
            });
        } catch (error) {
            throw new Error(`An error occurred retrieving search results: ${error.message}`);
        }
        
        const results = response
            .map((result) => {
                let thumbnail;
                if(result.thumbnails && result.thumbnails.default) {
                    thumbnail = result.thumbnails.default.url;
                }

                return {
                    videoId: result.id,
                    title: result.title,
                    thumbnailUrl: thumbnail,
                    channelName: result.channel.title,
                };
            });

        // Add each item into the cache
        for(const result of results) {
            youTubeVideoDetailsCache.addOrReplaceInCache(result);
        }

        return results;
    }

    public async searchRelatedVideos(videoId: string): Promise<YouTubeVideoDetails[]> {
        let response: any[];
        try {
            response = await this.youtube.search(undefined, SEARCH_RESULT_LIMIT_RELATED, {
                ...this.options,
                relatedToVideoId: videoId
            });
        } catch (error) {
            throw new Error(`An error occurred retrieving search results: ${error.message}`);
        }
        
        const results = response
            .map((result) => {
                return {
                    videoId: result.id,
                    title: result.title,
                    thumbnailUrl: result.thumbnails.default.url,
                    channelName: result.channel.title,
                }
            });

        // Add each item into the cache
        for(const result of results) {
            youTubeVideoDetailsCache.addOrReplaceInCache(result);
        }

        return results;
    }

    public async getDetails(query: string, isUrl = false): Promise<YouTubeVideoDetails> {
        let response: any;

        try {
            // If que
            response = isUrl ? await this.youtube.getVideo(query) : await this.youtube.getVideoByID(query);
        } catch (error) {
            throw new Error(`An error occurred retrieving video information: ${error.message}`);
        }

        if (!response) {
            throw new Error(`Video with ${isUrl? 'URL' : 'ID'} '${query}' not found`);
        }

        const result = {
            videoId: response.id,
            title: response.title,
            thumbnailUrl: response.thumbnails.default.url,
            channelName: response.channel.title,
        }

        youTubeVideoDetailsCache.addOrReplaceInCache(result);

        return result;
    }
}

export const youTubeClient = new YouTubeClient();
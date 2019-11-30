import { GaxiosResponse } from 'gaxios';
import { google, youtube_v3  } from 'googleapis';
import { AllHtmlEntities } from 'html-entities';
import * as rp from 'request-promise';
import { IYoutubeSearchResults, IYouTubeVideoDetails } from '../models/YouTubeVideoDetails';
import { envUtil } from '../util/EnvUtil';
import { youTubeClientCache } from './YouTubeClientCache';
import { YouTubeChannel, YouTubeList } from '../models/YouTubeList';
import { logger } from '../util/LogUtil';

const htmlEntities = new AllHtmlEntities();

const SEARCH_RESULT_LIMIT_STANDARD = 15;
const SEARCH_RESULT_LIMIT_RELATED = 5;

const AUTOCOMPLETE_URL_BASE = 'http://suggestqueries.google.com/complete/search';
const MUSIC_TOPIC_ID = '/m/04rlf';

const TAG = 'YOUTUBE_CLIENT:';

const decodeHtml = (input: string) => htmlEntities.decode(input);

class YouTubeClient {
    private readonly defaultSearchOptions: any = {
        regionCode: 'NZ', // TODO: Maybe allow this to be configured at the queue level
        topicId: MUSIC_TOPIC_ID,
        type: 'video',
    };

    private readonly youtube: youtube_v3.Youtube;
    private readonly searchHistory: {[query: string]: number} = {};

    public constructor() {
        const authToken = envUtil.getYouTubeApiKey();

        if (!authToken) {
            throw new Error('YouTube auth token is required');
        }

        this.youtube = google.youtube({
            auth: authToken,
            version: 'v3',
        });
    }

    public async getSearchAutoComplete(query?: string): Promise<string[]> {
        if (!query) {
            return Object.keys(this.searchHistory).sort((o1, o2) => this.searchHistory[o2] - this.searchHistory[o1]);
        } else {
            const response = await rp({
                json: true,
                qs: {
                    client: 'firefox',
                    ds: 'yt',
                    q: query,
                },
                uri: AUTOCOMPLETE_URL_BASE,
            }).promise();
            // response is an array. First element is the query, Second is an array of suggestions.
            return response[1];
        }
    }

    public async search(query: string, page?: string): Promise<IYoutubeSearchResults> {
        this.addToHistory(query);
        let response: GaxiosResponse<youtube_v3.Schema$SearchListResponse>;
        try {
            response = await this.youtube.search.list({
                ...this.defaultSearchOptions,
                maxResults: SEARCH_RESULT_LIMIT_STANDARD,
                pageToken: page,
                part: 'snippet',
                q: query,
            });
        } catch (error) {
            throw new Error(`An error occurred retrieving search results: ${error.message}`);
        }

        const results = response.data.items
            .map((result) => {
                const resultVideoDetails = this.getYouTubeVideoDetailsFromApiResponse(result);
                youTubeClientCache.addOrReplaceVideoInCache(resultVideoDetails);
                return resultVideoDetails;
            });

        return {
            nextPageToken: response.data.nextPageToken,
            results: results,
        };
    }

    public async searchRelatedVideos(videoId: string): Promise<IYouTubeVideoDetails[]> {
        let response: GaxiosResponse<youtube_v3.Schema$SearchListResponse>;
        try {
            response = await this.youtube.search.list({
                ...this.defaultSearchOptions,
                maxResults: SEARCH_RESULT_LIMIT_RELATED,
                part: 'snippet',
                relatedToVideoId: videoId,
            });
        } catch (error) {
            throw new Error(`An error occurred retrieving search results: ${error.message}`);
        }

        const results = response.data.items
            .map((result) => {
                const resultVideodetails = this.getYouTubeVideoDetailsFromApiResponse(result);
                youTubeClientCache.addOrReplaceVideoInCache(resultVideodetails);
                return resultVideodetails;
            });

        return results;
    }

    public async getChannelDetails(channelIds: string[]): Promise<YouTubeChannel[]> {
        if (channelIds.length > 50) {
            logger.warn(`${TAG} getChannelDetails: Requested more than 50 items. YouTube queries are limited to 50 items, results may be unpredictable.`);
        }
        let response: GaxiosResponse<youtube_v3.Schema$ChannelListResponse>;
        try {
            response = await this.youtube.channels.list({
                id: channelIds.join(','),
                part: 'snippet',
                maxResults: channelIds.length
            });
        } catch (error) {
            throw new Error(`An error occurred retrieving channels: ${error.message}`);
        }
        return response.data.items
            .map((channel) => ({
                id: channel.id,
                name: decodeHtml(channel.snippet.title),
                thumbnail: channel.snippet.thumbnails.medium.url,
            }));
    }

    public async getListDetails(listIds: string[]): Promise<YouTubeList[]> {
        if (listIds.length > 50) {
            logger.warn(`${TAG} getListDetails: Requested more than 50 items. YouTube queries are limited to 50 items, results may be unpredictable.`);
        }
        let response: GaxiosResponse<youtube_v3.Schema$PlaylistListResponse>;
        try {
            response = await this.youtube.playlists.list({
                id: listIds.join(','),
                part: 'snippet',
                maxResults: listIds.length
            });
        } catch (error) {
            throw new Error(`An error occurred retrieving playlists': ${error.message}`);
        }

        return response.data.items
            .map((list) => ({
                id: list.id,
                name: list.snippet.title,
                thumbnail: list.snippet.thumbnails.medium.url,
                channel: list.snippet.channelTitle,
            }));
    }

    public async getVideoDetails(query: string): Promise<IYouTubeVideoDetails> {

        let response: GaxiosResponse<youtube_v3.Schema$VideoListResponse>;

        try {
            response = await this.youtube.videos.list({
                id: query,
                part: 'snippet',
            });
        } catch (error) {
            throw new Error(`An error occurred retrieving video information: ${error.message}`);
        }
        if (!response) {
            throw new Error(`Video with ID '${query}' not found`);
        }

        const result = this.getYouTubeVideoDetailsFromApiResponse(response.data.items[0]);
        youTubeClientCache.addOrReplaceVideoInCache(result);

        return result;
    }

    /**
     * Removes any videoIds from the list which are considered undesireable.
     *  * Videos which aren't considered 'music' by YouTube
     *  * Videos which are longer than 10 minutes
     * @param videoIds A list of video ids to check
     */
    public async filterOutUndesireableVideoIds(videoIds: string[]): Promise<string[]> {
        let response: GaxiosResponse<youtube_v3.Schema$VideoListResponse>;

        try {
            response = await this.youtube.videos.list({
                id: videoIds.join(','),
                part: 'topicDetails,contentDetails',
            });
        } catch (error) {
            throw new Error(`An error occurred retrieving video information: ${error.message}`);
        }

        return response.data.items
            .filter((item) => this.videoIsMusic(item) && !this.videoIsLong(item))
            .map((item) => item.id);
    }

    public videoIsMusic(videoDetails: youtube_v3.Schema$Video): boolean {
        return videoDetails &&
               videoDetails.topicDetails &&
               videoDetails.topicDetails.relevantTopicIds &&
               videoDetails.topicDetails.relevantTopicIds.includes(MUSIC_TOPIC_ID);
    }

    public videoIsLong(videoDetails: youtube_v3.Schema$Video): boolean {
        // Duration exists on the videoDetails, and it is greater than 10 mins (10*60*1000 ms)
        return videoDetails &&
               videoDetails.contentDetails &&
               videoDetails.contentDetails.duration &&
               parseInt(videoDetails.contentDetails.duration) > (10 * 60 * 1000);
    }

    private addToHistory(query: string) {
        if (this.searchHistory[query]) {
            this.searchHistory[query]++;
        } else {
            this.searchHistory[query] = 1;
        }
    }

    // Safely get either a thumbnail url or a stand-in image if the image isn't available.
    private getThumbnailUrl(thumbnails: any, thumbName: 'default'|'medium'|'high'): string {
        if (thumbnails && thumbnails[thumbName]) {
            return thumbnails[thumbName].url;
        } else {
            return '/no-art.png';
        }
    }

    private getYouTubeVideoDetailsFromApiResponse(
        responseObj: youtube_v3.Schema$Video|youtube_v3.Schema$SearchResult): IYouTubeVideoDetails {
        // If the id is a string, use it. Otherwise use the videoId property of id.
        const id: string = (typeof(responseObj.id) === 'string') ? responseObj.id : responseObj.id.videoId;

        return {
            channelName: decodeHtml(responseObj.snippet.channelTitle),
            description: decodeHtml(responseObj.snippet.description),
            thumbnail: {
                normal: this.getThumbnailUrl(responseObj.snippet.thumbnails, 'default'),
                big: this.getThumbnailUrl(responseObj.snippet.thumbnails, 'medium'),
            },
            title: decodeHtml(responseObj.snippet.title),
            videoId: id,
        };
    }
}

export const youTubeClient = new YouTubeClient();

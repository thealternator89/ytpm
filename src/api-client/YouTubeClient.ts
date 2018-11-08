import { google, youtube_v3,  } from 'googleapis';
import * as rp from 'request-promise';
import { YouTubeVideoDetails, YoutubeSearchResults } from '../models/YouTubeVideoDetails';
import { youTubeVideoDetailsCache } from './YouTubeVideoDetailsCache';
import { envUtil } from '../util/EnvUtil';
import { AxiosResponse } from 'axios';
import uuid = require('uuid');

const SEARCH_RESULT_LIMIT_STANDARD = 15;
const SEARCH_RESULT_LIMIT_RELATED = 5;

const AUTOCOMPLETE_URL_BASE = 'http://suggestqueries.google.com/complete/search';
const MUSIC_TOPIC_ID = '/m/04rlf';

type SearchContinuationOptions = {q: string, nextPageToken: string}

class YouTubeClient {
    private readonly defaultSearchOptions: any = {
        type: 'video',
        topicId: MUSIC_TOPIC_ID,
        regionCode: 'NZ'
    }

    private readonly youtube: youtube_v3.Youtube;
    private readonly searchHistory: {[query: string]: number} = {};
    private readonly searchContinuation: {[key: string]: SearchContinuationOptions} = {};

    public constructor() {
        this.youtube = google.youtube({
            version: 'v3',
            auth: envUtil.getYouTubeApiKey(),
        });
    }

    public async getSearchAutoComplete(query?: string): Promise<string[]> {
        if(!query) {
            return Object.keys(this.searchHistory).sort((o1, o2) => this.searchHistory[o2] - this.searchHistory[o1]);
        } else {
            const response = await rp({
                uri: AUTOCOMPLETE_URL_BASE,
                qs: {
                    ds: 'yt',
                    client: 'firefox',
                    q: query,
                },
                json: true
            }).promise();
            // response is an array. First element is the query, Second is an array of suggestions.
            return response[1]; 
        }
    }

    public async search(query: string): Promise<YoutubeSearchResults> {
        this.addToHistory(query);
        let response: AxiosResponse<youtube_v3.Schema$SearchListResponse>;
        try {
            response = await this.youtube.search.list({
                ...this.defaultSearchOptions,
                q: query,
                maxResults: SEARCH_RESULT_LIMIT_STANDARD,
                part: 'snippet',
            })
        } catch (error) {
            throw new Error(`An error occurred retrieving search results: ${error.message}`);
        }

        const results = response.data.items
            .map((result) => {
                const resultVideoDetails = this.getYouTubeVideoDetailsFromApiResponse(result);
                youTubeVideoDetailsCache.addOrReplaceInCache(resultVideoDetails);
                return resultVideoDetails;
            });

        const continuationKey = this.addOrReplaceSearchContinuationDetails(query, response.data.nextPageToken);

        return {
            continuationKey,
            results
        };
    }

    public async continuationSearch(key: string): Promise<YoutubeSearchResults> {
        const continuationOptions = this.searchContinuation[key];

        if(!continuationOptions) {
            throw new Error(`Unknown continuation key: ${key}`);
        }

        // Short circuit if there's no next page to get
        if(!continuationOptions.nextPageToken) {
            return {continuationKey: key, results: []};
        }

        let response: AxiosResponse<youtube_v3.Schema$SearchListResponse>;
        try {
            response = await this.youtube.search.list({
                ...this.defaultSearchOptions,
                q: continuationOptions.q,
                maxResults: SEARCH_RESULT_LIMIT_STANDARD,
                pageToken: continuationOptions.nextPageToken,
                part: 'snippet',
            })
        } catch (error) {
            throw new Error(`An error occurred retrieving search results: ${error.message}`);
        }

        const results = response.data.items
        .map((result) => {
            const resultVideoDetails = this.getYouTubeVideoDetailsFromApiResponse(result);
            youTubeVideoDetailsCache.addOrReplaceInCache(resultVideoDetails);
            return resultVideoDetails;
        });

        this.addOrReplaceSearchContinuationDetails(continuationOptions.q, response.data.nextPageToken, key);

        return {
            continuationKey: key,
            results
        };
    }

    private addOrReplaceSearchContinuationDetails(q: string, nextPageToken: string, key?: string): string {
        if(!key) {
            key = uuid.v4();
        }
        this.searchContinuation[key] = { q, nextPageToken }
        return key;
    }

    private addToHistory(query: string) {
        if (this.searchHistory[query]) {
            this.searchHistory[query]++;
        }
        else {
            this.searchHistory[query] = 1;
        }
    }

    public async searchRelatedVideos(videoId: string): Promise<YouTubeVideoDetails[]> {
        let response: AxiosResponse<youtube_v3.Schema$SearchListResponse>;
        try {
            response = await this.youtube.search.list({
                ...this.defaultSearchOptions,
                relatedToVideoId: videoId,
                maxResults: SEARCH_RESULT_LIMIT_RELATED,
                part: 'snippet',
            });
        } catch (error) {
            throw new Error(`An error occurred retrieving search results: ${error.message}`);
        }
        
        const results = response.data.items
            .map((result) => {
                const resultVideodetails = this.getYouTubeVideoDetailsFromApiResponse(result);
                youTubeVideoDetailsCache.addOrReplaceInCache(resultVideodetails);
                return resultVideodetails;
            });

        return results;
    }

    public async getDetails(query: string): Promise<YouTubeVideoDetails> {

        let response: AxiosResponse<youtube_v3.Schema$VideoListResponse>;

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
        youTubeVideoDetailsCache.addOrReplaceInCache(result);

        return result;
    }

    /**
     * Gets the video IDs which are considered by YouTube to be Music.
     * NOTE: This does not guarantee to retain the order of the ingoing array.
     * @param videoIds A list of video ids to check
     */
    public async getMusicVideoIds(videoIds: string[]): Promise<string[]> {
        let response: AxiosResponse<youtube_v3.Schema$VideoListResponse>;

        try {
            response = await this.youtube.videos.list({
                id: videoIds.join(','),
                part: 'topicDetails',
            });
        } catch (error) {
            throw new Error(`An error occurred retrieving video information: ${error.message}`);
        }

        const musicVideoIds: string[] = [];

        for(const videoDetails of response.data.items) {
            if(videoDetails.topicDetails.relevantTopicIds.includes(MUSIC_TOPIC_ID)){
                musicVideoIds.push(videoDetails.id);
            }
        }

        return musicVideoIds;
    }

    // Safely get either a thumbnail url or undefined.
    // TODO: Probably should return something like '/notfound.jpg' instead.
    private getThumbnailUrl(thumbnails: any, thumbName: 'default'|'medium'|'high'): string|undefined {
        if(thumbnails && thumbnails[thumbName]) {
            return thumbnails[thumbName].url;
        } else {
            return undefined;
        }
    }

    private getYouTubeVideoDetailsFromApiResponse(responseObj: youtube_v3.Schema$Video|youtube_v3.Schema$SearchResult): YouTubeVideoDetails {
        // If the id is a string, use it. Otherwise use the videoId property of id.
        let id: string = (typeof(responseObj.id) == 'string') ? responseObj.id : responseObj.id.videoId;

        return {
            videoId: id,
            title: responseObj.snippet.title,
            description: responseObj.snippet.description,
            thumbnailUrl: this.getThumbnailUrl(responseObj.snippet.thumbnails, 'default'),
            thumbnailUrlBig: this.getThumbnailUrl(responseObj.snippet.thumbnails, 'medium'),
            channelName: responseObj.snippet.channelTitle,
        }
    }
}

export const youTubeClient = new YouTubeClient();
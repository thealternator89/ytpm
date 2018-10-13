import * as ytsearch from 'youtube-search';

export interface YouTubeSearchResult {
    videoId: string;
    title: string;
    thumbnailUrl?: string;
    channelName?: string;
}

export class YouTubeClient {
    private readonly options: ytsearch.YouTubeSearchOptions = {
        maxResults: 20,
        key: 'AIzaSyCSaI3PV7rkNt2uqrCCx_kPNCUN-FAI0xA',
    }

    public async search(query: string): Promise<YouTubeSearchResult[]> {
        let results: {results: ytsearch.YouTubeSearchResults[], pageInfo: ytsearch.YouTubeSearchPageResults};
        try {
            results = await ytsearch(query, this.options);
        } catch (error) {
            throw new Error(`An error occurred retrieving search results: ${error.message}`);
        }
        
        return results.results.map((result) => {
            console.dir(result.thumbnails);
            return {
                videoId: result.id,
                title: result.title,
                //thumbnailUrl: result.thumbnails.standard.url,
                channelName: result.channelTitle
            };
        });
    }
}
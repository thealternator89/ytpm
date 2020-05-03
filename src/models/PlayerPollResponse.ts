import { IYouTubeVideoDetails } from './YouTubeVideoDetails';

export type EventType = 'PLAYER_COMMAND'| 'SONG_ENQUEUE' | 'TOAST' | 'USER_JOIN' | 'USER_LEAVE'

export interface IPlayerPollResponse {
    [key: string]: any,
    event: EventType
}

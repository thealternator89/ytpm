import { Request, Response } from 'express';
import * as moment from 'moment';
import { MessageBus } from '../util/MessageBus';

import { youTubeVideoDetailsCache } from '../api-client/YouTubeVideoDetailsCache';
import { userAuthHandler } from '../auth/UserAuthHandler';
import { PrivacyMode } from '../enums';
import { IQueueItem } from '../models/QueueItem';
import { PlayerQueue } from '../queue/PlayerQueue';
import { playerQueuesManager } from '../queue/PlayerQueuesManager';
import { IEndpoint } from './Endpoint';

type PlayerCommand = 'PLAY'|'PAUSE'|'SKIP'|'REPLAY';

class PlayerApiEndpointHandler implements IEndpoint {
    public registerApiEndpoints(app: any) {
        app.post('/api/player/update', (request: Request, response: Response) => {
            const queue = this.getQueue(request, response);
            if (!queue) {
                return;
            }

            const eventName = request.body.event || '';
            const eventTime = moment.unix(request.body.time);

            queue.updatePlayerState(eventName.toUpperCase(), eventTime, {
                duration: request.body.duration,
                position: request.body.position,
                videoId: request.body.videoId,
            });

            response.status(200).send();
        });
        app.get('/api/player/poll', (request: Request, response: Response) => {
            const queue = this.getQueue(request, response);
            if (!queue) {
                return;
            }

            const queueKey = queue.getKey();

            const processEventFunc = (update: {queueLength: number, command?: PlayerCommand, addedSongs?:
                    Array<{title: string, thumbnailUrl: string, addedBy: string}>},
                ) => {
                response.json(update);
            };

            MessageBus.once(`poll:${queueKey}`, processEventFunc);

            // Clean up if the client disconnects before we respond
            request.on('close', () => {
                MessageBus.removeListener(`poll:${queueKey}`, processEventFunc);
            });
        });

        app.get('/api/player/register', (request: Request, response: Response) => {
            const playerToken = request.cookies.ytpm_player_token;
            let queue: PlayerQueue = playerQueuesManager.getPlayerQueueForToken(playerToken);

            if (!queue) {
                queue = playerQueuesManager.createNewPlayerQueue();
                response.cookie('ytpm_player_token', queue.getPlayerToken());
            }

            response.json({
                queue_key: queue.getKey(),
                queue_length: queue.length(),
                token: queue.getPlayerToken(),
            });
        });

        app.get('/api/player/next_song', async (request: Request, response: Response) => {
            const queue: PlayerQueue = this.getQueue(request, response);

            if (!queue) {
                return;
            }

            const queueItem = queue.getSongToPlay();

            // Successfully authed, but there's nothing to play - just return a 200.
            if (!queueItem) {
                response.send();
                return;
            }

            const videoDetails = await youTubeVideoDetailsCache.getFromCacheOrApi(queueItem.videoId);
            const userAuthToken = (queueItem as IQueueItem).user;
            let addedBy: string;

            if (queue.getPrivacyMode() === PrivacyMode.HIDDEN) {
                addedBy = '';
            } else if (!userAuthToken) {
                addedBy = 'Added automatically';
            } else if (queue.getPrivacyMode() === PrivacyMode.FULL_NAMES) {
                addedBy = `Added by ${userAuthHandler.getNameForToken(userAuthToken)}`;
            } else {
                addedBy = 'Added by a user';
            }

            response.json({
                addedBy: addedBy,
                queueLength: queue.length(),
                video: videoDetails,
            });
        });
    }

    private getQueue(request, response): PlayerQueue|undefined {
        if (request.query.token) {
            return this.getQueueForToken(response, request.query.token);
        } else if (request.cookies.ytpm_player_token) {
            return this.getQueueForToken(response, request.cookies.ytpm_player_token);
        } else if (request.query.key) {
            return this.getQueueByQueueKey(response, request.query.key);
        } else {
            response.status(400).send('Invalid request');
            return undefined;
        }
    }

    private getQueueForToken(response: Response, token: string): PlayerQueue|undefined {
        const queue = playerQueuesManager.getPlayerQueueForToken(token);
        if (!queue) {
            response.status(400).send('Invalid request');
            return undefined;
        }

        return queue;
    }

    private getQueueByQueueKey(response: Response, playerKey: string): PlayerQueue|undefined {
        const queue = playerQueuesManager.getPlayerQueueForKey(playerKey);
        if (!queue) {
            response.status(400).send('Invalid request');
            return undefined;
        }

        return queue;
    }
}

export const playerApiEndpointHandler = new PlayerApiEndpointHandler();

import { Request, Response } from 'express';
import * as moment from 'moment';
import { MessageBus } from '../util/MessageBus';

import { PlayerQueue } from '../queue/PlayerQueue';
import { playerQueuesManager } from '../queue/PlayerQueuesManager';

type PlayerCommand = 'PLAY'|'PAUSE'|'SKIP'|'REPLAY';

class PlayerApiEndpointHandler {
    public registerApiEndpoints(app: any) {
        app.post('/api/player/update', (request: Request, response: Response) => {
            const queue = this.getQueueByQueryParam(request, response);
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
            const queue = this.getQueueByQueryParam(request, response);
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
            let queue: PlayerQueue = this.getQueueByTokenCookie(request, response);

            if (!queue) {
                queue = playerQueuesManager.createNewPlayerQueue();
                response.cookie('ytpm_player_token', queue.getPlayerToken());
            }

            response.json({
                queue_key: queue.getKey(),
                token: queue.getPlayerToken(),
                queue_length: queue.length(),
            });
        });

        app.get('/api/player/next_song', async (request: Request, response: Response) => {
            response.send('Not implemented');



        });
    }

    private getQueueByTokenCookie(request: Request, response: Response): PlayerQueue|undefined {
        const playerToken = request.cookies.ytpm_player_token;
        return this.getQueueForToken(response, playerToken);
    }

    private getQueueByQueryParam(request: Request, response: Response): PlayerQueue|undefined {
        const playerToken = request.query.token;
        return this.getQueueForToken(response, playerToken);
    }

    private getQueueForToken(response: Response, token?: string): PlayerQueue|undefined {
        if (!token) {
            response.status(400).send('Invalid request');
            return undefined;
        }

        const queue = playerQueuesManager.getPlayerQueueForToken(token);
        if (!queue) {
            response.status(400).send('Invalid request');
            return undefined;
        }

        return queue;
    }
}

export const playerApiEndpointHandler = new PlayerApiEndpointHandler();

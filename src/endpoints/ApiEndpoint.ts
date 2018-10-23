import { userAuthHandler } from '../auth/UserAuthHandler';
import { IQueueItem } from '../models/QueueItem';
import { Constants as CONSTANTS } from '../constants';
import { youTubeClient } from '../api-client/YouTubeClient';
import { youTubeVideoDetailsCache } from '../api-client/YouTubeVideoDetailsCache';
import { playerQueuesManager } from '../queue/PlayerQueuesManager';
import { PlayerQueue } from '../queue/PlayerQueue';
import { Response } from 'express';

class ApiEndpointHandler {

    public registerApiEndpoints(app: any) {

        app.get('/api/poll', (request, response) => {
            const queue = this.getQueueByKey(request, response);
            if(!queue){
                return;
            }

            response.type('json').send(JSON.stringify({
                itemsAvailableToPlay: !!queue.getUpNext(),
                queueLength: queue.length(),
                command: queue.getCommand()
            }));
        })

        app.get('/api/auth', (request, response) => {
            const providedAuthString = request.query['auth'];
            const providedUserName = request.query['name'];

            if(!providedAuthString || !providedUserName) {
                response.status(400).send('Invalid request');
                return;
            }

            try {
                const token = userAuthHandler.authenticateNewUser(providedAuthString, providedUserName);
                response.send(token);
            } catch (error) {
                response.status(403).send(`Invalid auth string`);
                return;
            }
        });

        app.get('/api/enqueue', async (request, response) => {
            if(!this.validateToken(request, response)) {
                return;
            }

            const queue = this.getQueueByAuthToken(request,response);
            if(!queue) {
                return;
            }

            const videoId = request.query['videoId'];
            const addNext = request.query['next'] === 'true';
            const noInfluence = request.query['noinfluence'] === 'true';

            if(!videoId) {
                response.status(400).send('Invalid request');
                return;
            }

            const queueItem: IQueueItem = {
                videoId,
                user: this.getAuthToken(request),
                autoQueueInfluence: noInfluence ? CONSTANTS.AUTO_QUEUE_INFLUENCE.NO_INFLUENCE : CONSTANTS.AUTO_QUEUE_INFLUENCE.USER_ADDED
            }

            let queuePosition = 1;
            if (addNext) {
                queue.addToFront(queueItem);
            } else {
                queue.enqueue(queueItem);
                queuePosition = queue.length();
            }

            const details = await youTubeVideoDetailsCache.getFromCacheOrApi(videoId);

            response.type('json').send(JSON.stringify({...details, queuePosition}));
        });

        app.get('/api/dequeue', (request, response) => {
            if(!this.validateToken(request, response)) {
                return;
            }

            const queue = this.getQueueByAuthToken(request,response);
            if(!queue) {
                return;
            }

            const videoToDequeue = request.query['videoId'];
            const token = request.query['token'];
            const videoPosition = queue.findPosition(videoToDequeue);

            if(videoPosition === -1) {
                response.status(400).send(`Item not in queue: ${videoToDequeue}`);
                return;
            }

            try {
                queue.dequeue(videoPosition, token);
            } catch (error) {
                response.status(400).send(`Dequeue failed: ${error.message}`);
            }
            response.send(`Dequeued: ${videoToDequeue}`);
        });

        app.get('/api/queue_list', (request, response) => {
            if(!this.validateToken(request, response)) {
                return;
            }

            const queue = this.getQueueByAuthToken(request,response);
            if(!queue) {
                return;
            }            
            
            const queueListPromise = queue.getAllQueuedItems().map(async (queueItem) => {
                const videoDetails = await youTubeVideoDetailsCache.getFromCacheOrApi(queueItem.videoId)
                return {
                    ...videoDetails,
                    user: userAuthHandler.getNameForToken(queueItem.user),
                };
            });

            const queueListResolved = Promise.all(queueListPromise);

            response.type('json').send(JSON.stringify(queueListResolved));
        });

        app.get('/api/play_history', (request, response) => {
            if(!this.validateToken(request, response)) {
                return;
            }

            const queue = this.getQueueByAuthToken(request,response);
            if(!queue) {
                return;
            }

            const queueListPromise = queue.getAllPlayedVideoIds().map(async (videoId) => {
                return youTubeVideoDetailsCache.getFromCacheOrApi(videoId);
            });
            const queueListResolved = Promise.all(queueListPromise);
            response.type('json').send(JSON.stringify(queueListResolved));
        });

        app.get('/api/up_next', async (request, response) => {
            if(!this.validateToken(request, response)) {
                return;
            }

            const queue = this.getQueueByAuthToken(request,response);
            if(!queue) {
                return;
            }            

            const upNext = queue.getUpNext();
            const nextVideo = await youTubeVideoDetailsCache.getFromCacheOrApi(upNext.videoId);

            response.type('json').send(JSON.stringify({
                ...nextVideo,
                auto: upNext.auto
            }));
        });

        app.get('/api/queue_settings', (request, response) => {
            if(!this.validateToken(request, response)) {
                return;
            }

            const queue = this.getQueueByAuthToken(request,response);
            if(!queue) {
                return;
            }            

            const accessUrl = request.query['accessurl'];
            queue.setAccessUrl(accessUrl);

            response.type('json').send(JSON.stringify({accessUrl}));
        });

        app.get('/api/set_command', (request, response) => {
            if(!this.validateToken(request, response)) {
                return;
            }

            const queue = this.getQueueByAuthToken(request,response);
            if(!queue) {
                return;
            }

            let command: string|undefined = request.query['command'];
            if(!command) {
                response.status(400).send('Command required');
                return;
            }

            command = command.toUpperCase();
            if(['PAUSE','PLAY','NEXTTRACK'].indexOf(command) === -1) {
                response.status(400).send(`Invalid command: ${command}`);
                return;
            }

            queue.setCommand(command as any);
            response.type('json').send(JSON.stringify({command}));
        });

        app.get('/api/search', async (request, response) => {
            if(!this.validateToken(request, response)) {
                return;
            }

            const searchQuery = request.query['q'];
            
            if (!searchQuery) {
                response.status(400).send('No search query provided');
                return;
            }

            const results = await youTubeClient.search(searchQuery);

            response.type('json').send(JSON.stringify(results));
        });

        app.get(`/api/internal/queue_states`, async (request, response: Response) => {
            const queueKeys = playerQueuesManager.getAllQueueKeys();

            const queues = queueKeys.map((key) => {
                const queue = playerQueuesManager.getPlayerQueue(key);
                return {
                    key,
                    length: queue.length(),
                    lastTouched: queue.getTimeLastTouched(),
                };
            });
            response.type('json').send(JSON.stringify(queues));
        })

        app.get('/api/internal/clean_queues', async (request, response) => {
            const beforeCount = playerQueuesManager.numQueues();
            playerQueuesManager.cleanUpOldPlayerQueues();
            const afterCount = playerQueuesManager.numQueues();
            response.type('json').send(JSON.stringify({
                    deleted: (beforeCount - afterCount),
            }));
        });
    }

    private validateToken(request, response) {
        const token = this.getAuthToken(request);
        if (!userAuthHandler.validateToken(token)) {
            response.status(401).send('Unauthorized');
            return false;
        }
        return true;
    }

    private getQueueByKey(request, response): PlayerQueue|undefined {
        const queueKey = request.query['key'];
        if(!queueKey) {
            response.status(400).send('Invalid request');
            return undefined;
        }
        const queue = playerQueuesManager.getPlayerQueue(queueKey);
        if(!queue) {
            response.status(400).send('Invalid request');
            return undefined;
        }

        return queue;
    }

    private getQueueByAuthToken(request, response): PlayerQueue|undefined {
        const token = this.getAuthToken(request);
        const queue = userAuthHandler.getQueueForToken(token);

        if(!queue) {
            response.status(400).send('Invalid request');
            return undefined;
        }

        return queue;
    }

    private getAuthToken(request): string|undefined {
        return request.query['token'];
    }
}

export const apiEndpointHandler = new ApiEndpointHandler();
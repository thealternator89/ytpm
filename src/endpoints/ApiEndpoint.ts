import { userAuthHandler } from '../auth/UserAuthHandler';
import { IQueueItem } from '../queue/QueueItem';
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

            // TODO also check the autoQueue for itemsAvailableToPlay
            response.type('json').send(JSON.stringify({
                itemsAvailableToPlay: !queue.isEmpty(),
                queueLength: queue.length()
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
                videoDetails: await youTubeVideoDetailsCache.getFromCacheOrApi(videoId),
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

            response.type('json').send(JSON.stringify({...queueItem.videoDetails, queuePosition}));
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

            const queueList = queue.getAllQueuedItems().map((queueItem) => {
                return {
                    ...queueItem.videoDetails,
                    user: userAuthHandler.getNameForToken(queueItem.user),
                };
            });

            response.type('json').send(JSON.stringify(queueList));
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

        app.get('/api/search_related', async (request, response) => {
            if(!this.validateToken(request, response)) {
                return;
            }

            const videoId = request.query['videoId'];
            
            if (!videoId) {
                response.status(400).send('No search query provided');
                return;
            }

            const results = await youTubeClient.searchRelatedVideos(videoId);

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

        app.get('/api/internal/count_queues', async (request, response) => {
            response.type('json').send(JSON.stringify({
                queues: playerQueuesManager.numQueues(),
            }));
        });

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
import { playerQueue } from '../../queue/PlayerQueue';
import { userAuthHandler } from '../../auth/UserAuthHandler';
import { IQueueItem } from '../../queue/QueueItem';
import { Constants as CONSTANTS } from '../../constants';
import { youTubeClient } from '../../api-client/YouTubeClient';
import { youTubeVideoDetailsCache } from '../../api-client/YouTubeVideoDetailsCache';


export class ApiEndpointHandler {

    public registerApiEndpoints(app: any) {

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
                playerQueue.addToFront(queueItem);
            } else {
                playerQueue.enqueue(queueItem);
                queuePosition = playerQueue.length();
            }

            response.send(JSON.stringify({videoId, queuePosition}));
        });

        app.get('/api/dequeue', (request, response) => {
            if(!this.validateToken(request, response)) {
                return;
            }

            const videoToDequeue = request.query['videoId'];
            const token = request.query['token'];
            const videoPosition = playerQueue.findPosition(videoToDequeue);

            if(videoPosition === -1) {
                response.status(400).send(`Item not in queue: ${videoToDequeue}`);
                return;
            }

            try {
                playerQueue.dequeue(videoPosition, token);
            } catch (error) {
                response.status(400).send(`Dequeue failed: ${error.message}`);
            }
            response.send(`Dequeued: ${videoToDequeue}`);
        });

        app.get('/api/queue_list', (request, response) => {
            if(!this.validateToken(request, response)) {
                return;
            }

            const queue = playerQueue.getAllQueuedItems().map((queueItem) => {
                return {
                    ...queueItem.videoDetails,
                    user: userAuthHandler.getNameForToken(queueItem.user),
                };
            });

            response.send(JSON.stringify(queue));
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

            response.send(JSON.stringify(results));
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

            response.send(JSON.stringify(results));
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

    private getAuthToken(request): string|undefined {
        return request.query['token'];
    }
}
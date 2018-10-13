import { playerQueue } from '../../queue/PlayerQueue';
import { userAuthHandler } from '../../auth/UserAuthHandler';
import { IQueueItem } from '../../queue/QueueItem';
import { Constants as CONSTANTS } from '../../constants';
import { YouTubeClient } from '../../api-client/YouTubeClient';


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

        app.get('/api/enqueue', (request, response) => {
            if(!this.validateToken(request, response)) {
                return;
            }

            const videoToQueue = request.query['videoId'];
            const addNext = request.query['next'] === 'true';
            const noInfluence = request.query['noinfluence'] === 'true';

            if(!videoToQueue) {
                response.status(400).send('Invalid request');
                return;
            }

            const queueItem: IQueueItem = {
                videoId: videoToQueue,
                user: this.getAuthToken(request),
                autoQueueInfluence: noInfluence ? CONSTANTS.AUTO_QUEUE_INFLUENCE.NO_INFLUENCE : CONSTANTS.AUTO_QUEUE_INFLUENCE.USER_ADDED
            }

            if (addNext) {
                playerQueue.addToFront(queueItem);
            } else {
                playerQueue.enqueue(queueItem);
            }

            response.send(`Queued: ${videoToQueue}${addNext ? ' [next]' : ''}`);
        });

        // TODO: Lock this down somehow. Should only be available to admins (or person who added it?)
        // This removes an item from the queue without playing it
        app.get('/api/dequeue', (request, response) => {
            if(!this.validateToken(request, response)) {
                return;
            }

            const videoToDequeue = request.query['videoId'];
            const videoPosition = playerQueue.findPosition(videoToDequeue);

            if(videoPosition === -1) {
                response.send(`Video not in queue: ${videoToDequeue}`);
                return;
            }

            playerQueue.dequeue(videoPosition);
            response.send(`Dequeued: ${videoToDequeue}`);
        });

        app.get('/api/queue_list', (request, response) => {
            if(!this.validateToken(request, response)) {
                return;
            }

            response.send(JSON.stringify(playerQueue.getAllQueuedItems()));
        });

        app.get('/api/search', async (request, response) => {
            if(!this.validateToken(request, response)) {
                return;
            }

            const searchQuery = request.query['q'];
            
            if(!searchQuery){
                response.status(400).send('No search query provided');
                return;
            }

            const client = new YouTubeClient();
            const results = await client.search(searchQuery);

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
import { playerQueue } from '../../queue/PlayerQueue';
import { userAuthHandler } from '../../auth/UserAuthHandler';
import { IQueueItem } from '../../queue/QueueItem';
import { Constants as CONSTANTS } from '../../constants';


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

            if(!videoToQueue) {
                response.status(400).send('Invalid request');
                return;
            }

            const queueItem: IQueueItem = {
                videoId: videoToQueue,
                user: this.getAuthToken(request),
                autoQueueInfluence: CONSTANTS.AUTO_QUEUE_INFLUENCE.USER_ADDED
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
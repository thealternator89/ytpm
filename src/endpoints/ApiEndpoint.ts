import { userAuthHandler } from '../auth/UserAuthHandler';
import { IQueueItem } from '../models/QueueItem';
import { Constants as CONSTANTS } from '../constants';
import { youTubeClient } from '../api-client/YouTubeClient';
import { youTubeVideoDetailsCache } from '../api-client/YouTubeVideoDetailsCache';
import { playerQueuesManager } from '../queue/PlayerQueuesManager';
import { PlayerQueue } from '../queue/PlayerQueue';
import { Response, Request } from "express";
import { YouTubeVideoDetails } from '../models/YouTubeVideoDetails';
import * as atob from 'atob';
import { URL } from 'url';

class ApiEndpointHandler {

    public registerApiEndpoints(app: any) {

        app.get('/api/player/poll', (request: Request, response: Response) => {
            const queue = this.getQueueByKey(request, response);
            if(!queue){
                return;
            }

            const status: string = request.query['status'];
            if(status){
                const statusParts = atob(status).split(';');
                const statusObj = {
                    playerState: statusParts[0],
                    videoId: statusParts[1],
                    position: parseFloat(statusParts[2]),
                    duration: parseFloat(statusParts[3]),
                }
                queue.setPlayerStatus(statusObj);
            } else {
                queue.setPlayerStatus({
                    playerState: 'NOTPLAYING',
                });
            }

            response.type('json').send(JSON.stringify({
                queueLength: queue.length(),
                command: queue.getCommand()
            }));
        });

        app.get('/api/client/poll', async (request: Request, response: Response) => {
            if(!this.validateToken(request, response)) {
                return;
            }

            const queue = this.getQueueByAuthToken(request,response);
            if(!queue) {
                response.status(500).send('Queue not found');
                return;
            }

            const playerStatus = queue.getPlayerStatus();

            response.type('json').send(JSON.stringify({
                playerState: playerStatus.playerState,
                video: await youTubeVideoDetailsCache.getFromCacheOrApi(playerStatus.videoId),
                position: playerStatus.position,
                duration: playerStatus.duration,
                health: playerStatus.health
            }));
        });

        app.get('/api/auth', (request: Request, response: Response) => {
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

        app.get('/api/enqueue', async (request: Request, response: Response) => {
            if(!this.validateToken(request, response)) {
                return;
            }

            const queue = this.getQueueByAuthToken(request,response);
            if(!queue) {
                return;
            }

            let videoId = request.query['videoId'];
            const url = request.query['url'];
            const addNext = request.query['next'] === 'true';
            const noInfluence = request.query['noinfluence'] === 'true';

            // Replace the videoId with the one from the URL only if it is undefined.
            // If both videoId and url params exist, videoId wins.
            if(!videoId && url) {
                try {
                    const videoUrl = new URL(url);
                    videoId = videoUrl.searchParams.get('v');
                } catch (error) {
                    response.status(400).send(`Invalid video URL: ${url}: ${error.message}`)
                    return;
                }
            }

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

        // FIXME: There's a couple of big issues here:
        //  * This will fail if there are two versions of the same video in the queue added by different users
        //  * This has a race condition; the array can be changed between finding the item to remove and removing it.
        // This functionality should probably be moved into the queue anyway.
        app.get('/api/dequeue', (request: Request, response: Response) => {
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

        app.get('/api/queue_state', async (request: Request, response: Response) => {
            if(!this.validateToken(request, response)) {
                return;
            }

            const queue = this.getQueueByAuthToken(request,response);
            if(!queue) {
                return;
            }

            const queueItems: YouTubeVideoDetails[] = [];
            for(const queueItem of queue.getAllQueuedItems()) {
                queueItems.push(await youTubeVideoDetailsCache.getFromCacheOrApi(queueItem.videoId));
            }

            if(queueItems.length === 0) {
                const upNext = queue.getNextAutoPlayItem();
                queueItems.push(await youTubeVideoDetailsCache.getFromCacheOrApi(upNext));
            }

            response.type('json').send(JSON.stringify({
                autoPlayEnabled: queue.getShouldAutoPlay(),
                queue: queueItems,
            }));
        });

        app.get('/api/autoplay_blacklist', (request: Request, response: Response) => {
            if(!this.validateToken(request, response)) {
                return;
            }

            const queue = this.getQueueByAuthToken(request,response);
            if(!queue) {
                return;
            }

            let videoId: string|undefined = request.query['videoId'];
            let action: string|undefined = request.query['action'];

            if(!videoId || !action) {
                response.status(400).send(`'videoId' and 'action' query parameters are required`);
                return;
            }

            action = action.toLowerCase();

            if(!['add','remove'].includes(action)){
                response.status(400).send(`Invalid value for 'action'. Valid options are: add, remove`);
                return;
            }

            if(action === 'add') {
                queue.preventAutoPlay(videoId);
            } else if (action === 'remove') {
                queue.allowAutoPlay(videoId);
            }

            response.send('Completed Successfully');
        })

        app.get('/api/play_history', async (request: Request, response: Response) => {
            if(!this.validateToken(request, response)) {
                return;
            }

            const queue = this.getQueueByAuthToken(request,response);
            if(!queue) {
                return;
            }

            const historyItems: YouTubeVideoDetails[] = [];

            for(const videoId of queue.getAllPlayedVideoIds()) {
                historyItems.push(await youTubeVideoDetailsCache.getFromCacheOrApi(videoId));
            }

            response.type('json').send(JSON.stringify(historyItems));
        });

        app.get('/api/set_command', (request: Request, response: Response) => {
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
            if(['PAUSE','PLAY','NEXTTRACK','AUTOPLAY-DISABLE','AUTOPLAY-ENABLE'].indexOf(command) === -1) {
                response.status(400).send(`Invalid command: ${command}`);
                return;
            }

            queue.setCommand(command as any);
            response.type('json').send(JSON.stringify({command}));
        });

        app.get('/api/search', async (request: Request, response: Response) => {
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

        app.get('/api/autocomplete', async (request: Request, response: Response) => {
            const searchQuery = request.query['q'];

            const results = await youTubeClient.getSearchAutoComplete(searchQuery);
            response.type('json').send(JSON.stringify(results));
        })

        app.get(`/api/internal/queue_states`, async (request: Request, response: Response) => {
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

        app.get('/api/internal/clean_queues', async (request: Request, response: Response) => {
            const beforeCount = playerQueuesManager.numQueues();
            playerQueuesManager.cleanUpOldPlayerQueues();
            const afterCount = playerQueuesManager.numQueues();
            response.type('json').send(JSON.stringify({
                    deleted: (beforeCount - afterCount),
            }));
        });
    }

    private validateToken(request: Request, response: Response) {
        const token = this.getAuthToken(request);
        if (!userAuthHandler.validateToken(token)) {
            response.status(401).send('Unauthorized');
            return false;
        }
        return true;
    }

    private getQueueByKey(request: Request, response: Response): PlayerQueue|undefined {
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

    private getQueueByAuthToken(request: Request, response: Response): PlayerQueue|undefined {
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
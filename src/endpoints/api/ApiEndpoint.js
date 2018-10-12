"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PlayerQueue_1 = require("../../queue/PlayerQueue");
const UserAuthHandler_1 = require("../../auth/UserAuthHandler");
const constants_1 = require("../../constants");
class ApiEndpointHandler {
    registerApiEndpoints(app) {
        app.get('/api/auth', (request, response) => {
            const providedAuthString = request.query['auth'];
            const providedUserName = request.query['name'];
            if (!providedAuthString || !providedUserName) {
                response.status(400).send('Invalid request');
                return;
            }
            try {
                const token = UserAuthHandler_1.userAuthHandler.authenticateNewUser(providedAuthString, providedUserName);
                response.send(token);
            }
            catch (error) {
                response.status(403).send(`Invalid auth string`);
                return;
            }
        });
        app.get('/api/enqueue', (request, response) => {
            if (!this.validateToken(request, response)) {
                return;
            }
            const videoToQueue = request.query['videoId'];
            const addNext = request.query['next'] === 'true';
            if (!videoToQueue) {
                response.status(400).send('Invalid request');
                return;
            }
            const queueItem = {
                videoId: videoToQueue,
                user: this.getAuthToken(request),
                autoQueueInfluence: constants_1.Constants.AUTO_QUEUE_INFLUENCE.USER_ADDED
            };
            if (addNext) {
                PlayerQueue_1.playerQueue.addToFront(queueItem);
            }
            else {
                PlayerQueue_1.playerQueue.enqueue(queueItem);
            }
            response.send(`Queued: ${videoToQueue}${addNext ? ' [next]' : ''}`);
        });
        app.get('/api/dequeue', (request, response) => {
            if (!this.validateToken(request, response)) {
                return;
            }
            const videoToDequeue = request.query['videoId'];
            const videoPosition = PlayerQueue_1.playerQueue.findPosition(videoToDequeue);
            if (videoPosition === -1) {
                response.send(`Video not in queue: ${videoToDequeue}`);
                return;
            }
            PlayerQueue_1.playerQueue.dequeue(videoPosition);
            response.send(`Dequeued: ${videoToDequeue}`);
        });
    }
    validateToken(request, response) {
        const token = this.getAuthToken(request);
        if (!UserAuthHandler_1.userAuthHandler.validateToken(token)) {
            response.status(401).send('Unauthorized');
            return false;
        }
        return true;
    }
    getAuthToken(request) {
        return request.query['token'];
    }
}
exports.ApiEndpointHandler = ApiEndpointHandler;

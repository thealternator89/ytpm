import { userAuthHandler } from '../auth/UserAuthHandler';
import { HostDetails } from '../HostDetails';
import { playerQueuesManager } from '../queue/PlayerQueuesManager';

export class PlayerEndpointHandler {
    public registerApiEndpoints(app: any) {
        app.get('/player', (request, response) => {
            if(!request.query['key'] || !playerQueuesManager.queueExists(request.query['key'])) {
                const newKey = playerQueuesManager.createNewPlayerQueue();
                response.redirect(`/player?key=${newKey}`);
                return;
            }

            const queue = playerQueuesManager.getPlayerQueue(request.query['key']);

            const baseObject = {
                layout: 'player.hbs',
                hostUrl: queue.getAccessUrl(),
                authString: request.query['key'],
                queueSize: queue.length(),
            };

            if(queue.isEmpty()){
                response.render('player-notplaying.hbs', baseObject);
            } else {
                const queueItem = queue.dequeue();
                const videoDetails = queueItem.videoDetails;

                response.render('player-playing.hbs', {
                    ...baseObject,
                    videoId: videoDetails.videoId,
                    videoTitle: videoDetails.title,
                    thumbnailSrc: videoDetails.thumbnailUrl,
                    addedBy: userAuthHandler.getNameForToken(queueItem.user),
                });
            }
        });
    }
}

export const playerEndpointHandler = new PlayerEndpointHandler();
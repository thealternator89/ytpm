import { userAuthHandler } from '../auth/UserAuthHandler';
import { playerQueuesManager } from '../queue/PlayerQueuesManager';
import { youTubeVideoDetailsCache } from '../api-client/YouTubeVideoDetailsCache';
import { IQueueItem } from '../models/QueueItem';
import { PrivacyMode } from '../enums';

const DEFAULT_ACCESS_URL = 'ytpm.thealternator.nz';

export class PlayerEndpointHandler {
    public registerApiEndpoints(app: any) {
        app.get('/player', async (request, response) => {
            if(!request.query['key'] || !playerQueuesManager.queueExists(request.query['key'])) {
                const newKey = playerQueuesManager.createNewPlayerQueue();
                response.redirect(`/player?key=${newKey}`);
                return;
            }

            const queue = playerQueuesManager.getPlayerQueue(request.query['key']);

            const baseObject = {
                layout: 'player.hbs',
                hostUrl: DEFAULT_ACCESS_URL,
                authString: request.query['key'],
                queueSize: queue.length(),
            };

            const queueItem = queue.getSongToPlay();
            if(!queueItem){
                response.render('player-notplaying.hbs', baseObject);
            } else {
                const videoDetails = await youTubeVideoDetailsCache.getFromCacheOrApi(queueItem.videoId);
                const userAuthToken = (queueItem as IQueueItem).user;
                let addedBy: string;

                if (queue.getPrivacyMode() === PrivacyMode.HIDDEN) {
                    addedBy = ''
                } else if (!userAuthToken) {
                    addedBy = 'Added automatically';
                } else if (queue.getPrivacyMode() === PrivacyMode.FULL_NAMES) {
                    addedBy = `Added by ${userAuthHandler.getNameForToken(userAuthToken)}`;
                } else {
                    addedBy = 'Added by a user';
                }

                response.render('player-playing.hbs', {
                    ...baseObject,
                    videoId: videoDetails.videoId,
                    videoTitle: videoDetails.title,
                    thumbnailSrc: videoDetails.thumbnailUrl,
                    addedByStr: addedBy,
                });
            }
        });
    }
}

export const playerEndpointHandler = new PlayerEndpointHandler();
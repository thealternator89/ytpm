import { youTubeVideoDetailsCache } from '../api-client/YouTubeVideoDetailsCache';
import { userAuthHandler } from '../auth/UserAuthHandler';
import { PrivacyMode } from '../enums';
import { IQueueItem } from '../models/QueueItem';
import { playerQueuesManager } from '../queue/PlayerQueuesManager';

export class PlayerEndpointHandler {
    public registerApiEndpoints(app: any) {
        app.get('/player', async (request, response) => {
            if (!request.query.key || !playerQueuesManager.queueExistsForKey(request.query.key)) {
                const newQueue = playerQueuesManager.createNewPlayerQueue();
                const newKey = newQueue.getKey();
                response.cookie('ytpm_player_token', newQueue.getPlayerToken());
                response.redirect(`/player?key=${newKey}`);
                return;
            }

            const queue = playerQueuesManager.getPlayerQueueForKey(request.query.key);

            const queueItem = queue.getSongToPlay();
            const baseObject = {
                authString: request.query.key,
                layout: 'player.hbs',
                queueSize: queue.length(),
            };

            if (!queueItem) {
                response.render('player-notplaying.hbs', baseObject);
            } else {
                const videoDetails = await youTubeVideoDetailsCache.getFromCacheOrApi(queueItem.videoId);
                const userAuthToken = (queueItem as IQueueItem).user;
                let addedBy: string;

                if (queue.getPrivacyMode() === PrivacyMode.HIDDEN) {
                    addedBy = '';
                } else if (!userAuthToken) {
                    addedBy = 'Added automatically';
                } else if (queue.getPrivacyMode() === PrivacyMode.FULL_NAMES) {
                    addedBy = `Added by ${userAuthHandler.getNameForToken(userAuthToken)}`;
                } else {
                    addedBy = 'Added by a user';
                }

                response.render('player-playing.hbs', {
                    ...baseObject,
                    addedByStr: addedBy,
                    thumbnailSrc: videoDetails.thumbnailUrl,
                    videoId: videoDetails.videoId,
                    videoTitle: videoDetails.title,
                });
            }
        });
    }
}

export const playerEndpointHandler = new PlayerEndpointHandler();

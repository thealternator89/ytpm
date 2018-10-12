import { playerQueue } from '../../queue/PlayerQueue';
import { userAuthHandler } from '../../auth/UserAuthHandler';
import { HostDetails } from '../../HostDetails';

export class PlayerEndpointHandler {
    public registerApiEndpoints(app: any) {
        app.get('/player', (request, response) => {
            const baseObject = {
                layout: 'player.hbs',
                hostUrl: `http://${HostDetails.getHost()}:${HostDetails.getPort()}`,
                authString: userAuthHandler.getPreSharedKey(),
            };

            if(playerQueue.isEmpty()){
                response.render('player-notplaying.hbs', baseObject);
            } else {
                response.render('player-playing.hbs', {
                    ...baseObject,
                    videoId: playerQueue.dequeue().videoId,
                });
            }
        });
    }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PlayerQueue_1 = require("../../queue/PlayerQueue");
const UserAuthHandler_1 = require("../../auth/UserAuthHandler");
const HostDetails_1 = require("../../HostDetails");
class PlayerEndpointHandler {
    registerApiEndpoints(app) {
        app.get('/player', (request, response) => {
            if (PlayerQueue_1.playerQueue.isEmpty()) {
                response.render('player-notplaying.hbs', {
                    layout: 'player.hbs',
                    hostUrl: `http://${HostDetails_1.HostDetails.getHost()}:${HostDetails_1.HostDetails.getPort()}`,
                    authString: UserAuthHandler_1.userAuthHandler.getPreSharedKey(),
                });
            }
            else {
                response.render('player-playing.hbs', {
                    layout: 'player.hbs',
                    hostUrl: `http://${HostDetails_1.HostDetails.getHost()}:${HostDetails_1.HostDetails.getPort()}`,
                    authString: UserAuthHandler_1.userAuthHandler.getPreSharedKey(),
                    videoId: PlayerQueue_1.playerQueue.dequeue().videoId,
                });
            }
        });
    }
}
exports.PlayerEndpointHandler = PlayerEndpointHandler;

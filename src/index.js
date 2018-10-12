"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const HostDetails_1 = require("./HostDetails");
const ApiEndpoint_1 = require("./endpoints/api/ApiEndpoint");
const PlayerEndpoint_1 = require("./endpoints/player/PlayerEndpoint");
const app = express();
const apiEndpointHandler = new ApiEndpoint_1.ApiEndpointHandler();
const playerEndpointHandler = new PlayerEndpoint_1.PlayerEndpointHandler();
app.engine('.hbs', exphbs({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view-engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
playerEndpointHandler.registerApiEndpoints(app);
apiEndpointHandler.registerApiEndpoints(app);
app.use(express.static(path.join(__dirname, 'public')));
app.use((err, request, response, next) => {
    console.log(err);
    response.status(500).send('Something broke!');
});
app.listen(HostDetails_1.HostDetails.getPort(), (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${HostDetails_1.HostDetails.getPort()}`);
});

import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as exphbs from 'express-handlebars';
import * as path from 'path';

import {apiEndpointHandler} from './endpoints/ApiEndpoint';
import {playerApiEndpointHandler} from './endpoints/PlayerApiEndpoint';
import {playerEndpointHandler} from './endpoints/PlayerEndpoint';
import {webClientEndpointHandler} from './endpoints/WebClientEndpoint';
import { envUtil } from './util/EnvUtil';
import { logger } from './util/LogUtil';

const SERVER_PORT = envUtil.getServerPort(8080);

const app = express();

const endpointHandlers = [playerEndpointHandler, playerApiEndpointHandler, apiEndpointHandler, webClientEndpointHandler];

app.engine('.hbs', exphbs({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/hbs/layouts'),
}));

app.set('view-engine', '.hbs');
app.set('views', path.join(__dirname, 'views/hbs'));

app.use(express.static(path.join(__dirname, '..', 'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use((err, request, response, next) => {
    logger.error(err);
    response.status(500).send('Something broke!');
});

app.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
    logger.info(`${request.ip} - ${request.method} ${request.path}`);
    next();
});

for(const endpoint of endpointHandlers) {
    endpoint.registerApiEndpoints(app);
}

app.listen(SERVER_PORT, (err) => {
    if (err) {
      logger.error('something bad happened', err);
      return;
    }

    logger.info(`server is listening on ${SERVER_PORT}`);
});

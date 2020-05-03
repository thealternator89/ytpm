import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as path from 'path';

import { envUtil } from './util/EnvUtil';
import { logger } from './util/LogUtil';
import { rootRouter } from './endpoints/Root';

const SERVER_PORT = envUtil.getServerPort(8080);

const app = express();

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

app.use(rootRouter);

app.listen(SERVER_PORT, (err) => {
    if (err) {
      logger.error('something bad happened', err);
      return;
    }

    logger.info(`server is listening on ${SERVER_PORT}`);
});

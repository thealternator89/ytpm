import * as path from 'path';
import * as express from 'express';
import * as exphbs from 'express-handlebars';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import {apiEndpointHandler} from './endpoints/ApiEndpoint';
import {playerEndpointHandler} from './endpoints/PlayerEndpoint';
import {webClientEndpointHandler} from './endpoints/WebClientEndpoint';

const SERVER_PORT = process.env.PORT || 8080;

const app = express();

app.engine('.hbs', exphbs({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));

app.set('view-engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '..', 'static')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use((err, request, response, next) => {
    // log the error, for now just console.log
    console.log(err)
    response.status(500).send('Something broke!')
});

playerEndpointHandler.registerApiEndpoints(app);
apiEndpointHandler.registerApiEndpoints(app);
webClientEndpointHandler.registerApiEndpoints(app);

app.listen(SERVER_PORT, (err) => {
    if (err) {
      return console.log('something bad happened', err)
    }
  
    console.log(`server is listening on ${SERVER_PORT}`)
});


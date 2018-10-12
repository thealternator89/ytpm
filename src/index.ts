import * as path from 'path';
import * as express from 'express';
import * as exphbs from 'express-handlebars';

import {HostDetails} from './HostDetails';

import {ApiEndpointHandler} from './endpoints/api/ApiEndpoint';
import {PlayerEndpointHandler} from './endpoints/player/PlayerEndpoint';

const app = express();

const apiEndpointHandler = new ApiEndpointHandler();
const playerEndpointHandler = new PlayerEndpointHandler();

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
    // log the error, for now just console.log
    console.log(err)
    response.status(500).send('Something broke!')
});

app.listen(HostDetails.getPort(), (err) => {
    if (err) {
      return console.log('something bad happened', err)
    }
  
    console.log(`server is listening on ${HostDetails.getPort()}`)
});


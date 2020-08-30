import { Request, Response, Router } from 'express';

import * as path from 'path';

import { apiRouter } from './Api';

const router = Router();

const loadClient = (_request: Request, response: Response) => {
    response.sendFile(path.join(__dirname, '..', '..' , 'static', 'mobile', 'index.html'));
}

router.use('/api', apiRouter);

// Handle all endpoints used by the angular app, to ensure we don't weirdly 404 a valid url
router.get('/', loadClient);
router.get('/mobile/connect', loadClient);
router.get('/mobile/featured', loadClient);
router.get('/mobile/history', loadClient);
router.get('/mobile/home', loadClient);
router.get('/mobile/queue', loadClient);
router.get('/mobile/search', loadClient);

router.get('/cast', (request: Request, response: Response) => {
    response.sendFile(path.join(__dirname, '..' , 'views/html/client', 'chromecast.sender.html'));
});

router.get('/player', (request: Request, response: Response) => {
    response.sendFile(path.join(__dirname, '..' , 'views/html/player', 'player.html'));
});

router.get('/player/cast', (request: Request, response: Response) => {
    response.sendFile(path.join(__dirname, '..' , 'views/html/player', 'chromecast.player.html'));
});

export const rootRouter = router;

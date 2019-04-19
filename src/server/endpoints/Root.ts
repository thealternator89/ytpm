import { Request, Response, Router } from 'express';

import * as path from 'path';

import { apiRouter } from './Api';
import { clientRouter } from './Client';
import { validateCookie } from './utilities';

const router = Router();

router.use('/api', apiRouter);
router.use('/client', clientRouter);

router.get('/', (request: Request, response: Response) => {
    response.redirect('/client');
});

router.get('/client', (request: Request, response: Response) => {
    if(validateCookie){
        response.redirect('/client/home');
    }
});

router.get('/player', (request: Request, response: Response) => {
    response.sendFile(path.join(__dirname, '..' , 'views/html/player', 'player.html'));
});

export const rootRouter = router;
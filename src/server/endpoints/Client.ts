import { Request, Response, Router } from 'express';

import * as path from 'path';
import { userAuthHandler } from '../auth/UserAuthHandler';
import { IQueueItem } from '../models/QueueItem';

import { Constants as CONSTANTS } from '../constants';
import { validateCookie } from './utilities';

const router = Router();

router.get('/login', (request: Request, response: Response) => {
    sendView(request, response, 'login.html', false);
});

router.post('/login', (request: Request, response: Response) => {
    const psk = request.body.inputPreSharedKey;
    const name = request.body.inputName;

    if (!name || !psk) {
        response.redirect('/client/login');
        return;
    }

    let token;

    try {
        token = userAuthHandler.authenticateNewUser(psk, name);
    } catch (error) {
        response.redirect('/client/login');
        return;
    }

    const queue = userAuthHandler.getQueueForToken(token);
    queue.sendToast(`${name} joined`);

    response.cookie('token', token);

    response.redirect('/client');
});

router.get('/logout', (request: Request, response: Response) => {
    const token = request.cookies.token;

    const queue = userAuthHandler.getQueueForToken(token);
    const name = userAuthHandler.getNameForToken(token);
    queue.sendToast(`${name} left`);

    if (token) {
        userAuthHandler.revokeToken(token);
    }

    response.clearCookie('token').redirect('/client');
});

router.get('/home', (request: Request, response: Response) => {
    sendView(request, response, 'home.html');
});

router.get('/search', (request: Request, response: Response) => {
    sendView(request, response, 'search.vue.html');
});

router.get('/playing', (request: Request, response: Response) => {
    sendView(request, response, 'playing.vue.html');
});

router.get('/queue', (request: Request, response: Response) => {
    sendView(request, response, 'queue.vue.html');
});

router.get('/history', (request: Request, response: Response) => {
    sendView(request, response, 'history.vue.html');
});

router.get('/add_manually', (request: Request, response: Response) => {
    sendView(request, response, 'add_manually.html');
});

// TODO: Probably just make this a vue.js page and call the api. Would be nicer.
router.post('/add_manually', (request: Request, response: Response) => {
    if (!validateCookie(request, response)) {
        return;
    }
    const token = request.cookies.token;
    const queue = userAuthHandler.getQueueForToken(token);

    const url = request.body.inputUrl;
    let videoId = request.body.inputVideoId;

    if (!videoId && url) {
        const videoUrl = new URL(url);
        videoId = videoUrl.searchParams.get('v');
    }

    if (!videoId) {
        response.redirect('/client/add_manually');
        return;
    }

    const queueItem: IQueueItem = {
        autoQueueInfluence: CONSTANTS.AUTO_QUEUE_INFLUENCE.NO_INFLUENCE,
        user: token,
        videoId: videoId,
    };

    queue.enqueue(queueItem);

    response.redirect('/client');
});

function sendView(request: Request, response: Response, viewName: string, requireValidSession = true) {
    if (requireValidSession && !validateCookie(request, response)) {
        return;
    }
    response.sendFile(path.join(__dirname, '..' , 'views/html/client', viewName));
}

export const clientRouter = router;
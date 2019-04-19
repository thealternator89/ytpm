import { Request, Response } from 'express';

import { userAuthHandler } from '../auth/UserAuthHandler';
import { PlayerQueue } from '../queue/PlayerQueue';

export function validateToken(request: Request, response: Response) {
    const token = getAuthToken(request);
    if (!userAuthHandler.validateToken(token)) {
        response.status(401).send('Unauthorized');
        return false;
    }
    return true;
}

export function getQueueByAuthToken(request: Request, response: Response): PlayerQueue|undefined {
    const token = getAuthToken(request);
    const queue = userAuthHandler.getQueueForToken(token);

    if (!queue) {
        response.status(400).send('Invalid request');
        return undefined;
    }

    return queue;
}

export function getAuthToken(request: Request): string|undefined {
    return request.query.token;
}

export function validateCookie(request, response) {
    if (request.cookies.token && userAuthHandler.validateToken(request.cookies.token)) {
        return true;
    } else {
        response.redirect('/client/login');
        return false;
    }
}
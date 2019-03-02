import { Request, Response } from 'express';
import * as path from 'path';
import { URL } from 'url';
import { userAuthHandler } from '../auth/UserAuthHandler';
import { Constants as CONSTANTS } from '../constants';
import { IQueueItem } from '../models/QueueItem';
import { IEndpoint } from './Endpoint';

export class WebClientEndpointHandler implements IEndpoint {
    public registerApiEndpoints(app: any) {
        app.get('/', (request: Request, response: Response) => {
            response.redirect('/client');
        });

        app.get('/client', (request: Request, response: Response) => {
            if (!this.validateCookie(request, response)) {
                return;
            }

            response.redirect('/client/home');
        });

        app.get('/client/login', (request: Request, response: Response) => {
            this.sendView(request, response, 'login.html', false);
        });

        app.post('/client/login', (request: Request, response: Response) => {
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

            response.cookie('token', token);

            response.redirect('/client');
        });

        app.get('/client/logout', (request: Request, response: Response) => {
            response.clearCookie('token').redirect('/client');
        });

        app.get('/client/home', (request: Request, response: Response) => {
            this.sendView(request, response, 'home.html');
        });

        app.get('/client/search', (request: Request, response: Response) => {
            this.sendView(request, response, 'search.vue.html');
        });

        app.get('/client/playing', (request: Request, response: Response) => {
            this.sendView(request, response, 'playing.vue.html');
        });

        app.get('/client/queue', (request: Request, response: Response) => {
            this.sendView(request, response, 'queue.vue.html');
        });

        app.get('/client/history', (request: Request, response: Response) => {
            this.sendView(request, response, 'history.vue.html');
        });

        app.get('/client/add_manually', (request: Request, response: Response) => {
            this.sendView(request, response, 'add_manually.html');
        });

        app.post('/client/add_manually', (request: Request, response: Response) => {
            if (!this.validateCookie(request, response)) {
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
    }

    private sendView(request: Request, response: Response, viewName: string, requireValidSession = true) {
        if (requireValidSession && !this.validateCookie(request, response)) {
            return;
        }
        response.sendFile(path.join(__dirname, '..' , 'views/html/client', viewName));
    }

    private validateCookie(request, response) {
        if (request.cookies.token && userAuthHandler.validateToken(request.cookies.token)) {
            return true;
        } else {
            response.redirect('/client/login');
            return false;
        }
    }
}

export const webClientEndpointHandler = new WebClientEndpointHandler();

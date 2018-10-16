import { Response, Request } from "express";
import { userAuthHandler } from "../auth/UserAuthHandler";

export class WebClientEndpointHandler {
    public registerApiEndpoints(app: any) {
        app.get('/', (request: Request, response: Response) => {
            if(!this.validateCookie(request, response)) {
                return;
            }

            response.redirect('/search');
        });

        app.get('/login', (request: Request, response: Response) => {
            response.render('login.hbs');
        })

        app.post('/login', (request: Request, response: Response) => {
            const psk = request.body['inputPreSharedKey'];
            const name = request.body['inputName'];
            
            if(!name || !psk) {
                response.redirect('/login');
                return;
            }

            let token;

            try {
                token = userAuthHandler.authenticateNewUser(psk, name);
            } catch (error) {
                response.redirect('/login');
                return;
            }

            response.cookie('token', token);

            response.redirect('/');
        })

        app.get('/search', (request, response) => {
            if(!this.validateCookie(request, response)) {
                return;
            } 
            response.send('Search!');
        })
    }

    private validateCookie(request, response) {
        if (request.cookies['token'] && userAuthHandler.validateToken(request.cookies['token'])) {
            return true;
        } else {
            response.redirect('/login');
            return false;
        }
    }
}

export const webClientEndpointHandler = new WebClientEndpointHandler();
import { Request, Response, Router } from "express";
import { userAuthHandler } from "../../../auth/UserAuthHandler";
import { youTubeClient } from "../../../api-client/YouTubeClient";
import { HttpStatusCodes } from "../../../util/HttpStatusCodes";

const router = Router();

router.get('/auth', (request: Request, response: Response) => {
    const providedAuthString = request.query.auth;
    const providedUserName = request.query.name;

    if (!providedAuthString || !providedUserName) {
        response.status(HttpStatusCodes.ClientError.BadRequest).send('Invalid request');
        return;
    }

    try {
        const token = userAuthHandler.authenticateNewUser(providedAuthString, providedUserName);
        response.send(token);
    } catch (error) {
        response.status(HttpStatusCodes.ClientError.Unauthorized).send(`Invalid auth string`);
        return;
    }
});

router.get('/search', async (request: Request, response: Response) => {
    const searchQuery = request.query.q;
    const pageToken = request.query.page;

    if (!searchQuery) {
        response.status(HttpStatusCodes.ClientError.BadRequest).send('No search query provided');
        return;
    }

    const results = await youTubeClient.search(searchQuery, pageToken);

    response.json(results);
});

router.get('/autocomplete', async (request: Request, response: Response) => {
    const searchQuery = request.query.q;

    const results = await youTubeClient.getSearchAutoComplete(searchQuery);
    response.json(results);
});

export const unauthedClientApiRouter = router;
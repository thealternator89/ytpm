import { Request, Response, Router } from "express";
import { userAuthHandler } from "../../../auth/UserAuthHandler";
import { youTubeClient } from "../../../api-client/YouTubeClient";
import { HttpStatusCodes } from "../../../util/HttpStatusCodes";
import { youTubeClientCache } from "../../../api-client/YouTubeClientCache";

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

router.get('/auth/validate', (request: Request, response: Response) => {
    const providedAuthToken = request.query.token;

    if (!providedAuthToken || !userAuthHandler.validateToken(providedAuthToken)) {
        response.status(HttpStatusCodes.ClientError.Unauthorized).send();
    } else {
        response.status(HttpStatusCodes.Success.NoContent).send();
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

router.get('/search/list', async(request: Request, response: Response) => {
    const listId = request.query.id;
    const pageToken = request.query.page;

    if (!listId) {
        response.status(HttpStatusCodes.ClientError.BadRequest).send('No list ID provided');
        return;
    }

    response.json(await youTubeClient.getVideosForPlaylist(listId, pageToken));
});

router.get('/search/channel', async(request: Request, response: Response) => {
    const channelId = request.query.id;
    const pageToken = request.query.page;

    if (!channelId) {
        response.status(HttpStatusCodes.ClientError.BadRequest).send('No channel ID provided');
        return;
    }

    response.json(await youTubeClient.getVideosForChannel(channelId, pageToken));
});

router.get('/autocomplete', async (request: Request, response: Response) => {
    const searchQuery = request.query.q;

    const results = await youTubeClient.getSearchAutoComplete(searchQuery);
    response.json(results);
});

router.get('/discovery/lists', async (_request: Request, response: Response) => {
    response.json(await youTubeClientCache.getListDetailsFromCacheOrApi());
});

router.get('/discovery/channels', async (_request: Request, response: Response) => {
    response.json(await youTubeClientCache.getChannelDetailsFromCacheOrApi());
});

export const unauthedClientApiRouter = router;
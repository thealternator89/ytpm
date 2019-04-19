import { Request, Response, Router } from 'express';

import { IYouTubeVideoDetails } from '../models/YouTubeVideoDetails';
import { youTubeVideoDetailsCache } from '../api-client/YouTubeVideoDetailsCache';
import { validateToken, getQueueByAuthToken, getAuthToken } from './utilities';
import { userAuthHandler } from '../auth/UserAuthHandler';
import { IQueueItem } from '../models/QueueItem';
import { Constants as CONSTANTS } from '../constants'
import { PrivacyMode } from '../enums';
import { youTubeClient } from '../api-client/YouTubeClient';

import { internalApiRouter } from './api/Internal';
import { playerApiRouter } from './api/Player';
import { clientApiRouter } from './api/Client';

const router = Router();

router.use('/client', clientApiRouter);
router.use('/internal', internalApiRouter);
router.use('/player', playerApiRouter);

router.get('/auth', (request: Request, response: Response) => {
    const providedAuthString = request.query.auth;
    const providedUserName = request.query.name;

    if (!providedAuthString || !providedUserName) {
        response.status(400).send('Invalid request');
        return;
    }

    try {
        const token = userAuthHandler.authenticateNewUser(providedAuthString, providedUserName);
        response.send(token);
    } catch (error) {
        response.status(403).send(`Invalid auth string`);
        return;
    }
});

router.get('/enqueue', async (request: Request, response: Response) => {
    if (!validateToken(request, response)) {
        return;
    }

    const queue = getQueueByAuthToken(request, response);
    if (!queue) {
        return;
    }

    let videoId = request.query.videoId;
    const url = request.query.url;
    const addNext = request.query.next === 'true';
    const noInfluence = request.query.noinfluence === 'true';

    // Replace the videoId with the one from the URL only if it is undefined.
    // If both videoId and url params exist, videoId wins.
    if (!videoId && url) {
        try {
            const videoUrl = new URL(url);
            videoId = videoUrl.searchParams.get('v');
        } catch (error) {
            response.status(400).send(`Invalid video URL: ${url}: ${error.message}`);
            return;
        }
    }

    if (!videoId) {
        response.status(400).send('Invalid request');
        return;
    }

    const queueItem: IQueueItem = {
        autoQueueInfluence: noInfluence ?
            CONSTANTS.AUTO_QUEUE_INFLUENCE.NO_INFLUENCE : CONSTANTS.AUTO_QUEUE_INFLUENCE.USER_ADDED,
        user: getAuthToken(request),
        videoId: videoId,
    };

    let queuePosition = 1;
    if (addNext) {
        queue.addToFront(queueItem);
    } else {
        queue.enqueue(queueItem);
        queuePosition = queue.length();
    }

    const details = await youTubeVideoDetailsCache.getFromCacheOrApi(videoId);

    response.type('json').send(JSON.stringify({...details, queuePosition: queuePosition}));
});

// TODO: dequeue

router.get('/queue_state', async (request: Request, response: Response) => {
    if (!validateToken(request, response)) {
        return;
    }

    const queue = getQueueByAuthToken(request, response);
    if (!queue) {
        return;
    }

    const queueItems: IYouTubeVideoDetails[] = [];
    for (const queueItem of queue.getAllQueuedItems()) {
        queueItems.push(await youTubeVideoDetailsCache.getFromCacheOrApi(queueItem.videoId));
    }

    if (queueItems.length === 0) {
        const upNext = queue.getNextAutoPlayItem();
        queueItems.push(await youTubeVideoDetailsCache.getFromCacheOrApi(upNext));
    }

    response.type('json').send(JSON.stringify({
        autoPlayEnabled: queue.getShouldAutoPlay(),
        queue: queueItems,
    }));
});

router.get('/autoplay_blacklist', (request: Request, response: Response) => {
    if (!validateToken(request, response)) {
        return;
    }

    const queue = getQueueByAuthToken(request, response);
    if (!queue) {
        return;
    }

    const videoId: string|undefined = request.query.videoId;
    let action: string|undefined = request.query.action;

    if (!videoId || !action) {
        response.status(400).send(`'videoId' and 'action' query parameters are required`);
        return;
    }

    action = action.toLowerCase();

    if (!['add', 'remove'].includes(action)) {
        response.status(400).send(`Invalid value for 'action'. Valid options are: add, remove`);
        return;
    }

    if (action === 'add') {
        queue.preventAutoPlay(videoId);
    } else if (action === 'remove') {
        queue.allowAutoPlay(videoId);
    }

    response.send('Completed Successfully');
});

router.get('/play_history', async (request: Request, response: Response) => {
    if (!validateToken(request, response)) {
        return;
    }

    const queue = getQueueByAuthToken(request, response);
    if (!queue) {
        return;
    }

    const fullHistory = request.query.fullHistory === 'true';

    const historyItems: IYouTubeVideoDetails[] = [];
    let historyIds: string[] = [...queue.getAllPlayedVideoIds()];

    if (!fullHistory) {
        historyIds = historyIds.slice(0, 20);
    }

    for (const videoId of historyIds) {
        historyItems.push(await youTubeVideoDetailsCache.getFromCacheOrApi(videoId));
    }

    response.type('json').send(JSON.stringify(historyItems));
});

// TODO: This should be split up and simplified.
// Player commands just get thrown onto the MessageBus, pretty much avoiding the PlayerQueue
// AutoPlay and Privacy commands are basically just PlayerQueue setting modifications
// So maybe change to /api/send_command and /api/settings, and make it a GET to retrieve, or POST to set?
router.get('/set_command', (request: Request, response: Response) => {
    if (!validateToken(request, response)) {
        return;
    }

    const queue = getQueueByAuthToken(request, response);
    if (!queue) {
        return;
    }

    let playerCommand: string|undefined = request.query.player;
    let autoPlayCommand: string|undefined = request.query.autoplay;
    let privacyCommand: string|undefined = request.query.privacy;

    if (!playerCommand && !autoPlayCommand && !privacyCommand) {
        response.status(400).send('At least one command required');
        return;
    }

    if (playerCommand) {
        playerCommand = playerCommand.toUpperCase();
        switch (playerCommand) {
            case 'PLAY': // Fall Through
            case 'PAUSE': // Fall Through
            case 'NEXTTRACK': // Fall Through
            case 'REPLAYTRACK': queue.setPlayerCommand(playerCommand as any);
        }
    }

    if (autoPlayCommand) {
        autoPlayCommand = autoPlayCommand.toUpperCase();

        switch (autoPlayCommand) {
            case 'ENABLE':
                queue.setShouldAutoPlay(true);
                break;
            case 'DISABLE':
                queue.setShouldAutoPlay(false);
                break;
        }
    }

    if (privacyCommand) {
        privacyCommand = privacyCommand.toUpperCase();

        switch (privacyCommand) {
            case 'FULLNAME':
                queue.setPrivacyMode(PrivacyMode.FULL_NAMES);
                break;
            case 'USERAUTO':
                queue.setPrivacyMode(PrivacyMode.USER_OR_AUTO);
                break;
            case 'HIDDEN':
                queue.setPrivacyMode(PrivacyMode.HIDDEN);
                break;
        }
    }

    response.type('json').send({
        autoPlayCommand: autoPlayCommand,
        playerCommand: playerCommand,
        privacyCommand: privacyCommand,
    });
});

router.get('/search', async (request: Request, response: Response) => {
    const searchQuery = request.query.q;
    const pageToken = request.query.page;

    if (!searchQuery) {
        response.status(400).send('No search query provided');
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

router.get('/autoqueue_state', async (request: Request, response: Response) => {
    if (!validateToken(request, response)) {
        return;
    }

    const queue = getQueueByAuthToken(request, response);
    if (!queue) {
        return;
    }

    const autoQueueWithYtDetails: any[] = [];
    for (const queueItem of queue.getAutoPlayState()) {
        const videoDetails = await youTubeVideoDetailsCache.getFromCacheOrApi(queueItem.videoId);
        autoQueueWithYtDetails.push({
            numberOfSongsUntilAvailableToPlay: queueItem.numberOfSongsUntilAvailableToPlay,
            score: queueItem.score,
            video: videoDetails,
        });
    }

    response.json(autoQueueWithYtDetails);
});

export const apiRouter = router;
import { Request, Response, Router, NextFunction } from 'express';
import { youTubeClientCache } from '../../../api-client/YouTubeClientCache';
import { getQueueByAuthToken, getAuthToken } from '../../utilities';
import { userAuthHandler } from '../../../auth/UserAuthHandler';
import { Constants as CONSTANTS } from '../../../constants'
import { PrivacyMode } from '../../../enums';
import { IYouTubeVideoDetails } from '../../../models/YouTubeVideoDetails';
import { IQueueItem } from '../../../models/QueueItem';
import { MessageBus } from '../../../util/MessageBus';
import { IQueueState } from '../../../models/QueueState';
import { HttpStatusCodes } from '../../../util/HttpStatusCodes';

const router = Router();

router.use((request: Request, response: Response, next: NextFunction) => {
    const token = getAuthToken(request);
    if (!userAuthHandler.validateToken(token)) {
        response.status(HttpStatusCodes.ClientError.Unauthorized).send('Unauthorized');
        return;
    }
    next();
});

router.get('/poll', async (request: Request, response: Response) => {
    const queue = getQueueByAuthToken(request, response);
    if (!queue) {
        response.status(HttpStatusCodes.ServerError.InternalServerError).send('Queue not found');
        return;
    }

    const playerStatus = queue.getPlayerState();

    response.json({
        duration: playerStatus.duration,
        playerState: playerStatus.playerState,
        position: playerStatus.position,
        video: await youTubeClientCache.getVideoFromCacheOrApi(playerStatus.videoId),
    });
});

router.get('/poll/v2', async (request: Request, response: Response) => {
    const queue = getQueueByAuthToken(request, response);
    if (!queue) {
        response.status(HttpStatusCodes.ServerError.InternalServerError).send('Queue not found');
        return;
    }

    const since = request.query.since || 0;

    const state = queue.getQueueState();

    if (state.lastUpdated > since) {
        response.json(state);
        return;
    }

    const queueKey = queue.getKey();

    const processEventFunc = (update: IQueueState) => {
        response.json(update);
    };

    MessageBus.once(`client:${queueKey}`, processEventFunc);

    // Clean up if the client disconnects before we respond
    request.on('close', () => {
        MessageBus.removeListener(`client:${queueKey}`, processEventFunc);
    });
});

router.get('/enqueue', async (request: Request, response: Response) => {
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
            response.status(HttpStatusCodes.ClientError.BadRequest).send(`Invalid video URL: ${url}: ${error.message}`);
            return;
        }
    }

    if (!videoId) {
        response.status(HttpStatusCodes.ClientError.BadRequest).send('Invalid request');
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

    const details = await youTubeClientCache.getVideoFromCacheOrApi(videoId);

    response.type('json').send(JSON.stringify({...details, queuePosition: queuePosition}));
});

// TODO: dequeue

router.get('/queue_state', async (request: Request, response: Response) => {
    const queue = getQueueByAuthToken(request, response);
    if (!queue) {
        return;
    }

    const queueItems: IYouTubeVideoDetails[] = [];
    for (const queueItem of queue.getAllQueuedItems()) {
        queueItems.push(await youTubeClientCache.getVideoFromCacheOrApi(queueItem.videoId));
    }

    if (queueItems.length === 0) {
        const upNext = queue.getNextAutoPlayItem();
        queueItems.push(await youTubeClientCache.getVideoFromCacheOrApi(upNext));
    }

    response.type('json').send(JSON.stringify({
        autoPlayEnabled: queue.getShouldAutoPlay(),
        queue: queueItems,
    }));
});

router.get('/autoplay_blacklist', (request: Request, response: Response) => {
    const queue = getQueueByAuthToken(request, response);
    if (!queue) {
        return;
    }

    const videoId: string|undefined = request.query.videoId;
    let action: string|undefined = request.query.action;

    if (!videoId || !action) {
        response.status(HttpStatusCodes.ClientError.BadRequest).send(`'videoId' and 'action' query parameters are required`);
        return;
    }

    action = action.toLowerCase();

    if (!['add', 'remove'].includes(action)) {
        response.status(HttpStatusCodes.ClientError.BadRequest).send(`Invalid value for 'action'. Valid options are: add, remove`);
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
        historyItems.push(await youTubeClientCache.getVideoFromCacheOrApi(videoId));
    }

    response.type('json').send(JSON.stringify(historyItems));
});

router.post('/send_command', (request: Request, response: Response) => {
    const queue = getQueueByAuthToken(request, response);
    if (!queue) {
        return;
    }
    
    let command = request.body.command;

    if (!command) {
        response.status(HttpStatusCodes.ClientError.BadRequest).send('command required');
        return;
    }

    const upperCommand = command.toUpperCase();
    
    switch (upperCommand) {
        case 'PLAY': // Fall Through
        case 'PAUSE': // Fall Through
        case 'NEXTTRACK': // Fall Through
        case 'RELOAD': //Fall Through
        case 'REPLAYTRACK': queue.setPlayerCommand(upperCommand);
            break;
        default: response.status(HttpStatusCodes.ClientError.BadRequest).send(`Unrecognised command: ${command}`);
            return;
    }

    // Send a "Success: No Content" response.
    response.status(HttpStatusCodes.Success.NoContent).send();
});

router.get('/settings', (request: Request, response: Response) => {
    const queue = getQueueByAuthToken(request, response);
    if (!queue) {
        return;
    }

    response.json(queue.getSettings());
});

router.patch('/settings', (request: Request, response: Response) => {
    const queue = getQueueByAuthToken(request, response);
    if (!queue) {
        return;
    }

    const autoPlay = request.body.autoplay;
    const privacyMode = request.body.privacyMode ? request.body.privacyMode.toUpperCase() : undefined;

    let newPrivacyMode = PrivacyMode[privacyMode as keyof typeof PrivacyMode];

    queue.setSettings({
        autoplay: autoPlay,
        privacyMode: newPrivacyMode,
    });

    response.status(HttpStatusCodes.Success.NoContent).send();
});

router.get('/autoqueue_state', async (request: Request, response: Response) => {
    const queue = getQueueByAuthToken(request, response);
    if (!queue) {
        return;
    }

    const autoQueueWithYtDetails: any[] = [];
    for (const queueItem of queue.getAutoPlayState()) {
        const videoDetails = await youTubeClientCache.getVideoFromCacheOrApi(queueItem.videoId);
        autoQueueWithYtDetails.push({
            numberOfSongsUntilAvailableToPlay: queueItem.numberOfSongsUntilAvailableToPlay,
            score: queueItem.score,
            video: videoDetails,
        });
    }

    response.json(autoQueueWithYtDetails);
});

export const authedClientApiRouter = router;

import { Request, Response, Router } from 'express';
import { playerQueuesManager } from '../../queue/PlayerQueuesManager';
import moment = require('moment');
import { PlayerQueue } from '../../queue/PlayerQueue';
import { MessageBus } from '../../util/MessageBus';
import { youTubeClientCache } from '../../api-client/YouTubeClientCache';
import { IQueueItem } from '../../models/QueueItem';
import { PrivacyMode } from '../../enums';
import { userAuthHandler } from '../../auth/UserAuthHandler';
import { IPlayerPollResponse } from '../../models/PlayerPollResponse';

const router = Router();

router.post(`/update`, async (request: Request, response: Response) => {
    const queue = getQueue(request, response);
    if (!queue) {
        return;
    }

    const eventName = request.body.event || '';
    const eventTime = moment.unix(request.body.time);

    queue.updatePlayerState(eventName.toUpperCase(), eventTime, {
        videoId: request.body.videoId,
    });

    response.status(200).send();
});

router.get('/poll', (request: Request, response: Response) => {
    const queue = getQueue(request, response);
    if (!queue) {
        return;
    }

    const queueKey = queue.getKey();

    const keepAliveFunc = () => {
        response.write('0', 'UTF-8');
    };

    const intervalId = setInterval(keepAliveFunc, 55000);

    const processEventFunc = (update: IPlayerPollResponse) => {
        response.write(JSON.stringify(update), 'UTF-8');
        response.end();
        clearInterval(intervalId);
    };

    MessageBus.once(`player:${queueKey}`, processEventFunc);

    // Clean up if the client disconnects before we respond
    request.on('close', () => {
        MessageBus.removeListener(`player:${queueKey}`, processEventFunc);
        clearInterval(intervalId);
    });

    keepAliveFunc();
});

router.get('/register', (request: Request, response: Response) => {
    const playerToken = request.cookies.ytpm_player_token;
    let queue: PlayerQueue = playerQueuesManager.getPlayerQueueForToken(playerToken);

    if (!queue) {
        queue = playerQueuesManager.createNewPlayerQueue();
        response.cookie('ytpm_player_token', queue.getPlayerToken());
    }

    response.json({
        queue_key: queue.getKey(),
        queue_length: queue.length(),
        token: queue.getPlayerToken(),
    });
});

router.get('/next_song', async (request: Request, response: Response) => {
    const queue: PlayerQueue = getQueue(request, response);

    if (!queue) {
        return;
    }

    const queueItem = queue.getSongToPlay();

    // Successfully authed, but there's nothing to play - just return a 200.
    // TODO: change this to a 203
    if (!queueItem) {
        response.send();
        return;
    }

    const videoDetails = await youTubeClientCache.getVideoFromCacheOrApi(queueItem.videoId);
    const userAuthToken = (queueItem as IQueueItem).user;
    let addedBy: string;

    if (queue.getPrivacyMode() === PrivacyMode.HIDDEN) {
        addedBy = '';
    } else if (!userAuthToken) {
        addedBy = 'Added automatically';
    } else if (queue.getPrivacyMode() === PrivacyMode.FULL_NAMES) {
        addedBy = `Added by ${userAuthHandler.getNameForToken(userAuthToken)}`;
    } else {
        addedBy = 'Added by a user';
    }

    response.json({
        addedBy: addedBy,
        queueLength: queue.length(),
        video: videoDetails,
    });
});

function getQueue(request, response): PlayerQueue|undefined {
    if (request.query.token) {
        return getQueueForToken(response, request.query.token);
    } else if (request.cookies.ytpm_player_token) {
        return getQueueForToken(response, request.cookies.ytpm_player_token);
    } else if (request.query.key) {
        return getQueueByQueueKey(response, request.query.key);
    } else {
        response.status(400).send('Invalid request');
        return undefined;
    }
}

function getQueueForToken(response: Response, token: string): PlayerQueue|undefined {
    const queue = playerQueuesManager.getPlayerQueueForToken(token);
    if (!queue) {
        response.status(400).send('Invalid request');
        return undefined;
    }

    return queue;
}

function getQueueByQueueKey(response: Response, playerKey: string): PlayerQueue|undefined {
    const queue = playerQueuesManager.getPlayerQueueForKey(playerKey);
    if (!queue) {
        response.status(400).send('Invalid request');
        return undefined;
    }

    return queue;
}

export const playerApiRouter = router;

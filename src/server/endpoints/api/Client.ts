import { Request, Response, Router } from 'express';
import { youTubeVideoDetailsCache } from '../../api-client/YouTubeVideoDetailsCache';
import { validateToken, getQueueByAuthToken } from '../utilities';


const router = Router();

router.get('/poll', async (request: Request, response: Response) => {
    if (!validateToken(request, response)) {
        return;
    }

    const queue = getQueueByAuthToken(request, response);
    if (!queue) {
        response.status(500).send('Queue not found');
        return;
    }

    const playerStatus = queue.getPlayerState();

    response.json({
        duration: playerStatus.duration,
        playerState: playerStatus.playerState,
        position: playerStatus.position,
        video: await youTubeVideoDetailsCache.getFromCacheOrApi(playerStatus.videoId),
    });
});

export const clientApiRouter = router;
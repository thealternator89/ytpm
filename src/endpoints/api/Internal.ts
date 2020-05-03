import { Request, Response, Router } from 'express';
import { playerQueuesManager } from '../../queue/PlayerQueuesManager';

const router = Router();

router.get(`/queue_states`, async (request: Request, response: Response) => {
    const queueKeys = playerQueuesManager.getAllQueueKeys();

    const queues = queueKeys.map((key) => {
        const queue = playerQueuesManager.getPlayerQueueForKey(key);
        return {
            key: key,
            lastTouched: queue.getTimeLastTouched(),
            length: queue.length(),
        };
    });
    response.type('json').send(JSON.stringify(queues));
});

router.get('/clean_queues', async (request: Request, response: Response) => {
    const beforeCount = playerQueuesManager.numQueues();
    playerQueuesManager.cleanUpOldPlayerQueues();
    const afterCount = playerQueuesManager.numQueues();
    response.type('json').send(JSON.stringify({
            deleted: (beforeCount - afterCount),
    }));
});

export const internalApiRouter = router;
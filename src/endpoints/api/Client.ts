import { Router } from 'express';
import { authedClientApiRouter } from './client/AuthedClient';
import { unauthedClientApiRouter } from './client/UnauthedClient';

const router = Router();

router.use('/a', authedClientApiRouter);
router.use(unauthedClientApiRouter);

export const clientApiRouter = router;
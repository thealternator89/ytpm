import { Router } from 'express';

import { clientApiRouter } from './api/Client';
import { internalApiRouter } from './api/Internal';
import { playerApiRouter } from './api/Player';

const router = Router();

router.use('/client', clientApiRouter);
router.use('/internal', internalApiRouter);
router.use('/player', playerApiRouter);

export const apiRouter = router;
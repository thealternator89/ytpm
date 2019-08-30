import { Router } from 'express';
import * as cors from 'cors';

import { clientApiRouter } from './api/Client';
import { internalApiRouter } from './api/Internal';
import { playerApiRouter } from './api/Player';

const router = Router();

// enable cors for api endpoints
router.use(cors());

router.use('/client', clientApiRouter);
router.use('/internal', internalApiRouter);
router.use('/player', playerApiRouter);

export const apiRouter = router;

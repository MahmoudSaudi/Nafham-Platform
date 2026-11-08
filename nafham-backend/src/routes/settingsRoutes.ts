import { Router } from 'express';
import { getAllSettings, updateSettings } from '../controllers/settingsController';

const router = Router();

// TODO: Add protect/restrictTo middlewares once implemented or located
// router.use(protect);
// router.use(restrictTo('ADMIN'));

router.route('/')
    .get(getAllSettings)
    .put(updateSettings);

export default router;

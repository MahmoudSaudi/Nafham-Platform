import { Router } from 'express';
import { getNotifications, markAsRead, createNotification } from '../controllers/notifications.controller';
// import { protect, restrictTo } from '../middleware/authMiddleware';

const router = Router();

// TODO: Add protect middleware
// router.use(protect);

router.route('/')
    .get(getNotifications)
    .post(createNotification); // TODO: restrictTo('ADMIN')

router.route('/mark-read')
    .put(markAsRead);

export default router;

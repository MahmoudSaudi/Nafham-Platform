import { Router } from 'express';
import { getDiscussions, getDiscussionDetails, replyToDiscussion, toggleDiscussionLock, deleteDiscussion } from '../controllers/discussions.controller';

const router = Router();

router.get('/', getDiscussions);
router.get('/:id', getDiscussionDetails);
router.post('/:id/reply', replyToDiscussion);
router.put('/:id/lock', toggleDiscussionLock);
router.delete('/:id', deleteDiscussion);

export default router;

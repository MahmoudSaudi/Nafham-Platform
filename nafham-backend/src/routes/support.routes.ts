import { Router } from 'express';
import { getTickets, getTicketDetails, replyToTicket, updateTicketStatus } from '../controllers/support.controller';

const router = Router();

router.get('/tickets', getTickets);
router.get('/tickets/:id', getTicketDetails);
router.post('/tickets/:id/reply', replyToTicket);
router.put('/tickets/:id/status', updateTicketStatus);

export default router;

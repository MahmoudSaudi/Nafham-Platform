import { Router } from 'express';
import { getTransactions, refundTransaction, getFinancialStats, approveTransaction, rejectTransaction } from '../controllers/financials.controller';

const router = Router();

router.get('/stats', getFinancialStats);
router.get('/transactions', getTransactions);
router.post('/transactions/:id/refund', refundTransaction);
router.put('/transactions/:id/approve', approveTransaction);
router.put('/transactions/:id/reject', rejectTransaction);

export default router;

import express from 'express';
import { getDashboardOverview } from '../controllers/dashboard.controller';
import { protect, authorize } from '../middlewares/auth.middleware';

const router = express.Router();

// GET /api/dashboard/overview
router.get('/overview', protect, authorize('ADMIN', 'TEACHER'), getDashboardOverview);

export default router;

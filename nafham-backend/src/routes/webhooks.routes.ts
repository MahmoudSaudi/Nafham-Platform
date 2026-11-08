import { Router } from 'express';
import { paymobWebhook, fawryWebhook } from '../controllers/webhooks.controller';

const router = Router();

// Paymob webhook endpoint
router.post('/paymob', paymobWebhook);

// Fawry webhook endpoint
router.post('/fawry', fawryWebhook);

export default router;

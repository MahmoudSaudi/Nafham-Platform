import { Router } from 'express';
import { getCoupons, createCoupon, deleteCoupon, getCampaigns, createCampaign, deleteCampaign } from '../controllers/marketing.controller';

const router = Router();

// Coupons
router.get('/coupons', getCoupons);
router.post('/coupons', createCoupon);
router.delete('/coupons/:id', deleteCoupon);

// Campaigns
router.get('/campaigns', getCampaigns);
router.post('/campaigns', createCampaign);
router.delete('/campaigns/:id', deleteCampaign);

export default router;

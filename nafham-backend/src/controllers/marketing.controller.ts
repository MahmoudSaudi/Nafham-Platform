import { Request, Response } from 'express';
import prisma from '../utils/prisma';

// ---------------- Coupons ----------------

export const getCoupons = async (req: Request, res: Response): Promise<void> => {
    try {
        const coupons = await prisma.coupon.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.status(200).json({ success: true, data: coupons });
    } catch (error: any) {
        console.error("Error getting coupons:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const createCoupon = async (req: Request, res: Response): Promise<void> => {
    try {
        const { code, discountType, discountValue, validFrom, validUntil, usageLimit, courseId } = req.body;

        const existing = await prisma.coupon.findUnique({ where: { code } });
        if (existing) {
            res.status(400).json({ success: false, message: 'Coupon code already exists' });
            return;
        }

        const coupon = await prisma.coupon.create({
            data: {
                code, discountType, discountValue, validFrom, validUntil, usageLimit, courseId, status: 'ACTIVE'
            }
        });

        res.status(201).json({ success: true, data: coupon, message: 'Coupon created successfully' });
    } catch (error: any) {
        console.error("Error creating coupon:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const deleteCoupon = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;
        await prisma.coupon.delete({ where: { id } });
        res.status(200).json({ success: true, message: 'Coupon deleted successfully' });
    } catch (error: any) {
        console.error("Error deleting coupon:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


// ---------------- Campaigns ----------------

export const getCampaigns = async (req: Request, res: Response): Promise<void> => {
    try {
        const campaigns = await prisma.campaign.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.status(200).json({ success: true, data: campaigns });
    } catch (error: any) {
        console.error("Error getting campaigns:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const createCampaign = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, type, audience, content, scheduledFor } = req.body;

        const campaign = await prisma.campaign.create({
            data: {
                name, type, audience, content, scheduledFor, status: 'DRAFT'
            }
        });

        res.status(201).json({ success: true, data: campaign, message: 'Campaign created successfully' });
    } catch (error: any) {
        console.error("Error creating campaign:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const deleteCampaign = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;
        await prisma.campaign.delete({ where: { id } });
        res.status(200).json({ success: true, message: 'Campaign deleted successfully' });
    } catch (error: any) {
        console.error("Error deleting campaign:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

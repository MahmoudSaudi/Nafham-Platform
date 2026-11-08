import { Request, Response } from 'express';
import prisma from '../utils/prisma';

// Get notifications for the authenticated user
export const getNotifications = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user?.id;
        if (!userId) {
            // If no user is authenticated, just return an empty array to prevent frontend errors
            return res.status(200).json({ success: true, data: { notifications: [], unreadCount: 0 } });
        }

        const notifications = await prisma.notification.findMany({
            where: {
                OR: [
                    { userId: userId },
                    { userId: null } // System-wide broadcasts
                ]
            },
            orderBy: { createdAt: 'desc' },
            take: 50 // Limit to latest 50
        });

        const unreadCount = notifications.filter((n: any) => !n.isRead).length;

        res.status(200).json({
            success: true,
            data: {
                notifications,
                unreadCount
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while fetching notifications',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// Mark a single notification or all as read
export const markAsRead = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user?.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const { notificationId } = req.body;

        if (notificationId) {
            // Mark specific
            await prisma.notification.updateMany({
                where: { 
                    id: notificationId,
                    OR: [{ userId }, { userId: null }]
                },
                data: { isRead: true }
            });
        } else {
            // Mark all as read for this user
            await prisma.notification.updateMany({
                where: { 
                    OR: [{ userId }, { userId: null }],
                    isRead: false
                },
                data: { isRead: true }
            });
        }

        res.status(200).json({
            success: true,
            message: 'Notifications marked as read'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while updating notifications',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// Create a notification (Admin only or Internal)
export const createNotification = async (req: Request, res: Response) => {
    try {
        const { title, message, type, link, userId } = req.body;

        if (!title || !message) {
            return res.status(400).json({ success: false, message: 'Title and message are required' });
        }

        const notification = await prisma.notification.create({
            data: {
                title,
                message,
                type: type || 'INFO',
                link,
                userId: userId || null // If null, it's a broadcast
            }
        });

        res.status(201).json({
            success: true,
            data: notification
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while creating notification',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

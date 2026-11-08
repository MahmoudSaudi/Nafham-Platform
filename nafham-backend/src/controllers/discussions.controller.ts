import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getDiscussions = async (req: Request, res: Response): Promise<void> => {
    try {
        const discussions = await prisma.discussion.findMany({
            orderBy: { updatedAt: 'desc' },
            include: {
                user: { select: { name: true, email: true, avatarUrl: true } },
                course: { select: { title: true } },
                _count: { select: { replies: true } }
            }
        });
        
        res.status(200).json({ success: true, data: discussions });
    } catch (error: any) {
        console.error("Error getting discussions:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const getDiscussionDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;
        const discussion = await prisma.discussion.findUnique({
            where: { id },
            include: {
                user: { select: { name: true, email: true, avatarUrl: true } },
                course: { select: { title: true } },
                replies: {
                    orderBy: { createdAt: 'asc' },
                    include: { user: { select: { name: true, role: true, avatarUrl: true } } }
                }
            }
        });
        
        if (!discussion) {
            res.status(404).json({ success: false, message: 'Discussion not found' });
            return;
        }

        res.status(200).json({ success: true, data: discussion });
    } catch (error: any) {
        console.error("Error getting discussion details:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const replyToDiscussion = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;
        const { content, userId } = req.body;

        const reply = await prisma.discussionReply.create({
            data: {
                content,
                discussionId: id,
                userId
            }
        });

        res.status(201).json({ success: true, data: reply, message: 'Reply added successfully' });
    } catch (error: any) {
        console.error("Error adding reply:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const toggleDiscussionLock = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;
        const discussion = await prisma.discussion.findUnique({ where: { id } });
        
        if (!discussion) {
            res.status(404).json({ success: false, message: 'Discussion not found' });
            return;
        }

        const updated = await prisma.discussion.update({
            where: { id },
            data: { isLocked: !discussion.isLocked }
        });

        res.status(200).json({ success: true, data: updated, message: 'Discussion lock status updated' });
    } catch (error: any) {
        console.error("Error toggling lock:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const deleteDiscussion = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;
        await prisma.discussion.delete({ where: { id } });
        res.status(200).json({ success: true, message: 'Discussion deleted successfully' });
    } catch (error: any) {
        console.error("Error deleting discussion:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

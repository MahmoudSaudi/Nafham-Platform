import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getAuditLogs = async (req: Request, res: Response): Promise<void> => {
    try {
        const { limit = '20', page = '1', action, entity, search } = req.query;
        const take = parseInt(limit as string, 10);
        const skip = (parseInt(page as string, 10) - 1) * take;

        const where: any = {};

        if (action) {
            where.action = { contains: action as string, mode: 'insensitive' };
        }
        if (entity) {
            where.entity = { equals: entity as string, mode: 'insensitive' };
        }
        if (search) {
            where.OR = [
                { action: { contains: search as string, mode: 'insensitive' } },
                { entity: { contains: search as string, mode: 'insensitive' } },
                { details: { contains: search as string, mode: 'insensitive' } },
                { user: { name: { contains: search as string, mode: 'insensitive' } } },
                { user: { email: { contains: search as string, mode: 'insensitive' } } },
            ];
        }

        const [logs, total] = await Promise.all([
            prisma.auditLog.findMany({
                where,
                take,
                skip,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: { select: { name: true, email: true, role: true } }
                }
            }),
            prisma.auditLog.count({ where })
        ]);

        res.status(200).json({ 
            success: true, 
            data: logs,
            pagination: {
                total,
                page: parseInt(page as string, 10),
                limit: take,
                totalPages: Math.ceil(total / take)
            }
        });
    } catch (error: any) {
        console.error("Error fetching audit logs:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Helper function to be used internally by other controllers
export const createAuditLog = async (userId: string, action: string, entity: string, entityId?: string, details?: string) => {
    try {
        await prisma.auditLog.create({
            data: {
                userId,
                action,
                entity,
                entityId,
                details
            }
        });
    } catch (error) {
        console.error("Error creating audit log:", error);
    }
};

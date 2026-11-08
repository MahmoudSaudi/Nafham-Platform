import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { createAuditLog } from './audit.controller';

// Get all transactions with user and course info
export const getTransactions = async (req: Request, res: Response): Promise<void> => {
    try {
        const transactions = await prisma.transaction.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                user: { select: { name: true, email: true } },
                course: { select: { title: true } }
            }
        });
        
        res.status(200).json({ success: true, data: transactions });
    } catch (error: any) {
        console.error("Error getting transactions:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Process a refund
export const refundTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;
        
        const transaction = await prisma.transaction.findUnique({ where: { id } });
        if (!transaction) {
            res.status(404).json({ success: false, message: 'Transaction not found' });
            return;
        }

        if (transaction.status === 'REFUNDED') {
            res.status(400).json({ success: false, message: 'Transaction is already refunded' });
            return;
        }

        // Logic to communicate with payment gateway to issue refund goes here
        // e.g. await stripe.refunds.create({ payment_intent: transaction.gatewayTransactionId });

        const updatedTx = await prisma.transaction.update({
            where: { id },
            data: { status: 'REFUNDED' },
            include: {
                user: { select: { name: true, email: true } },
                course: { select: { title: true } }
            }
        });

        // Audit Log
        const adminUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
        if (adminUser) {
            await createAuditLog(adminUser.id, 'REFUND_TRANSACTION', 'Transaction', id, `Refunded transaction of amount ${transaction.amount}`);
        }

        res.status(200).json({ success: true, data: updatedTx, message: 'Refund successful' });
    } catch (error: any) {
        console.error("Error refunding transaction:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get financials summary statistics
export const getFinancialStats = async (req: Request, res: Response): Promise<void> => {
    try {
        const successfulTransactions = await prisma.transaction.findMany({
            where: { status: 'SUCCESS' }
        });
        
        const totalRevenue = successfulTransactions.reduce((acc, tx) => acc + tx.amount, 0);
        
        const refundedTransactions = await prisma.transaction.findMany({
            where: { status: 'REFUNDED' }
        });
        const totalRefunds = refundedTransactions.reduce((acc, tx) => acc + tx.amount, 0);
        
        const thisMonthStart = new Date();
        thisMonthStart.setDate(1);
        thisMonthStart.setHours(0,0,0,0);
        
        const thisMonthTransactions = await prisma.transaction.findMany({
            where: { status: 'SUCCESS', createdAt: { gte: thisMonthStart } }
        });
        const monthlyRevenue = thisMonthTransactions.reduce((acc, tx) => acc + tx.amount, 0);
        
        const activeSubscriptions = 1450; // Mock stat, you can replace this with actual subscriptions calculation

        res.status(200).json({
            success: true,
            data: {
                totalRevenue,
                monthlyRevenue,
                totalRefunds,
                activeSubscriptions
            }
        });
    } catch (error: any) {
        console.error("Error getting financial stats:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Approve a pending transaction
export const approveTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;
        
        const transaction = await prisma.transaction.findUnique({ where: { id } });
        if (!transaction) {
            res.status(404).json({ success: false, message: 'Transaction not found' });
            return;
        }

        if (transaction.status === 'SUCCESS') {
            res.status(400).json({ success: false, message: 'Transaction is already approved' });
            return;
        }

        const updatedTx = await prisma.transaction.update({
            where: { id },
            data: { status: 'SUCCESS' },
            include: {
                user: { select: { name: true, email: true } },
                course: { select: { title: true } }
            }
        });

        // Enroll user in the course
        if (transaction.courseId) {
            await prisma.enrollment.upsert({
                where: {
                    userId_courseId: {
                        userId: transaction.userId,
                        courseId: transaction.courseId
                    }
                },
                update: {}, // Do nothing if already enrolled
                create: {
                    userId: transaction.userId,
                    courseId: transaction.courseId,
                    progress: 0
                }
            });
        }

        // Audit Log
        const adminUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
        if (adminUser) {
            await createAuditLog(adminUser.id, 'APPROVE_TRANSACTION', 'Transaction', id, `Approved payment and enrolled student`);
        }

        res.status(200).json({ success: true, data: updatedTx, message: 'Transaction approved and user enrolled' });
    } catch (error: any) {
        console.error("Error approving transaction:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Reject a pending transaction
export const rejectTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;
        
        const transaction = await prisma.transaction.findUnique({ where: { id } });
        if (!transaction) {
            res.status(404).json({ success: false, message: 'Transaction not found' });
            return;
        }

        if (transaction.status !== 'PENDING') {
            res.status(400).json({ success: false, message: 'Only pending transactions can be rejected' });
            return;
        }

        const updatedTx = await prisma.transaction.update({
            where: { id },
            data: { status: 'FAILED' },
            include: {
                user: { select: { name: true, email: true } },
                course: { select: { title: true } }
            }
        });

        // Audit Log
        const adminUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
        if (adminUser) {
            await createAuditLog(adminUser.id, 'REJECT_TRANSACTION', 'Transaction', id, `Rejected pending payment`);
        }

        res.status(200).json({ success: true, data: updatedTx, message: 'Transaction rejected' });
    } catch (error: any) {
        console.error("Error rejecting transaction:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

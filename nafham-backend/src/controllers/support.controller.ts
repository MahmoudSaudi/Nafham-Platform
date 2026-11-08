import { Request, Response } from 'express';
import prisma from '../utils/prisma';

// Get all support tickets
export const getTickets = async (req: Request, res: Response): Promise<void> => {
    try {
        const tickets = await prisma.supportTicket.findMany({
            orderBy: { updatedAt: 'desc' },
            include: {
                user: { select: { name: true, email: true, avatarUrl: true } },
                messages: {
                    orderBy: { createdAt: 'desc' },
                    take: 1
                }
            }
        });
        
        res.status(200).json({ success: true, data: tickets });
    } catch (error: any) {
        console.error("Error getting support tickets:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get single ticket details with messages
export const getTicketDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;
        const ticket = await prisma.supportTicket.findUnique({
            where: { id },
            include: {
                user: { 
                    select: { 
                        name: true, 
                        email: true, 
                        avatarUrl: true,
                        enrollments: {
                            include: {
                                course: {
                                    select: { id: true, title: true }
                                }
                            }
                        }
                    } 
                },
                messages: {
                    orderBy: { createdAt: 'asc' },
                    include: { sender: { select: { name: true, role: true, avatarUrl: true } } }
                }
            }
        });
        
        if (!ticket) {
            res.status(404).json({ success: false, message: 'Ticket not found' });
            return;
        }

        res.status(200).json({ success: true, data: ticket });
    } catch (error: any) {
        console.error("Error getting ticket details:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Reply to a ticket
export const replyToTicket = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;
        const { content, senderId } = req.body;

        const ticket = await prisma.supportTicket.findUnique({ where: { id } });
        if (!ticket) {
            res.status(404).json({ success: false, message: 'Ticket not found' });
            return;
        }

        const message = await prisma.ticketMessage.create({
            data: {
                content,
                ticketId: id,
                senderId,
                isFromAdmin: true
            }
        });

        // Update ticket status to IN_PROGRESS if it was OPEN
        if (ticket.status === 'OPEN') {
            await prisma.supportTicket.update({
                where: { id },
                data: { status: 'IN_PROGRESS' }
            });
        }

        res.status(201).json({ success: true, data: message, message: 'Reply sent successfully' });
    } catch (error: any) {
        console.error("Error replying to ticket:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update ticket status
export const updateTicketStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;
        const { status } = req.body; // OPEN, IN_PROGRESS, CLOSED

        const ticket = await prisma.supportTicket.update({
            where: { id },
            data: { status }
        });

        res.status(200).json({ success: true, data: ticket, message: 'Status updated' });
    } catch (error: any) {
        console.error("Error updating ticket status:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

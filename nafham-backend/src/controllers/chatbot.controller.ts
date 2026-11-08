import { Request, Response } from 'express';
import { aiService } from '../services/aiService';

// Test Connection Endpoint
export const testConnection = async (req: Request, res: Response) => {
    try {
        const { apiKey } = req.body;
        
        const result = await aiService.testConnection(apiKey);
        
        if (result.success) {
            res.status(200).json({ success: true, message: result.message, data: { message: result.message } });
        } else {
            res.status(400).json({ success: false, message: result.message, data: { message: result.message } });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Internal server error while testing connection',
            error: error.message
        });
    }
};

import prisma from '../utils/prisma';

export const handleChatMessage = async (req: Request, res: Response) => {
    try {
        const { messages, maxTokens, userId } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ success: false, message: "Invalid messages array" });
        }

        const botReply = await aiService.processChat(messages, maxTokens || 150);

        // Intent Detection: Check if AI decided to transfer to support
        if (botReply.includes('[TRANSFER_TO_SUPPORT]')) {
            let ticketId = null;

            // If user is logged in, create a support ticket automatically
            if (userId) {
                const ticket = await prisma.supportTicket.create({
                    data: {
                        subject: "طلب مساعدة من الشات الآلي",
                        userId: userId,
                        status: "OPEN",
                        priority: "HIGH",
                        aiChatHistory: messages, // Save the entire AI chat context
                    }
                });
                ticketId = ticket.id;
            }

            return res.status(200).json({
                success: true,
                data: {
                    text: "نعتذر عن عدم تمكننا من حل المشكلة آلياً. جاري تحويلك الآن لأحد موظفي الدعم الفني لمساعدتك مباشرة...",
                    requiresLiveAgent: true,
                    ticketId: ticketId
                }
            });
        }

        res.status(200).json({
            success: true,
            data: {
                text: botReply,
                requiresLiveAgent: false
            }
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Error processing chat message'
        });
    }
};

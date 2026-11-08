import { Router } from 'express';
import { testConnection, handleChatMessage } from '../controllers/chatbot.controller';

const router = Router();

// Endpoint for admin to test connection
router.post('/test-connection', testConnection);

// Endpoint for frontend widget to send a message
router.post('/message', handleChatMessage);

export default router;

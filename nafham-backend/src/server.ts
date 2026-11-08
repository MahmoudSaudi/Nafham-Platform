import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { createServer } from 'http';
import { initSocket } from './utils/socket';

const PORT = process.env.PORT || 5000;

// Create HTTP Server
const httpServer = createServer(app);

// Initialize Socket.io
initSocket(httpServer);

httpServer.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`🩺 Health check: http://localhost:${PORT}/api/health`);
});
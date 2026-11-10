import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { createServer } from 'http';
import { initSocket } from './utils/socket';
import prisma from './utils/prisma';

const PORT = process.env.PORT || 5000;

// Create HTTP Server
const httpServer = createServer(app);

// Initialize Socket.io
initSocket(httpServer);

httpServer.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`🩺 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🩺 Liveness:    http://localhost:${PORT}/health/live`);
    console.log(`🩺 Readiness:   http://localhost:${PORT}/health/ready`);
});

// ===== Graceful shutdown =====
let shuttingDown = false;

const shutdown = async (signal: string) => {
    if (shuttingDown) return;
    shuttingDown = true;
    console.log(`[${signal}] Shutting down gracefully...`);

    // Force exit if close hangs (matters for K8s)
    const force = setTimeout(() => {
        console.error('[shutdown] Forced exit after timeout');
        process.exit(1);
    }, 10_000);
    force.unref();

    httpServer.close(async () => {
        try {
            await prisma.$disconnect();
            console.log('[shutdown] Closed cleanly');
            process.exit(0);
        } catch (err) {
            console.error('[shutdown] Error while closing:', err);
            process.exit(1);
        }
    });
};

(['SIGTERM', 'SIGINT'] as const).forEach((sig) =>
    process.on(sig, () => shutdown(sig))
);

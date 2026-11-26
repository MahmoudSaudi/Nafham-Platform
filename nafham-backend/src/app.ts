import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import prisma from './utils/prisma';

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', process.env.CLIENT_URL];
        if (allowedOrigins.indexOf(origin) === -1 && !allowedOrigins.includes(origin)) {
            var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
}));
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));
app.use(morgan('dev'));

// Routes
import authRoutes from './routes/auth.routes';
import coursesRoutes from './routes/courses.routes';
import uploadRoutes from './routes/upload.routes';
import pathsRoutes from './routes/paths.routes';
import dashboardRoutes from './routes/dashboard.routes';
import usersRoutes from './routes/users.routes';
import adminsRoutes from './routes/admins.routes';
import financialsRoutes from './routes/financials.routes';
import certificatesRoutes from './routes/certificates.routes';
import supportRoutes from './routes/support.routes';
import discussionsRoutes from './routes/discussions.routes';
import marketingRoutes from './routes/marketing.routes';
import settingsRoutes from './routes/settingsRoutes';
import chatbotRoutes from './routes/chatbot.routes';
import notificationsRoutes from './routes/notifications.routes';
import webhooksRoutes from './routes/webhooks.routes';
import auditRoutes from './routes/audit.routes';
import path from 'path';

app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/paths', pathsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/admins', adminsRoutes);
app.use('/api/financials', financialsRoutes);
app.use('/api/certificates', certificatesRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/discussions', discussionsRoutes);
app.use('/api/marketing', marketingRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/webhooks', webhooksRoutes);
app.use('/api/audit', auditRoutes);

// Serve static files (like uploaded images)
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Basic Route
app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Nafham Backend API is running successfully!',
        timestamp: new Date().toISOString()
    });
});

// Liveness probe: is the process alive?
app.get('/health/live', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Readiness probe: can we reach the DB?
app.get('/health/ready', async (_req: Request, res: Response) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.status(200).json({ status: 'ready', db: 'up' });
    } catch {
        res.status(503).json({ status: 'not_ready', db: 'down' });
    }
});


// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

export default app;

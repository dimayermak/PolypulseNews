import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import marketsRouter from './routes/markets.routes';
import newsRouter from './routes/news.routes';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Health check
app.get('/health', (req: Request, res: Response) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'PolypulseNews API'
    });
});

// API Routes
app.use('/api/markets', marketsRouter);
app.use('/api/news', newsRouter);

// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err: any, req: Request, res: Response, next: any) => {
    console.error('Server error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message
    });
});

// Start server
app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log(`🚀 PolypulseNews API Server`);
    console.log(`📡 Running on http://localhost:${PORT}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/health`);
    console.log(`📊 Markets API: http://localhost:${PORT}/api/markets`);
    console.log(`📰 News API: http://localhost:${PORT}/api/news`);
    console.log('='.repeat(50));
});

export default app;

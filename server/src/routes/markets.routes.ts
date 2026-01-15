import { Router, Request, Response } from 'express';
import { getAllMarkets, getTrendingMarkets, getMarketsByCategory, searchMarkets, transformPolymarketMarket, transformKalshiMarket } from '../services/aggregation.service';
import { getPolymarketMarketBySlug } from '../services/polymarket.service';
import { getKalshiMarketByTicker } from '../services/kalshi.service';

const router = Router();

// GET /api/markets - Get all markets with optional filters
router.get('/', async (req: Request, res: Response) => {
    try {
        const { category, search, limit = '1000', source } = req.query;
        const limitNum = parseInt(limit as string, 10);

        let markets;

        if (search) {
            markets = await searchMarkets(search as string, limitNum);
        } else if (category && category !== 'all') {
            markets = await getMarketsByCategory(category as string, limitNum);
        } else {
            markets = await getAllMarkets(limitNum);
        }

        // Filter by source if specified
        if (source && source !== 'all') {
            markets = markets.filter(m => m.platform === source);
        }

        res.json({
            markets,
            total: markets.length,
            page: 1,
            limit: limitNum,
        });
    } catch (error: any) {
        console.error('Error in GET /markets:', error);
        res.status(500).json({ error: 'Failed to fetch markets', message: error.message });
    }
});

// GET /api/markets/trending - Get trending markets by volume
router.get('/trending', async (req: Request, res: Response) => {
    try {
        const { limit = '50' } = req.query;
        const limitNum = parseInt(limit as string, 10);

        const markets = await getTrendingMarkets(limitNum);

        res.json({
            markets,
            timestamp: new Date().toISOString(),
        });
    } catch (error: any) {
        console.error('Error in GET /markets/trending:', error);
        res.status(500).json({ error: 'Failed to fetch trending markets', message: error.message });
    }
});

// GET /api/markets/:id - Get single market by ID/slug
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Try Polymarket first
        let marketData = await getPolymarketMarketBySlug(id);
        if (marketData) {
            return res.json(transformPolymarketMarket(marketData));
        }

        // If not found, try Kalshi
        marketData = await getKalshiMarketByTicker(id);
        if (marketData) {
            return res.json(transformKalshiMarket(marketData));
        }

        if (!marketData) {
            return res.status(404).json({ error: 'Market not found' });
        }
    } catch (error: any) {
        console.error(`Error in GET /markets/${req.params.id}:`, error);
        res.status(500).json({ error: 'Failed to fetch market', message: error.message });
    }
});

export default router;

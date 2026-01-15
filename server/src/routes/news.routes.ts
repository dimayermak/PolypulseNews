import { Router, Request, Response } from 'express';
import { getNewsForMarket, getTrendingNews } from '../services/news.service';
import { getPolymarketMarketBySlug } from '../services/polymarket.service';
import { getKalshiMarketByTicker } from '../services/kalshi.service';

const router = Router();

// GET /api/news/trending - Get trending news
router.get('/trending', async (req: Request, res: Response) => {
    try {
        const news = await getTrendingNews();

        res.json({
            news,
            marketSlug: 'trending',
            timestamp: new Date().toISOString(),
        });
    } catch (error: any) {
        console.error('Error in GET /news/trending:', error);
        res.status(500).json({ error: 'Failed to fetch trending news', message: error.message });
    }
});

// GET /api/news/:marketSlug - Get news for specific market
router.get('/:marketSlug', async (req: Request, res: Response) => {
    try {
        const { marketSlug } = req.params;

        // Try to get market details to extract better keywords
        let market = await getPolymarketMarketBySlug(marketSlug);

        if (!market) {
            market = await getKalshiMarketByTicker(marketSlug);
        }

        let news;
        if (market) {
            const title = market.question || market.title || marketSlug;
            news = await getNewsForMarket(title);
        } else {
            // Fallback: use slug as query
            news = await getNewsForMarket(marketSlug.replace(/-/g, ' '));
        }

        res.json({
            news,
            marketSlug,
            timestamp: new Date().toISOString(),
        });
    } catch (error: any) {
        console.error(`Error in GET /news/${req.params.marketSlug}:`, error);
        res.status(500).json({ error: 'Failed to fetch news', message: error.message });
    }
});

export default router;

import axios from 'axios';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 300 }); // 5 minute cache

const POLYMARKET_API = 'https://gamma-api.polymarket.com';

export interface PolymarketMarket {
    id: string;
    question: string;
    description: string;
    outcomes: string[];
    outcomePrices: string[];
    volume: string;
    active: boolean;
    closed: boolean;
    endDate: string;
    tags?: string[];
    slug?: string;
}

export async function getPolymarketMarkets(limit: number = 500): Promise<any[]> {
    const cacheKey = `polymarket_markets_${limit}`;
    const cached = cache.get(cacheKey);

    if (cached) {
        console.log('Returning cached Polymarket markets');
        return cached as any[];
    }

    try {
        console.log('Fetching from Polymarket API...');
        const response = await axios.get(`${POLYMARKET_API}/markets`, {
            params: {
                limit,
                active: true,
                closed: false,
                order: 'volume',
                ascending: false,
            },
            timeout: 10000,
        });

        const markets = response.data;
        cache.set(cacheKey, markets);
        console.log(`Fetched ${markets.length} markets from Polymarket`);
        return markets;
    } catch (error: any) {
        console.error('Error fetching Polymarket markets:', error.message);
        return [];
    }
}

export async function getPolymarketTrending(limit: number = 20): Promise<any[]> {
    const cacheKey = `polymarket_trending_events_${limit}`;
    const cached = cache.get(cacheKey);

    if (cached) {
        return cached as any[];
    }

    try {
        console.log('Fetching trending events from Polymarket...');
        const response = await axios.get(`${POLYMARKET_API}/events`, {
            params: {
                limit,
                active: true,
                closed: false,
                order: 'volume',
                ascending: false,
            },
            timeout: 10000,
        });

        const events = response.data;
        cache.set(cacheKey, events);
        return events;
    } catch (error: any) {
        console.error('Error fetching Polymarket trending events:', error.message);
        return [];
    }
}

export async function getPolymarketEvents(limit: number = 50): Promise<any[]> {
    const cacheKey = `polymarket_events_${limit}`;
    const cached = cache.get(cacheKey);

    if (cached) return cached as any[];

    try {
        const response = await axios.get(`${POLYMARKET_API}/events`, {
            params: { limit, active: true, closed: false, order: 'volume', ascending: false }
        });
        cache.set(cacheKey, response.data);
        return response.data;
    } catch (error: any) {
        return [];
    }
}

export async function getPolymarketMarketBySlug(slug: string): Promise<any | null> {
    const cacheKey = `polymarket_market_${slug}`;
    const cached = cache.get(cacheKey);

    if (cached) {
        return cached;
    }

    try {
        console.log(`Fetching Polymarket market: ${slug}`);
        const response = await axios.get(`${POLYMARKET_API}/markets/slug/${slug}`, {
            timeout: 10000,
        });

        const market = response.data;
        cache.set(cacheKey, market);
        return market;
    } catch (error: any) {
        console.error(`Error fetching Polymarket market ${slug}:`, error.message);
        return null;
    }
}

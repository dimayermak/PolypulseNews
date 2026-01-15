import axios from 'axios';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 300 }); // 5 minute cache

const KALSHI_API = 'https://api.elections.kalshi.com/trade-api/v2';

export async function getKalshiMarkets(limit: number = 500): Promise<any[]> {
    const cacheKey = `kalshi_markets_${limit}`;
    const cached = cache.get(cacheKey);

    if (cached) {
        console.log('Returning cached Kalshi markets');
        return cached as any[];
    }

    try {
        console.log('Fetching from Kalshi API...');
        const response = await axios.get(`${KALSHI_API}/markets`, {
            params: {
                limit,
                status: 'open',
            },
            timeout: 10000,
        });

        const markets = response.data.markets || [];
        cache.set(cacheKey, markets);
        console.log(`Fetched ${markets.length} markets from Kalshi`);
        return markets;
    } catch (error: any) {
        console.error('Error fetching Kalshi markets:', error.message);
        return [];
    }
}

export async function getKalshiTrending(limit: number = 20): Promise<any[]> {
    const cacheKey = `kalshi_trending_${limit}`;
    const cached = cache.get(cacheKey);

    if (cached) {
        return cached as any[];
    }

    try {
        console.log('Fetching trending markets from Kalshi...');
        const response = await axios.get(`${KALSHI_API}/markets`, {
            params: {
                limit,
                status: 'open',
            },
            timeout: 10000,
        });

        const markets = response.data.markets || [];
        // Sort by volume if available
        const sorted = markets.sort((a: any, b: any) => {
            const volA = a.volume || 0;
            const volB = b.volume || 0;
            return volB - volA;
        });

        cache.set(cacheKey, sorted);
        return sorted;
    } catch (error: any) {
        console.error('Error fetching Kalshi trending:', error.message);
        return [];
    }
}

export async function getKalshiMarketByTicker(ticker: string): Promise<any | null> {
    const cacheKey = `kalshi_market_${ticker}`;
    const cached = cache.get(cacheKey);

    if (cached) {
        return cached;
    }

    try {
        console.log(`Fetching Kalshi market: ${ticker}`);
        const response = await axios.get(`${KALSHI_API}/markets/${ticker}`, {
            timeout: 10000,
        });

        const market = response.data.market;
        cache.set(cacheKey, market);
        return market;
    } catch (error: any) {
        console.error(`Error fetching Kalshi market ${ticker}:`, error.message);
        return null;
    }
}

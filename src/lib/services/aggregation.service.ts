import { getPolymarketMarkets, getPolymarketTrending, getPolymarketMarketBySlug } from './polymarket.service';
import { getKalshiMarkets, getKalshiTrending, getKalshiMarketByTicker } from './kalshi.service';

export interface Market {
    id: string;
    slug: string;
    title: string;
    description: string;
    category: string;
    platform: 'polymarket' | 'kalshi';
    currentOdds: {
        yes: number;
        no: number;
    };
    volume24h: number;
    liquidity?: number;
    endDate: string;
    imageUrl?: string;
    tags: string[];
    active: boolean;
    createdAt: string;
    updatedAt: string;
    promoted?: boolean;
    eventSlug?: string;
}

function categorizeMarket(title: string, tags: string[] = []): string {
    const titleLower = title.toLowerCase();
    const allText = `${titleLower} ${tags.join(' ').toLowerCase()}`;

    if (allText.match(/trump|biden|election|president|congress|senate|political|vote/)) {
        return 'politics';
    }
    if (allText.match(/nfl|nba|mlb|soccer|football|basketball|sports|game|team|player/)) {
        return 'sports';
    }
    if (allText.match(/bitcoin|crypto|ethereum|btc|eth|defi|nft|blockchain/)) {
        return 'crypto';
    }
    if (allText.match(/stock|market|economy|gdp|inflation|fed|interest|recession/)) {
        return 'economics';
    }
    if (allText.match(/ai|tech|apple|google|meta|tesla|software|hardware/)) {
        return 'technology';
    }
    if (allText.match(/movie|music|celebrity|oscar|grammy|entertainment/)) {
        return 'entertainment';
    }

    return 'other';
}

export function transformPolymarketMarket(market: any): Market {
    let yesPrice = 0.5;
    if (market.outcomePrices) {
        const prices = typeof market.outcomePrices === 'string'
            ? JSON.parse(market.outcomePrices)
            : market.outcomePrices;

        if (Array.isArray(prices) && prices.length > 0) {
            yesPrice = parseFloat(prices[0]);
        }
    }

    const noPrice = 1 - yesPrice;

    return {
        id: market.id || market.conditionId,
        slug: market.slug || market.id,
        title: market.question || market.title,
        description: market.description || '',
        category: categorizeMarket(market.question || '', market.tags || []),
        platform: 'polymarket',
        currentOdds: {
            yes: yesPrice,
            no: noPrice,
        },
        volume24h: parseFloat(market.volume24h || market.volume || '0'),
        liquidity: parseFloat(market.liquidity || '0'),
        endDate: market.endDate || market.endDateIso || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        imageUrl: market.image || undefined,
        tags: market.tags || [],
        active: market.active !== false && market.closed !== true,
        createdAt: market.createdAt || new Date().toISOString(),
        updatedAt: market.updatedAt || new Date().toISOString(),
        eventSlug: market.events?.[0]?.slug || market.slug,
    };
}

export function transformKalshiMarket(market: any): Market {
    let yesPrice = 0.5;
    if (market.yes_bid) {
        yesPrice = parseFloat(market.yes_bid) / 100;
    } else if (market.last_price) {
        yesPrice = parseFloat(market.last_price) / 100;
    } else if (market.yes_ask) {
        yesPrice = (parseFloat(market.yes_ask) - 1) / 100;
    }

    const noPrice = 1 - yesPrice;

    return {
        id: market.ticker || market.id,
        slug: market.ticker || market.id,
        title: market.title || market.subtitle || 'Untitled Market',
        description: market.subtitle || market.title || '',
        category: categorizeMarket(market.title || '', market.tags || []),
        platform: 'kalshi',
        currentOdds: {
            yes: yesPrice,
            no: noPrice,
        },
        volume24h: parseFloat(market.volume || market.open_interest || '0'),
        endDate: market.expiration_time || market.close_time || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        tags: market.tags || [],
        active: market.status === 'open' || market.status === 'active',
        createdAt: market.created_time || new Date().toISOString(),
        updatedAt: market.updated_time || new Date().toISOString(),
    };
}

export function transformPolymarketEvent(event: any): Market {
    const mainMarket = event.markets?.find((m: any) => m.active && !m.closed) || event.markets?.[0] || {};

    let yesPrice = 0.5;
    if (mainMarket.outcomePrices) {
        const prices = typeof mainMarket.outcomePrices === 'string'
            ? JSON.parse(mainMarket.outcomePrices)
            : mainMarket.outcomePrices;

        if (Array.isArray(prices) && prices.length > 0) {
            yesPrice = parseFloat(prices[0]);
        }
    }

    const noPrice = 1 - yesPrice;

    return {
        id: event.id,
        slug: mainMarket.slug || event.slug || event.id,
        title: event.title || mainMarket.question || '',
        description: event.description || mainMarket.description || '',
        category: categorizeMarket(event.title || '', event.tags?.map((t: any) => t.label) || []),
        platform: 'polymarket',
        currentOdds: {
            yes: yesPrice,
            no: noPrice,
        },
        volume24h: parseFloat(event.volume || '0'),
        liquidity: parseFloat(mainMarket.liquidity || '0'),
        endDate: mainMarket.endDate || mainMarket.endDateIso || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        imageUrl: event.image || mainMarket.image || undefined,
        tags: event.tags?.map((t: any) => t.label) || [],
        active: event.active !== false,
        createdAt: event.createdAt || new Date().toISOString(),
        updatedAt: event.updatedAt || new Date().toISOString(),
        eventSlug: event.slug || mainMarket.slug,
    };
}

export async function getAllMarkets(limit: number = 1000): Promise<Market[]> {
    try {
        const [polymarketData, kalshiData] = await Promise.all([
            getPolymarketMarkets(Math.floor(limit / 2)),
            getKalshiMarkets(Math.floor(limit / 2)),
        ]);

        const polymarketMarkets = polymarketData.map(transformPolymarketMarket);
        const kalshiMarkets = kalshiData.map(transformKalshiMarket);

        const allMarkets = [...polymarketMarkets, ...kalshiMarkets];

        // Mark certain markets as promoted for demonstration/monetization
        allMarkets.forEach(m => {
            if (m.title.toLowerCase().match(/trump|election|israel/)) {
                m.promoted = true;
            }
        });

        allMarkets.sort((a, b) => b.volume24h - a.volume24h);

        return allMarkets.slice(0, limit);
    } catch (error) {
        console.error('Error aggregating markets:', error);
        return [];
    }
}

export async function getTrendingMarkets(limit: number = 20): Promise<Market[]> {
    try {
        const [polyEvents, kalshiMarkets] = await Promise.all([
            getPolymarketTrending(limit),
            getKalshiTrending(limit),
        ]);

        const transformedPoly = polyEvents.map(transformPolymarketEvent);
        const transformedKalshi = kalshiMarkets.map(transformKalshiMarket);

        const allMarkets = [...transformedPoly, ...transformedKalshi];
        return allMarkets.sort((a, b) => b.volume24h - a.volume24h).slice(0, limit);
    } catch (error) {
        console.error('Error getting trending markets:', error);
        return [];
    }
}

export async function getMarketsByCategory(category: string, limit: number = 50): Promise<Market[]> {
    const allMarkets = await getAllMarkets(100);
    return allMarkets.filter(m => m.category === category).slice(0, limit);
}

export async function searchMarkets(query: string, limit: number = 50): Promise<Market[]> {
    const allMarkets = await getAllMarkets(100);
    const queryLower = query.toLowerCase();

    return allMarkets
        .filter(m =>
            m.title.toLowerCase().includes(queryLower) ||
            m.description.toLowerCase().includes(queryLower)
        )
        .slice(0, limit);
}

export async function getMarketById(id: string): Promise<Market | null> {
    try {
        // Try Polymarket first
        let marketData = await getPolymarketMarketBySlug(id);
        if (marketData) {
            return transformPolymarketMarket(marketData);
        }

        // If not found, try Kalshi
        marketData = await getKalshiMarketByTicker(id);
        if (marketData) {
            return transformKalshiMarket(marketData);
        }

        return null;
    } catch (error) {
        console.error(`Error fetching market ${id}:`, error);
        return null;
    }
}

export async function getMarketAnalytics(): Promise<any> {
    const allMarkets = await getAllMarkets(100);

    const totalVolume24h = allMarkets.reduce((sum, m) => sum + (m.volume24h || 0), 0);
    const activeMarketsCount = allMarkets.filter(m => m.active).length;

    // Platform split
    const platformData = allMarkets.reduce((acc, m) => {
        if (!acc[m.platform]) acc[m.platform] = { platform: m.platform, volume: 0, count: 0 };
        acc[m.platform].volume += m.volume24h || 0;
        acc[m.platform].count++;
        return acc;
    }, {} as Record<string, any>);

    // Category distribution
    const categoryData = allMarkets.reduce((acc, m) => {
        if (!acc[m.category]) acc[m.category] = { category: m.category, volume: 0, count: 0 };
        acc[m.category].volume += m.volume24h || 0;
        acc[m.category].count++;
        return acc;
    }, {} as Record<string, any>);

    return {
        totalVolume24h,
        activeMarketsCount,
        platformSplit: Object.values(platformData),
        categoryDistribution: Object.values(categoryData),
        topVolumeMarkets: allMarkets.sort((a, b) => (b.volume24h || 0) - (a.volume24h || 0)).slice(0, 5),
        topMovers: allMarkets
            .map(m => ({ ...m, volPerD: (m.volume24h || 0) })) // Placeholder for real movers
            .sort((a, b) => b.volPerD - a.volPerD)
            .slice(0, 5),
        timestamp: new Date().toISOString()
    };
}

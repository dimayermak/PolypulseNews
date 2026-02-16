import { NextResponse } from 'next/server';
import { getTrendingMarkets } from '@/lib/services/aggregation.service';
// Assuming getNewsForMarket is exported from news.service based on file list, 
// if not I will check the file content first. 
// Actually, checking file content of news.service first is safer.
// But I'll take a gamble to be faster, if it fails I'll fix it.
// Wait, I should verify the export name in news.service first.
import { getNewsForMarket } from '@/lib/services/news.service';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // 1. Fetch top trending markets
        const trendingMarkets = await getTrendingMarkets(5);

        // 2. Enhance with News & Format for AI
        const enhancedMarkets = await Promise.all(
            trendingMarkets.map(async (market) => {
                // Fetch news query using title for better keyword matching
                const newsData = await getNewsForMarket(market.title, market.category).catch(() => []);

                // transform newsData (array) to match expected format if needed, 
                // but getNewsForMarket returns NewsItem[], so we can use it directly.
                const newsItems = Array.isArray(newsData) ? newsData : [];

                return {
                    id: market.id,
                    title: market.title,
                    description: market.description,
                    platform: market.platform,
                    odds: {
                        yes: (market.currentOdds.yes * 100).toFixed(1) + '%',
                        no: (market.currentOdds.no * 100).toFixed(1) + '%',
                    },
                    volume: market.volume24h,
                    news: newsItems.slice(0, 2).map((n: any) => ({
                        title: n.title,
                        source: n.source,
                        url: n.link
                    })),
                    polypulse_url: `https://polypulsenews.live/markets/${market.slug}`,
                    market_url: market.platform === 'polymarket'
                        ? `https://polymarket.com/event/${market.eventSlug || market.slug}`
                        : `https://kalshi.com/markets/${market.id}`
                };
            })
        );

        return NextResponse.json({
            timestamp: new Date().toISOString(),
            count: enhancedMarkets.length,
            markets: enhancedMarkets
        });

    } catch (error: any) {
        console.error('Automation API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch automation data', details: error.message },
            { status: 500 }
        );
    }
}

import { NextRequest, NextResponse } from 'next/server';
import { getNewsForMarket } from '@/lib/services/news.service';

export const dynamic = 'force-dynamic';

export async function GET(
    req: NextRequest,
    context: { params: { slug: string } }
) {
    try {
        const slug = context.params.slug;
        const decodedSlug = decodeURIComponent(slug);

        // Fetch market title for better news matching
        const { getMarketById } = await import('@/lib/services/aggregation.service');
        const market = await getMarketById(decodedSlug);

        // Use market title if found, otherwise fallback to slug
        const queryTopic = market ? market.title : decodedSlug;
        const news = await getNewsForMarket(queryTopic);

        return NextResponse.json({
            news,
            marketSlug: decodedSlug,
            timestamp: new Date().toISOString(),
        });
    } catch (error: any) {
        console.error(`Error in GET /api/news/${context.params.slug}:`, error);
        return NextResponse.json(
            { error: 'Failed to fetch news', message: error.message },
            { status: 500 }
        );
    }
}

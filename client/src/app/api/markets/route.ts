import { NextRequest, NextResponse } from 'next/server';
import { getAllMarkets, getTrendingMarkets, getMarketsByCategory, searchMarkets } from '@/lib/services/aggregation.service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const category = searchParams.get('category');
        const search = searchParams.get('search');
        const source = searchParams.get('source');
        const limit = searchParams.get('limit') || '1000';
        const limitNum = parseInt(limit, 10);

        // Check for trending request special case or if trending is a category
        const isTrending = searchParams.get('trending') === 'true' || category === 'trending';

        let markets;

        if (isTrending) {
            markets = await getTrendingMarkets(limitNum);
        } else if (search) {
            markets = await searchMarkets(search, limitNum);
        } else if (category && category !== 'all') {
            markets = await getMarketsByCategory(category, limitNum);
        } else {
            markets = await getAllMarkets(limitNum);
        }

        // Filter by source if specified
        if (source && source !== 'all') {
            markets = markets.filter(m => m.platform === source);
        }

        return NextResponse.json({
            markets,
            total: markets.length,
            page: 1,
            limit: limitNum,
        });
    } catch (error: any) {
        console.error('Error in GET /api/markets:', error);
        return NextResponse.json(
            { error: 'Failed to fetch markets', message: error.message },
            { status: 500 }
        );
    }
}

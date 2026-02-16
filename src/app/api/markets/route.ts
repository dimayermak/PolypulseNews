import { NextRequest, NextResponse } from 'next/server';
import { getAllMarkets, getTrendingMarkets, getMarketsByCategory, searchMarkets } from '@/lib/services/aggregation.service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const category = searchParams.get('category');
        const search = searchParams.get('search');
        const source = searchParams.get('source');
        const limit = searchParams.get('limit') || '48';
        const offset = searchParams.get('offset') || '0';
        const limitNum = parseInt(limit, 10);
        const offsetNum = parseInt(offset, 10);

        // Fetch a larger pool of markets to allow for sorting and pagination
        // This simulates a full database fetch for the top X relevant markets
        const FETCH_LIMIT = 1000;

        // Check for trending request special case or if trending is a category
        const isTrending = searchParams.get('trending') === 'true' || category === 'trending';

        let allFetchedMarkets = [];

        if (isTrending) {
            allFetchedMarkets = await getTrendingMarkets(FETCH_LIMIT);
        } else if (search) {
            allFetchedMarkets = await searchMarkets(search, FETCH_LIMIT);
        } else if (category && category !== 'all') {
            allFetchedMarkets = await getMarketsByCategory(category, FETCH_LIMIT);
        } else {
            allFetchedMarkets = await getAllMarkets(FETCH_LIMIT);
        }

        // Filter by source if specified
        if (source && source !== 'all') {
            allFetchedMarkets = allFetchedMarkets.filter(m => m.platform === source);
        }

        const total = allFetchedMarkets.length;
        const paginatedMarkets = allFetchedMarkets.slice(offsetNum, offsetNum + limitNum);

        return NextResponse.json({
            markets: paginatedMarkets,
            total: total,
            page: Math.floor(offsetNum / limitNum) + 1,
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

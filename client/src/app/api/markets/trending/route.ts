import { NextRequest, NextResponse } from 'next/server';
import { getTrendingMarkets } from '@/lib/services/aggregation.service';

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const limit = searchParams.get('limit') || '50';
        const limitNum = parseInt(limit, 10);

        const markets = await getTrendingMarkets(limitNum);

        return NextResponse.json({
            markets,
            timestamp: new Date().toISOString(),
        });
    } catch (error: any) {
        console.error('Error in GET /api/markets/trending:', error);
        return NextResponse.json(
            { error: 'Failed to fetch trending markets', message: error.message },
            { status: 500 }
        );
    }
}

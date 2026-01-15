import { NextResponse } from 'next/server';
import { getMarketAnalytics } from '@/lib/services/aggregation.service';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const stats = await getMarketAnalytics();
        return NextResponse.json(stats);
    } catch (error) {
        console.error('Error in analytics route:', error);
        return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
    }
}

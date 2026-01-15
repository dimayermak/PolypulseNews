import { NextRequest, NextResponse } from 'next/server';
import { getMarketById } from '@/lib/services/aggregation.service';

export const dynamic = 'force-dynamic';

export async function GET(
    req: NextRequest,
    context: { params: { id: string } }
) {
    try {
        const id = context.params.id;
        const market = await getMarketById(id);

        if (!market) {
            return NextResponse.json({ error: 'Market not found' }, { status: 404 });
        }

        return NextResponse.json(market);
    } catch (error: any) {
        console.error(`Error in GET /api/markets/${context.params.id}:`, error);
        return NextResponse.json(
            { error: 'Failed to fetch market', message: error.message },
            { status: 500 }
        );
    }
}

import { NextRequest, NextResponse } from 'next/server';
import { getMarketById } from '@/lib/services/aggregation.service';

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const market = await getMarketById(id);

        if (!market) {
            return NextResponse.json({ error: 'Market not found' }, { status: 404 });
        }

        return NextResponse.json(market);
    } catch (error: any) {
        console.error(`Error in GET /api/markets/${params.id}:`, error);
        return NextResponse.json(
            { error: 'Failed to fetch market', message: error.message },
            { status: 500 }
        );
    }
}

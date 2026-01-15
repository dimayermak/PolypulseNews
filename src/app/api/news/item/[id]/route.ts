import { NextRequest, NextResponse } from 'next/server';
import { getNewsItemById } from '@/lib/services/news.service';

export const dynamic = 'force-dynamic';

export async function GET(
    req: NextRequest,
    context: { params: { id: string } }
) {
    try {
        const id = context.params.id;
        const newsItem = await getNewsItemById(id);

        if (!newsItem) {
            return NextResponse.json(
                { error: 'News article not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(newsItem);
    } catch (error: any) {
        console.error(`Error in GET /api/news/item/${context.params.id}:`, error);
        return NextResponse.json(
            { error: 'Failed to fetch news item', message: error.message },
            { status: 500 }
        );
    }
}

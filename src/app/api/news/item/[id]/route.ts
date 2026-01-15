import { NextRequest, NextResponse } from 'next/server';
import { getTrendingNews } from '@/lib/services/news.service';

export const dynamic = 'force-dynamic';

export async function GET(
    req: NextRequest,
    context: { params: { id: string } }
) {
    try {
        const id = context.params.id;

        // We optimize by fetching trending news and finding the item by ID
        // In a real production app, we would cache individual items or use a DB
        const newsItems = await getTrendingNews('all');
        const newsItem = newsItems.find((item: any) => item.id === id);

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

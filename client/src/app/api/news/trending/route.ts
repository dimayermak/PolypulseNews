import { NextRequest, NextResponse } from 'next/server';
import { getTrendingNews } from '@/lib/services/news.service';

export async function GET(req: NextRequest) {
    try {
        const news = await getTrendingNews();

        return NextResponse.json({
            news,
            timestamp: new Date().toISOString(),
        });
    } catch (error: any) {
        console.error('Error in GET /api/news/trending:', error);
        return NextResponse.json(
            { error: 'Failed to fetch trending news', message: error.message },
            { status: 500 }
        );
    }
}

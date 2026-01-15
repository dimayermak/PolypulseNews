import { NextRequest, NextResponse } from 'next/server';
import { getTrendingNews } from '@/lib/services/news.service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const category = searchParams.get('category') || undefined;
        const news = await getTrendingNews(category);

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

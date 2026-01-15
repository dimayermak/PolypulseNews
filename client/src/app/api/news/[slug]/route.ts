import { NextRequest, NextResponse } from 'next/server';
import { getNewsForMarket } from '@/lib/services/news.service';

export async function GET(
    req: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = params;
        const decodedSlug = decodeURIComponent(slug);

        // Use the slug as the topic for news
        const news = await getNewsForMarket(decodedSlug);

        return NextResponse.json({
            news,
            marketSlug: decodedSlug,
            timestamp: new Date().toISOString(),
        });
    } catch (error: any) {
        console.error(`Error in GET /api/news/${params.slug}:`, error);
        return NextResponse.json(
            { error: 'Failed to fetch news', message: error.message },
            { status: 500 }
        );
    }
}

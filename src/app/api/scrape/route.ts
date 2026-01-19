import { NextRequest, NextResponse } from 'next/server';
import { scrapeArticleContent } from '@/lib/services/scraper.service';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'URL parameter required' }, { status: 400 });
    }

    try {
        const scraped = await scrapeArticleContent(url);

        if (!scraped.success) {
            return NextResponse.json({
                error: scraped.error || 'Failed to scrape content',
                fullText: '',
                success: false
            }, { status: 200 });
        }

        return NextResponse.json({
            fullText: scraped.fullText,
            cleanHtml: scraped.cleanHtml,
            success: true
        });

    } catch (error: any) {
        console.error('Scrape API error:', error);
        return NextResponse.json({
            error: error.message || 'Internal server error',
            success: false
        }, { status: 500 });
    }
}

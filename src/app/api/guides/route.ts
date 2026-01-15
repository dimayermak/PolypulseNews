import { NextRequest, NextResponse } from 'next/server';
import { getGuides, getGuideBySlug } from '@/lib/services/guides.service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const slug = searchParams.get('slug');

        if (slug) {
            const guide = await getGuideBySlug(slug);
            if (!guide) {
                return NextResponse.json({ error: 'Guide not found' }, { status: 404 });
            }
            return NextResponse.json(guide);
        }

        const guides = await getGuides();
        return NextResponse.json(guides);
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to fetch guides', message: error.message },
            { status: 500 }
        );
    }
}

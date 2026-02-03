import { NextResponse } from 'next/server';
import { GUIDES } from '@/lib/guides';

export const dynamic = 'force-dynamic';

// Generate placeholder content for guides
function generateGuideContent(guide: any): string {
    return `
        <h2>Introduction</h2>
        <p>Welcome to this comprehensive guide on ${guide.title.toLowerCase()}. This lesson will equip you with professional-grade knowledge to navigate prediction markets with confidence.</p>
        
        <h2>Core Concepts</h2>
        <p>${guide.description}</p>
        
        <h3>Key Takeaways</h3>
        <ul>
            <li><strong>Understanding Market Mechanics:</strong> Learn how odds are calculated and what drives market movements.</li>
            <li><strong>Risk Assessment:</strong> Develop frameworks for evaluating probability and managing exposure.</li>
            <li><strong>Execution Strategy:</strong> Apply tactical approaches to enter and exit positions effectively.</li>
        </ul>
        
        <h2>Practical Application</h2>
        <p>The strategies outlined in this guide have been tested across thousands of markets on platforms like Polymarket and Kalshi. By mastering these principles, you'll gain a significant edge in prediction market trading.</p>
        
        <h3>Next Steps</h3>
        <p>Apply these concepts using our <a href="/analytics">Analytics Dashboard</a> to identify high-probability opportunities in real-time markets.</p>
        
        <blockquote>
            <p><em>"Success in prediction markets comes from disciplined analysis, not speculation."</em></p>
        </blockquote>
    `;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
        const guide = GUIDES.find(g => g.slug === slug);
        if (!guide) {
            return NextResponse.json({ error: 'Guide not found' }, { status: 404 });
        }

        // Add full content for detail view
        const fullGuide = {
            ...guide,
            content: generateGuideContent(guide),
            lastUpdated: '2026-01-18'
        };

        return NextResponse.json(fullGuide);
    }

    return NextResponse.json(GUIDES);
}

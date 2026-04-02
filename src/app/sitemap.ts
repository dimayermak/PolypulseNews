import { MetadataRoute } from 'next';
import { getAllMarkets } from '@/lib/services/aggregation.service';
import { GUIDES } from '@/lib/guides';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.polypulsenews.live';

    // Core static routes — highest priority
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/markets`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/news`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/analytics`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/guides`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
    ];

    // Guide routes — static, SEO-rich content with unique descriptions
    const guideRoutes: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
        url: `${baseUrl}/guides/${guide.slug}`,
        lastModified: new Date('2026-01-18'),
        changeFrequency: 'monthly' as const,
        priority: 0.85,
    }));

    // Market routes — only top active markets with real volume
    let marketRoutes: MetadataRoute.Sitemap = [];
    try {
        const markets = await getAllMarkets(200);

        // Filter to only active markets with meaningful volume,
        // then take top 50 by volume for focused crawl budget
        const activeMarkets = markets
            .filter((m) => m.volume24h > 0)
            .sort((a, b) => (b.volume24h || 0) - (a.volume24h || 0))
            .slice(0, 50);

        marketRoutes = activeMarkets.map((market) => ({
            url: `${baseUrl}/markets/${market.slug}`,
            lastModified: new Date(market.updatedAt || new Date()),
            changeFrequency: 'hourly' as const,
            priority: 0.7,
        }));
    } catch (error) {
        console.error('Error generating markets sitemap:', error);
    }

    // No news routes — these are external articles, not original content.
    // Including them wastes crawl budget on thin pages.

    return [...staticRoutes, ...guideRoutes, ...marketRoutes];
}

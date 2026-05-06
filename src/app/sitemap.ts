import { MetadataRoute } from 'next';
import { getAllMarkets } from \'@/lib/services/aggregation.service\';
import { GUIDES } from \'@/lib/guides\';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = \'https://www.polypulsenews.live\';

    // Core static routes e2 highest priority
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: \'daily\', priority: 1.0 },
        { url: \'${baseUrl}/markets\', lastModified: new Date(), changeFrequency: \'hourly\', priority: 0.9 },
        { url: \'${baseUrl}/news\', lastModified: new Date(), changeFrequency: \'hourly\', priority: 0.9 },
        { url: \'${baseUrl}/analytics\', lastModified: new Date(), changeFrequency: \'daily\', priority: 0.8 },
        { url: \'${baseUrl}/guides\', lastModified: new Date(), changeFrequency: \'weekly\', priority: 0.9 },
        { url: \'${baseUrl}/about\', lastModified: new Date(), changeFrequency: \'monthly\', priority: 0.7 },
    ];

    // Guide routes
    const guideRoutes: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
        url: \'${baseUrl}/guides/${guide.slug}\',
        lastModified: new Date(),
        changeFrequency: \'monthly\' as const,
        priority: 0.85,
    }));

    // Market routes
    let marketRoutes: MetadataRoute.Sitemap = [];
    try {
        const markets = await getAllMarkets(200);
        const activeMarkets = markets
            .filter((m) => m.volume24h > 0)
            .sort((a, b) => (b.volume24h || 0) - (a.volume24h || 0))
            .slice(0, 50);
        marketRoutes = activeMarkets.map((market) => ({
            url: \'${baseUrl}/markets/${market.slug}\',
            lastModified: new Date(market.updatedAt || new Date()),
            changeFrequency: \'hourly\' as const,
            priority: 0.7,
        }));
    } catch (error) {
        console.error(\'Error generating markets sitemap:\', error);
    }

    return [...staticRoutes, ...guideRoutes, ...marketRoutes];
}

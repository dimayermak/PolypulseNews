import { MetadataRoute } from 'next';
import { getAllMarkets } from '@/lib/services/aggregation.service';
import { getTrendingNews } from '@/lib/api';
import { GUIDES } from '@/lib/guides';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.polypulsenews.live';

    // Base routes
    const routes = [
        '',
        '/markets',
        '/news',
        '/analytics',
        '/guides',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Market routes
    let marketRoutes: MetadataRoute.Sitemap = [];
    try {
        const markets = await getAllMarkets(2000); // Increased for comprehensive indexed coverage
        marketRoutes = markets.map((market) => ({
            url: `${baseUrl}/markets/${market.id}`,
            lastModified: new Date(market.updatedAt || new Date()),
            changeFrequency: 'hourly' as const,
            priority: 0.7, // Slightly higher priority for indexed markets
        }));
    } catch (error) {
        console.error('Error generating markets sitemap:', error);
    }

    // News routes
    let newsRoutes: MetadataRoute.Sitemap = [];
    try {
        const newsResponse = await getTrendingNews('all');
        if (newsResponse && newsResponse.news) {
            newsRoutes = newsResponse.news.map((item) => ({
                url: `${baseUrl}/news/${item.id}`,
                lastModified: new Date(item.pubDate || new Date()),
                changeFrequency: 'weekly' as const,
                priority: 0.6,
            }));
        }
    } catch (error) {
        console.error('Error generating news sitemap:', error);
    }

    // Guide routes
    const guideRoutes = GUIDES.map((guide) => ({
        url: `${baseUrl}/guides/${guide.slug}`,
        lastModified: new Date('2026-01-18'), // Consistent with API
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    return [...routes, ...marketRoutes, ...newsRoutes, ...guideRoutes];
}

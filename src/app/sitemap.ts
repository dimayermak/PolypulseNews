import { MetadataRoute } from 'next';
import { getAllMarkets } from '@/lib/services/aggregation.service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://polypulse-news.vercel.app';

    // Base routes
    const routes = [
        '',
        '/markets',
        '/news',
        '/analytics',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Market routes
    try {
        const markets = await getAllMarkets(100);
        const marketRoutes = markets.map((market) => ({
            url: `${baseUrl}/markets/${market.id}`,
            lastModified: new Date(market.updatedAt || new Date()),
            changeFrequency: 'hourly' as const,
            priority: 0.6,
        }));

        return [...routes, ...marketRoutes];
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return routes;
    }
}

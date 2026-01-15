import Parser from 'rss-parser';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 600 }); // 10 minute cache
const parser = new Parser();

export interface NewsItem {
    title: string;
    link: string;
    source: string;
    pubDate: string;
    description?: string;
    imageUrl?: string;
}

const RSS_FEEDS: Record<string, string[]> = {
    general: [
        'https://news.google.com/rss/search?q={query}&hl=en-US&gl=US&ceid=US:en',
        'https://finance.yahoo.com/news/rssindex',
    ],
    crypto: [
        'https://www.coindesk.com/arc/outboundfeeds/rss/',
        'https://cointelegraph.com/rss'
    ],
    tech: [
        'https://techcrunch.com/feed/',
    ]
};

export async function getNewsForQuery(query: string): Promise<NewsItem[]> {
    const cacheKey = `news_${query}`;
    const cached = cache.get(cacheKey);

    if (cached) {
        return cached as NewsItem[];
    }

    try {
        const cleanQuery = query.replace(/[^\w\s]/g, ' ').replace(/\s+/g, '+');

        // Determine which feeds to use based on query
        let feedsToFetch = [...RSS_FEEDS.general];
        if (query.match(/crypto|bitcoin|eth|doge/i)) {
            feedsToFetch = [...feedsToFetch, ...RSS_FEEDS.crypto];
        } else if (query.match(/tech|ai|apple|nvidia|software/i)) {
            feedsToFetch = [...feedsToFetch, ...RSS_FEEDS.tech];
        }

        const feedPromises = feedsToFetch.map(async (url) => {
            try {
                const feedUrl = url.includes('{query}') ? url.replace('{query}', cleanQuery) : url;
                const feed = await parser.parseURL(feedUrl);

                // Map items immediately to preserve source info
                return feed.items.map(item => {
                    // Determine source name
                    let sourceName = 'Google News';
                    if (url.includes('yahoo')) sourceName = 'Yahoo Finance';
                    else if (url.includes('coindesk')) sourceName = 'CoinDesk';
                    else if (url.includes('cointelegraph')) sourceName = 'CoinTelegraph';
                    else if (url.includes('techcrunch')) sourceName = 'TechCrunch';

                    return { ...item, _sourceName: sourceName, _feedUrl: url };
                }) as any[];
            } catch (err) {
                console.error(`Error fetching feed ${url}:`, err);
                return [];
            }
        });

        const allItems = await Promise.all(feedPromises);
        const flattenedItems = allItems.flat();

        // Filter and map items
        const newsItems: NewsItem[] = flattenedItems
            .filter((item: any) => {
                if (!item.title) return false;
                // If it's a search query result (Google), it's highly relevant.
                // If it's a generic feed (Yahoo), we match any keyword.
                const isGenericFeed = !item._feedUrl?.includes('google');
                if (isGenericFeed) {
                    const keywords = query.toLowerCase().split(/\s+/).filter(k => k.length > 2);
                    return keywords.some(kw =>
                        item.title.toLowerCase().includes(kw) ||
                        item.contentSnippet?.toLowerCase().includes(kw)
                    );
                }
                return true;
            })
            .map((item: any) => {
                // Extract image
                let imageUrl = '';
                if (item.enclosure?.url && item.enclosure.type?.startsWith('image')) {
                    imageUrl = item.enclosure.url;
                } else if (item['media:content']?.['$']?.url) {
                    imageUrl = item['media:content']['$'].url;
                } else if (item['media:thumbnail']?.['$']?.url) {
                    imageUrl = item['media:thumbnail']['$'].url;
                } else if (item.content) {
                    const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
                    if (imgMatch) imageUrl = imgMatch[1];
                }

                // Fallback: Try to find image in description if it contains HTML
                if (!imageUrl && item.contentSnippet && item.contentSnippet.includes('<img')) {
                    const imgMatch = item.contentSnippet.match(/<img[^>]+src="([^">]+)"/);
                    if (imgMatch) imageUrl = imgMatch[1];
                }

                return {
                    title: item.title || '',
                    link: item.link || '',
                    source: item._sourceName || item.source?.name || 'News',
                    pubDate: item.pubDate || new Date().toISOString(),
                    description: item.contentSnippet || item.content || '',
                    imageUrl,
                };
            })
            .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
            .slice(0, 30); // Limit to 30 items

        cache.set(cacheKey, newsItems);
        return newsItems;
    } catch (error: any) {
        console.error(`Error fetching news for ${query}:`, error.message);
        return [];
    }
}

export async function getNewsForMarket(marketTitle: string, category?: string): Promise<NewsItem[]> {
    // Extract keywords from market title: replace dashes/special chars with spaces
    // and keep only relevant words
    const keywords = marketTitle
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 3)
        .slice(0, 6)
        .join(' ');

    if (!keywords) return getTrendingNews(category);

    return getNewsForQuery(keywords);
}

export async function getTrendingNews(category?: string): Promise<NewsItem[]> {
    const categoryQueries: Record<string, string> = {
        politics: 'election politics government congress senate',
        sports: 'sports nfl nba mlb soccer',
        economics: 'finance economy stock market inflation',
        crypto: 'crypto bitcoin ethereum blockchain',
        technology: 'technology ai tech apple google nvidia',
        entertainment: 'entertainment celebrity movie music oscars',
        all: 'top news headlines'
    };

    const query = category && categoryQueries[category]
        ? categoryQueries[category]
        : 'market finance crypto politics';

    return getNewsForQuery(query);
}

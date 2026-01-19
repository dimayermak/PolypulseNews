import Parser from 'rss-parser';
import NodeCache from 'node-cache';
import crypto from 'crypto';
import { extractKeywords } from './keyword.service';

const cache = new NodeCache({ stdTTL: 600 }); // 10 minute cache
const globalArticleCache = new NodeCache({ stdTTL: 3600 }); // 1 hour persistent cache for individual items
const parser = new Parser();

function generateId(text: string): string {
    return crypto.createHash('md5').update(text).digest('hex').slice(0, 16);
}

export interface NewsItem {
    id: string;
    title: string;
    link: string;
    source: string;
    pubDate: string;
    description?: string;
    content?: string;
    fullContent?: string;  // Scraped full article text
    imageUrl?: string;
    isSponsored?: boolean;
    keywords?: string[];   // Extracted keywords for matching
    relatedMarkets?: string[]; // Related market IDs
}

const RSS_FEEDS: Record<string, string[]> = {
    general: [
        'https://news.google.com/rss/search?q={query}&hl=en-US&gl=US&ceid=US:en',
        'https://finance.yahoo.com/news/rssindex',
        'http://feeds.bbci.co.uk/news/world/rss.xml',
    ],
    crypto: [
        'https://www.coindesk.com/arc/outboundfeeds/rss/',
        'https://cointelegraph.com/rss',
        'https://bitcoinmagazine.com/feed'
    ],
    tech: [
        'https://techcrunch.com/feed/',
        'https://www.theverge.com/rss/index.xml',
        'https://www.wired.com/feed/rss',
    ],
    business: [
        'https://search.cnbc.com/rs/search/view.xml?partnerId=2000&keywords={query}',
        'https://www.ft.com/?format=rss',
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
        if (query.match(/crypto|bitcoin|eth|doge|solana|blockchain/i)) {
            feedsToFetch = [...feedsToFetch, ...RSS_FEEDS.crypto];
        }

        if (query.match(/tech|ai|apple|nvidia|software|tesla|startup/i)) {
            feedsToFetch = [...feedsToFetch, ...RSS_FEEDS.tech];
        }

        if (query.match(/finance|stock|market|fed|inflation|economy|gdp/i)) {
            feedsToFetch = [...feedsToFetch, ...RSS_FEEDS.business];
        }

        const feedPromises = feedsToFetch.map(async (url) => {
            try {
                const feedUrl = url.includes('{query}') ? url.replace('{query}', cleanQuery) : url;
                const feed = await parser.parseURL(feedUrl);

                return feed.items.map(item => {
                    let sourceName = 'News';
                    const lowerUrl = url.toLowerCase();
                    const itemUrl = (item.link || '').toLowerCase();

                    if (lowerUrl.includes('google')) sourceName = 'Google News';
                    else if (lowerUrl.includes('yahoo')) sourceName = 'Yahoo Finance';
                    else if (lowerUrl.includes('bbci')) sourceName = 'BBC News';
                    else if (lowerUrl.includes('coindesk')) sourceName = 'CoinDesk';
                    else if (lowerUrl.includes('cointelegraph')) sourceName = 'CoinTelegraph';
                    else if (lowerUrl.includes('techcrunch')) sourceName = 'TechCrunch';
                    else if (lowerUrl.includes('theverge')) sourceName = 'The Verge';
                    else if (lowerUrl.includes('wired')) sourceName = 'Wired';
                    else if (lowerUrl.includes('cnbc')) sourceName = 'CNBC';
                    else if (lowerUrl.includes('ft.com')) sourceName = 'Financial Times';
                    else if (lowerUrl.includes('bitcoinmagazine')) sourceName = 'Bitcoin Magazine';

                    // Deep source detection from item link if generic
                    if (sourceName === 'Google News' || sourceName === 'News') {
                        if (itemUrl.includes('reuters.com')) sourceName = 'Reuters';
                        else if (itemUrl.includes('bloomberg.com')) sourceName = 'Bloomberg';
                        else if (itemUrl.includes('wsj.com')) sourceName = 'WSJ';
                        else if (itemUrl.includes('nytimes.com')) sourceName = 'NY Times';
                        else if (itemUrl.includes('forbes.com')) sourceName = 'Forbes';
                    }

                    return { ...item, _sourceName: sourceName, _feedUrl: url };
                }) as any[];
            } catch (err) {
                return [];
            }
        });

        const allItems = await Promise.all(feedPromises);
        const flattenedItems = allItems.flat();

        // Unique by title to avoid duplicates across feeds
        const seenTitles = new Set();

        const newsItems: NewsItem[] = flattenedItems
            .filter((item: any) => {
                if (!item.title || seenTitles.has(item.title)) return false;
                seenTitles.add(item.title);

                const isGenericFeed = !item._feedUrl?.includes('google') && !item._feedUrl?.includes('cnbc');
                if (isGenericFeed) {
                    const keywords = query.toLowerCase().split(/\s+/).filter(k => k.length > 2);
                    return keywords.some(kw =>
                        item.title.toLowerCase().includes(kw) ||
                        (item.contentSnippet || '').toLowerCase().includes(kw)
                    );
                }
                return true;
            })
            .map((item: any) => {
                // Robust Image Extraction Engine
                let imageUrl = '';

                // 1. Enclosure
                if (item.enclosure?.url && (item.enclosure.type?.startsWith('image') || item.enclosure.url.match(/\.(jpg|jpeg|png|webp|gif)/i))) {
                    imageUrl = item.enclosure.url;
                }
                // 2. Media Content (handle arrays and single objects)
                else if (item['media:content']) {
                    const media = item['media:content'];
                    if (Array.isArray(media)) {
                        const img = media.find(m => m['$']?.url && (!m['$']?.type || m['$'].type.startsWith('image')));
                        if (img) imageUrl = img['$'].url;
                    } else if (media['$']?.url) {
                        imageUrl = media['$'].url;
                    }
                }
                // 3. Media Thumbnail
                else if (item['media:thumbnail']?.['$']?.url) {
                    imageUrl = item['media:thumbnail']['$'].url;
                }
                // 4. Content/Description Regex (often higher quality)
                const htmlSearch = (item.content || '') + (item['content:encoded'] || '') + (item.description || '') + (item.contentSnippet || '');
                if (!imageUrl || imageUrl.includes('spacer') || imageUrl.length < 20) {
                    // More robust img regex matching src with single or double quotes
                    const imgMatch = htmlSearch.match(/<img[^>]+src=["']([^"']+)["']/i);
                    if (imgMatch && !imgMatch[1].includes('feedburner') && !imgMatch[1].includes('doubleclick')) {
                        imageUrl = imgMatch[1];
                    }
                }

                // Clean relative URLs if necessary (usually not needed for RSS but safe)
                if (imageUrl && imageUrl.startsWith('//')) imageUrl = 'https:' + imageUrl;

                // Extract keywords for this article
                const articleText = `${item.title} ${item.contentSnippet || ''} ${item.content || ''}`;
                const extracted = extractKeywords(articleText, 15);
                const articleKeywords = [...extracted.primary.slice(0, 10), ...extracted.entities.slice(0, 5)];

                return {
                    id: generateId(item.link || item.title || ''),
                    title: item.title || '',
                    link: item.link || '',
                    source: item._sourceName || item.source?.name || 'News',
                    pubDate: item.pubDate || new Date().toISOString(),
                    description: (item.contentSnippet || item.content || '').replace(/\u003c[^\u003e]*\u003e/g, '').trim().slice(0, 200) + '...',
                    content: item.content || item['content:encoded'] || item.contentSnippet || '',
                    imageUrl,
                    keywords: articleKeywords,
                } as NewsItem;
            })
            .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
            .map((item: NewsItem) => {
                if (item.source === 'TechCrunch' || item.source === 'CNBC' || item.title.toLowerCase().includes(' ai ')) {
                    item.isSponsored = true;
                }
                return item;
            })
            .slice(0, 40);

        cache.set(cacheKey, newsItems);

        // Populate global article cache for direct retrieval
        newsItems.forEach(item => {
            globalArticleCache.set(item.id, item);
        });

        return newsItems;
    } catch (error: any) {
        console.error(`Error fetching news for ${query}:`, error.message);
        return [];
    }
}

export async function getNewsForMarket(marketTitle: string, category?: string): Promise<NewsItem[]> {
    // Better keyword extraction for markets
    const keywords = marketTitle
        .replace(/[^\w\s-]/g, '') // Keep dashes for slugs if needed but mainly spaces
        .replace(/Will|be|the|in|at|to|a|an|of|for|on/gi, '') // Remove stop words
        .split(/\s+/)
        .filter(word => word.length > 2)
        .slice(0, 5)
        .join(' ');

    if (!keywords || keywords.trim().length < 3) return getTrendingNews(category);

    return getNewsForQuery(keywords);
}

export async function getTrendingNews(category?: string): Promise<NewsItem[]> {
    const categoryQueries: Record<string, string> = {
        politics: 'election Biden Trump government politics',
        sports: 'sports NFL NBA MLB score game',
        economics: 'Fed inflation stock market economy',
        crypto: 'Bitcoin Ethereum Crypto Solana',
        technology: 'AI Apple Nvidia Tech OpenAI',
        entertainment: 'Oscars Movie Celebrity Music Hollywood',
        all: 'latest news headlines world'
    };

    const query = category && categoryQueries[category]
        ? categoryQueries[category]
        : 'market finance crypto news';

    return getNewsForQuery(query);
}

export async function getNewsItemById(id: string): Promise<NewsItem | undefined> {
    // 1. Check global cache first (most reliable)
    const cached = globalArticleCache.get(id);
    if (cached) return cached as NewsItem;

    // 2. If not found, try to find in trending cache
    const categories = ['all', 'politics', 'sports', 'economics', 'crypto', 'technology', 'entertainment'];
    for (const cat of categories) {
        const catCacheKey = `news_latest_${cat}`;
        const catNews = cache.get(catCacheKey) as NewsItem[];
        if (catNews) {
            const item = catNews.find(n => n.id === id);
            if (item) {
                globalArticleCache.set(id, item); // Refill global cache
                return item;
            }
        }
    }

    // 3. Last ditch effort: refresh trending and check again
    const news = await getTrendingNews('all');
    const item = news.find(n => n.id === id);
    if (item) return item;

    return undefined;
}

import { Market } from './types';
import { NewsItem } from './services/news.service';
import { findMatchingKeywords, calculateSimilarity } from './services/keyword.service';

/**
 * Find markets related to a news article by keyword matching
 */
export function findRelatedMarkets(news: NewsItem, allMarkets: Market[]): Market[] {
    if (!news.keywords || news.keywords.length === 0) {
        return [];
    }

    const newsKeywords = news.keywords.map(k => k.toLowerCase());

    // Score each market
    const scoredMarkets = allMarkets.map(market => {
        const marketKeywords = market.title
            .toLowerCase()
            .replace(/will|be|the|in|at|to|for/gi, '')
            .split(/\s+/)
            .filter((w: string) => w.length > 2);

        const similarity = calculateSimilarity(newsKeywords, marketKeywords);

        // Boost score if there's an exact entity match (e.g., "Trump", "Bitcoin")
        const hasEntityMatch = news.keywords?.some(nk =>
            market.title.toLowerCase().includes(nk.toLowerCase()) && nk.length > 4
        );

        return {
            market,
            score: similarity + (hasEntityMatch ? 0.3 : 0)
        };
    })
        .filter(item => item.score > 0.15) // Minimum threshold
        .sort((a, b) => b.score - a.score);

    return scoredMarkets.slice(0, 5).map(item => item.market);
}

/**
 * Find news articles related to a market by keyword matching
 */
export function findRelatedNews(market: Market, allNews: NewsItem[]): NewsItem[] {
    const marketKeywords = market.title
        .toLowerCase()
        .replace(/will|be|the|in|at|to|for/gi, '')
        .split(/\s+/)
        .filter(w => w.length > 2);

    // Score each news item
    const scoredNews = allNews
        .filter(news => news.keywords && news.keywords.length > 0)
        .map(news => {
            const newsKeywords = news.keywords!.map(k => k.toLowerCase());
            const similarity = calculateSimilarity(marketKeywords, newsKeywords);

            // Boost if title mentions key market terms
            const titleBoost = marketKeywords.some(mk =>
                news.title.toLowerCase().includes(mk) && mk.length > 4
            ) ? 0.2 : 0;

            return {
                news,
                score: similarity + titleBoost
            };
        })
        .filter(item => item.score > 0.15)
        .sort((a, b) => b.score - a.score);

    return scoredNews.slice(0, 8).map(item => item.news);
}

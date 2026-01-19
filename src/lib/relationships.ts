import { Market } from './types';
import { NewsItem } from './services/news.service';
import { calculateSimilarity, extractKeywords } from './services/keyword.service';

/**
 * Enhanced keyword matching with entity recognition and weighted scoring
 */
function getEnhancedKeywordScore(newsKeywords: string[], marketTitle: string, marketDescription?: string): number {
    const marketText = `${marketTitle} ${marketDescription || ''}`.toLowerCase();

    // Extract market keywords with better filtering
    const marketKeywords = extractKeywords(marketText, 20);
    const allMarketKeywords = [...marketKeywords.primary, ...marketKeywords.entities].map(k => k.toLowerCase());

    // Base similarity score
    let score = calculateSimilarity(newsKeywords, allMarketKeywords);

    // Entity matching boost - prioritize proper nouns (people, companies, events)
    const newsEntities = newsKeywords.filter(k => k.length > 4 && /^[A-Z]/.test(k));
    const entityMatches = newsEntities.filter(entity =>
        marketTitle.toLowerCase().includes(entity.toLowerCase())
    );
    score += entityMatches.length * 0.25; // Big boost for entity matches

    // Exact phrase matching boost
    const newsTokens = newsKeywords.filter(k => k.length > 5);
    const phraseMatches = newsTokens.filter(token =>
        marketTitle.toLowerCase().includes(token.toLowerCase())
    );
    score += phraseMatches.length * 0.15;

    // Category/topic alignment boost
    const topicKeywords = {
        'politics': ['election', 'president', 'congress', 'senate', 'vote', 'biden', 'trump', 'republican', 'democrat'],
        'crypto': ['bitcoin', 'ethereum', 'crypto', 'btc', 'eth', 'blockchain', 'defi', 'nft'],
        'sports': ['nfl', 'nba', 'mlb', 'soccer', 'super bowl', 'championship', 'playoffs'],
        'tech': ['ai', 'apple', 'google', 'microsoft', 'tech', 'software', 'nvidia'],
        'economics': ['fed', 'inflation', 'gdp', 'rate', 'economy', 'stock', 'market', 'recession']
    };

    for (const [_, keywords] of Object.entries(topicKeywords)) {
        const newsHasTopic = newsKeywords.some(nk => keywords.includes(nk.toLowerCase()));
        const marketHasTopic = allMarketKeywords.some(mk => keywords.includes(mk.toLowerCase()));
        if (newsHasTopic && marketHasTopic) {
            score += 0.1; // Topic alignment bonus
        }
    }

    return score;
}

/**
 * Find markets related to a news article by enhanced keyword matching
 */
export function findRelatedMarkets(news: NewsItem, allMarkets: Market[]): Market[] {
    if (!news.keywords || news.keywords.length === 0) {
        return [];
    }

    const newsKeywords = news.keywords.map(k => k.toLowerCase());

    // Score each market with enhanced algorithm
    const scoredMarkets = allMarkets
        .map(market => ({
            market,
            score: getEnhancedKeywordScore(newsKeywords, market.title, market.description)
        }))
        .filter(item => item.score > 0.2) // Higher threshold for quality
        .sort((a, b) => b.score - a.score);

    return scoredMarkets.slice(0, 6).map(item => item.market); // Return top 6
}

/**
 * Find news articles related to a market by enhanced keyword matching
 */
export function findRelatedNews(market: Market, allNews: NewsItem[]): NewsItem[] {
    const marketText = `${market.title} ${market.description || ''}`;
    const marketKeywordData = extractKeywords(marketText, 20);
    const marketKeywords = [...marketKeywordData.primary, ...marketKeywordData.entities].map(k => k.toLowerCase());

    // Score each news item
    const scoredNews = allNews
        .filter(news => news.keywords && news.keywords.length > 0)
        .map(news => {
            const newsKeywords = news.keywords!.map(k => k.toLowerCase());

            // Use enhanced scoring
            const score = getEnhancedKeywordScore(newsKeywords, market.title, market.description);

            // Title match boost
            const titleMatchBoost = marketKeywords
                .filter(mk => mk.length > 4)
                .some(mk => news.title.toLowerCase().includes(mk)) ? 0.2 : 0;

            return {
                news,
                score: score + titleMatchBoost
            };
        })
        .filter(item => item.score > 0.2)
        .sort((a, b) => b.score - a.score);

    return scoredNews.slice(0, 10).map(item => item.news); // Return top 10
}

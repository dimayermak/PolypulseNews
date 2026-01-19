// Keyword extraction and matching service for intelligent content linking

const STOP_WORDS = new Set([
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with',
    'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her',
    'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up',
    'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time',
    'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could',
    'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think',
    'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even',
    'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'is', 'was', 'are', 'been',
    'has', 'had', 'were', 'said', 'did', 'having', 'may', 'should', 'am', 'being'
]);

export interface ExtractedKeywords {
    primary: string[];      // Most important keywords
    secondary: string[];    // Supporting keywords
    entities: string[];     // Named entities (capitalized words)
}

/**
 * Extract keywords from text using simple TF-IDF-like approach
 */
export function extractKeywords(text: string, limit: number = 10): ExtractedKeywords {
    // Clean and tokenize
    const words = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 2 && !STOP_WORDS.has(word));

    // Count frequency
    const frequency = new Map<string, number>();
    words.forEach(word => {
        frequency.set(word, (frequency.get(word) || 0) + 1);
    });

    // Sort by frequency
    const sortedWords = Array.from(frequency.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([word]) => word);

    // Extract named entities (capitalized words from original text)
    const entityPattern = /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g;
    const entities = Array.from(new Set(text.match(entityPattern) || []));

    return {
        primary: sortedWords.slice(0, limit),
        secondary: sortedWords.slice(limit, limit * 2),
        entities: entities.slice(0, 10)
    };
}

/**
 * Calculate similarity score between two sets of keywords
 */
export function calculateSimilarity(keywords1: string[], keywords2: string[]): number {
    if (keywords1.length === 0 || keywords2.length === 0) return 0;

    const set1 = new Set(keywords1.map(k => k.toLowerCase()));
    const set2 = new Set(keywords2.map(k => k.toLowerCase()));

    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);

    return intersection.size / union.size; // Jaccard similarity
}

/**
 * Find matching keywords between text and a query
 */
export function findMatchingKeywords(text: string, query: string): string[] {
    const textKeywords = extractKeywords(text, 20);
    const queryKeywords = extractKeywords(query, 10);

    const allTextKeywords = [...textKeywords.primary, ...textKeywords.entities];
    const allQueryKeywords = [...queryKeywords.primary, ...queryKeywords.entities];

    return allTextKeywords.filter(tk =>
        allQueryKeywords.some(qk =>
            tk.toLowerCase().includes(qk.toLowerCase()) ||
            qk.toLowerCase().includes(tk.toLowerCase())
        )
    );
}

/**
 * Extract topic/category from text
 */
export function extractTopic(text: string): string {
    const keywords = extractKeywords(text, 5);
    const topWords = keywords.primary.slice(0, 3);

    // Map to categories
    const categoryKeywords: Record<string, string[]> = {
        'politics': ['election', 'biden', 'trump', 'president', 'government', 'congress', 'senate', 'vote'],
        'crypto': ['bitcoin', 'ethereum', 'crypto', 'blockchain', 'nft', 'defi', 'solana', 'btc', 'eth'],
        'sports': ['game', 'team', 'player', 'season', 'nfl', 'nba', 'soccer', 'football'],
        'tech': ['apple', 'google', 'microsoft', 'ai', 'software', 'tech', 'startup', 'nvidia'],
        'economics': ['fed', 'inflation', 'economy', 'gdp', 'market', 'stock', 'finance', 'rate']
    };

    for (const [category, catKeywords] of Object.entries(categoryKeywords)) {
        if (topWords.some(word => catKeywords.includes(word))) {
            return category;
        }
    }

    return 'all';
}

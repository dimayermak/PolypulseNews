// Market Data Types
export interface Market {
    id: string;
    slug: string;
    title: string;
    description: string;
    category: string;
    platform: 'polymarket' | 'kalshi';
    currentOdds: {
        yes: number;
        no: number;
    };
    volume24h: number;
    liquidity?: number;
    endDate: string;
    imageUrl?: string;
    tags: string[];
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

// News Item Types
export interface NewsItem {
    title: string;
    link: string;
    source: string;
    pubDate: string;
    description?: string;
    imageUrl?: string;
}

// Aggregated Data for Market + News
export interface MarketWithNews {
    market: Market;
    news: NewsItem[];
}

// API Response Types
export interface MarketsResponse {
    markets: Market[];
    total: number;
    page: number;
    limit: number;
}

export interface TrendingMarketsResponse {
    markets: Market[];
    timestamp: string;
}

export interface NewsResponse {
    news: NewsItem[];
    marketSlug: string;
    timestamp: string;
}

// Filter Types
export type MarketCategory =
    | 'all'
    | 'politics'
    | 'sports'
    | 'economics'
    | 'technology'
    | 'entertainment'
    | 'crypto'
    | 'other';

export type MarketSource = 'all' | 'polymarket' | 'kalshi';

export interface MarketFilters {
    category?: MarketCategory;
    source?: MarketSource;
    search?: string;
    limit?: number;
    offset?: number;
}

// Widget Configuration
export interface WidgetConfig {
    marketId: string;
    theme?: 'dark' | 'light';
    showVolume?: boolean;
    showEndDate?: boolean;
    affiliateId?: string;
}

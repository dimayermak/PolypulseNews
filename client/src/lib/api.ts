import { Market, MarketsResponse, TrendingMarketsResponse, NewsResponse, MarketFilters } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Generic fetch wrapper with error handling
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch ${endpoint}:`, error);
        throw error;
    }
}

// Market API Functions
export async function getMarkets(filters?: MarketFilters): Promise<MarketsResponse> {
    const params = new URLSearchParams();

    if (filters?.category && filters.category !== 'all') {
        params.append('category', filters.category);
    }
    if (filters?.source && filters.source !== 'all') {
        params.append('source', filters.source);
    }
    if (filters?.search) {
        params.append('search', filters.search);
    }
    if (filters?.limit) {
        params.append('limit', filters.limit.toString());
    }
    if (filters?.offset) {
        params.append('offset', filters.offset.toString());
    }

    const queryString = params.toString();
    const endpoint = `/markets${queryString ? `?${queryString}` : ''}`;

    return fetchAPI<MarketsResponse>(endpoint);
}

export async function getTrendingMarkets(): Promise<TrendingMarketsResponse> {
    return fetchAPI<TrendingMarketsResponse>('/markets/trending');
}

export async function getMarketById(id: string): Promise<Market> {
    return fetchAPI<Market>(`/markets/${id}`);
}

// News API Functions
export async function getNewsForMarket(marketSlug: string): Promise<NewsResponse> {
    return fetchAPI<NewsResponse>(`/news/${marketSlug}`);
}

export async function getTrendingNews(): Promise<NewsResponse> {
    return fetchAPI<NewsResponse>('/news/trending');
}

// Utility Functions
export function formatOdds(odds: number): string {
    if (!odds || isNaN(odds)) {
        return '0.0%';
    }
    return `${(odds * 100).toFixed(1)}%`;
}

export function formatVolume(volume: number): string {
    if (!volume || isNaN(volume)) {
        return '$0';
    }
    if (volume >= 1_000_000) {
        return `$${(volume / 1_000_000).toFixed(2)}M`;
    } else if (volume >= 1_000) {
        return `$${(volume / 1_000).toFixed(1)}K`;
    }
    return `$${volume.toFixed(0)}`;
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 1) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
        return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 48) {
        return 'Yesterday';
    } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
}

export function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
        politics: 'from-blue-500 to-purple-500',
        sports: 'from-green-500 to-emerald-500',
        economics: 'from-yellow-500 to-orange-500',
        technology: 'from-cyan-500 to-blue-500',
        entertainment: 'from-pink-500 to-rose-500',
        crypto: 'from-primary to-tertiary',
        other: 'from-gray-500 to-slate-500',
    };

    return colors[category.toLowerCase()] || colors.other;
}

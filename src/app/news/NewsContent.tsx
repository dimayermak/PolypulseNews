'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import { Header } from '@/components/Header';
import { NewsCard } from '@/components/NewsCard';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { getTrendingNews } from '@/lib/api';
import { Search, Newspaper } from 'lucide-react';

type NewsCategory = 'all' | 'politics' | 'sports' | 'economics' | 'crypto' | 'technology' | 'entertainment';

const categories: { value: NewsCategory; label: string }[] = [
    { value: 'all', label: 'All News' },
    { value: 'politics', label: 'Politics' },
    { value: 'sports', label: 'Sports' },
    { value: 'economics', label: 'Economics' },
    { value: 'crypto', label: 'Crypto' },
    { value: 'technology', label: 'Technology' },
    { value: 'entertainment', label: 'Entertainment' },
];

export default function NewsContent() {
    const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('all');
    const [selectedSource, setSelectedSource] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const { data: newsData, error, isLoading } = useSWR(
        ['/news/trending', selectedCategory],
        ([url, cat]) => getTrendingNews(cat),
        {
            refreshInterval: 300000,
            revalidateOnFocus: false,
        }
    );

    const availableSources = React.useMemo(() => {
        if (!newsData?.news) return [{ value: 'all', label: 'All Sources' }];
        const sources = new Set<string>();
        newsData.news.forEach(item => {
            if (item.source) sources.add(item.source);
        });
        const dynamicSources = Array.from(sources).map(source => ({
            value: source,
            label: source
        })).sort((a, b) => a.label.localeCompare(b.label));
        return [{ value: 'all', label: 'All Sources' }, ...dynamicSources];
    }, [newsData]);

    const filteredNews = newsData?.news.filter((item) => {
        const matchesSearch = searchQuery
            ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchQuery.toLowerCase())
            : true;
        const matchesSource = selectedSource === 'all' ? true : item.source === selectedSource;
        return matchesSearch && matchesSource;
    }) || [];

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <section className="relative py-16 border-b border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/50 mb-6">
                            <Newspaper className="w-4 h-4 text-primary" />
                            <span className="text-sm font-mono uppercase tracking-wider text-primary">Prediction Market News</span>
                        </div>
                        <h1 className="font-heading font-bold text-4xl md:text-6xl mb-6">Latest Prediction Market <span className="gradient-text">News</span></h1>
                        <p className="text-lg text-muted mb-8 max-w-2xl mx-auto">Stay informed with real-time news aggregated from top sources, correlated with prediction market odds.</p>
                        <div className="relative max-w-xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                            <Input
                                type="text"
                                placeholder="Search news articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 h-12 text-base"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="sticky top-16 z-40 bg-background/95 backdrop-blur-lg border-b border-white/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide w-full md:w-auto">
                            {categories.map((category) => (
                                <button
                                    key={category.value}
                                    onClick={() => setSelectedCategory(category.value)}
                                    className={`px-5 py-2.5 rounded-full font-mono text-sm uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${selectedCategory === category.value ? 'bg-gradient-to-r from-primary to-tertiary text-background shadow-glow-orange scale-105' : 'bg-white/5 border border-white/10 text-muted hover:border-primary/50 hover:text-white'}`}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                        <div className="flex bg-surface-hover rounded-lg p-1 border border-white/10 flex-shrink-0 overflow-x-auto scrollbar-hide max-w-full">
                            {availableSources.map((source) => (
                                <button
                                    key={source.value}
                                    onClick={() => setSelectedSource(source.value)}
                                    className={`px-3 py-1.5 rounded-md font-medium text-xs md:text-sm transition-all duration-300 whitespace-nowrap ${selectedSource === source.value ? 'bg-surface border border-white/10 text-white shadow-sm' : 'text-muted hover:text-white hover:bg-white/5'}`}
                                >
                                    {source.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center gap-2">
                        <p className="text-sm text-muted font-mono">Showing {filteredNews.length} articles</p>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="h-64 rounded-2xl skeleton" />)}
                        </div>
                    ) : error || filteredNews.length === 0 ? (
                        <Card glass={false} hover={false}>
                            <CardContent className="p-12 text-center">
                                <p className="text-muted text-lg">{error ? 'Failed to load news articles' : 'No news articles found'}</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredNews.map((newsItem, index) => <NewsCard key={index} news={newsItem} />)}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

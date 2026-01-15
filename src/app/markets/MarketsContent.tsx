'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import { Header } from '@/components/Header';
import { MarketCard } from '@/components/MarketCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { Input } from '@/components/ui/Input';
import { getMarkets } from '@/lib/api';
import { MarketCategory } from '@/lib/types';
import { SourceFilter, MarketSource } from '@/components/SourceFilter';
import { Search, Filter } from 'lucide-react';

export default function MarketsContent() {
    const [selectedCategory, setSelectedCategory] = useState<MarketCategory>('all');
    const [selectedSource, setSelectedSource] = useState<MarketSource>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const { data, error, isLoading } = useSWR(
        ['/markets', selectedCategory, searchQuery, selectedSource],
        () => getMarkets({
            category: selectedCategory,
            source: selectedSource,
            search: searchQuery || undefined,
            limit: 1000,
        }),
        {
            refreshInterval: 30000,
            revalidateOnFocus: false,
        }
    );

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <section className="border-b border-white/10 bg-surface">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-4xl">
                        <h1 className="font-heading font-bold text-4xl md:text-6xl mb-4">
                            All <span className="gradient-text">Markets</span>
                        </h1>
                        <p className="text-muted text-lg">
                            Browse prediction markets from Polymarket and Kalshi with live odds and correlated news
                        </p>
                    </div>
                </div>
            </section>

            <section className="border-b border-white/10 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="space-y-6">
                        <div className="max-w-xl">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                                <Input
                                    type="text"
                                    placeholder="Search markets..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-12 rounded-lg border-2"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-4">
                                    <Filter className="w-4 h-4 text-muted" />
                                    <span className="text-sm font-mono uppercase tracking-wider text-muted">Filter by Category</span>
                                </div>
                                <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
                            </div>
                            <div className="flex-shrink-0">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-sm font-mono uppercase tracking-wider text-muted">Data Source</span>
                                </div>
                                <SourceFilter selected={selectedSource} onSelect={setSelectedSource} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="h-96 rounded-2xl skeleton" />)}
                        </div>
                    ) : error || !data ? (
                        <div className="text-center py-24"><p className="text-muted text-lg">Failed to load markets.</p></div>
                    ) : data.markets.length === 0 ? (
                        <div className="text-center py-24"><p className="text-muted text-lg">No markets found.</p></div>
                    ) : (
                        <>
                            <div className="mb-6"><p className="text-sm text-muted font-mono">Showing {data.markets.length} of {data.total} markets</p></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {data.markets.map((market) => <MarketCard key={market.id} market={market} />)}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}

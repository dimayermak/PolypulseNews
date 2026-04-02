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
import { AdBanner } from '@/components/AdBanner';
import { AAdsBanner } from '@/components/AAdsBanner';

import { Market, MarketsResponse } from '@/lib/types';

import { Pagination } from '@/components/ui/Pagination';

interface MarketsContentProps {
    initialMarkets?: MarketsResponse;
    page?: number;
    limit?: number;
}

export default function MarketsContent({ initialMarkets, page = 1, limit = 1000 }: MarketsContentProps) {
    const [selectedCategory, setSelectedCategory] = useState<MarketCategory>('all');
    const [selectedSource, setSelectedSource] = useState<MarketSource>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const isFiltered = selectedCategory !== 'all' || selectedSource !== 'all' || searchQuery !== '';
    const currentLimit = isFiltered ? 1000 : limit;
    const currentOffset = isFiltered ? 0 : (page - 1) * limit;

    const { data, error, isLoading } = useSWR(
        ['/markets', selectedCategory, searchQuery, selectedSource, isFiltered ? 1 : page],
        () => getMarkets({
            category: selectedCategory,
            source: selectedSource,
            search: searchQuery || undefined,
            limit: currentLimit,
            offset: currentOffset,
        }),
        {
            refreshInterval: 30000,
            revalidateOnFocus: false,
            fallbackData: initialMarkets,
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
                    <div className="mb-12">
                        <AAdsBanner />
                    </div>
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="h-96 rounded-2xl skeleton" />)}
                        </div>
                    ) : error || !data ? (
                        <div className="text-center py-24 max-w-2xl mx-auto">
                            <h2 className="text-2xl font-bold font-heading mb-4 text-white">Live Prediction Markets</h2>
                            <p className="text-muted text-lg mb-8">
                                We are currently syncing the latest live odds, volume data, and trading analytics from Polymarket and Kalshi. Refresh the page to see the latest active markets.
                            </p>
                            <button onClick={() => window.location.reload()} className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white font-mono text-sm border border-white/20">
                                Refresh Data
                            </button>
                        </div>
                    ) : data.markets.length === 0 ? (
                        <div className="text-center py-24 max-w-2xl mx-auto">
                            <h2 className="text-2xl font-bold font-heading mb-4 text-white">No markets match your criteria</h2>
                            <p className="text-muted text-lg">
                                Try adjusting your category or source filters to discover active prediction markets.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6"><p className="text-sm text-muted font-mono">Showing {data.markets.length} of {data.total} markets</p></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {data.markets.map((market, index) => (
                                    <React.Fragment key={market.id}>
                                        <MarketCard market={market} />
                                        {index === 5 && (
                                            <div className="md:col-span-2 lg:col-span-3">
                                                <AdBanner
                                                    type="native"
                                                    label="Recommended"
                                                    title="Hedge Your Outlook with Kalshi"
                                                    description="Regulated prediction markets for US events. Trade on interest rates, economic data, and more with legal peace of mind."
                                                    ctaText="Start Trading"
                                                    href="https://kalshi.com"
                                                />
                                            </div>
                                        )}
                                        {index > 0 && index % 10 === 0 && (
                                            <div className="md:col-span-2 lg:col-span-3">
                                                <AAdsBanner />
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            {!isFiltered && data.total > limit && (
                                <Pagination
                                    currentPage={page}
                                    totalPages={Math.ceil(data.total / limit)}
                                    basePath="/markets"
                                />
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}

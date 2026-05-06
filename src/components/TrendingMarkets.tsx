'use client';

import React from 'react';
import useSWR from 'swr';
import { MarketCard } from '@/components/MarketCard';
import { getTrendingMarkets } from '@/lib/api';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { TrendingMarketsResponse } from '@/lib/types';

interface TrendingMarketsProps {
    initialData?: TrendingMarketsResponse;
}

export function TrendingMarkets({ initialData }: TrendingMarketsProps) {
    const { data, error, isLoading } = useSWR(
        '/markets/trending',
        getTrendingMarkets,
        {
            refreshInterval: 60000,
            revalidateOnFocus: false,
            fallbackData: initialData,
        }
    );

    const scrollRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 400;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-heading font-bold text-3xl">
                        Trending <span className="gradient-text">Markets</span>
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-80 rounded-2xl skeleton" />
                    ))}
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="text-center py-12">
                <p className="text-muted">Failed to load trending markets</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-heading font-bold text-3xl md:text-4xl">
                        Trending <span className="gradient-text">Markets</span>
                    </h2>
                    <p className="text-muted mt-2">
                        Top markets by 24-hour volume • Updated live
                    </p>
                </div>
                <div className="hidden md:flex items-center gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="p-2 rounded-full border border-white/20 hover:border-primary/50 hover:bg-white/5 transition-all"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-2 rounded-full border border-white/20 hover:border-primary/50 hover:bg-white/5 transition-all"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto custom-scrollbar pb-4 snap-x snap-mandatory"
            >
                {data.markets.slice(0, 10).map((market) => (
                    <div key={market.id} className="flex-shrink-0 w-full md:w-[400px] snap-start">
                        <MarketCard market={market} />
                    </div>
                ))}
            </div>
                    <Link href="/markets" className="inline-flex items-center gap-2 text-sm font-mono text-primary hover:text-quaternary transition-colors mt-2">
                        View All Markets <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
    );
}

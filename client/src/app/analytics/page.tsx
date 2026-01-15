'use client';

import React from 'react';
import useSWR from 'swr';
import { Header } from '@/components/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getTrendingMarkets, formatOdds, formatVolume, getCategoryColor } from '@/lib/api';
import { TrendingUp, TrendingDown, Activity, BarChart3, Newspaper, Zap } from 'lucide-react';
import Link from 'next/link';
import { MarketComparison } from '@/components/MarketComparison';

export default function AnalyticsPage() {
    const { data: marketsData, error, isLoading } = useSWR(
        '/markets/trending',
        getTrendingMarkets,
        {
            refreshInterval: 60000, // Refresh every minute
            revalidateOnFocus: false,
        }
    );

    const markets = marketsData?.markets || [];

    // Calculate market movers (markets with highest odds - assuming 50% is neutral)
    const marketMovers = [...markets]
        .map(m => ({
            ...m,
            oddsChange: Math.abs((m.currentOdds?.yes ?? 0.5) - 0.5) * 100
        }))
        .sort((a, b) => b.oddsChange - a.oddsChange)
        .slice(0, 10);

    // Volume leaders
    const volumeLeaders = [...markets]
        .sort((a, b) => (b.volume24h || 0) - (a.volume24h || 0))
        .slice(0, 10);

    // Category breakdown
    const categoryStats = markets.reduce((acc, market) => {
        const cat = market.category || 'other';
        if (!acc[cat]) {
            acc[cat] = { count: 0, totalVolume: 0 };
        }
        acc[cat].count++;
        acc[cat].totalVolume += market.volume24h || 0;
        return acc;
    }, {} as Record<string, { count: number; totalVolume: number }>);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Section */}
            <section className="relative py-16 border-b border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-10 blur-3xl" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/50 mb-6">
                            <BarChart3 className="w-4 h-4 text-primary" />
                            <span className="text-sm font-mono uppercase tracking-wider text-primary">
                                Market Intelligence
                            </span>
                        </div>

                        <h1 className="font-heading font-bold text-4xl md:text-6xl mb-6 leading-tight">
                            Prediction Market <span className="gradient-text">Analytics</span>
                        </h1>

                        <p className="text-lg text-muted max-w-2xl mx-auto">
                            Data-driven insights, market trends, and real-time intelligence to make informed betting decisions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Analytics Dashboard */}
            <section className="py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* Market Movers */}
                        <Card glass={false} hover={false}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-primary/20 border border-primary/50">
                                            <TrendingUp className="w-5 h-5 text-primary" />
                                        </div>
                                        Market <span className="gradient-text">Movers</span>
                                    </CardTitle>
                                    <Badge variant="outline">Top 10</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                    <div className="space-y-3">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div key={i} className="h-16 rounded-lg skeleton" />
                                        ))}
                                    </div>
                                ) : marketMovers.length === 0 ? (
                                    <p className="text-muted text-center py-8">No data available</p>
                                ) : (
                                    <div className="space-y-3">
                                        {marketMovers.map((market, index) => (
                                            <Link
                                                key={market.id}
                                                href={`/markets/${market.slug}`}
                                                className="block p-4 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all group"
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-xs font-mono text-muted">#{index + 1}</span>
                                                            <Badge variant="glow" className="text-xs">
                                                                {market.category}
                                                            </Badge>
                                                        </div>
                                                        <p className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                                                            {market.title}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-lg font-mono font-bold gradient-text">
                                                            {formatOdds(market.currentOdds?.yes ?? 0.5)}
                                                        </div>
                                                        <div className="text-xs text-muted">YES</div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Market Comparison / Arbitrage */}
                        <div className="lg:col-span-2">
                            <MarketComparison markets={markets} />
                        </div>

                        {/* Volume Leaders */}
                        <Card glass={false} hover={false}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-primary/20 border border-primary/50">
                                            <Activity className="w-5 h-5 text-primary" />
                                        </div>
                                        Volume <span className="gradient-text">Leaders</span>
                                    </CardTitle>
                                    <Badge variant="outline">24h</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                    <div className="space-y-3">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div key={i} className="h-16 rounded-lg skeleton" />
                                        ))}
                                    </div>
                                ) : volumeLeaders.length === 0 ? (
                                    <p className="text-muted text-center py-8">No data available</p>
                                ) : (
                                    <div className="space-y-3">
                                        {volumeLeaders.map((market, index) => (
                                            <Link
                                                key={market.id}
                                                href={`/markets/${market.slug}`}
                                                className="block p-4 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all group"
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-xs font-mono text-muted">#{index + 1}</span>
                                                            <Badge variant="outline" className="text-xs">
                                                                {market.platform}
                                                            </Badge>
                                                        </div>
                                                        <p className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                                                            {market.title}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-lg font-mono font-bold text-primary">
                                                            {formatVolume(market.volume24h)}
                                                        </div>
                                                        <div className="text-xs text-muted">24h vol</div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Category Performance */}
                        <Card glass={false} hover={false} className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/20 border border-primary/50">
                                        <Zap className="w-5 h-5 text-primary" />
                                    </div>
                                    Category <span className="gradient-text">Performance</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="h-24 rounded-lg skeleton" />
                                        ))}
                                    </div>
                                ) : Object.keys(categoryStats).length === 0 ? (
                                    <p className="text-muted text-center py-8">No data available</p>
                                ) : (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {Object.entries(categoryStats).map(([category, stats]) => (
                                            <div
                                                key={category}
                                                className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 transition-all"
                                            >
                                                <div className="mb-2">
                                                    <Badge variant="glow" className="text-xs capitalize">
                                                        {category}
                                                    </Badge>
                                                </div>
                                                <div className="space-y-1">
                                                    <div>
                                                        <div className="text-2xl font-mono font-bold gradient-text">
                                                            {stats.count}
                                                        </div>
                                                        <div className="text-xs text-muted">Markets</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-mono text-primary">
                                                            {formatVolume(stats.totalVolume)}
                                                        </div>
                                                        <div className="text-xs text-muted">Total Volume</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </section>
        </div>
    );
}

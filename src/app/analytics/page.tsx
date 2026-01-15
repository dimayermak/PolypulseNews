'use client';

import React from 'react';
import useSWR from 'swr';
import { Header } from '@/components/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getAnalytics, formatOdds, formatVolume } from '@/lib/api';
import { TrendingUp, BarChart3, Activity, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PulseBackground } from '@/components/PulseBackground';

// New Dashboard Components
import { KpiCards } from '@/components/analytics/KpiCards';
import { VolumeTimeline } from '@/components/analytics/VolumeTimeline';
import { CategoryChart } from '@/components/analytics/CategoryChart';
import { AIInsights } from '@/components/analytics/AIInsights';

export default function AnalyticsPage() {
    const { data, error, isLoading } = useSWR(
        '/analytics',
        getAnalytics,
        {
            refreshInterval: 60000, // Refresh every minute
            revalidateOnFocus: false,
        }
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="container mx-auto px-4 py-20 space-y-12">
                    <div className="h-48 rounded-2xl skeleton" />
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => <div key={i} className="h-32 rounded-2xl skeleton" />)}
                    </div>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen bg-background text-center py-20">
                <p className="text-muted">Failed to load analytics data.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Section */}
            <section className="relative py-16 border-b border-white/10 overflow-hidden">
                <PulseBackground />

                <div className="container mx-auto px-4 relative">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/50 mb-6">
                            <BarChart3 className="w-4 h-4 text-primary" />
                            <span className="text-sm font-mono uppercase tracking-wider text-primary">
                                Data-Driven Intelligence
                            </span>
                        </div>

                        <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4 leading-tight">
                            Market <span className="text-quaternary">Intelligence</span> & <span className="gradient-text">Analytics</span>
                        </h1>

                        <p className="text-lg text-muted max-w-2xl border-l border-quaternary/30 pl-4">
                            Real-time KPIs, cross-platform liquidity analysis, and institutional-grade trend detection. Use high-conviction data to inform your next move.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-4 space-y-12">

                    {/* KPI Cards */}
                    <KpiCards data={data} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Main Charts */}
                        <div className="lg:col-span-2 space-y-8">
                            <VolumeTimeline currentVolume={data.totalVolume24h} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <CategoryChart data={data.categoryDistribution} />

                                {/* Top Markets Small List */}
                                <Card glass={false} hover={false}>
                                    <CardHeader>
                                        <CardTitle className="text-lg font-mono uppercase">Top Volume Markets</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {data.topVolumeMarkets.map((market, i) => (
                                            <Link
                                                key={market.id}
                                                href={`/markets/${market.slug}`}
                                                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all group"
                                            >
                                                <div className="flex-1 min-w-0 pr-4">
                                                    <p className="text-sm font-medium truncate group-hover:text-primary">{market.title}</p>
                                                    <p className="text-[10px] text-muted font-mono uppercase">{market.platform}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-mono font-bold text-primary">{formatVolume(market.volume24h)}</p>
                                                    <div className="flex items-center justify-end gap-1 text-[10px] text-muted">
                                                        <Activity className="w-3 h-3" />
                                                        24h
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                        <Link href="/markets" className="flex items-center justify-center gap-2 text-xs text-primary font-bold pt-2 hover:underline">
                                            View all markets <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Side AI Insights & Stats */}
                        <div className="space-y-8">
                            <AIInsights data={data} />

                            {/* Platform Split Cards */}
                            <Card glass={false} hover={false}>
                                <CardHeader>
                                    <CardTitle className="text-sm font-mono uppercase">Platform Distribution</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {data.platformSplit.map((p, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between text-xs font-mono uppercase">
                                                <span>{p.platform}</span>
                                                <span className="text-muted">{((p.volume / data.totalVolume24h) * 100).toFixed(1)}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${p.platform === 'polymarket' ? 'bg-primary shadow-glow-orange' : 'bg-tertiary'}`}
                                                    style={{ width: `${(p.volume / data.totalVolume24h) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

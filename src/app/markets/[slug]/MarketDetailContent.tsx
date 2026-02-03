'use client';

import React from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { NewsCard } from '@/components/NewsCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { getMarketById, getNewsForMarket, formatOdds, formatVolume, formatDate } from '@/lib/api';
import { TrendingUp, TrendingDown, Activity, Calendar, ExternalLink, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { Market } from '@/lib/types';
import { JsonLd } from '@/components/JsonLd';
import { AdBanner } from '@/components/AdBanner';
import { ExternalAd } from '@/components/ExternalAd';

interface MarketDetailContentProps {
    slug: string;
    initialData: Market;
}

export default function MarketDetailContent({ slug, initialData }: MarketDetailContentProps) {
    const { data: market, error: marketError } = useSWR(
        slug ? `/markets/${slug}` : null,
        () => getMarketById(slug),
        {
            fallbackData: initialData,
            revalidateOnFocus: false
        }
    );

    const { data: newsData, error: newsError, isLoading: newsLoading } = useSWR(
        slug ? `/news/${slug}` : null,
        () => getNewsForMarket(slug),
        {
            refreshInterval: 300000, // Refresh every 5 minutes
            revalidateOnFocus: false,
        }
    );

    if (marketError || !market) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                    <p className="text-muted text-lg">Market not found</p>
                    <Link href="/markets" className="inline-block mt-4">
                        <Button variant="outline">Back to Markets</Button>
                    </Link>
                </div>
            </div>
        );
    }

    // Safety check for currentOdds
    const yesOdds = market.currentOdds?.yes ?? 0.5;
    const noOdds = market.currentOdds?.no ?? 0.5;
    const isYesFavored = yesOdds > noOdds;

    // Structured Data for AI & Search Engines
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": market.title,
        "description": market.description,
        "startDate": market.createdAt,
        "endDate": market.endDate,
        "location": {
            "@type": "VirtualLocation",
            "url": `https://www.polypulsenews.live/markets/${slug}`
        },
        "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "USD",
            "offerCount": "1",
            "lowPrice": yesOdds,
            "highPrice": yesOdds,
            "url": `https://${market.platform}.com?ref=polypulsenews`
        },
        "publisher": {
            "@type": "Organization",
            "name": "PolypulseNews",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.polypulsenews.live/icon.svg"
            }
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <JsonLd data={jsonLd} />
            <Header />

            {/* Market Details */}
            <section className="py-12 border-b border-white/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto space-y-8">
                        <div className="space-y-4">
                            <Link href="/markets">
                                <Button variant="ghost" size="sm" className="pl-0 hover:pl-2 transition-all">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Markets
                                </Button>
                            </Link>

                            <div className="flex items-center gap-2">
                                <Badge variant="glow" pulse={market.active}>
                                    {market.category}
                                </Badge>
                                <Badge variant="outline">
                                    {market.platform}
                                </Badge>
                                {market.active && (
                                    <Badge variant="default" pulse>
                                        Live
                                    </Badge>
                                )}
                            </div>
                        </div>

                        {market.imageUrl && (
                            <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-6 border border-white/10">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={market.imageUrl}
                                    alt={market.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                            </div>
                        )}

                        <h1 className="font-heading font-bold text-3xl md:text-5xl leading-tight">
                            {market.title}
                        </h1>

                        {market.description && (
                            <p className="text-muted text-lg leading-relaxed">
                                {market.description}
                            </p>
                        )}

                        {/* AI-Optimized Summary Section */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-mono text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Sparkles className="w-4 h-4" /> Market Summary (AI Insight)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                <div className="space-y-2">
                                    <p className="text-white font-medium">Core Question:</p>
                                    <p className="text-muted">{market.title}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-white font-medium">Current Consensus:</p>
                                    <p className="text-muted">The market estimates a {formatOdds(yesOdds)} probability of a "Yes" resolution.</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-white font-medium">Platforms Tracked:</p>
                                    <p className="text-muted">Aggregated from {market.platform.charAt(0).toUpperCase() + market.platform.slice(1)}.</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-white font-medium">Resolution Date:</p>
                                    <p className="text-muted">Expected to resolve after {formatDate(market.endDate)}.</p>
                                </div>
                            </div>
                        </div>

                        {/* Odds Display */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <Card glass={false} hover={false} className={`relative overflow-hidden ${isYesFavored ? 'border-primary/50 bg-primary/5' : ''}`}>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-10 blur-3xl" />
                                <CardContent className="relative p-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm font-mono text-muted uppercase tracking-wider">
                                            Yes Probability
                                        </span>
                                        {isYesFavored && <TrendingUp className="w-5 h-5 text-primary" />}
                                    </div>
                                    <div className={`text-5xl md:text-6xl font-mono font-bold mb-2 ${isYesFavored ? 'gradient-text' : 'text-white'}`}>
                                        {formatOdds(yesOdds)}
                                    </div>
                                    <p className="text-sm text-muted">
                                        Market believes this outcome is {isYesFavored ? 'likely' : 'unlikely'}
                                    </p>
                                </CardContent>
                            </Card>

                            <Card glass={false} hover={false} className={`relative overflow-hidden ${!isYesFavored ? 'border-primary/50 bg-primary/5' : ''}`}>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-10 blur-3xl" />
                                <CardContent className="relative p-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm font-mono text-muted uppercase tracking-wider">
                                            No Probability
                                        </span>
                                        {!isYesFavored && <TrendingDown className="w-5 h-5 text-primary" />}
                                    </div>
                                    <div className={`text-5xl md:text-6xl font-mono font-bold mb-2 ${!isYesFavored ? 'gradient-text' : 'text-white'}`}>
                                        {formatOdds(noOdds)}
                                    </div>
                                    <p className="text-sm text-muted">
                                        Market believes this outcome is {!isYesFavored ? 'likely' : 'unlikely'}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Ad Banner Integration */}
                        <div className="mb-8 max-w-4xl mx-auto">
                            <ExternalAd />
                        </div>

                        {/* Market Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            <Card glass={false} hover={false}>
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-primary/20 border border-primary/50">
                                            <Activity className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted font-mono uppercase tracking-wider">
                                                24h Volume
                                            </div>
                                            <div className="text-xl font-mono font-bold">
                                                {formatVolume(market.volume24h)}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card glass={false} hover={false}>
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-primary/20 border border-primary/50">
                                            <Calendar className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted font-mono uppercase tracking-wider">
                                                Ends
                                            </div>
                                            <div className="text-xl font-mono font-bold">
                                                {formatDate(market.endDate)}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card glass={false} hover={false} className="md:col-span-3">
                                <CardContent className="p-8">
                                    <a
                                        href={`https://${market.platform}.com?ref=polypulsenews`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        <Button className="w-full" size="lg">
                                            <ExternalLink className="w-5 h-5 mr-2" />
                                            Trade on {market.platform}
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </Button>
                                    </a>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related News */}
            <section className="py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="font-heading font-bold text-3xl md:text-4xl mb-2">
                            Related <span className="gradient-text">News</span>
                        </h2>
                        <p className="text-muted mb-8">
                            Latest news articles correlated with this market
                        </p>

                        {newsLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-48 rounded-2xl skeleton" />
                                ))}
                            </div>
                        ) : newsError || !newsData || newsData.news.length === 0 ? (
                            <Card glass={false} hover={false}>
                                <CardContent className="p-12 text-center">
                                    <p className="text-muted">No related news articles found at this time.</p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card glass className="flex items-center justify-center p-4 border-white/5 bg-surface/20 min-h-[180px]">
                                    <ExternalAd />
                                </Card>
                                {newsData.news.map((newsItem, index) => (
                                    <NewsCard key={index} news={newsItem} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

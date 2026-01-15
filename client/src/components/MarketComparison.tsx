'use client';

import React, { useMemo } from 'react';
import { Market } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, Scaling } from 'lucide-react';
import { formatOdds } from '@/lib/api';
import Link from 'next/link';

interface MarketComparisonProps {
    markets: Market[];
}

interface MarketPair {
    question: string;
    polymarket: Market;
    kalshi: Market;
    spread: number; // Absolute difference in YES price
}

export function MarketComparison({ markets }: MarketComparisonProps) {
    const pairs = useMemo(() => {
        const polyMarkets = markets.filter(m => m.platform === 'polymarket');
        const kalshiMarkets = markets.filter(m => m.platform === 'kalshi');
        const pairs: MarketPair[] = [];

        // Simple matching logic: overlapping words in title
        // In a real app, we'd use cleaner normalized titles or manual mapping
        polyMarkets.forEach(pm => {
            // Normalize: remove punctuation, lowercase, remove common words
            const normalize = (s: string) => s.toLowerCase().replace(/[^\w\s]|will|the|reach|before|2024|2025/g, '').trim();
            const pmTitle = normalize(pm.title);
            const pmWords = new Set(pmTitle.split(/\s+/).filter(w => w.length > 3));

            // Find best match in Kalshi
            let bestMatch: Market | null = null;
            let maxOverlap = 0;

            kalshiMarkets.forEach(km => {
                const kmTitle = normalize(km.title);
                const kmWords = kmTitle.split(/\s+/).filter(w => w.length > 3);
                let overlap = 0;
                kmWords.forEach(w => {
                    if (pmWords.has(w)) overlap++;
                });

                // Threshold for match
                if (overlap >= 2 && overlap > maxOverlap) {
                    // Check if semantics roughly match (both contain 'trump' or both 'bitcoin')
                    const criticalKeywords = ['trump', 'kamala', 'biden', 'bitcoin', 'ethereum', 'fed', 'rate'];
                    const pmHas = criticalKeywords.filter(k => pm.title.toLowerCase().includes(k));
                    const kmHas = criticalKeywords.filter(k => km.title.toLowerCase().includes(k));

                    const keywordsMatch = pmHas.every(k => kmHas.includes(k)) && kmHas.every(k => pmHas.includes(k));

                    if (keywordsMatch) {
                        maxOverlap = overlap;
                        bestMatch = km;
                    }
                }
            });

            if (bestMatch) {
                const km = bestMatch as Market;
                // Calculate spread (absolute diff in Yes price)
                const pmYes = pm.currentOdds?.yes || 0;
                const kmYes = km.currentOdds?.yes || 0;
                const spread = Math.abs(pmYes - kmYes);

                // Only show if spread is significant (> 1%)
                if (spread > 0.01) {
                    pairs.push({
                        question: pm.title, // Use Polymarket title as primary
                        polymarket: pm,
                        kalshi: km,
                        spread
                    });
                }
            }
        });

        return pairs.sort((a, b) => b.spread - a.spread).slice(0, 10);
    }, [markets]);

    if (pairs.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Market Arbitrage & Comparison</CardTitle>
                    <CardDescription>No significant spreads found between platforms.</CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card className="overflow-hidden">
            <CardHeader className="bg-surface-hover/50 pb-4">
                <div className="flex items-center gap-2">
                    <Scaling className="w-5 h-5 text-primary" />
                    <CardTitle>Cross-Platform Analysis</CardTitle>
                </div>
                <CardDescription>
                    Comparing odds for similar markets on Polymarket vs Kalshi.
                    <span className="text-primary ml-1 font-medium">Potential Arbitrage Opportunities</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="divide-y divide-white/5">
                    {pairs.map((pair, idx) => (
                        <div key={idx} className="p-4 hover:bg-white/5 transition-colors grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                            {/* Question */}
                            <div className="md:col-span-5">
                                <h4 className="font-medium text-sm md:text-base line-clamp-2" title={pair.question}>
                                    {pair.question}
                                </h4>
                                <div className="flex gap-2 mt-1">
                                    <Badge variant="outline" className="text-[10px] h-5">
                                        {pair.polymarket.category}
                                    </Badge>
                                </div>
                            </div>

                            {/* Comparison */}
                            <div className="md:col-span-5 flex items-center justify-between gap-4 bg-black/20 p-3 rounded-lg border border-white/5">
                                {/* Polymarket Side */}
                                <div className="text-center flex-1">
                                    <span className="text-xs text-muted block mb-1">Polymarket</span>
                                    <span className={`text-lg font-mono font-bold ${pair.polymarket.currentOdds.yes > pair.kalshi.currentOdds.yes ? 'text-green-400' : 'text-white'}`}>
                                        {formatOdds(pair.polymarket.currentOdds.yes)}
                                    </span>
                                </div>

                                <div className="text-muted text-xs font-mono">VS</div>

                                {/* Kalshi Side */}
                                <div className="text-center flex-1">
                                    <span className="text-xs text-muted block mb-1">Kalshi</span>
                                    <span className={`text-lg font-mono font-bold ${pair.kalshi.currentOdds.yes > pair.polymarket.currentOdds.yes ? 'text-green-400' : 'text-white'}`}>
                                        {formatOdds(pair.kalshi.currentOdds.yes)}
                                    </span>
                                </div>
                            </div>

                            {/* Spread / Action */}
                            <div className="md:col-span-2 text-right">
                                <div className="text-xs text-muted mb-1">Spread</div>
                                <div className="text-xl font-bold text-primary font-mono mb-2">
                                    {(pair.spread * 100).toFixed(1)}%
                                </div>
                                <Link href={`/markets/${pair.polymarket.slug}`}>
                                    <Badge variant="glow" className="cursor-pointer hover:scale-105 transition-transform">
                                        Analyze <ArrowRight className="w-3 h-3 ml-1" />
                                    </Badge>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

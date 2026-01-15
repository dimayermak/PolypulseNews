'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Market } from '@/lib/types';
import { formatOdds, formatVolume, formatDate, getCategoryColor } from '@/lib/api';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface MarketCardProps {
    market: Market;
}

export function MarketCard({ market }: MarketCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const yesOdds = market.currentOdds?.yes ?? 0.5;
    const noOdds = market.currentOdds?.no ?? 0.5;
    const isYesFavored = yesOdds > noOdds;

    return (
        <Link href={`/markets/${market.slug}`} className="block group">
            <Card className="h-full relative overflow-hidden">
                {/* Market Image Background if available */}
                {market.imageUrl && (
                    <div className="absolute inset-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={market.imageUrl}
                            alt=""
                            className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/90 to-surface/50" />
                    </div>
                )}

                {/* Background gradient glow fallback */}
                {!market.imageUrl && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getCategoryColor(market.category)} opacity-20 blur-3xl`} />
                    </div>
                )}

                <CardHeader className="relative">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex gap-2">
                            <Badge variant="glow" pulse={market.active}>
                                {market.category}
                            </Badge>
                            {market.promoted && (
                                <Badge variant="secondary">
                                    Promoted
                                </Badge>
                            )}
                        </div>
                        <Badge variant="outline" className="text-xs">
                            {market.platform}
                        </Badge>
                    </div>
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                        {market.title}
                    </CardTitle>
                    {market.description && (
                        <div className="relative">
                            <CardDescription className={`${isExpanded ? '' : 'line-clamp-2'} transition-all duration-300`}>
                                {market.description}
                            </CardDescription>
                            {market.description.length > 100 && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setIsExpanded(!isExpanded);
                                    }}
                                    className="text-xs font-mono text-quaternary hover:text-primary mt-1 flex items-center gap-1 transition-colors"
                                >
                                    {isExpanded ? 'Show Less' : 'Read More...'}
                                </button>
                            )}
                        </div>
                    )}
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Odds Display */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className={`relative p-4 rounded-xl border ${isYesFavored ? 'border-primary/50 bg-primary/10' : 'border-white/10 bg-white/5'} transition-all group-hover:scale-[1.02] shadow-sm`}>
                            <div className="absolute inset-0 bg-quaternary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                            <div className="flex items-center justify-between mb-1 relative z-10">
                                <span className="text-xs font-mono text-muted uppercase tracking-wider">Yes</span>
                                {isYesFavored && <TrendingUp className="w-3 h-3 text-primary animate-bounce-subtle" />}
                            </div>
                            <div className={`text-2xl font-mono font-bold relative z-10 ${isYesFavored ? 'text-primary' : 'text-white'}`}>
                                {formatOdds(yesOdds)}
                            </div>
                        </div>

                        <div className={`relative p-4 rounded-xl border ${!isYesFavored ? 'border-primary/50 bg-primary/10' : 'border-white/10 bg-white/5'} transition-all group-hover:scale-[1.02] shadow-sm`}>
                            <div className="absolute inset-0 bg-quaternary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                            <div className="flex items-center justify-between mb-1 relative z-10">
                                <span className="text-xs font-mono text-muted uppercase tracking-wider">No</span>
                                {!isYesFavored && <TrendingDown className="w-3 h-3 text-primary animate-bounce-subtle" />}
                            </div>
                            <div className={`text-2xl font-mono font-bold relative z-10 ${!isYesFavored ? 'text-primary' : 'text-white'}`}>
                                {formatOdds(noOdds)}
                            </div>
                        </div>
                    </div>

                    {/* Market Stats */}
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1.5 text-muted">
                            <Activity className="w-4 h-4" />
                            <span className="font-mono">{formatVolume(market.volume24h)}</span>
                            <span className="text-xs">24h vol</span>
                        </div>
                        <div className="text-xs text-muted font-mono">
                            Ends {formatDate(market.endDate)}
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="pt-0">
                    <div className="w-full py-2 px-4 rounded-xl bg-white/5 border border-white/10 text-center text-xs font-mono uppercase tracking-widest text-muted group-hover:text-primary group-hover:border-primary/30 transition-all">
                        View Market Intelligence
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}

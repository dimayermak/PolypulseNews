import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Sparkles, TrendingUp, AlertCircle, Info } from 'lucide-react';
import { AnalyticsData } from '@/lib/types';
import { formatVolume } from '@/lib/api';

interface AIInsightsProps {
    data: AnalyticsData;
}

export function AIInsights({ data }: AIInsightsProps) {
    const topCategory = data.categoryDistribution.sort((a, b) => b.volume - a.volume)[0];
    const polyVolume = data.platformSplit.find(p => p.platform === 'polymarket')?.volume || 0;
    const kalshiVolume = data.platformSplit.find(p => p.platform === 'kalshi')?.volume || 0;
    const dominantPlatform = polyVolume > kalshiVolume ? 'Polymarket' : 'Kalshi';

    const insights = [
        {
            title: 'Market Sentiment',
            text: `The ${topCategory?.category} category is currently dominating with ${formatVolume(topCategory?.volume || 0)} in 24h volume. This suggests high retail interest in ${topCategory?.category}-related events.`,
            icon: TrendingUp,
            color: 'text-primary'
        },
        {
            title: 'Platform Dominance',
            text: `${dominantPlatform} holds the majority of liquidity for the top ${data.topVolumeMarkets.length} markets. Cross-platform arbitrage opportunities are identified in political segments.`,
            icon: Info,
            color: 'text-blue-400'
        },
        {
            title: 'Volatility Alert',
            text: `Current aggregate volume is ${data.totalVolume24h > 100000000 ? 'elevated' : 'stable'}. Watch for sharp odds movements in the Election and Crypto categories.`,
            icon: AlertCircle,
            color: 'text-amber-500'
        }
    ];

    return (
        <Card glass={false} hover={false} className="border-primary/20 bg-primary/5">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                    <Sparkles className="w-5 h-5" />
                    AI Intelligence Report
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {insights.map((insight, i) => (
                    <div key={i} className="flex gap-4">
                        <div className={`mt-1 p-2 rounded-lg bg-white/5 border border-white/10 h-fit`}>
                            <insight.icon className={`w-4 h-4 ${insight.color}`} />
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-1">{insight.title}</h4>
                            <p className="text-sm text-muted leading-relaxed">
                                {insight.text}
                            </p>
                        </div>
                    </div>
                ))}

                <div className="pt-4 border-t border-white/10">
                    <button className="w-full py-2 px-4 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                        Get Advanced Pro Signals
                    </button>
                    <p className="text-[10px] text-center text-muted mt-2 uppercase tracking-tighter">
                        * Intelligence reports update every 10 minutes
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

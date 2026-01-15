import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { formatVolume } from '@/lib/api';
import { Activity, Zap, TrendingUp, BarChart3 } from 'lucide-react';
import { AnalyticsData } from '@/lib/types';

interface KpiCardsProps {
    data: AnalyticsData;
}

export function KpiCards({ data }: KpiCardsProps) {
    const kpis = [
        {
            label: 'Total 24h Volume',
            value: formatVolume(data.totalVolume24h),
            icon: Activity,
            color: 'text-primary',
            bg: 'bg-primary/20',
            border: 'border-primary/50'
        },
        {
            label: 'Active Markets',
            value: data.activeMarketsCount,
            icon: Zap,
            color: 'text-tertiary',
            bg: 'bg-tertiary/20',
            border: 'border-tertiary/50'
        },
        {
            label: 'Top Category',
            value: data.categoryDistribution.sort((a, b) => b.volume - a.volume)[0]?.category || 'N/A',
            icon: TrendingUp,
            color: 'text-secondary',
            bg: 'bg-secondary/20',
            border: 'border-secondary/50',
            capitalize: true
        },
        {
            label: 'Total Insights',
            value: data.categoryDistribution.length,
            icon: BarChart3,
            color: 'text-blue-400',
            bg: 'bg-blue-400/20',
            border: 'border-blue-400/50'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, i) => (
                <Card key={i} glass={false} hover={false} className="border-white/10 overflow-hidden group">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${kpi.bg} ${kpi.border} border transition-transform group-hover:scale-110`}>
                                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                            </div>
                            <div>
                                <p className="text-xs font-mono text-muted uppercase tracking-wider">{kpi.label}</p>
                                <p className={`text-2xl font-mono font-bold ${kpi.capitalize ? 'capitalize' : ''}`}>
                                    {kpi.value}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface VolumeTimelineProps {
    currentVolume: number;
}

export function VolumeTimeline({ currentVolume }: VolumeTimelineProps) {
    // Mocking historical data for demonstration
    const data = [
        { day: '6d ago', volume: currentVolume * 0.8 },
        { day: '5d ago', volume: currentVolume * 0.9 },
        { day: '4d ago', volume: currentVolume * 0.7 },
        { day: '3d ago', volume: currentVolume * 1.1 },
        { day: '2d ago', volume: currentVolume * 1.2 },
        { day: 'Yesterday', volume: currentVolume * 0.95 },
        { day: 'Today', volume: currentVolume },
    ];

    return (
        <Card glass={false} hover={false} className="h-[400px] lg:col-span-2">
            <CardHeader>
                <CardTitle className="text-lg font-mono uppercase">Aggregated Market Volume (7D Trend)</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis
                                dataKey="day"
                                stroke="#666"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#666"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0A0A0A', borderColor: '#333', borderRadius: '8px' }}
                                itemStyle={{ color: '#FF6B00' }}
                                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Volume']}
                            />
                            <Bar
                                dataKey="volume"
                                fill="url(#colorVolume)"
                                radius={[4, 4, 0, 0]}
                            />
                            <defs>
                                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#FF6B00" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}

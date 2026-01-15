import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { CategoryStat } from '@/lib/types';

interface CategoryChartProps {
    data: CategoryStat[];
}

const COLORS = ['#FF6B00', '#7C3AED', '#EC4899', '#3B82F6', '#10B981', '#F59E0B'];

export function CategoryChart({ data }: CategoryChartProps) {
    const chartData = data
        .sort((a, b) => b.volume - a.volume)
        .map(item => ({
            name: item.category.charAt(0).toUpperCase() + item.category.slice(1),
            value: item.volume
        }));

    return (
        <Card glass={false} hover={false} className="h-[400px]">
            <CardHeader>
                <CardTitle className="text-lg font-mono uppercase">Category Distribution (Volume)</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0A0A0A', borderColor: '#333', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}

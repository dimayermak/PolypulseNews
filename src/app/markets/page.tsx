import React from 'react';
import { Metadata } from 'next';
import MarketsContent from './MarketsContent';
import { getMarkets } from '@/lib/api';

export const metadata: Metadata = {
    title: 'Explore Prediction Markets | Live Odds & Volume | PolypulseNews',
    description: 'Discover the latest trading opportunities on Polymarket and Kalshi. Track election odds, crypto trends, and economic forecasts in real-time.',
    openGraph: {
        title: 'Explore Prediction Markets | Live Odds & Volume | PolypulseNews',
        description: 'Discover the latest trading opportunities on Polymarket and Kalshi.',
        type: 'website',
    },
};

export const revalidate = 60;

export default async function Page() {
    const initialMarkets = await getMarkets({ limit: 1000 }).catch(() => ({
        markets: [],
        total: 0,
        page: 1,
        limit: 1000
    }));
    return <MarketsContent initialMarkets={initialMarkets} />;
}

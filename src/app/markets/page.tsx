import React from 'react';
import { Metadata } from 'next';
import MarketsContent from './MarketsContent';

export const metadata: Metadata = {
    title: 'Explore Prediction Markets | Live Odds & Volume | PolypulseNews',
    description: 'Discover the latest trading opportunities on Polymarket and Kalshi. Track election odds, crypto trends, and economic forecasts in real-time.',
    openGraph: {
        title: 'Explore Prediction Markets | Live Odds & Volume | PolypulseNews',
        description: 'Discover the latest trading opportunities on Polymarket and Kalshi.',
        type: 'website',
    },
};

export default function Page() {
    return <MarketsContent />;
}

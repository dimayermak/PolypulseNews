import React from 'react';
import { Metadata } from 'next';
import NewsContent from './NewsContent';

export const metadata: Metadata = {
    title: 'Prediction Market News | Latest Odds & Insights | PolypulseNews',
    description: 'Stay ahead with real-time news correlated with prediction market odds. Aggregated headlines from Polymarket, Kalshi, and top finance sources.',
    openGraph: {
        title: 'Prediction Market News | Latest Odds & Insights | PolypulseNews',
        description: 'Stay ahead with real-time news correlated with prediction market odds.',
        type: 'website',
    },
};

export default function Page() {
    return <NewsContent />;
}

import React from 'react';
import { Metadata } from 'next';
import NewsContent from './NewsContent';

export const metadata: Metadata = {
    title: 'Prediction Market News – Latest Odds & Market-Moving Insights',
    description: 'Stay ahead with real-time news correlated with prediction market odds. Aggregated headlines from Polymarket, Kalshi, and top finance sources.',
    alternates: {
        canonical: 'https://www.polypulsenews.live/news',
    },
    openGraph: {
        title: 'Prediction Market News – Latest Odds & Market-Moving Insights',
        description: 'Stay ahead with real-time news correlated with prediction market odds.',
        type: 'website',
        url: 'https://www.polypulsenews.live/news',
    },
};

export default function Page() {
    return <NewsContent />;
}

import React from 'react';
import { Metadata } from 'next';
import AnalyticsContent from './AnalyticsContent';

export const metadata: Metadata = {
    title: 'Prediction Market Analytics - Real-Time Intelligence Dashboard',
    description: 'Live prediction market analytics dashboard with cross-platform volume tracking, category breakdowns, and AI-driven insights from Polymarket and Kalshi data.',
    alternates: {
        canonical: 'https://www.polypulsenews.live/analytics',
    },
    openGraph: {
        title: 'Prediction Market Analytics - Real-Time Intelligence Dashboard',
        description: 'Live prediction market analytics with cross-platform volume tracking and AI-driven insights.',
        type: 'website',
        url: 'https://www.polypulsenews.live/analytics',
    },
};

export default function Page() {
    return <AnalyticsContent />;
}

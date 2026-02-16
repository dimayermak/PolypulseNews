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

interface PageProps {
    searchParams: { page?: string };
}

export default async function Page({ searchParams }: PageProps) {
    const page = Number(searchParams.page) || 1;
    const limit = 48; // Fetch fewer items per page for faster load and better UX
    const offset = (page - 1) * limit;

    const initialMarkets = await getMarkets({ limit, offset }).catch(() => ({
        markets: [],
        total: 0,
        page,
        limit
    }));

    return (
        <MarketsContent
            initialMarkets={initialMarkets}
            page={page}
            limit={limit}
        />
    );
}

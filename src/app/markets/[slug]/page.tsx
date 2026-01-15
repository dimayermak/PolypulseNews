import React from 'react';
import { Metadata } from 'next';
import { getMarketById } from '@/lib/services/aggregation.service';
import MarketDetailContent from './MarketDetailContent';
import { notFound } from 'next/navigation';

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const market = await getMarketById(params.slug);

    if (!market) {
        return {
            title: 'Market Not Found | PolypulseNews',
        };
    }

    const title = `${market.title} | Prediction Odds & News | PolypulseNews`;
    const description = `Live odds: ${(market.currentOdds.yes * 100).toFixed(1)}% Yes. ${market.description || 'Track real-time prediction market data and correlated news for this event.'}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: market.imageUrl ? [market.imageUrl] : [],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: market.imageUrl ? [market.imageUrl] : [],
        },
    };
}

export default async function Page({ params }: PageProps) {
    const market = await getMarketById(params.slug);

    if (!market) {
        notFound();
    }

    return <MarketDetailContent slug={params.slug} initialData={market} />;
}

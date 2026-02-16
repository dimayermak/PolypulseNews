import React from 'react';
import { Metadata } from 'next';
import { getMarketById } from '@/lib/services/aggregation.service';
import { getNewsForMarket } from '@/lib/api';
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

import { getMarkets } from '@/lib/api';
import { MarketCategory } from '@/lib/types';

export default async function Page({ params }: PageProps) {
    const market = await getMarketById(params.slug);

    // Fetch news server-side for SEO
    const news = await getNewsForMarket(params.slug).catch(() => undefined);

    if (!market) {
        notFound();
    }

    // Fetch related markets for internal linking mesh
    const relatedResponse = await getMarkets({
        category: market.category as MarketCategory,
        limit: 4
    }).catch(() => null);

    const relatedMarkets = relatedResponse?.markets
        .filter(m => m.id !== market.id)
        .slice(0, 3) || [];

    return <MarketDetailContent
        slug={params.slug}
        initialData={market}
        initialNews={news}
        relatedMarkets={relatedMarkets}
    />;
}

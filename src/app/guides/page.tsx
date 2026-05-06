import React from 'react';
import { Metadata } from 'next';
import GuidesContent from './GuidesContent';
import { GUIDES } from '@/lib/guides';

export const metadata: Metadata = {
    title: 'Prediction Market Playbook - Expert Guides & Strategies',
    description: 'Master prediction markets with expert guides on election odds, crypto volatility, sports betting, risk management, and profitable trading strategies for Polymarket and Kalshi.',
    alternates: {
        canonical: 'https://www.polypulsenews.live/guides',
    },
    openGraph: {
        title: 'Prediction Market Playbook - Expert Guides & Strategies',
        description: 'Master prediction markets with expert guides on election odds, crypto volatility, and profitable trading strategies.',
        type: 'website',
        url: 'https://www.polypulsenews.live/guides',
    },
};

// JSON-LD for collection page
const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "The Polypulse Playbook",
    description: "Expert guides on prediction market trading strategies, election odds, crypto markets, and risk management.",
    url: "https://www.polypulsenews.live/guides",
    mainEntity: {
        "@type": "ItemList",
        itemListElement: GUIDES.map((guide, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: guide.title,
            url: `https://www.polypulsenews.live/guides/${guide.slug}`,
        })),
    },
};

export default function Page() {
    // Pass guides as serialized data to client component
    const guidesData = GUIDES.map(g => ({
        id: g.id,
        slug: g.slug,
        title: g.title,
        description: g.description,
        category: g.category,
        imageUrl: g.imageUrl || '',
        readTime: g.readTime,
        author: g.author,
    }));

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
            />
            <GuidesContent guides={guidesData} />
        </>
    );
}

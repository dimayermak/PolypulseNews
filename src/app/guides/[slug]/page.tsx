import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GUIDES } from '@/lib/guides';
import GuideDetailContent from './GuideDetailContent';

interface PageProps {
    params: {
        slug: string;
    };
}

// Generate guide HTML content server-side (moved from API route)
function generateGuideContent(guide: any): string {
    return `
        <h2>Introduction</h2>
        <p>Welcome to this comprehensive guide on ${guide.title.toLowerCase()}. This lesson will equip you with professional-grade knowledge to navigate prediction markets with confidence.</p>
        
        <h2>Core Concepts</h2>
        <p>${guide.description}</p>
        
        <h3>Key Takeaways</h3>
        <ul>
            <li><strong>Understanding Market Mechanics:</strong> Learn how odds are calculated and what drives market movements.</li>
            <li><strong>Risk Assessment:</strong> Develop frameworks for evaluating probability and managing exposure.</li>
            <li><strong>Execution Strategy:</strong> Apply tactical approaches to enter and exit positions effectively.</li>
        </ul>
        
        <h2>Practical Application</h2>
        <p>The strategies outlined in this guide have been tested across thousands of markets on platforms like Polymarket and Kalshi. By mastering these principles, you'll gain a significant edge in prediction market trading.</p>
        
        <h3>Next Steps</h3>
        <p>Apply these concepts using our <a href="/analytics">Analytics Dashboard</a> to identify high-probability opportunities in real-time markets.</p>
        
        <blockquote>
            <p><em>"Success in prediction markets comes from disciplined analysis, not speculation."</em></p>
        </blockquote>
    `;
}

// Pre-render all guide pages at build time
export async function generateStaticParams() {
    return GUIDES.map((guide) => ({
        slug: guide.slug,
    }));
}

// Dynamic metadata per guide — this is what Google will now see
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const guide = GUIDES.find(g => g.slug === params.slug);

    if (!guide) {
        return {
            title: 'Guide Not Found',
        };
    }

    return {
        title: guide.title,
        description: guide.description,
        keywords: guide.keywords,
        alternates: {
            canonical: `https://www.polypulsenews.live/guides/${guide.slug}`,
        },
        openGraph: {
            title: guide.title,
            description: guide.description,
            type: 'article',
            url: `https://www.polypulsenews.live/guides/${guide.slug}`,
            siteName: 'PolypulseNews',
            images: guide.imageUrl ? [{ url: guide.imageUrl }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: guide.title,
            description: guide.description,
        },
    };
}

export default function Page({ params }: PageProps) {
    const guide = GUIDES.find(g => g.slug === params.slug);

    if (!guide) {
        notFound();
    }

    const fullGuide = {
        ...guide,
        content: generateGuideContent(guide),
        lastUpdated: '2026-01-18',
        imageUrl: guide.imageUrl || '',
    };

    // Article JSON-LD for rich search results
    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: guide.title,
        description: guide.description,
        author: {
            "@type": "Organization",
            name: guide.author,
            url: "https://www.polypulsenews.live",
        },
        publisher: {
            "@type": "Organization",
            name: "PolypulseNews",
            url: "https://www.polypulsenews.live",
        },
        datePublished: "2026-01-18T00:00:00Z",
        dateModified: "2026-01-18T00:00:00Z",
        mainEntityOfPage: `https://www.polypulsenews.live/guides/${guide.slug}`,
        keywords: guide.keywords.join(", "),
    };

    // Breadcrumb JSON-LD
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.polypulsenews.live",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Playbook",
                item: "https://www.polypulsenews.live/guides",
            },
            {
                "@type": "ListItem",
                position: 3,
                name: guide.title,
                item: `https://www.polypulsenews.live/guides/${guide.slug}`,
            },
        ],
    };

    
// HowTo schema for the guide page
const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title,
    description: guide.description,
    step: [
        {
            "@type": "HowToStep",
            position: 1,
            name: "Understand the Basics",
            text: `Learn the fundamentals of ${guide.title.toLowerCase()} before diving into trading.`,
        },
        {
            "@type": "HowToStep",
            position: 2,
            name: "Analyze Market Data",
            text: "Use our Analytics dashboard to identify high-probability opportunities in real-time.",
        },
        {
            "@type": "HowToStep",
            position: 3,
            name: "Apply the Strategy",
            text: "Implement the tactical approaches outlined in this guide with proper risk management.",
        },
        {
            "@type": "HowToStep",
            position: 4,
            name: "Monitor and Adjust",
            text: "Track your positions and adjust based on new information and market movements.",
        },
    ],
};

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <GuideDetailContent guide={fullGuide} />
        </>
    );
}

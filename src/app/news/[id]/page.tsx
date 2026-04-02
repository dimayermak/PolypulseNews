import { Metadata, ResolvingMetadata } from 'next';
import { getNewsItemById } from '@/lib/api';
import NewsClient from './NewsClient';

type Props = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const id = params.id;

    try {
        const news = await getNewsItemById(id);

        if (!news) {
            return {
                title: 'News Not Found | PolypulseNews',
            };
        }

        const previousImages = (await parent).openGraph?.images || [];

        return {
            title: `${news.title} | PolypulseNews`,
            description: news.description?.slice(0, 160) || `Read the latest news about ${news.title} on PolypulseNews.`,
            openGraph: {
                title: news.title,
                description: news.description,
                url: `https://www.polypulsenews.live/news/${id}`,
                siteName: 'PolypulseNews',
                images: news.imageUrl ? [
                    {
                        url: news.imageUrl,
                        width: 1200,
                        height: 630,
                        alt: news.title,
                    }
                ] : previousImages,
                locale: 'en_US',
                type: 'article',
                publishedTime: news.pubDate,
                authors: [news.source],
            },
            twitter: {
                card: 'summary_large_image',
                title: news.title,
                description: news.description?.slice(0, 200),
                images: news.imageUrl ? [news.imageUrl] : [],
            },
            alternates: {
                canonical: `https://www.polypulsenews.live/news/${id}`,
            },
        };
    } catch (e) {
        return {
            title: 'PolypulseNews | Prediction Market Intelligence',
        };
    }
}

export default async function NewsPage({ params }: Props) {
    const id = params.id;

    let initialNews = null;
    try {
        initialNews = await getNewsItemById(id);
    } catch (e) {
        console.error('Failed to fetch news for server component:', e);
    }

    // NewsArticle JSON-LD
    const articleJsonLd = initialNews ? {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: initialNews.title,
        description: initialNews.description,
        url: `https://www.polypulsenews.live/news/${id}`,
        datePublished: initialNews.pubDate,
        author: { "@type": "Organization", name: initialNews.source || "PolypulseNews" },
        publisher: { "@type": "Organization", name: "PolypulseNews", url: "https://www.polypulsenews.live" },
        image: initialNews.imageUrl || undefined,
    } : null;

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.polypulsenews.live" },
            { "@type": "ListItem", position: 2, name: "News", item: "https://www.polypulsenews.live/news" },
            { "@type": "ListItem", position: 3, name: initialNews?.title || "Article", item: `https://www.polypulsenews.live/news/${id}` },
        ],
    };

    return (
        <>
            {articleJsonLd && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            )}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <NewsClient id={id} initialNews={initialNews} />
        </>
    );
}

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
                url: `https://polypulsenews.live/news/${id}`,
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
                canonical: `https://polypulsenews.live/news/${id}`,
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

    return <NewsClient id={id} initialNews={initialNews} />;
}

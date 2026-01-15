'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { getNewsItemById, formatDate } from '@/lib/api';
import { ArrowLeft, Newspaper, Share2, ExternalLink, Calendar, User } from 'lucide-react';
import Link from 'next/link';

export default function NewsDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const { data: news, error, isLoading } = useSWR(
        id ? `/news/item/${id}` : null,
        () => getNewsItemById(id),
        {
            revalidateOnFocus: false,
        }
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="container mx-auto px-4 py-20">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <div className="h-8 w-32 skeleton rounded-lg" />
                        <div className="h-64 w-full skeleton rounded-2xl" />
                        <div className="space-y-4">
                            <div className="h-10 w-full skeleton rounded-lg" />
                            <div className="h-10 w-3/4 skeleton rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !news) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                <Header />
                <Card className="max-w-md w-full text-center p-8">
                    <p className="text-muted-foreground mb-6 font-mono">Article expired or not found.</p>
                    <Link href="/news">
                        <Button variant="outline">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to News
                        </Button>
                    </Link>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-12 md:py-20">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="mb-8 pl-0 text-muted hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Feed
                    </Button>

                    <article className="space-y-8">
                        {/* Header Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/20 border border-primary/50">
                                    <Newspaper className="w-5 h-5 text-primary" />
                                </div>
                                <span className="text-sm font-mono text-primary uppercase tracking-widest">
                                    {news.source}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-bold font-heading leading-tight">
                                {news.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-sm text-muted font-mono">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(news.pubDate)}
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    By {news.source}
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    Verified Source
                                </div>
                            </div>
                        </div>

                        {/* Image Section */}
                        {news.imageUrl && (
                            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
                                <img
                                    src={news.imageUrl}
                                    alt={news.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                            </div>
                        )}

                        {/* Content Section */}
                        <Card className="border-white/5 bg-surface/30 backdrop-blur-md overflow-hidden">
                            <CardContent className="p-8 md:p-12">
                                <div
                                    className="prose prose-invert prose-orange max-w-none text-lg leading-relaxed text-muted-foreground"
                                    dangerouslySetInnerHTML={{ __html: news.content || news.description || '' }}
                                />

                                <div className="mt-12 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <Button variant="outline" size="sm" className="rounded-full">
                                            <Share2 className="w-4 h-4 mr-2" />
                                            Share
                                        </Button>
                                        <a href={news.link} target="_blank" rel="noopener noreferrer">
                                            <Button variant="ghost" size="sm" className="text-primary hover:underline">
                                                Read on {news.source}
                                                <ExternalLink className="w-4 h-4 ml-2" />
                                            </Button>
                                        </a>
                                    </div>

                                    <div className="text-xs font-mono text-muted uppercase">
                                        Aggregated for Polypulse Intelligence
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Related Context CTA */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card glass className="border-primary/20 hover:border-primary/50 transition-all p-8 flex flex-col justify-center text-center space-y-4">
                                <h3 className="font-bold text-xl font-heading">Analyze this topic?</h3>
                                <p className="text-sm text-muted">See how this news reflects in the prediction market liquidity.</p>
                                <Link href="/analytics">
                                    <Button className="w-full">Open Analytics Dashboard</Button>
                                </Link>
                            </Card>

                            <Card glass className="border-tertiary/20 hover:border-tertiary/50 transition-all p-8 flex flex-col justify-center text-center space-y-4">
                                <h3 className="font-bold text-xl font-heading">Trade the signal?</h3>
                                <p className="text-sm text-muted">Join the most liquid prediction market in the world.</p>
                                <a href="https://polymarket.com" target="_blank" rel="noopener noreferrer" className="w-full">
                                    <Button variant="outline" className="w-full">Open Polymarket</Button>
                                </a>
                            </Card>
                        </div>
                    </article>
                </div>
            </main>
        </div>
    );
}

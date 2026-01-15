'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, Clock, User, Share2, BookOpen, ChevronRight, Zap } from 'lucide-react';
import Link from 'next/link';

interface Guide {
    id: string;
    slug: string;
    title: string;
    description: string;
    category: string;
    content: string;
    imageUrl?: string;
    lastUpdated: string;
    readTime: string;
    author: string;
}

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function GuideDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const { data: guide, error, isLoading } = useSWR<Guide>(
        slug ? `/api/guides?slug=${slug}` : null,
        fetcher
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="container mx-auto px-4 py-20">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="h-10 w-48 skeleton rounded-full" />
                        <div className="h-16 w-full skeleton rounded-lg" />
                        <div className="h-96 w-full skeleton rounded-3xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !guide) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center">
                <Header />
                <div className="text-center space-y-6 max-w-md px-4">
                    <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto text-muted">
                        <BookOpen className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold">Guide Not Found</h2>
                    <p className="text-muted">The lesson you're looking for might have been relocated or updated.</p>
                    <Link href="/guides">
                        <Button variant="outline">Browse Playbook</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-12 md:py-20">
                <div className="max-w-5xl mx-auto">
                    {/* Breadcrumbs / Back */}
                    <div className="flex items-center gap-2 text-xs font-mono text-muted mb-8 group">
                        <Link href="/guides" className="hover:text-primary transition-colors flex items-center gap-2">
                            <BookOpen className="w-3 h-3" />
                            PLAYBOOK
                        </Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-primary">{guide.category.toUpperCase()}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-8 space-y-10">
                            <article className="space-y-8">
                                <div className="space-y-4">
                                    <h1 className="text-3xl md:text-5xl font-bold font-heading leading-tight italic">
                                        {guide.title}
                                    </h1>
                                    <p className="text-xl text-muted-foreground leading-relaxed italic border-l-4 border-primary/50 pl-6">
                                        {guide.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-muted py-4 border-y border-white/5">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        {guide.author}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        {guide.readTime}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="glow" className="text-[10px]">VERIFIED CONTENT</Badge>
                                    </div>
                                </div>

                                {guide.imageUrl && (
                                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                        <img
                                            src={guide.imageUrl}
                                            alt={guide.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                                    </div>
                                )}

                                <div
                                    className="prose prose-invert prose-orange max-w-none text-lg text-muted-foreground leading-relaxed space-y-6"
                                    dangerouslySetInnerHTML={{ __html: guide.content }}
                                />
                            </article>
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4 space-y-8">
                            {/* Pro CTA */}
                            <Card glass className="p-8 border-primary/30 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-3">
                                    <Zap className="w-6 h-6 text-primary animate-pulse" />
                                </div>
                                <div className="relative z-10 space-y-4 text-center">
                                    <h4 className="font-bold text-lg">Apply this Strategy</h4>
                                    <p className="text-xs text-muted">Use our institutional volume tools to spot the discrepancies discussed in this guide.</p>
                                    <Link href="/analytics">
                                        <Button className="w-full">Go to Pro Terminal</Button>
                                    </Link>
                                </div>
                            </Card>

                            {/* Share & Actions */}
                            <div className="space-y-4">
                                <h4 className="text-xs font-mono text-muted uppercase tracking-widest">Share Knowledge</h4>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                                        <Share2 className="w-4 h-4 mr-2" />
                                        Twitter
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                                        LinkedIn
                                    </Button>
                                </div>
                            </div>

                            {/* Static Table of Contents - For UX */}
                            <div className="p-6 rounded-2xl bg-surface/30 border border-white/5 space-y-4">
                                <h4 className="text-xs font-mono text-muted uppercase tracking-widest">In this Lesson</h4>
                                <ul className="space-y-3 text-sm text-muted">
                                    <li className="flex items-center gap-2 cursor-not-allowed">
                                        <div className="w-1 h-1 rounded-full bg-primary" />
                                        Foundations
                                    </li>
                                    <li className="flex items-center gap-2 cursor-not-allowed">
                                        <div className="w-1 h-1 rounded-full bg-primary" />
                                        Mathematical Logic
                                    </li>
                                    <li className="flex items-center gap-2 cursor-not-allowed">
                                        <div className="w-1 h-1 rounded-full bg-primary" />
                                        Expert Conclusion
                                    </li>
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </div>
    );
}

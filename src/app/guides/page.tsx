'use client';

import React from 'react';
import useSWR from 'swr';
import { Header } from '@/components/Header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BookOpen, ArrowRight, Clock, Award, Star, Zap } from 'lucide-react';
import Link from 'next/link';

// Guide type locally for frontend
interface Guide {
    id: string;
    slug: string;
    title: string;
    description: string;
    category: string;
    imageUrl?: string;
    readTime: string;
    author: string;
}

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function GuidesPage() {
    const { data: guides, isLoading } = useSWR<Guide[]>('/api/guides', fetcher);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-6xl mx-auto space-y-16">
                    {/* Hero Header */}
                    <div className="text-center space-y-6">
                        <Badge variant="glow" pulse className="mx-auto">
                            Master the Markets
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold font-heading">
                            The Polypulse <span className="gradient-text">Academy</span>
                        </h1>
                        <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
                            Deep-dives, data-driven strategies, and platform guides to transform you into a professional prediction market analyst.
                        </p>
                    </div>

                    {/* Featured Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card glass className="p-8 space-y-4 border-primary/20">
                            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                                <Zap className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold">Quick Start</h3>
                            <p className="text-sm text-muted">Go from zero to your first trade in under 5 minutes with our platform onboarding.</p>
                        </Card>
                        <Card glass className="p-8 space-y-4 border-tertiary/20">
                            <div className="w-12 h-12 rounded-xl bg-tertiary/20 flex items-center justify-center">
                                <Award className="w-6 h-6 text-tertiary" />
                            </div>
                            <h3 className="text-xl font-bold">Alpha Strategies</h3>
                            <p className="text-sm text-muted">Learn professional arbitrage and hedging techniques used by hedge funds.</p>
                        </Card>
                        <Card glass className="p-8 space-y-4 border-cyan-500/20">
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-cyan-500" />
                            </div>
                            <h3 className="text-xl font-bold">Deep Theory</h3>
                            <p className="text-sm text-muted">Understand the information aggregation theory behind why prediction markets work.</p>
                        </Card>
                    </div>

                    {/* Guides Grid */}
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Latest Lessons</h2>
                            <div className="flex gap-2">
                                <Badge variant="secondary">All Basics</Badge>
                                <Badge variant="outline">Advanced</Badge>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[1, 2, 3].map(i => <div key={i} className="h-64 skeleton rounded-2xl" />)}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {guides?.map((guide) => (
                                    <Link key={guide.id} href={`/guides/${guide.slug}`}>
                                        <Card hover className="h-full group overflow-hidden border-white/5 flex flex-col">
                                            {guide.imageUrl && (
                                                <div className="relative h-48 overflow-hidden">
                                                    <img
                                                        src={guide.imageUrl}
                                                        alt={guide.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                    <div className="absolute top-4 left-4">
                                                        <Badge className="bg-background/80 backdrop-blur-md border-white/10 text-white">
                                                            {guide.category}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            )}
                                            <CardHeader className="flex-1">
                                                <div className="flex items-center gap-4 mb-3 text-xs font-mono text-muted">
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {guide.readTime}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-3 h-3 fill-primary/50 text-primary/50" />
                                                        Pro Content
                                                    </div>
                                                </div>
                                                <CardTitle className="group-hover:text-primary transition-colors">
                                                    {guide.title}
                                                </CardTitle>
                                                <CardDescription className="line-clamp-2 mt-2">
                                                    {guide.description}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="pt-0 pb-6 pr-6">
                                                <div className="flex items-center justify-end text-primary font-mono text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                                    Read Guide
                                                    <ArrowRight className="w-4 h-4 ml-2" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

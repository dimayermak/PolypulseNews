'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { NewsItem } from '@/lib/types';
import { formatDate } from '@/lib/api';
import { ExternalLink, Newspaper } from 'lucide-react';

interface NewsCardProps {
    news: NewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
    return (
        <a
            href={news.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
        >
            <Card hover className="h-full relative overflow-hidden">
                {/* Corner accent borders */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />

                <CardHeader className="p-0">
                    {news.imageUrl && (
                        <div className="relative w-full h-48 overflow-hidden bg-surface-hover">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={news.imageUrl}
                                alt={news.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                        </div>
                    )}
                    <div className="p-6">
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 p-2 rounded-lg bg-primary/20 border border-primary/50 group-hover:shadow-glow-orange transition-all">
                                <Newspaper className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-mono text-muted uppercase tracking-wider">
                                        {news.source}
                                    </span>
                                    <span className="text-xs text-muted">•</span>
                                    <span className="text-xs text-muted font-mono">
                                        {formatDate(news.pubDate)}
                                    </span>
                                </div>
                                <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2 flex items-start gap-2">
                                    {news.title}
                                    <ExternalLink className="w-4 h-4 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </CardTitle>
                                {news.description && (
                                    <CardDescription className="mt-2 line-clamp-3">
                                        {news.description}
                                    </CardDescription>
                                )}
                            </div>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </a>
    );
}

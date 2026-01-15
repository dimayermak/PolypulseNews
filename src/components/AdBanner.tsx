'use client';

import React from 'react';
import { Card, CardContent } from './ui/Card';
import { Badge } from './ui/Badge';
import { ExternalLink, Info } from 'lucide-react';

interface AdBannerProps {
    type?: 'banner' | 'native' | 'sidebar';
    label?: string;
    title: string;
    description: string;
    ctaText: string;
    href: string;
    className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
    type = 'banner',
    label = 'Sponsored',
    title,
    description,
    ctaText,
    href,
    className = "",
}) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`block group transition-all duration-300 ${className}`}
        >
            <Card className={`relative overflow-hidden border-primary/20 hover:border-primary/50 bg-surface/50 backdrop-blur-sm ${type === 'banner' ? 'py-4 px-6' : 'p-6'
                }`}>
                <div className="absolute top-0 right-0 p-2 opacity-30 group-hover:opacity-100 transition-opacity">
                    <Info className="w-3 h-3 text-muted" />
                </div>

                <CardContent className="p-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-[10px] font-mono py-0 h-5 border-white/10 text-muted uppercase tracking-tighter">
                                {label}
                            </Badge>
                        </div>
                        <h3 className="font-heading font-semibold text-lg group-hover:text-primary transition-colors flex items-center gap-2">
                            {title}
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all translate-x-[-4px] group-hover:translate-x-0" />
                        </h3>
                        <p className="text-sm text-muted max-w-2xl leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <div className="flex-shrink-0">
                        <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary text-sm font-mono group-hover:bg-primary group-hover:text-background transition-all shadow-glow-orange/0 group-hover:shadow-glow-orange/20">
                            {ctaText}
                        </div>
                    </div>
                </CardContent>

                {/* Decorative Elements */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/5 blur-3xl rounded-full" />
            </Card>
        </a>
    );
};

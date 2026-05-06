import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Target, Shield, Bolt, Globe } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About PolypulseNews - Prediction Market Intelligence Platform',
    description: 'Learn about PolypulseNews, the leading prediction market intelligence platform aggregating real-time data from Polymarket and Kalshi with correlated news insights.',
    alternates: {
        canonical: 'https://www.polypulsenews.live/about',
    },
    openGraph: {
        title: 'About PolypulseNews',
        description: 'Learn about our prediction market intelligence platform.',
        type: 'website',
        url: 'https://www.polypulsenews.live/about',
    },
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <section className="relative py-24 md:py-32 border-b border-white/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-heading font-bold text-4xl md:text-6xl mb-6">
                        About <span className="gradient-text">PolypulseNews</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto">
                        We built PolypulseNews to solve a critical gap: fragmented prediction market data across multiple platforms.
                    </p>
                </div>
            </section>
            <section className="py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto space-y-8 text-center">
                        <h2 className="font-heading font-bold text-3xl">
                            Our <span className="gradient-text">Mission</span>
                        </h2>
                        <p className="text-muted text-lg leading-relaxed">
                            Prediction markets are efficient crowd wisdom aggregation. But data is scattered. We aggregate, correlate, and visualize this data in real-time.
                        </p>
                    </div>
                </div>
            </section>
            <section className="py-24 bg-surface border-y border-white/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
                            Why <span className="gradient-text">PolypulseNews</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="p-8 rounded-2xl border border-white/10 bg-background">
                            <Globe className="w-8 h-8 text-primary mb-4" />
                            <h3 className="font-heading font-semibold text-xl mb-2">Multi-Platform</h3>
                            <p className="text-muted">Aggregated data from Polymarket and Kalshi.</p>
                        </div>
                        <div className="p-8 rounded-2xl border border-white/10 bg-background">
                            <Bolt className="w-8 h-8 text-primary mb-4" />
                            <h3 className="font-heading font-semibold text-xl mb-2">Real-Time</h3>
                            <p className="text-muted">Live odds, volume, and correlated news.</p>
                        </div>
                        <div className="p-8 rounded-2xl border border-white/10 bg-background">
                            <Target className="w-8 h-8 text-primary mb-4" />
                            <h3 className="font-heading font-semibold text-xl mb-2">News Correlation</h3>
                            <p className="text-muted">AI matching breaking news to markets.</p>
                        </div>
                        <div className="p-8 rounded-2xl border border-white/10 bg-background">
                            <Shield className="w-8 h-8 text-primary mb-4" />
                            <h3 className="font-heading font-semibold text-xl mb-2">Unbiased Data</h3>
                            <p className="text-muted">We present data, never advice.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-24 bg-surface border-t border-white/10 text-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6">
                        Ready to Get the <span className="gradient-text">Edge</span>?
                    </h2>
                    <Link href="/markets">
                        <Button size="lg">Start Exploring <ArrowRight className="w-5 h-5 ml-2" /></Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

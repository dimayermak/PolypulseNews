import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { TrendingMarkets } from '@/components/TrendingMarkets';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Zap, TrendingUp, Newspaper, Sparkles, ArrowRight } from 'lucide-react';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'PolypulseNews | Prediction Market Intelligence & News',
    description: 'Track real-time prediction market data from Polymarket and Kalshi with correlated news insights. Analysis, odds, and trading signals in one place.',
};

export default function HomePage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-white/10">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-50" />

                {/* Radial Gradient Blurs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary opacity-10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-tertiary opacity-10 blur-[120px] rounded-full" />

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <Badge variant="glow" pulse className="mx-auto">
                            Real-Time Market Intelligence
                        </Badge>

                        <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-7xl leading-tight">
                            Prediction Market{' '}
                            <span className="gradient-text">News & Analytics</span>
                        </h1>

                        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
                            Make informed bets with real-time news, data-driven insights, and market intelligence from Polymarket and Kalshi.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/news">
                                <Button size="lg">
                                    Browse Latest News
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                            <Link href="/analytics">
                                <Button variant="outline" size="lg">
                                    View Analytics
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-8">
                            <div className="space-y-1">
                                <div className="font-mono font-bold text-3xl md:text-4xl gradient-text">
                                    2
                                </div>
                                <div className="text-sm text-muted uppercase tracking-wider">
                                    Platforms
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="font-mono font-bold text-3xl md:text-4xl gradient-text">
                                    24/7
                                </div>
                                <div className="text-sm text-muted uppercase tracking-wider">
                                    Live Updates
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="font-mono font-bold text-3xl md:text-4xl gradient-text">
                                    Real
                                </div>
                                <div className="text-sm text-muted uppercase tracking-wider">
                                    News Data
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trending Markets Section */}
            <section className="py-24 border-b border-white/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <TrendingMarkets />
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-surface border-b border-white/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
                            How It <span className="gradient-text">Works</span>
                        </h2>
                        <p className="text-muted text-lg max-w-2xl mx-auto">
                            Your complete workflow from news to informed betting decisions
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-tertiary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                            <div className="relative p-8 rounded-2xl border border-white/10 bg-surface hover:border-primary/50 transition-all">
                                <div className="p-3 rounded-lg bg-primary/20 border border-primary/50 w-fit mb-4 group-hover:shadow-glow-orange transition-all">
                                    <Newspaper className="w-6 h-6 text-primary" />
                                </div>
                                <div className="text-sm font-mono text-primary mb-2">STEP 1</div>
                                <h3 className="font-heading font-semibold text-xl mb-2">
                                    Read the News
                                </h3>
                                <p className="text-muted leading-relaxed">
                                    Browse latest prediction market news aggregated from top sources
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-tertiary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                            <div className="relative p-8 rounded-2xl border border-white/10 bg-surface hover:border-primary/50 transition-all">
                                <div className="p-3 rounded-lg bg-primary/20 border border-primary/50 w-fit mb-4 group-hover:shadow-glow-orange transition-all">
                                    <TrendingUp className="w-6 h-6 text-primary" />
                                </div>
                                <div className="text-sm font-mono text-primary mb-2">STEP 2</div>
                                <h3 className="font-heading font-semibold text-xl mb-2">
                                    Analyze Markets
                                </h3>
                                <p className="text-muted leading-relaxed">
                                    Review real-time odds, volume trends, and data-driven insights
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-tertiary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                            <div className="relative p-8 rounded-2xl border border-white/10 bg-surface hover:border-primary/50 transition-all">
                                <div className="p-3 rounded-lg bg-primary/20 border border-primary/50 w-fit mb-4 group-hover:shadow-glow-orange transition-all">
                                    <Sparkles className="w-6 h-6 text-primary" />
                                </div>
                                <div className="text-sm font-mono text-primary mb-2">STEP 3</div>
                                <h3 className="font-heading font-semibold text-xl mb-2">
                                    Trade with Confidence
                                </h3>
                                <p className="text-muted leading-relaxed">
                                    Place informed bets on Polymarket or Kalshi with our affiliate links
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-tertiary/10" />
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Zap className="w-16 h-16 text-primary mx-auto mb-6" />
                    <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
                        Ready to Get the <span className="gradient-text">Edge</span>?
                    </h2>
                    <p className="text-muted text-lg max-w-2xl mx-auto mb-8">
                        Join traders and analysts using PolypulseNews for market intelligence
                    </p>
                    <Link href="/markets">
                        <Button size="lg">
                            Start Exploring
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Zap className="w-5 h-5 text-primary" />
                                <span className="font-heading font-bold">
                                    Polypulse<span className="gradient-text">News</span>
                                </span>
                            </div>
                            <p className="text-sm text-muted">
                                Your source for prediction market news and analytics
                            </p>
                        </div>
                        <div>
                            <h4 className="font-mono text-sm uppercase tracking-wider text-white mb-4">Data Sources</h4>
                            <ul className="space-y-2 text-sm text-muted">
                                <li>Polymarket (Gamma API)</li>
                                <li>Kalshi (Public API)</li>
                                <li>Google News RSS</li>
                                <li>
                                    <Link href="/sitemap.xml" className="hover:text-primary transition-colors">
                                        Sitemap (Index)
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-mono text-sm uppercase tracking-wider text-white mb-4">Disclosure</h4>
                            <p className="text-sm text-muted">
                                This site contains affiliate links. We may earn a commission when you trade on Polymarket or Kalshi through our links.
                            </p>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-white/10 text-center text-sm text-muted">
                        © 2026 PolypulseNews. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}

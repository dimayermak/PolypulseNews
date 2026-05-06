import React from 'react';
import Link from 'next/link';
import { MarketCategory } from '@/lib/types';

const categories: { name: string; value: MarketCategory }[] = [
    { name: 'Politics', value: 'politics' },
    { name: 'Crypto', value: 'crypto' },
    { name: 'Economics', value: 'economics' },
    { name: 'Technology', value: 'technology' },
    { name: 'Sports', value: 'sports' },
    { name: 'Entertainment', value: 'entertainment' },
];

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-background py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <span className="font-heading font-bold text-2xl tracking-tighter">
                                Polypulse<span className="text-primary">News</span>
                            </span>
                        </Link>
                        <p className="text-muted text-sm leading-relaxed max-w-xs">
                            Real-time prediction market intelligence. Track odds, analyze news, and stay ahead of the curve with data from Polymarket and Kalshi.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-mono font-bold text-sm uppercase tracking-wider mb-4 text-white">
                            Markets
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/markets" className="text-muted hover:text-primary transition-colors text-sm">
                                    All Markets
                                </Link>
                            </li>
                            {categories.map((category) => (
                                <li key={category.value}>
                                    <Link
                                        href={`/markets?category=${category.value}`}
                                        className="text-muted hover:text-primary transition-colors text-sm"
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-mono font-bold text-sm uppercase tracking-wider mb-4 text-white">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/news" className="text-muted hover:text-primary transition-colors text-sm">
                                    News
                                </Link>
                            </li>
                            <li>
                                <Link href="/analytics" className="text-muted hover:text-primary transition-colors text-sm">
                                    Analytics
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-muted hover:text-primary transition-colors text-sm">About</Link></li><li><Link href="/guides" className="text-muted hover:text-primary transition-colors text-sm">
                                    Guides
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-muted text-xs">
                        (C) {new Date().getFullYear()} PolypulseNews. All rights reserved.
                    </p>
                    <p className="text-muted text-xs">
                        Data provided for informational purposes only. Not financial advice.
                    </p>
                </div>
            </div>
        </footer>
    );
}

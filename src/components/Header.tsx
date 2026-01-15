'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Zap } from 'lucide-react';

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-tertiary shadow-glow-orange group-hover:shadow-glow-orange-lg transition-all">
                            <Zap className="w-5 h-5 text-background" />
                        </div>
                        <span className="font-heading font-bold text-xl">
                            Polypulse<span className="gradient-text">News</span>
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        <Link href="/news" className="px-4 py-2 font-mono text-sm uppercase tracking-wider text-muted hover:text-primary transition-colors">
                            News
                        </Link>
                        <Link href="/markets" className="px-4 py-2 font-mono text-sm uppercase tracking-wider text-muted hover:text-primary transition-colors">
                            Markets
                        </Link>
                        <Link href="/analytics" className="px-4 py-2 font-mono text-sm uppercase tracking-wider text-muted hover:text-primary transition-colors">
                            Analytics
                        </Link>
                        <Link href="/guides" className="px-4 py-2 font-mono text-sm uppercase tracking-wider text-muted hover:text-primary transition-colors">
                            Playbook
                        </Link>
                    </nav>

                    {/* CTA */}
                    <div className="flex items-center gap-4">
                        <Link href="/markets">
                            <Button size="sm">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

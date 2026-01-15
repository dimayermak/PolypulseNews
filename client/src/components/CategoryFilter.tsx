'use client';

import React from 'react';
import { MarketCategory } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
    selected: MarketCategory;
    onSelect: (category: MarketCategory) => void;
}

const categories: { value: MarketCategory; label: string }[] = [
    { value: 'all', label: 'All Markets' },
    { value: 'politics', label: 'Politics' },
    { value: 'sports', label: 'Sports' },
    { value: 'economics', label: 'Economics' },
    { value: 'technology', label: 'Technology' },
    { value: 'crypto', label: 'Crypto' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'other', label: 'Other' },
];

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
                <button
                    key={category.value}
                    onClick={() => onSelect(category.value)}
                    className={cn(
                        'px-4 py-2 rounded-full font-mono text-sm uppercase tracking-wider transition-all duration-300',
                        'border border-white/20',
                        selected === category.value
                            ? 'bg-gradient-to-r from-secondary to-primary text-white shadow-glow-orange scale-105'
                            : 'bg-transparent text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5'
                    )}
                >
                    {category.label}
                </button>
            ))}
        </div>
    );
}

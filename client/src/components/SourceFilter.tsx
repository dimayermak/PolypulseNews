'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export type MarketSource = 'all' | 'polymarket' | 'kalshi';

interface SourceFilterProps {
    selected: MarketSource;
    onSelect: (source: MarketSource) => void;
}

const sources: { value: MarketSource; label: string }[] = [
    { value: 'all', label: 'All Sources' },
    { value: 'polymarket', label: 'Polymarket' },
    { value: 'kalshi', label: 'Kalshi' },
];

export function SourceFilter({ selected, onSelect }: SourceFilterProps) {
    return (
        <div className="flex bg-surface-hover rounded-lg p-1 border border-white/10 w-fit">
            {sources.map((source) => (
                <button
                    key={source.value}
                    onClick={() => onSelect(source.value)}
                    className={cn(
                        'px-4 py-2 rounded-md font-medium text-sm transition-all duration-300',
                        selected === source.value
                            ? 'bg-surface border border-white/10 text-white shadow-sm'
                            : 'text-muted hover:text-white hover:bg-white/5'
                    )}
                >
                    {source.label}
                </button>
            ))}
        </div>
    );
}

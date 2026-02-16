import React from 'react';
import Link from 'next/link';
import { Button } from './Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming cn exists, check import in Button.tsx

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath: string; // e.g., '/markets'
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
    if (totalPages <= 1) return null;

    const getPageLink = (page: number) => {
        // Construct URL with existing params if needed, but for now simple basePath?page=X
        const url = new URL(basePath, 'https://example.com'); // dummy base for URL construction if basePath is relative
        // Actually simple string concat is safer for relative paths in Next.js Link
        return `${basePath}?page=${page}`;
    };

    // Generate page numbers to show
    const getPageNumbers = () => {
        const delta = 2; // number of pages to show around current
        const range = [];
        const rangeWithDots = [];
        let l;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    };

    return (
        <div className="flex items-center justifying-center gap-2 py-8">
            <div className="flex items-center gap-2">
                {currentPage > 1 && (
                    <Link href={getPageLink(currentPage - 1)} passHref legacyBehavior>
                        <Button variant="outline" size="icon" aria-label="Previous Page">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                )}

                {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                        {page === '...' ? (
                            <span className="px-2 text-muted">...</span>
                        ) : (
                            <Link href={getPageLink(page as number)} passHref legacyBehavior>
                                <Button
                                    variant={currentPage === page ? "default" : "outline"}
                                    size="icon"
                                    className="w-10"
                                >
                                    {page}
                                </Button>
                            </Link>
                        )}
                    </React.Fragment>
                ))}

                {currentPage < totalPages && (
                    <Link href={getPageLink(currentPage + 1)} passHref legacyBehavior>
                        <Button variant="outline" size="icon" aria-label="Next Page">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}

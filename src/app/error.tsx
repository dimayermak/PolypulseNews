"use client";

import React from 'react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('PolypulseNews error:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="max-w-lg w-full text-center space-y-6">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-red-500/20 border border-red-500/50">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <div className="space-y-4">
                    <h1 className="font-heading font-bold text-3xl">
                        Something Went Wrong
                    </h1>
                    <p className="text-muted">
                        We encountered an error while loading this page. Please try again.
                    </p>
                    {/* Error details available in development */}
                    {error.digest && (
                        <pre className="text-xs text-red-400 bg-surface p-4 rounded-lg overflow-x-auto">
                            Digest: {error.digest}
                        </pre>
                    )}
                </div>
                <div className="flex gap-4 justify-center">
                    <Button onClick={reset}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Try Again
                    </Button>
                    <Button variant="outline" onClick={() => window.location.href = '/'}>
                        Go to Homepage
                    </Button>
                </div>
            </div>
        </div>
    );
}

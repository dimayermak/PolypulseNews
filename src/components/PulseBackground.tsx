'use client';

import React from 'react';

export const PulseBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Organic pulse blurs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse-slow" />
            <div className="absolute bottom-[-15%] right-[-5%] w-[50%] h-[50%] bg-quaternary/10 blur-[150px] rounded-full animate-pulse-slower" style={{ animationDelay: '2s' }} />
            <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-tertiary/5 blur-[100px] rounded-full animate-pulse-slow" style={{ animationDelay: '4s' }} />

            {/* Subtle interactive mesh */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="pulse-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/20" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#pulse-grid)" />
            </svg>

            {/* Scanning line animation */}
            <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent top-0 animate-scan" />

            {/* Overlay to ensure readability */}
            <div className="absolute inset-0 bg-background/40 backdrop-grayscale-[0.2]" />
        </div>
    );
};

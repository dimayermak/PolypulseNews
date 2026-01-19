'use client';

import React from 'react';

interface AAdsBannerProps {
    className?: string;
}

export const AAdsBanner: React.FC<AAdsBannerProps> = ({ className = "" }) => {
    return (
        <div
            className={`w-full relative z-[9999] py-8 ${className}`}
            style={{ margin: 'auto' }}
        >
            <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-mono text-muted uppercase tracking-widest opacity-50">
                    ADVERTISEMENT
                </span>
                <div id="frame" className="w-full flex justify-center">
                    <iframe
                        data-aa='2424749'
                        src='//acceptable.a-ads.com/2424749/?size=Adaptive'
                        style={{
                            border: 0,
                            padding: 0,
                            width: '100%',
                            maxWidth: '728px',
                            height: '90px',
                            overflow: 'hidden',
                            display: 'block',
                            margin: 'auto'
                        }}
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

'use client';

import React from 'react';

export function ExternalAd() {
    return (
        <div id="frame" style={{ width: '100%', margin: 'auto', position: 'relative', zIndex: 99998 }}>
            <iframe
                data-aa='2424749'
                src='//acceptable.a-ads.com/2424749/?size=Adaptive'
                style={{
                    border: 0,
                    padding: 0,
                    width: '70%',
                    height: 'auto',
                    minHeight: '90px',
                    overflow: 'hidden',
                    display: 'block',
                    margin: 'auto'
                }}
            />
        </div>
    );
}

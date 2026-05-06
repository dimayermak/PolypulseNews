/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'news.google.com', pathname: '/**' },
            { protocol: 'https', hostname: 'lh3.googleusercontent.com', pathname: '/**' },
            { protocol: 'https', hostname: '*.polymarket.com', pathname: '/**' },
            { protocol: 'https', hostname: 's3.amazonaws.com', pathname: '/**' },
        ],
    },
    compress: true,
    // Redirect non-www to www for canonical URL consistency
    async redirects() {
        return [
            {
                source: '/:path*',
                has: [
                    {
                        type: 'host',
                        value: 'polypulsenews.live',
                    },
                ],
                destination: 'https://www.polypulsenews.live/:path*',
                permanent: true,
            },
        ];
    },
    // Security and caching headers
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                ],
            },
            {
                // Cache sitemap for 1 hour so Google gets fresh data
                source: '/sitemap.xml',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;

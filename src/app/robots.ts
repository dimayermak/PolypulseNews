import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://www.polypulsenews.live';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/admin/',
                    '/*?page=*',      // Prevent indexing paginated URLs
                    '/*?category=*',  // Prevent indexing filtered URLs
                    '/*?search=*',    // Prevent indexing search URLs
                ],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}

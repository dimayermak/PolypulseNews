import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://polypulsenews.live';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}

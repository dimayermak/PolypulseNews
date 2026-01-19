import axios from 'axios';

const SCRAPER_TIMEOUT = 10000; // 10 seconds
const USER_AGENT = 'Mozilla/5.0 (compatible; PolypulseBot/1.0; +https://polypulsenews.live)';

export interface ScrapedContent {
    fullText: string;
    cleanHtml: string;
    success: boolean;
    error?: string;
}

// Source-specific content selectors
const CONTENT_SELECTORS: Record<string, string[]> = {
    'reuters.com': ['.article-body__content', '[data-testid="paragraph"]', '.article__content'],
    'techcrunch.com': ['.article-content', '.entry-content'],
    'bbc.co.uk': ['.story-body__inner', '[data-component="text-block"]'],
    'bbc.com': ['.story-body__inner', '[data-component="text-block"]'],
    'coindesk.com': ['.at-content-wrapper', '.article-body'],
    'cointelegraph.com': ['.post-content', '.post__content'],
    'theverge.com': ['.article-body', '.c-entry-content'],
    'wired.com': ['.article__body', '.body__inner-container'],
    'cnbc.com': ['.ArticleBody-articleBody', '.group'],
    'bloomberg.com': ['.body-content', '.article-body'],
    'nytimes.com': ['.StoryBodyCompanionColumn', 'section[name="articleBody"]'],
    'wsj.com': ['.article-content', '.wsj-snippet-body'],
    'forbes.com': ['.article-body', '.body-container'],
};

function getDomainFromUrl(url: string): string {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.replace('www.', '');
    } catch {
        return '';
    }
}

function extractContentWithSelectors(html: string, selectors: string[]): string {
    // Simple HTML parser without dependencies - basic tag matching    
    let content = '';

    for (const selector of selectors) {
        // Very basic selector matching for common patterns like .class-name
        if (selector.startsWith('.')) {
            const className = selector.slice(1).replace(/\./g, ' ');
            const regex = new RegExp(`<[^>]*class=["'][^"']*${className.split(' ')[0]}[^"']*["'][^>]*>([\\s\\S]*?)<\/[^>]+>`, 'gi');
            const matches = html.match(regex);
            if (matches && matches.length > 0) {
                content = matches.join('\n');
                break;
            }
        }
    }

    // Fallback: extract all <p> tags
    if (!content) {
        const pTagRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
        const paragraphs = [];
        let match;
        while ((match = pTagRegex.exec(html)) !== null) {
            paragraphs.push(match[1]);
        }
        content = paragraphs.slice(0, 50).join('\n\n'); // Take first 50 paragraphs
    }

    return content;
}

function cleanHtmlContent(html: string): string {
    // Remove scripts, styles, and other noise
    let cleaned = html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
        .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
        .replace(/<!--[\s\S]*?-->/g, '');

    // Remove HTML attributes but keep tags for basic formatting
    cleaned = cleaned.replace(/<([a-z]+)[^>]*>/gi, '<$1>');

    // Convert common tags to readable format
    cleaned = cleaned
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/p>/gi, '\n\n')
        .replace(/<p>/gi, '')
        .replace(/<\/h[1-6]>/gi, '\n\n')
        .replace(/<h[1-6]>/gi, '\n')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"');

    // Remove remaining HTML tags for plain text
    const plainText = cleaned.replace(/<[^>]+>/g, '');

    // Clean up whitespace
    return plainText
        .replace(/\n{3,}/g, '\n\n')
        .replace(/[ \t]+/g, ' ')
        .trim();
}

export async function scrapeArticleContent(url: string): Promise<ScrapedContent> {
    try {
        const domain = getDomainFromUrl(url);

        if (!domain) {
            return {
                fullText: '',
                cleanHtml: '',
                success: false,
                error: 'Invalid URL'
            };
        }

        // Fetch the page
        const response = await axios.get(url, {
            timeout: SCRAPER_TIMEOUT,
            headers: {
                'User-Agent': USER_AGENT,
                'Accept': 'text/html,application/xhtml+xml',
            },
            maxRedirects: 3,
        });

        const html = response.data;

        // Get selectors for this domain
        const selectors = CONTENT_SELECTORS[domain] || [];

        // Extract content
        let rawContent = extractContentWithSelectors(html, selectors);

        if (!rawContent || rawContent.length < 100) {
            return {
                fullText: '',
                cleanHtml: '',
                success: false,
                error: 'Could not extract meaningful content'
            };
        }

        // Clean the content
        const cleanText = cleanHtmlContent(rawContent);

        return {
            fullText: cleanText,
            cleanHtml: rawContent,
            success: true
        };

    } catch (error: any) {
        console.error(`Scraping error for ${url}:`, error.message);
        return {
            fullText: '',
            cleanHtml: '',
            success: false,
            error: error.message || 'Unknown scraping error'
        };
    }
}

export function shouldScrapeSource(source: string): boolean {
    const scrapableDirectly = [
        'reuters', 'techcrunch', 'bbc', 'coindesk', 'cointelegraph',
        'theverge', 'wired', 'cnbc'
    ];

    return scrapableDirectly.some(s => source.toLowerCase().includes(s));
}

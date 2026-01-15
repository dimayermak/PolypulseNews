export interface Guide {
    id: string;
    slug: string;
    title: string;
    description: string;
    category: 'basics' | 'strategies' | 'platforms' | 'advanced';
    content: string;
    imageUrl?: string;
    lastUpdated: string;
    readTime: string;
    author: string;
}

const GUIDES: Guide[] = [
    {
        id: '1',
        slug: 'intro-to-prediction-markets',
        title: 'Ultimate Guide to Prediction Markets 101',
        description: 'Learn how prediction markets work, why they are more accurate than polls, and how to start trading.',
        category: 'basics',
        readTime: '8 min',
        author: 'Polypulse Research',
        lastUpdated: '2024-01-15',
        imageUrl: 'https://images.unsplash.com/photo-1611974717528-587ad043d1b4?auto=format&fit=crop&q=80&w=1000',
        content: `
            <h2>What are Prediction Markets?</h2>
            <p>At their core, prediction markets are "information aggregators." Unlike traditional betting where you bet against a house, here you are trading against the collective wisdom of thousands of other participants. Every share price in a prediction market represents the collective probability of a future event occurring.</p>
            
            <blockquote>"Prediction markets are the cleanest way to measure what the world actually thinks will happen."</blockquote>

            <h2>How the Math Works</h2>
            <p>In most markets (like Polymarket or Kalshi), shares are priced between $0.00 and $1.00. If a "YES" share for an event is priced at $0.65, the market believes there is a 65% chance that event will occur. If you buy at $0.65 and the event happens, your share becomes worth $1.00. If it doesn't, it goes to $0.00.</p>

            <h2>Why They Beat Traditional Polls</h2>
            <ul>
                <li><strong>Skin in the Game:</strong> Participants have a financial incentive to be right, not just to voice an opinion.</li>
                <li><strong>Real-Time Updates:</strong> Prices adjust instantly to new information, whereas polls take days to conduct.</li>
                <li><strong>No Social Bias:</strong> Anonymous trading removes the pressure to give "socially acceptable" answers.</li>
            </ul>
        `
    },
    {
        id: '2',
        slug: 'polymarket-vs-kalshi',
        title: 'Polymarket vs. Kalshi: Which Platform is Right for You?',
        description: 'A deep comparison of the two giants in the prediction market space, covering liquidity, fees, and legality.',
        category: 'platforms',
        readTime: '12 min',
        author: 'Polypulse Research',
        lastUpdated: '2024-01-15',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bbbda5366391?auto=format&fit=crop&q=80&w=1000',
        content: `
            <h2>The Clash of the Titans</h2>
            <p>If you want to trade on the future, you likely have two main options: <strong>Polymarket</strong> (Decentralized, Crypto-based) and <strong>Kalshi</strong> (Regulated, US-based). Understanding their differences is crucial for your trading strategy.</p>

            <h3>1. Regulation & Access</h3>
            <p>Kalshi is the first legally regulated prediction market in the US. It is registered with the CFTC, meaning it follows strict federal guidelines. Polymarket, on the other hand, operates as a decentralized protocol on the Polygon blockchain, making it highly accessible world-wide but often restricted for US residents.</p>

            <h3>2. Currencies used</h3>
            <p>Polymarket uses USDC (a stablecoin pegged to the Dollar), allowing for near-instant global settlements. Kalshi uses traditional US Dollars via bank transfers (ACH/Wire).</p>

            <h3>3. Market Breadth</h3>
            <p>Polymarket's decentralized nature allows for a massive variety of markers, from "Will it rain in London tomorrow?" to "Who will win the Bitcoin ETF race?". Kalshi focuses heavily on highly regulated events like interest rates, economic data, and major political outcomes.</p>
        `
    },
    {
        id: '3',
        slug: 'arbitrage-strategies',
        title: 'Advanced Arbitrage in Prediction Markets',
        description: 'How to profit from price discrepancies between different prediction platforms using professional techniques.',
        category: 'strategies',
        readTime: '15 min',
        author: 'Polypulse Research',
        lastUpdated: '2024-01-14',
        imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1000',
        content: `
            <h2>Understanding Prediction Arbitrage</h2>
            <p>Arbitrage occurs when the same event is priced differently across two platforms. For example, if Polymarket says a 70% chance of an event and Kalshi says 65%, there is a 5% spread that a disciplined trader can exploit.</p>

            <h3>Cross-Platform Locking</h3>
            <p>By buying "NO" on the overpriced platform and "YES" on the underpriced one, you can lock in a guaranteed profit regardless of the event's outcome. This is known as "Delta Neutral" trading in the professional finance world.</p>

            <h3>Hedging with Real-World Markets</h3>
            <p>Modern traders don't just trade one market against another; they hedge against traditional assets. If you bet on a "Bitcoin over 100k" prediction market, you might hedge that position by shorting BTC futures on a traditional exchange.</p>
        `
    }
];

export async function getGuides(): Promise<Guide[]> {
    return GUIDES;
}

export async function getGuideBySlug(slug: string): Promise<Guide | undefined> {
    return GUIDES.find(g => g.slug === slug);
}

export async function getRelatedGuides(currentSlug: string): Promise<Guide[]> {
    return GUIDES.filter(g => g.slug !== currentSlug).slice(0, 3);
}

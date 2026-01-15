export interface Guide {
    id: string;
    slug: string;
    title: string;
    description: string;
    category: 'Information' | 'Strategy' | 'Skill Building';
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
        title: 'Instruction: The Mechanics of Information Aggregation',
        description: 'A deep-dive into how prediction markets serve as the worlds most accurate truth machines.',
        category: 'Information',
        readTime: '12 min',
        author: 'Polypulse Intelligence',
        lastUpdated: '2024-01-15',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bbbda5366391?q=80&w=1200&auto=format&fit=crop',
        content: `
            <h2>The Science of Prediction</h2>
            <p>At their core, prediction markets are decentralized information processors. While traditional polls measure what people <em>say</em> they will do, markets measure what they are willing to <em>risk</em>. This distinction is the foundation of market efficiency.</p>
            
            <p><strong>Skin in the Game:</strong> In a prediction market, every participant is financially incentivized to be correct. This filters out "noise" and "virtue signaling," leaving only high-signal data points. When a trader buys a share, they are effectively publishing their private information to the public price.</p>

            <h3>How Intelligence is Priced</h3>
            <p>If an event is priced at 75¢, it means the collective intelligence of the market believes there is a 75% probability of that outcome. If you have superior information or a better model that says the probability is actually 85%, you have an "edge." Exploiting this edge is what drives the price toward the true probability.</p>

            <blockquote>"The price is the signal. The trade is the feedback loop."</blockquote>

            <h3>The Oracle Problem</h3>
            <p>The biggest challenge in prediction markets is the 'Oracle'—the mechanism that determines the actual outcome. Platforms like Polymarket use decentralized oracles (UMA) while Kalshi uses regulated third-party data. Understanding the settlement mechanism is as important as understanding the prediction itself.</p>
        `
    },
    {
        id: '2',
        slug: 'arbitrage-strategies',
        title: 'Strategy: Advanced Cross-Platform Arbitrage',
        description: 'Professional-grade battle plans for exploiting price discrepancies between Kalshi and Polymarket.',
        category: 'Strategy',
        readTime: '20 min',
        author: 'Polypulse Intelligence',
        lastUpdated: '2024-01-16',
        imageUrl: 'https://images.unsplash.com/photo-1611974717528-587ad043d1b4?q=80&w=1200&auto=format&fit=crop',
        content: `
            <h2>The Arbitrage Opportunity</h2>
            <p>Markets are rarely identical. Because Kalshi is a US-regulated exchange and Polymarket is a decentralized protocol, their participant pools differ significantly. This creates structural price gaps—Alpha.</p>

            <h3>1. The Spread Capture</h3>
            <p>Suppose the 'Fed Interest Rate' market is at 80% on Kalshi and 76% on Polymarket. By buying 'NO' on Kalshi (pricing the event at 20%) and 'YES' on Polymarket (pricing it at 76%), you are essentially betting on the convergence of these two entities. If you size your positions correctly, you can create a risk-neutral profile where you profit regardless of the Fed decision.</p>

            <h3>2. Emotional Hedging</h3>
            <p>Prediction markets allow you to hedge against "black swan" events in your life or portfolio. If you are heavily invested in Tech stocks, buying a 'Rate Hike' prediction share acts as a mathematical insurance policy. If rates rise and your stocks fall, your prediction shares payout.</p>

            <h3>Best Practices for Execution</h3>
            <ul>
                <li><strong>Liquidity Depth:</strong> Never enter an arbitrage trade without checking the order book depth first. Slippage can eat 100% of your expected spread.</li>
                <li><strong>Gas & Fees:</strong> Factor in Polygon gas fees for Polymarket and withdrawal fees for Kalshi.</li>
                <li><strong>Timing:</strong> Convergence often happens in the final 24 hours before an event. Patience is a skill.</li>
            </ul>
        `
    },
    {
        id: '3',
        slug: 'liquidity-depth-mapping',
        title: 'Skill Building: Mastery of Order Book Analysis',
        description: 'How to map global liquidity flows to enter and exit large positions without slippage.',
        category: 'Skill Building',
        readTime: '15 min',
        author: 'Polypulse Intelligence',
        lastUpdated: '2024-01-16',
        imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop',
        content: `
            <h2>Level Up: Beyond the Price</h2>
            <p>Intermediate traders look at the price. Professionals look at the <strong>Depth</strong>. The order book is a map of where people are willing to stand their ground.</p>

            <h3>The "Walls" of Resistance</h3>
            <p>When you see a large 'Sell Wall' at 60¢, it indicates a major stakeholder or institution doesn't believe the price should rise further. Often, these walls are "fake"—designed to scare off small traders. Learning to identify 'Spoofing' is a critical skill for high-frequency prediction trading.</p>

            <h3>Volume Profile Mapping</h3>
            <p>High volume at a specific price point creates a "Value Area." If a price moves outside this area, it is likely to return unless there is a significant news catalyst. Use Polypulse Analytics to track where the 'Smart Money' is concentrating their buys.</p>

            <blockquote>"In markets with thin liquidity, your exit is more important than your entry."</blockquote>

            <h3>Exercises</h3>
            <ol>
                <li>Find a market with <$10k volume. Try to buy $500 worth of shares and observe the slippage.</li>
                <li>Analyze the Polymarket vs. Kalshi volume split for the same event and identify which platform is the "Price Leader."</li>
            </ol>
        `
    },
    {
        id: '4',
        slug: 'market-psychology',
        title: 'Strategy: Logic vs. Emotional Bias',
        description: 'Training your mind to ignore social media noise and focus purely on data-driven signals.',
        category: 'Strategy',
        readTime: '10 min',
        author: 'Polypulse Intelligence',
        lastUpdated: '2024-01-16',
        imageUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1200&auto=format&fit=crop',
        content: `
            <h2>The Psychology of the Trade</h2>
            <p>Social media is a echo chamber. Prediction markets are a reality check. The most common mistake traders make is "Wishing"—betting on what they <em>want</em> to happen rather than what the <em>data</em> says will happen.</p>

            <h3>Confirmation Bias</h3>
            <p>If you only read news sources that support your worldview, you are at a massive disadvantage. Prediction markets force you to put a price on your beliefs. If your belief is wrong, the market will take your money. This is the ultimate behavioral correction.</p>

            <h3>Best Practices: The "Anti-Thesis" Method</h3>
            <p>For every trade you make, you should be able to write down three strong reasons why you might be wrong. If you cannot do this, you are trading on emotion, not intelligence.</p>
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

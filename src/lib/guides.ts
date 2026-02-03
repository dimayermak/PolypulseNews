export interface Guide {
    id: string;
    slug: string;
    title: string;
    description: string;
    category: string;
    imageUrl?: string;
    readTime: string;
    author: string;
    keywords: string[];
}

export const GUIDES: Guide[] = [
    {
        id: '1',
        slug: 'how-prediction-markets-work',
        title: 'How Prediction Markets Work: A Complete Guide',
        description: 'Learn the fundamentals of prediction markets, how odds are calculated, and why they outperform traditional polls in forecasting elections, sports outcomes, and economic events.',
        category: 'Basics',
        imageUrl: '',
        readTime: '8 min read',
        author: 'Polypulse Team',
        keywords: ['prediction markets', 'how prediction markets work', 'polymarket guide', 'kalshi tutorial', 'market odds', 'probability forecasting', 'wisdom of crowds', 'election betting', 'sports betting markets']
    },
    {
        id: '2',
        slug: 'polymarket-vs-kalshi-complete-comparison',
        title: 'Polymarket vs Kalshi: Complete Platform Comparison 2026',
        description: 'In-depth comparison of the two largest prediction market platforms. Coverage includes fees, liquidity, market selection, regulation status, and which platform is best for different types of traders.',
        category: 'Strategy',
        imageUrl: '',
        readTime: '12 min read',
        author: 'Polypulse Team',
        keywords: ['polymarket vs kalshi', 'best prediction market platform', 'kalshi review', 'polymarket review', 'prediction market fees', 'crypto prediction markets', 'regulated prediction markets', 'polymarket liquidity']
    },
    {
        id: '3',
        slug: 'reading-election-odds-guide',
        title: 'How to Read Election Odds Like a Pro',
        description: 'Master the art of interpreting election market odds. Learn to spot mispriced markets, understand implied probability, and use prediction markets to forecast political outcomes more accurately than polls.',
        category: 'Advanced',
        readTime: '10 min read',
        author: 'Polypulse Team',
        keywords: ['election odds', '2024 election predictions', 'presidential election betting', 'how to read betting odds', 'implied probability', 'election forecasting', 'political prediction markets', 'trump vs biden odds']
    },
    {
        id: '4',
        slug: 'crypto-market-volatility-strategy',
        title: 'Trading Crypto Prediction Markets During High Volatility',
        description: 'Advanced strategies for navigating Bitcoin, Ethereum, and altcoin prediction markets during periods of extreme volatility. Includes risk management frameworks and position sizing tactics.',
        category: 'Advanced',
        readTime: '15 min read',
        author: 'Polypulse Team',
        keywords: ['crypto prediction markets', 'bitcoin price predictions', 'ethereum trading strategy', 'crypto volatility trading', 'defi markets', 'cryptocurrency betting', 'bitcoin market analysis']
    },
    {
        id: '5',
        slug: 'understanding-market-liquidity',
        title: 'Market Liquidity Explained: Why It Matters for Your Trades',
        description: 'Deep dive into market liquidity, bid-ask spreads, and volume analysis. Learn how to identify liquid markets and avoid getting stuck in illiquid positions.',
        category: 'Basics',
        readTime: '7 min read',
        author: 'Polypulse Team',
        keywords: ['market liquidity', 'bid ask spread', 'trading volume analysis', 'liquid markets', 'prediction market liquidity', 'orderbook depth', 'market making']
    },
    {
        id: '6',
        slug: 'sports-betting-vs-prediction-markets',
        title: 'Sports Betting vs Prediction Markets: Key Differences',
        description: 'Understand the critical differences between traditional sports betting and prediction markets for sports outcomes. Includes odds comparison, legal considerations, and profit potential.',
        category: 'Strategy',
        readTime: '9 min read',
        author: 'Polypulse Team',
        keywords: ['sports prediction markets', 'nfl betting markets', 'nba prediction markets', 'super bowl odds', 'sports betting strategy', 'prediction market sports', 'kalshi sports markets']
    },
    {
        id: '7',
        slug: 'economic-data-trading-guide',
        title: 'Trading Economic Data Releases: Fed Rate Decision Strategy',
        description: 'Expert guide to trading prediction markets around Federal Reserve announcements, GDP reports, inflation data, and employment numbers. Learn to profit from economic volatility.',
        category: 'Advanced',
        readTime: '14 min read',
        author: 'Polypulse Team',
        keywords: ['fed rate predictions', 'economic data trading', 'inflation prediction markets', 'gdp forecast markets', 'federal reserve betting', 'interest rate predictions', 'macro trading strategy']
    },
    {
        id: '8',
        slug: 'risk-management-prediction-markets',
        title: 'Risk Management for Prediction Market Traders',
        description: 'Professional risk management framework including position sizing, stop-loss strategies, portfolio diversification, and psychological discipline for long-term profitability.',
        category: 'Strategy',
        readTime: '11 min read',
        author: 'Polypulse Team',
        keywords: ['trading risk management', 'position sizing strategy', 'prediction market risk', 'stop loss tactics', 'portfolio management', 'trading psychology', 'bankroll management']
    },
    {
        id: '9',
        slug: 'news-driven-trading-strategy',
        title: 'News-Driven Trading: How to React to Breaking Events',
        description: 'Capitalize on breaking news by understanding how different types of events affect market odds. Includes case studies from recent elections, geopolitical events, and market-moving announcements.',
        category: 'Advanced',
        readTime: '13 min read',
        author: 'Polypulse Team',
        keywords: ['news trading strategy', 'event driven trading', 'breaking news markets', 'fast money prediction markets', 'scalping prediction markets', 'market reaction analysis']
    }
];

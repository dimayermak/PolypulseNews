# PolypulseNews - Prediction Market News Platform

A premium news platform that aggregates real-time prediction market data from Polymarket and Kalshi APIs, displaying trending markets with correlated news from Google News RSS feeds.

## 🚀 Features

### Core Features
- **Real-Time Market Data**: Live odds and volume from Polymarket and Kalshi
- **Correlated News**: Automatically matched news articles from Google News for every market
- **Category Filtering**: Browse markets by Politics, Sports, Economics, Technology, Crypto, and more
- **Search Functionality**: Find specific markets quickly
- **Responsive Design**: Premium Bitcoin DeFi aesthetic that works on all devices

### Monetization Features
- **Premium Analytics**: Historical charts, trend analysis, and volume tracking (Pro tier)
- **Embeddable Widgets**: Licensable odds widgets for news sites and blogs
- **Affiliate Integration**: Polymarket and Kalshi affiliate links on market cards
- **Freemium Model**: Free basic access with premium features behind paywall

## 🎨 Design System

This platform uses the **Bitcoin DeFi aesthetic** - a sophisticated fusion of precision engineering, cryptographic trust, and digital gold:

- **Colors**: True Void (#030304) background with Bitcoin Orange (#F7931A) and Digital Gold (#FFD600) accents
- **Typography**: Space Grotesk (headings), Inter (body), JetBrains Mono (data/stats)
- **Effects**: Colored glow shadows, glass morphism, gradient text, grid patterns
- **Animations**: Floating elements, pulsing indicators, smooth transitions

## 📁 Project Structure

```
client/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── layout.tsx         # Root layout with fonts
│   │   ├── page.tsx           # Landing page
│   │   ├── markets/
│   │   │   ├── page.tsx       # Markets listing
│   │   │   └── [slug]/page.tsx # Market detail
│   │   ├── premium/page.tsx   # Premium analytics
│   │   └── widgets/page.tsx   # Widget builder
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Badge.tsx
│   │   ├── Header.tsx         # Navigation header
│   │   ├── MarketCard.tsx     # Market display card
│   │   ├── NewsCard.tsx       # News article card
│   │   ├── CategoryFilter.tsx # Category filter buttons
│   │   └── TrendingMarkets.tsx # Trending carousel
│   └── lib/
│       ├── api.ts             # API client functions
│       ├── types.ts           # TypeScript types
│       └── utils.ts           # Utility functions
├── public/                    # Static assets
├── tailwind.config.ts         # Tailwind with custom tokens
├── next.config.js            # Next.js configuration
└── package.json              # Dependencies
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom Bitcoin DeFi design tokens
- **Data Fetching**: SWR for client-side data fetching with auto-refresh
- **Icons**: Lucide React
- **Animations**: Framer Motion (optional)
- **Charts**: Recharts (for premium features)

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm

### Setup

1. **Install dependencies**:
   ```bash
   cd client
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env.local` file in the `client` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open browser**:
   Navigate to `http://localhost:3000`

## 🔌 API Integration

The frontend expects a backend API running at `http://localhost:3001/api` with the following endpoints:

- `GET /markets` - List all markets with filtering
- `GET /markets/trending` - Top markets by 24hr volume
- `GET /markets/:id` - Single market details
- `GET /news/:marketSlug` - News for specific market
- `GET /news/trending` - News for trending markets

## 🎯 Key Components

### MarketCard
Displays market information with:
- YES/NO odds with visual indicators
- Category and platform badges
- 24hr volume
- Hover effects with glow

### NewsCard
Shows news articles with:
- Source and publication date
- Corner accent borders
- External link indicator
- Hover effects

### TrendingMarkets
Horizontal scrollable carousel with:
- Auto-refresh every 60 seconds
- Scroll controls
- Skeleton loading states

## 🎨 Customization

### Design Tokens
Edit `tailwind.config.ts` to customize:
- Colors (Bitcoin Orange, Digital Gold, etc.)
- Fonts (Space Grotesk, Inter, JetBrains Mono)
- Animations (float, spin, glow)
- Shadows (orange glow, gold glow)

### Global Styles
Edit `src/app/globals.css` for:
- Grid pattern background
- Glass morphism utilities
- Gradient text
- Custom scrollbar

## 📱 Responsive Design

The platform is fully responsive with breakpoints:
- Mobile: Single column layouts
- Tablet (768px+): 2-3 column grids
- Desktop (1024px+): Full experience with 3-4 columns

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
vercel deploy
```

The platform is optimized for Vercel deployment with:
- Automatic static optimization
- Image optimization
- Edge functions support

## 📄 License

This project is proprietary. See licensing options on the `/widgets` page for commercial use.

## 🤝 Support

For questions or support:
- Premium users: priority@polypulsenews.com
- General inquiries: hello@polypulsenews.com

---

Built with ⚡ by the PolypulseNews team

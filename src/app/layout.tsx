import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://www.polypulsenews.live"),
    title: {
        default: "PolypulseNews â Prediction Market Intelligence | Polymarket & Kalshi",
        template: "%s | PolypulseNews",
    },
    description: "Real-time prediction market data from Polymarket and Kalshi with correlated news insights. Track trending markets, calculate odds, and stay ahead with AI-driven news analytics.",
    keywords: [
        "prediction markets",
        "polymarket analytics",
        "kalshi odds",
        "election odds real-time",
        "crypto prediction markets",
        "market intelligence",
        "trading signals",
        "news analytics",
        "PolypulseNews",
        "prediction market news",
        "kalshi prediction markets",
        "betting odds tracker",
        "market sentiment analysis",
    ],
    authors: [{ name: "PolypulseNews" }],
    alternates: {
        canonical: "https://www.polypulsenews.live",
    },
    openGraph: {
        title: "PolypulseNews â Prediction Market Intelligence & Analysis",
        description: "Real-time prediction market data with correlated news insights. The pulse of Polymarket and Kalshi.",
        type: "website",
        url: "https://www.polypulsenews.live",
        siteName: "PolypulseNews",
        locale: "en_US",
        images: [
            {
                url: "/og-image.svg",
                width: 1200,
                height: 630,
                alt: "PolypulseNews â Prediction Market Intelligence",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "PolypulseNews â Prediction Market Intelligence",
        description: "Real-time prediction market data with correlated news insights",
        creator: "@PolypulseNews",
        images: ["/og-image.svg"],
    },
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/icon.png", type: "image/png" },
            { url: "/icon.svg", type: "image/svg+xml" },
        ],
        apple: [
            { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
        ],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: [
            "yreuEw4yGSs4xoZ2uk6wKRoQn8bErQreK_Xhxw_y4G0",
            "tk_YKAcq0qAKpmiLUrKW4-M3OejCyhT_6qVs7Ze7h-o",
        ],
    },
};

const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PolypulseNews",
    url: "https://www.polypulsenews.live",
    logo: "https://www.polypulsenews.live/icon.svg",
    sameAs: ["https://twitter.com/PolypulseNews"],
    description: "Real-time prediction market intelligence and correlated news analytics from Polymarket and Kalshi.",
};

// FAQ schema for homepage - targets key prediction market queries
const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What are prediction markets?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Prediction markets are exchanges where participants buy and sell shares whose prices reflect the probability of future events. The most popular platforms include Polymarket and Kalshi.",
            },
        },
        {
            "@type": "Question",
            name: "How to read prediction market odds?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Prediction market odds represent the probability of an outcome. If a 'Yes' share is trading at 65 cents, the market suggests a 65% chance that the event will occur.",
            },
        },
        {
            "@type": "Question",
            name: "What is the difference between Polymarket and Kalshi?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Polymarket is a cryptocurrency-based prediction market while Kalshi is a regulated exchange in the US. PolypulseNews aggregates data from both platforms.",
            },
        },
        {
            "@type": "Question",
            name: "How often are prediction market odds updated?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Prediction market odds update in real-time as new information becomes available and participants trade shares on the platforms.",
            },
        },
    ],
};

import { Footer } from "@/components/Footer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            </head>
            <body
                className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
            >
                {children}
                <Footer />
            </body>
        </html>
    );
}

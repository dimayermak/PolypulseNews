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
        default: "PolypulseNews – Prediction Market Intelligence | Polymarket & Kalshi",
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
    ],
    authors: [{ name: "PolypulseNews" }],
    alternates: {
        canonical: "https://www.polypulsenews.live",
    },
    openGraph: {
        title: "PolypulseNews – Prediction Market Intelligence & Analysis",
        description: "Real-time prediction market data with correlated news insights. The pulse of Polymarket and Kalshi.",
        type: "website",
        url: "https://www.polypulsenews.live",
        siteName: "PolypulseNews",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "PolypulseNews – Prediction Market Intelligence",
        description: "Real-time prediction market data with correlated news insights",
        creator: "@PolypulseNews",
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

const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PolypulseNews",
    url: "https://www.polypulsenews.live",
    description: "Real-time prediction market intelligence and correlated news analytics.",
    potentialAction: {
        "@type": "SearchAction",
        target: {
            "@type": "EntryPoint",
            urlTemplate: "https://www.polypulsenews.live/markets?search={search_term_string}",
        },
        "query-input": "required name=search_term_string",
    },
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
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
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

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
    title: "PolypulseNews - Prediction Market Intelligence",
    description: "Real-time prediction market data from Polymarket and Kalshi with correlated news insights. Track trending markets, analyze odds, and stay informed.",
    keywords: ["prediction markets", "polymarket", "kalshi", "market odds", "trading", "news", "analytics"],
    authors: [{ name: "PolypulseNews" }],
    openGraph: {
        title: "PolypulseNews - Prediction Market Intelligence",
        description: "Real-time prediction market data with correlated news insights",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "PolypulseNews - Prediction Market Intelligence",
        description: "Real-time prediction market data with correlated news insights",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body
                className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}

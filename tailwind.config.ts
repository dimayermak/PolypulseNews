import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bitcoin DeFi Color System
        background: "#030304", // True Void
        surface: "#0F1115", // Dark Matter
        foreground: "#FFFFFF", // Pure Light
        muted: "#94A3B8", // Stardust
        border: "#1E293B", // Dim Boundary
        primary: "#F7931A", // Bitcoin Orange
        secondary: "#EA580C", // Burnt Orange
        tertiary: "#FFD600", // Digital Gold
        quaternary: "#0EA5E9", // Cyber Blue (Brings in professional intelligence feel)
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "spin-slow": "spin 10s linear infinite",
        "spin-slower": "spin 15s linear infinite reverse",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      boxShadow: {
        "glow-orange": "0 0 20px -5px rgba(234, 88, 12, 0.5)",
        "glow-orange-lg": "0 0 30px -5px rgba(247, 147, 26, 0.6)",
        "glow-gold": "0 0 20px rgba(255, 214, 0, 0.3)",
        "glow-card": "0 0 50px -10px rgba(247, 147, 26, 0.1)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;

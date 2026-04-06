import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase,
  title: "State of AI Rankings",
  description: "Editorial ranking snapshot of the best AI models, coding harnesses, and subscriptions",
  openGraph: {
    title: "State of AI Rankings",
    description: "Editorial ranking snapshot of the best AI models, coding harnesses, and subscriptions",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "State of AI Rankings",
    description: "Editorial ranking snapshot of the best AI models, coding harnesses, and subscriptions",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

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

export const metadata: Metadata = {
  title: "InstaAnalytics - Instagram Profile Analytics",
  description: "Analyze Instagram profiles and get comprehensive insights into engagement metrics, follower data, and content performance.",
  keywords: ["Instagram", "analytics", "social media", "engagement", "metrics"],
  authors: [{ name: "InstaAnalytics Team" }],
  openGraph: {
    title: "InstaAnalytics - Instagram Profile Analytics",
    description: "Analyze Instagram profiles and get comprehensive insights into engagement metrics, follower data, and content performance.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "InstaAnalytics - Instagram Profile Analytics",
    description: "Analyze Instagram profiles and get comprehensive insights into engagement metrics, follower data, and content performance.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

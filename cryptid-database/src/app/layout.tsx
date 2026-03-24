import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// サイト全体のメタデータ（SEO）
export const metadata: Metadata = {
  title: {
    default: "Cryptid Research Foundation | Discover Mythical Creatures & UMAs",
    template: "%s | Cryptid Research Foundation",
  },
  description:
    "Explore the world's most fascinating cryptids and unidentified mysterious animals. From Bigfoot to Tsuchinoko, discover legends, sightings, and scientific analysis.",
  icons: {
    icon: "/logo.svg",
    apple: "/apple-icon.png",
  },
};

// 全ページ共通のレイアウト
// children にはページごとのコンテンツが入る
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {/* flex-1 でフッターを画面下部に押し下げる */}
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

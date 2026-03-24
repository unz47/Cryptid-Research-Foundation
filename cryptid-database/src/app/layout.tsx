import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

// フォント読み込み — CSS変数として注入される
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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

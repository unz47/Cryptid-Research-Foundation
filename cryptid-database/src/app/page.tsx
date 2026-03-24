import Link from "next/link";

// ホームページ — サーバーコンポーネント（デフォルト）
// サーバー側でHTMLを生成してクライアントに送る → SEOに有利
export default function HomePage() {
  return (
    <>
      {/* ヒーローセクション */}
      <section className="bg-brand-900 text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-white mb-4">
            Discover the World&apos;s Cryptids
          </h1>
          <p className="text-brand-200 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Explore mysterious creatures from folklore and legend.
            From Tsuchinoko to Bigfoot — every cryptid has a story.
          </p>
          <Link
            href="/creatures"
            className="inline-block bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-md transition-colors no-underline"
          >
            Browse All Creatures
          </Link>
        </div>
      </section>

      {/* 注目のUMAセクション（後でContentfulから取得） */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8">Featured Cryptids</h2>
          <p className="text-neutral-500">
            Coming soon — featured creatures will appear here.
          </p>
        </div>
      </section>
    </>
  );
}

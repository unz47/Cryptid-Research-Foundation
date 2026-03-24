import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Cryptids",
  description: "Browse our complete collection of cryptids and mythical creatures from around the world.",
};

// UMA一覧ページ
export default function CreaturesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="mb-8">All Cryptids</h1>
      <p className="text-neutral-500">
        Creature list will be loaded from Contentful CMS.
      </p>
    </div>
  );
}

import { notFound } from "next/navigation";

// 動的ルート — /creatures/tsuchinoko, /creatures/bigfoot 等
// [slug] がURLパラメータとして渡される
export default async function CreatureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // TODO: Contentful から slug でデータ取得
  // const creature = await getCreatureBySlug(slug);
  // if (!creature) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="mb-4">Creature: {slug}</h1>
      <p className="text-neutral-500">
        Detail page for &quot;{slug}&quot; — will be populated from Contentful.
      </p>
    </div>
  );
}

import CreatureList from "@/components/creatures/CreatureList";
import { normalizeAll } from "@/lib/normalize";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "All Cryptids — CRF" };

export default async function CreaturesPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ page?: string }> }) {
  const { locale } = await params;
  const { page } = await searchParams;
  const res = await fetch(`http://localhost:3010/api/creatures?locale=${locale}`, { cache: "no-store" });
  const data = await res.json();
  return <CreatureList entries={normalizeAll(data)} page={Number(page) || 1} />;
}

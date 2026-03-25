import CreatureList from "@/components/creatures/CreatureList";
import { normalizeAll } from "@/lib/normalize";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "All Cryptids — CRF" };

const API_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL ? "" : "http://localhost:3010";

export default async function CreaturesPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  const base = API_BASE || `http://localhost:3010`;
  const res = await fetch(`${base}/api/creatures`, { cache: "no-store" });
  const data = await res.json();
  return <CreatureList entries={normalizeAll(data)} page={Number(page) || 1} />;
}

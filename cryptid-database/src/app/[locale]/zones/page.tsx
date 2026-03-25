import ZoneList from "@/components/zones/ZoneList";
import { normalizeAll } from "@/lib/normalize";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Anomalous Zones — CRF" };

export default async function ZonesPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  const res = await fetch(`http://localhost:3010/api/zones`, { cache: "no-store" });
  const data = await res.json();
  return <ZoneList entries={normalizeAll(data)} page={Number(page) || 1} />;
}

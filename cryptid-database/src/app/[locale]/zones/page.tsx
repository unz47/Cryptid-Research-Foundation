import ZoneList from "@/components/zones/ZoneList";
import { normalizeAll } from "@/lib/normalize";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Anomalous Zones — CRF" };

export default async function ZonesPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ page?: string }> }) {
  const { locale } = await params;
  const { page } = await searchParams;
  const res = await fetch(`http://localhost:3010/api/zones?locale=${locale}`, { cache: "no-store" });
  const data = await res.json();
  return <ZoneList entries={normalizeAll(data)} page={Number(page) || 1} />;
}

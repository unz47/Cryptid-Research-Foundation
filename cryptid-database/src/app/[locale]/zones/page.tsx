import { getZones } from "@/lib/data";
import ZoneList from "@/components/zones/ZoneList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anomalous Zones — CRF",
};

export default async function ZonesPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  const zones = getZones();
  return <ZoneList entries={zones} page={Number(page) || 1} />;
}

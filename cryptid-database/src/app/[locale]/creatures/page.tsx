import { getCreatures } from "@/lib/data";
import CreatureList from "@/components/creatures/CreatureList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Cryptids — CRF",
};

export default async function CreaturesPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  const creatures = getCreatures();
  return <CreatureList entries={creatures} page={Number(page) || 1} />;
}

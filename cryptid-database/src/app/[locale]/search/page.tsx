import SearchResults from "@/components/search/SearchResults";
import { normalizeAll } from "@/lib/normalize";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Search — CRF" };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; tags?: string; region?: string; classification?: string; type?: string; size?: string }> }) {
  const { q, tags: tagsParam, region, classification, type, size } = await searchParams;
  const activeTags = tagsParam ? tagsParam.split(",").filter(Boolean) : [];

  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (tagsParam) params.set("tags", tagsParam);
  if (region) params.set("region", region);
  if (classification) params.set("classification", classification);
  if (type) params.set("type", type);
  if (size) params.set("size", size);

  const res = await fetch(`http://localhost:3010/api/search?${params}`, { cache: "no-store" });
  const data = await res.json();

  return <SearchResults results={normalizeAll(data.results)} query={q || ""} activeTags={activeTags} allTags={data.allTags} allRegions={data.allRegions} allClassifications={data.allClassifications} activeRegion={region || ""} activeClassification={classification || ""} activeType={type || ""} activeSize={size || ""} />;
}

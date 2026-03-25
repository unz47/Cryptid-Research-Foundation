import SearchResults from "@/components/search/SearchResults";
import { normalizeAll } from "@/lib/normalize";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Search — CRF" };

export default async function SearchPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ q?: string; tags?: string; region?: string; classification?: string; type?: string; size?: string }> }) {
  const { locale } = await params;
  const { q, tags: tagsParam, region, classification, type, size } = await searchParams;
  const activeTags = tagsParam ? tagsParam.split(",").filter(Boolean) : [];

  const p = new URLSearchParams();
  p.set("locale", locale);
  if (q) p.set("q", q);
  if (tagsParam) p.set("tags", tagsParam);
  if (region) p.set("region", region);
  if (classification) p.set("classification", classification);
  if (type) p.set("type", type);
  if (size) p.set("size", size);

  const res = await fetch(`http://localhost:3010/api/search?${p}`, { cache: "no-store" });
  const data = await res.json();

  return <SearchResults results={normalizeAll(data.results)} query={q || ""} activeTags={activeTags} allTags={data.allTags} allRegions={data.allRegions} allClassifications={data.allClassifications} activeRegion={region || ""} activeClassification={classification || ""} activeType={type || ""} activeSize={size || ""} />;
}

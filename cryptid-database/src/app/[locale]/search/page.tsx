import { searchEntries, getAllTags, getAllRegions, getAllClassifications } from "@/lib/data";
import SearchResults from "@/components/search/SearchResults";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Search — CRF" };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; tags?: string; region?: string; classification?: string; type?: string; size?: string }> }) {
  const { q, tags: tagsParam, region, classification, type, size } = await searchParams;
  const activeTags = tagsParam ? tagsParam.split(",").filter(Boolean) : [];
  const results = searchEntries(q, activeTags, region, classification, type, size);
  return <SearchResults results={results} query={q || ""} activeTags={activeTags} allTags={getAllTags()} allRegions={getAllRegions()} allClassifications={getAllClassifications()} activeRegion={region || ""} activeClassification={classification || ""} activeType={type || ""} activeSize={size || ""} />;
}

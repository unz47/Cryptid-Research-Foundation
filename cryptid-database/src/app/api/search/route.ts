import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams;
  const locale = p.get("locale") || "ja";
  const q = p.get("q") || "";
  const tags = p.get("tags")?.split(",").filter(Boolean) || [];
  const region = p.get("region") || "";
  const classification = p.get("classification") || "";
  const type = p.get("type") || "";
  const size = p.get("size") || "";

  let query = supabase.from("file_entries").select("*");

  if (region) query = query.eq("region", region);
  if (classification) query = query.eq("classification", classification);
  if (type) query = query.eq("type", type);
  for (const tag of tags) {
    query = query.contains("tags", [tag]);
  }

  const { data: allData, error } = await query.order("file_no");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Client-side filters for text search and size (not easily done in Supabase)
  let results = allData || [];
  if (q) {
    const lower = q.toLowerCase();
    results = results.filter((e: Record<string, unknown>) =>
      (e.name as string).toLowerCase().includes(lower) ||
      (e.name_en as string).toLowerCase().includes(lower) ||
      (e.file_no as string).toLowerCase().includes(lower) ||
      (e.tags as string[]).some((t: string) => t.toLowerCase().includes(lower)) ||
      (e.search_aliases as string[]).some((a: string) => a.toLowerCase().includes(lower))
    );
  }
  if (size) {
    results = results.filter((e: Record<string, unknown>) => {
      const num = parseFloat(e.est_size as string);
      if (size === "small") return !isNaN(num) && num < 1;
      if (size === "medium") return !isNaN(num) && num >= 1 && num < 3;
      if (size === "large") return !isNaN(num) && num >= 3;
      return true;
    });
  }

  // Get distinct values for filters
  const { data: allEntries } = await supabase.from("file_entries").select("tags, region, classification");
  const allTags = [...new Set((allEntries || []).flatMap((e: Record<string, unknown>) => e.tags as string[]))].sort();
  const allRegions = [...new Set((allEntries || []).map((e: Record<string, unknown>) => e.region as string))].sort();
  const allClassifications = ["CLASS-I", "CLASS-II", "CLASS-III", "CLASS-IV", "CLASS-V", "CLASS-S"];

  return NextResponse.json({ results: localize(results, locale), allTags, allRegions, allClassifications });
}

function localize(data: Record<string, unknown>[], locale: string) {
  if (locale === "ja") return data;
  return data.map((e) => ({
    ...e,
    name: (e.name_en as string) || e.name, name_en: e.name as string, overview: (e.overview_en as string) || e.overview,
    logs: (e.logs_en as unknown[])?.length ? e.logs_en : e.logs,
  }));
}

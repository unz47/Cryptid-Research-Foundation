import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const locale = req.nextUrl.searchParams.get("locale") || "ja";
  const { data, error } = await supabase.from("file_entries").select("*").eq("type", "creature").order("file_no");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(localize(data, locale));
}

function localize(data: Record<string, unknown>[], locale: string) {
  if (locale === "ja") return data;
  return data.map((e) => ({
    ...e,
    name: (e.name_en as string) || e.name, name_en: e.name as string, overview: (e.overview_en as string) || e.overview,
    logs: (e.logs_en as unknown[])?.length ? e.logs_en : e.logs,
  }));
}

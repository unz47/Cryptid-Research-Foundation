import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import FileDetail from "@/components/detail/FileDetail";
import Breadcrumb from "@/components/detail/Breadcrumb";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await supabase.from("file_entries").select("file_no, name_en").eq("slug", slug).single();
  if (!data) return { title: "Not Found" };
  return { title: `${data.file_no} ${data.name_en}` };
}

function localize(entry: Record<string, unknown>, locale: string) {
  if (locale === "ja") return entry;
  return { ...entry, name: entry.name_en || entry.name, name_en: entry.name, overview: entry.overview_en || entry.overview, logs: (entry.logs_en as unknown[])?.length ? entry.logs_en : entry.logs };
}

export default async function CreatureDetailPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const { data } = await supabase.from("file_entries").select("*").eq("slug", slug).single();
  if (!data) notFound();

  return (
    <>
      <Breadcrumb fileNo={data.file_no} nameEn={data.name_en} />
      <FileDetail entry={localize(data, locale)} />
    </>
  );
}

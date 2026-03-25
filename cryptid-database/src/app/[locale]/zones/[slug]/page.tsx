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

export default async function ZoneDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data } = await supabase.from("file_entries").select("*").eq("slug", slug).eq("type", "zone").single();
  if (!data) notFound();

  return (
    <>
      <Breadcrumb fileNo={data.file_no} nameEn={data.name_en} type="zone" />
      <FileDetail entry={data} />
    </>
  );
}

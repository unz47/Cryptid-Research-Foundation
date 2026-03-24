import { notFound } from "next/navigation";
import { getFileEntry } from "@/lib/data";
import FileDetail from "@/components/detail/FileDetail";
import Breadcrumb from "@/components/detail/Breadcrumb";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getFileEntry(slug);
  if (!entry) return { title: "Not Found" };
  return { title: `${entry.fileNo} ${entry.nameEn}` };
}

export default async function ZoneDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getFileEntry(slug);
  if (!entry || entry.type !== "zone") notFound();

  return (
    <>
      <Breadcrumb fileNo={entry.fileNo} nameEn={entry.nameEn} type="zone" />
      <FileDetail entry={entry} />
    </>
  );
}

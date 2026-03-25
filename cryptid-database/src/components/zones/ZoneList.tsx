"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { getImage } from "@/lib/defaultImage";
import Pagination, { PER_PAGE } from "@/components/ui/Pagination";
import type { FileEntry } from "@/lib/data";

const darkGridStyle = {
  backgroundImage: `
    linear-gradient(#40404080 1px, transparent 1px),
    linear-gradient(90deg, #40404080 1px, transparent 1px),
    linear-gradient(#30303060 0.5px, transparent 0.5px),
    linear-gradient(90deg, #30303060 0.5px, transparent 0.5px)`,
  backgroundSize: "120px 120px, 120px 120px, 24px 24px, 24px 24px",
  backgroundColor: "#171717",
};

export default function ZoneList({ entries, page }: { entries: FileEntry[]; page: number }) {
  const t = useTranslations("zoneList");
  const paged = entries.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="py-12 text-white" style={darkGridStyle}>
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-xs font-mono font-bold tracking-widest text-brand-400 mb-2">{t("label")}</p>
        <h1 className="text-white mb-8">{t("title")}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paged.map((z) => (
            <Link
              key={z.slug}
              href={`/zones/${z.slug}`}
              className="group block bg-neutral-800 border border-neutral-700 rounded-lg overflow-hidden no-underline transition-all duration-300 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-0.5"
            >
              <div className="relative aspect-[4/3] bg-neutral-700 overflow-hidden">
                <Image src={getImage(z.image, z.slug)} alt={z.nameEn} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-neutral-500">{z.fileNo}</span>
                  <span className={`${z.classColor} text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded`}>{z.classification}</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-brand-400 transition-colors duration-200">{z.name}</h3>
                <p className="text-sm text-neutral-400 mb-2">{z.nameEn} — {z.region}</p>
                <p className="text-sm text-neutral-300 line-clamp-2">{z.overview}</p>
              </div>
            </Link>
          ))}
        </div>
        <Pagination total={entries.length} current={page} basePath="/zones" dark />
      </div>
    </div>
  );
}

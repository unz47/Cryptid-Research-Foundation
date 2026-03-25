"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { getImage } from "@/lib/defaultImage";
import Pagination, { PER_PAGE } from "@/components/ui/Pagination";
import type { FileEntry } from "@/lib/data";

export default function CreatureList({ entries, page }: { entries: FileEntry[]; page: number }) {
  const t = useTranslations("creatureList");
  const paged = entries.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-xs font-mono font-bold tracking-widest text-brand-600 mb-2">{t("label")}</p>
        <h1 className="mb-8">{t("title")}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paged.map((c) => (
            <Link
              key={c.slug}
              href={`/creatures/${c.slug}`}
              className="group block bg-white rounded-lg border border-neutral-200 overflow-hidden no-underline transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                <Image src={getImage(c.image, c.slug)} alt={c.nameEn} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-neutral-400">{c.fileNo}</span>
                  <span className={`${c.classColor} text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded`}>{c.classification}</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-800 group-hover:text-brand-600 transition-colors duration-200">{c.name}</h3>
                <p className="text-sm text-neutral-500 mb-2">{c.nameEn} — {c.region}</p>
                <p className="text-sm text-neutral-600 line-clamp-2">{c.overview}</p>
              </div>
            </Link>
          ))}
        </div>
        <Pagination total={entries.length} current={page} basePath="/creatures" />
      </div>
    </div>
  );
}

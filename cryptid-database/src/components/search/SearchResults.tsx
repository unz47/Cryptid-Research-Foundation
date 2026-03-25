"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import Image from "next/image";
import { getImage } from "@/lib/defaultImage";
import { fileEntries, type FileEntry } from "@/lib/data";

const allEntries = Object.values(fileEntries);

function buildHref(opts: { tags?: string[]; q?: string; region?: string; classification?: string; type?: string; size?: string }) {
  const params = new URLSearchParams();
  if (opts.q) params.set("q", opts.q);
  if (opts.tags && opts.tags.length > 0) params.set("tags", opts.tags.join(","));
  if (opts.region) params.set("region", opts.region);
  if (opts.classification) params.set("classification", opts.classification);
  if (opts.type) params.set("type", opts.type);
  if (opts.size) params.set("size", opts.size);
  const s = params.toString();
  return s ? `/search?${s}` : "/search";
}

interface Props {
  results: FileEntry[];
  query: string;
  activeTags: string[];
  allTags: string[];
  allRegions: string[];
  allClassifications: string[];
  activeRegion: string;
  activeClassification: string;
  activeType: string;
  activeSize: string;
}

export default function SearchResults({ results, query, activeTags, allTags, allRegions, allClassifications, activeRegion, activeClassification, activeType, activeSize }: Props) {
  const t = useTranslations("search");
  const tc = useTranslations("classification");
  const router = useRouter();
  const [input, setInput] = useState(query);
  const [predictions, setPredictions] = useState<FileEntry[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChange = (v: string) => {
    setInput(v);
    if (!v.trim()) { setPredictions([]); setOpen(false); return; }
    const q = v.toLowerCase();
    setPredictions(allEntries.filter(
      (e) => e.name.toLowerCase().includes(q) || e.nameEn.toLowerCase().includes(q) || e.fileNo.toLowerCase().includes(q) || e.searchAliases.some((a) => a.toLowerCase().includes(q))
    ));
    setOpen(true);
  };

  const goDirect = (entry: FileEntry) => {
    setOpen(false);
    router.push(entry.type === "zone" ? `/zones/${entry.slug}` : `/creatures/${entry.slug}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    router.push(buildHref({ tags: activeTags, q: input.trim() || undefined, region: activeRegion || undefined, classification: activeClassification || undefined }));
  };

  const current = { tags: activeTags, q: query || undefined, region: activeRegion || undefined, classification: activeClassification || undefined, type: activeType || undefined, size: activeSize || undefined };

  const toggleTag = (tag: string) => {
    const next = activeTags.includes(tag) ? activeTags.filter((t) => t !== tag) : [...activeTags, tag];
    return buildHref({ ...current, tags: next });
  };

  const selectClass = "px-3 py-2 pr-8 rounded-md border-2 border-neutral-300 bg-white font-mono text-sm text-neutral-700 focus:outline-none focus:border-brand-500 transition-colors cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23737373%22%20stroke-width%3D%222.5%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_8px_center] bg-no-repeat appearance-none";

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-xs font-mono font-bold tracking-widest text-brand-600 mb-2">{t("label")}</p>
        <h1 className="mb-6">{t("title")}</h1>

        {/* Search bar */}
        <div ref={ref} className="relative mb-6 max-w-2xl">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={t("placeholder")}
              className="flex-1 px-4 py-3 rounded-md border-2 border-brand-500 bg-white font-mono text-sm focus:outline-none focus:border-brand-700 transition-colors"
            />
            <button type="submit" className="px-6 py-3 rounded-md bg-brand-600 hover:bg-brand-700 text-white font-mono text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
              {t("button")}
            </button>
          </form>
          {open && predictions.length > 0 && (
            <div className="absolute top-full mt-1 left-0 right-0 bg-white rounded-md shadow-xl border border-neutral-200 overflow-hidden z-50">
              {predictions.map((r) => (
                <button key={r.slug} onClick={() => goDirect(r)} className="w-full text-left px-4 py-3 hover:bg-neutral-50 transition-colors flex items-center gap-3 border-b border-neutral-100 last:border-0">
                  <span className="text-xs font-mono text-neutral-400 w-20 shrink-0">{r.fileNo}</span>
                  <span className="text-sm font-bold text-neutral-800">{r.name}</span>
                  <span className="text-xs text-neutral-500">{r.nameEn}</span>
                  <span className={`ml-auto ${r.classColor} text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded`}>{r.classification}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Select filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <select
            value={activeRegion}
            onChange={(e) => router.push(buildHref({ ...current, region: e.target.value || undefined }))}
            className={selectClass}
          >
            <option value="">{t("allRegions")}</option>
            {allRegions.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <select
            value={activeClassification}
            onChange={(e) => router.push(buildHref({ ...current, classification: e.target.value || undefined }))}
            className={selectClass}
          >
            <option value="">{t("allClasses")}</option>
            {allClassifications.map((c) => <option key={c} value={c}>{c} — {tc(`${c}.name`)}</option>)}
          </select>
          <select
            value={activeType}
            onChange={(e) => router.push(buildHref({ ...current, type: e.target.value || undefined }))}
            className={selectClass}
          >
            <option value="">{t("allTypes")}</option>
            <option value="creature">{t("typeCreature")}</option>
            <option value="zone">{t("typeZone")}</option>
          </select>
          <select
            value={activeSize}
            onChange={(e) => router.push(buildHref({ ...current, size: e.target.value || undefined }))}
            className={selectClass}
          >
            <option value="">{t("allSizes")}</option>
            <option value="small">{t("sizeSmall")}</option>
            <option value="medium">{t("sizeMedium")}</option>
            <option value="large">{t("sizeLarge")}</option>
          </select>
        </div>

        {/* Tag chips */}
        <div className="mb-8">
          <p className="text-[10px] font-mono font-bold tracking-widest text-neutral-500 mb-3">FILTER BY TAG</p>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Link
                key={tag}
                href={toggleTag(tag)}
                className={`text-xs font-mono font-bold px-3 py-1.5 rounded-md border-2 no-underline transition-colors duration-200 ${
                  activeTags.includes(tag)
                    ? "bg-brand-600 text-white border-brand-600"
                    : "border-neutral-300 text-neutral-700 bg-white hover:border-brand-500 hover:text-brand-600"
                }`}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Active filters summary */}
        {(query || activeTags.length > 0 || activeRegion || activeClassification || activeType || activeSize) && (
          <div className="flex items-center gap-3 mb-6 text-sm flex-wrap">
            <span className="text-neutral-500 font-mono">{results.length} {t("resultsCount")}</span>
            {activeTags.map((tag) => (
              <Link key={tag} href={buildHref({ ...current, tags: activeTags.filter((t) => t !== tag) })} className="bg-brand-100 text-brand-700 text-xs font-mono font-bold px-2 py-1 rounded no-underline hover:bg-brand-200 transition-colors">
                {tag} ✕
              </Link>
            ))}
            {activeRegion && (
              <Link href={buildHref({ ...current, region: undefined })} className="bg-brand-100 text-brand-700 text-xs font-mono font-bold px-2 py-1 rounded no-underline hover:bg-brand-200 transition-colors">
                {activeRegion} ✕
              </Link>
            )}
            {activeClassification && (
              <Link href={buildHref({ ...current, classification: undefined })} className="bg-brand-100 text-brand-700 text-xs font-mono font-bold px-2 py-1 rounded no-underline hover:bg-brand-200 transition-colors">
                {activeClassification} ✕
              </Link>
            )}
            {activeType && (
              <Link href={buildHref({ ...current, type: undefined })} className="bg-brand-100 text-brand-700 text-xs font-mono font-bold px-2 py-1 rounded no-underline hover:bg-brand-200 transition-colors">
                {activeType} ✕
              </Link>
            )}
            {activeSize && (
              <Link href={buildHref({ ...current, size: undefined })} className="bg-brand-100 text-brand-700 text-xs font-mono font-bold px-2 py-1 rounded no-underline hover:bg-brand-200 transition-colors">
                {activeSize} ✕
              </Link>
            )}
            {query && <span className="text-neutral-400 font-mono">&quot;{query}&quot;</span>}
            <Link href="/search" className="text-xs text-neutral-400 hover:text-brand-500 no-underline font-mono">{t("clear")}</Link>
          </div>
        )}

        {/* Results grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((r) => (
              <Link
                key={r.slug}
                href={r.type === "zone" ? `/zones/${r.slug}` : `/creatures/${r.slug}`}
                className="group block bg-white rounded-lg border border-neutral-200 overflow-hidden no-underline transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              >
                <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                  <Image src={getImage(r.image, r.slug)} alt={r.nameEn} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-neutral-400">{r.fileNo}</span>
                    <span className={`${r.classColor} text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded`}>{r.classification}</span>
                    {r.type === "zone" && <span className="text-[10px] font-mono text-neutral-400 border border-neutral-200 px-1.5 py-0.5 rounded">ZONE</span>}
                  </div>
                  <h3 className="text-lg font-bold text-neutral-800 group-hover:text-brand-600 transition-colors duration-200">{r.name}</h3>
                  <p className="text-sm text-neutral-500 mb-2">{r.nameEn} — {r.region}</p>
                  <div className="flex flex-wrap gap-1">
                    {r.tags.map((tag) => (
                      <span key={tag} className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${activeTags.includes(tag) ? "bg-brand-100 text-brand-600" : "bg-neutral-100 text-neutral-400"}`}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-neutral-500 text-center py-16 font-mono">{t("noResults")}</p>
        )}
      </div>
    </div>
  );
}

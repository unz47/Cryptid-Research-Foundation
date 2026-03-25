"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { fileEntries, type FileEntry } from "@/lib/data";

const allEntries = Object.values(fileEntries);

export default function HeroSearch() {
  const t = useTranslations("hero");
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FileEntry[]>([]);
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
    setQuery(v);
    if (!v.trim()) { setResults([]); setOpen(false); return; }
    const q = v.toLowerCase();
    const matched = allEntries.filter(
      (e) => e.name.toLowerCase().includes(q) || e.nameEn.toLowerCase().includes(q) || e.fileNo.toLowerCase().includes(q) || e.tags.some((t) => t.toLowerCase().includes(q)) || e.searchAliases.some((a) => a.toLowerCase().includes(q))
    );
    setResults(matched);
    setOpen(true);
  };

  const go = (entry: FileEntry) => {
    setOpen(false);
    setQuery("");
    router.push(entry.type === "zone" ? `/zones/${entry.slug}` : `/creatures/${entry.slug}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div ref={ref} className="relative w-full max-w-xl mx-auto mt-8">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="flex-1 px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-brand-300 font-mono text-sm focus:outline-none focus:border-brand-400 focus:bg-white/15 transition-colors"
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-md bg-brand-500 hover:bg-brand-600 text-white font-mono text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          {t("searchButton")}
        </button>
      </form>

      {/* Predictive results dropdown */}
      {open && results.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-white rounded-md shadow-xl border border-neutral-200 overflow-hidden z-50">
          {results.map((r) => (
            <button key={r.slug} onClick={() => go(r)} className="w-full text-left px-4 py-3 hover:bg-neutral-50 transition-colors flex items-center gap-3 border-b border-neutral-100 last:border-0">
              <span className="text-xs font-mono text-neutral-400 w-20 shrink-0">{r.fileNo}</span>
              <span className="text-sm font-bold text-neutral-800">{r.name}</span>
              <span className="text-xs text-neutral-500">{r.nameEn}</span>
              <span className={`ml-auto ${r.classColor} text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded`}>{r.classification}</span>
            </button>
          ))}
        </div>
      )}
      {open && query && results.length === 0 && (
        <div className="absolute top-full mt-1 w-full bg-white rounded-md shadow-xl border border-neutral-200 p-4 z-50">
          <p className="text-sm text-neutral-500 text-center font-mono">{t("noResults")}</p>
        </div>
      )}
    </div>
  );
}

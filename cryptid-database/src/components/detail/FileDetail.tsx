import { getImages } from "@/lib/defaultImage";
import Image from "next/image";
import ImageSlider from "./ImageSlider";

const lightGrid = {
  backgroundImage: `
    linear-gradient(#d4d4d4 1px, transparent 1px),
    linear-gradient(90deg, #d4d4d4 1px, transparent 1px),
    linear-gradient(#e5e5e5 0.5px, transparent 0.5px),
    linear-gradient(90deg, #e5e5e5 0.5px, transparent 0.5px)`,
  backgroundSize: "120px 120px, 120px 120px, 24px 24px, 24px 24px",
  backgroundColor: "#fafafa",
};

const darkGrid = {
  backgroundImage: `
    linear-gradient(#40404080 1px, transparent 1px),
    linear-gradient(90deg, #40404080 1px, transparent 1px),
    linear-gradient(#30303060 0.5px, transparent 0.5px),
    linear-gradient(90deg, #30303060 0.5px, transparent 0.5px)`,
  backgroundSize: "120px 120px, 120px 120px, 24px 24px, 24px 24px",
  backgroundColor: "#171717",
};

/* eslint-disable @typescript-eslint/no-explicit-any */
function n(entry: any) {
  return {
    type: entry.type, slug: entry.slug, fileNo: entry.fileNo || entry.file_no, name: entry.name, nameEn: entry.nameEn || entry.name_en,
    classification: entry.classification, classColor: entry.classColor || entry.class_color, status: entry.status, statusColor: entry.statusColor || entry.status_color,
    filedDate: entry.filedDate || entry.filed_date, lastUpdated: entry.lastUpdated || entry.last_updated, region: entry.region,
    firstRecord: entry.firstRecord || entry.first_record, estSize: entry.estSize || entry.est_size, sightings: entry.sightings,
    credibility: entry.credibility, tags: entry.tags,
    image: typeof entry.image === "string" && entry.image.includes(",") ? entry.image.split(",") : entry.image,
    overview: entry.overview,
    logs: typeof entry.logs === "string" ? JSON.parse(entry.logs) : entry.logs,
    shopUrl: entry.shopUrl || entry.shop_url || "",
  };
}

export default function FileDetail({ entry: raw }: { entry: any }) {
  const entry = n(raw);
  const images = getImages(entry.image, entry.slug);
  const isDark = entry.type === "zone";
  const bg = isDark ? "text-white" : "text-neutral-800";
  const gridStyle = isDark ? darkGrid : lightGrid;
  const cardText = isDark ? "text-neutral-300" : "text-neutral-600";
  const labelText = isDark ? "text-neutral-400" : "text-neutral-500";
  const sectionBorder = isDark ? "border-neutral-700" : "border-neutral-300";
  const sectionShadow = isDark ? "shadow-sm shadow-black/40" : "shadow-sm";
  const sectionBg = isDark ? "bg-neutral-800" : "bg-white";

  return (
    <div className={bg} style={gridStyle}>
      {/* Meta Bar */}
      <div className="bg-[#1a1a2e] border-b border-brand-900">
        <div className="mx-auto max-w-7xl px-12 py-4 flex items-center gap-6 text-xs font-mono">
          <span className="text-brand-400 font-bold tracking-widest">{entry.fileNo}</span>
          <span className="w-px h-4 bg-[#333344]" />
          <span className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${entry.statusColor}`} />
            <span className="text-neutral-300">{entry.status}</span>
          </span>
          <span className="w-px h-4 bg-[#333344]" />
          <span className="text-neutral-400">Filed: {entry.filedDate}</span>
          <span className="w-px h-4 bg-[#333344]" />
          <span className={`${entry.classColor} text-white font-bold px-2 py-0.5 rounded text-[10px]`}>
            {entry.classification}
          </span>
          {entry.shopUrl && (
            <a href={entry.shopUrl} target="_blank" rel="noopener noreferrer" className="ml-auto flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold px-5 py-1.5 rounded-full no-underline transition-all duration-200 border border-white/20 hover:border-white/40 backdrop-blur-sm">
              SHOP <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-12 py-12 space-y-10">
        {/* Top: Image + Info */}
        <div className="flex gap-10 items-stretch">
          {/* Image placeholder */}
          <div className="w-[480px] shrink-0 overflow-hidden">
            <ImageSlider images={images} alt={entry.nameEn} />
          </div>

          {/* Info Panel */}
          <div className="flex-1 space-y-6">
            <div>
              <p className={`text-xs font-mono tracking-widest ${isDark ? "text-brand-400" : "text-brand-600"} mb-1`}>SUBJECT</p>
              <h1 className="text-4xl font-bold mb-1">{entry.name}</h1>
              <p className={`text-lg ${labelText}`}>{entry.nameEn}</p>
            </div>

            {/* Tags */}
            <div className="flex gap-2">
              {entry.tags.map((tag: string) => (
                <span key={tag} className={`text-[10px] font-mono font-bold px-2 py-1 rounded border ${sectionBorder} ${labelText}`}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Spec Table */}
            <div className={`border ${sectionBorder} ${sectionShadow} ${sectionBg} rounded`}>
              <div className={`px-4 py-2 border-b ${sectionBorder}`}>
                <span className={`text-xs font-mono font-bold tracking-widest ${isDark ? "text-brand-400" : "text-brand-600"}`}>FIELD DATA</span>
              </div>
              <div className={`divide-y ${isDark ? "divide-neutral-700" : "divide-neutral-300"}`}>
                {[
                  ["Region", entry.region],
                  ["First Record", entry.firstRecord],
                  ["Est. Size", entry.estSize],
                  ["Sightings", entry.sightings.toLocaleString()],
                ].map(([label, value]) => (
                  <div key={label} className={`flex px-4 py-2 text-sm ${isDark ? "divide-neutral-700" : ""}`}>
                    <span className={`w-32 font-mono ${labelText}`}>{label}</span>
                    <span className={cardText}>{value}</span>
                  </div>
                ))}
                {/* Credibility bar */}
                <div className={`flex items-center px-4 py-2 text-sm`}>
                  <span className={`w-32 font-mono ${labelText}`}>Credibility</span>
                  <div className="flex items-center gap-2 flex-1">
                    <div className={`flex-1 h-2 rounded-full ${isDark ? "bg-neutral-700" : "bg-neutral-200"}`}>
                      <div
                        className="h-2 rounded-full bg-brand-500"
                        style={{ width: `${(entry.credibility / 10) * 100}%` }}
                      />
                    </div>
                    <span className={`font-mono text-xs ${cardText}`}>{entry.credibility}/10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Sections */}
        <div className="grid grid-cols-2 gap-6">
          {/* Overview */}
          <div className={`border ${sectionBorder} ${sectionShadow} ${sectionBg} rounded p-6`}>
            <p className={`text-xs font-mono font-bold tracking-widest ${isDark ? "text-brand-400" : "text-brand-600"} mb-3`}>OVERVIEW</p>
            <p className={`text-sm leading-relaxed ${cardText}`}>{entry.overview}</p>
          </div>

          {/* Investigation Log */}
          <div className={`border ${sectionBorder} ${sectionShadow} ${sectionBg} rounded p-6`}>
            <p className={`text-xs font-mono font-bold tracking-widest ${isDark ? "text-brand-400" : "text-brand-600"} mb-3`}>INVESTIGATION LOG</p>
            <div className="space-y-4">
              {entry.logs.map((log: { date: string; content: string }) => (
                <div key={log.date}>
                  <p className={`text-xs font-mono ${labelText} mb-1`}>{log.date}</p>
                  <p className={`text-sm leading-relaxed ${cardText}`}>{log.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* File Footer */}
      <div className="bg-[#0d0d1a] border-t border-[#222233]">
        <div className="mx-auto max-w-7xl px-12 py-2 flex items-center justify-between text-[9px] font-mono text-neutral-500">
          <span>🔒 CONFIDENTIAL — CRF INTERNAL USE ONLY</span>
          <span>LAST UPDATED: {entry.lastUpdated}</span>
        </div>
      </div>
    </div>
  );
}

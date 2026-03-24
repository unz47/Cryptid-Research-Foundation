"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const anomalousZones = [
  { id: "bermuda-triangle", name: "バミューダトライアングル", nameEn: "Bermuda Triangle", fileNo: "CRF-Z001", classification: "CLASS-V", classColor: "bg-red-800", region: "Atlantic Ocean", description: "大西洋上の三角海域。航空機・船舶の原因不明の消失が多数報告されている。" },
  { id: "skinwalker-ranch", name: "スキンウォーカー牧場", nameEn: "Skinwalker Ranch", fileNo: "CRF-Z008", classification: "CLASS-S", classColor: "bg-neutral-900", region: "Utah, USA", description: "UFO、ポルターガイスト、未確認生物など複合的な異常現象が集中する特異地点。" },
  { id: "aokigahara", name: "青木ヶ原樹海", nameEn: "Aokigahara", fileNo: "CRF-Z012", classification: "CLASS-III", classColor: "bg-warning", region: "Japan", description: "富士山麓に広がる原生林。磁場異常とコンパスの狂いが報告され、複数の未解明現象が記録されている。" },
];

const darkGridStyle = {
  backgroundImage: `
    linear-gradient(#40404080 1px, transparent 1px),
    linear-gradient(90deg, #40404080 1px, transparent 1px),
    linear-gradient(#30303060 0.5px, transparent 0.5px),
    linear-gradient(90deg, #30303060 0.5px, transparent 0.5px)`,
  backgroundSize: "120px 120px, 120px 120px, 24px 24px, 24px 24px",
  backgroundColor: "#171717",
};

export default function AnomalousZones() {
  const t = useTranslations("zones");

  return (
    <section className="py-16 text-white" style={darkGridStyle}>
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-xs font-mono font-bold tracking-widest text-brand-400 mb-2">{t("label")}</p>
        <h2 className="text-white mb-3">{t("title")}</h2>
        <p className="text-neutral-400 mb-8 max-w-2xl">{t("description")}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {anomalousZones.map((zone) => (
            <Link
              key={zone.id}
              href={`/zones/${zone.id}`}
              className="block bg-neutral-800 border border-neutral-700 rounded-lg p-5 no-underline transition-all duration-300 hover:border-brand-500 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono text-neutral-500">{zone.fileNo}</span>
                <span className={`${zone.classColor} text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded`}>{zone.classification}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{zone.name}</h3>
              <p className="text-sm text-neutral-400 mb-3">{zone.nameEn} — {zone.region}</p>
              <p className="text-sm text-neutral-300 leading-relaxed">{zone.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

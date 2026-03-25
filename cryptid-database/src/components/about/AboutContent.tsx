"use client";

import { useTranslations } from "next-intl";

const classLevels = ["CLASS-I", "CLASS-II", "CLASS-III", "CLASS-IV", "CLASS-V", "CLASS-S"] as const;
const classColors: Record<string, string> = {
  "CLASS-I": "bg-success",
  "CLASS-II": "bg-info",
  "CLASS-III": "bg-warning",
  "CLASS-IV": "bg-accent-500",
  "CLASS-V": "bg-red-800",
  "CLASS-S": "bg-neutral-900",
};

const statusKeys = ["ACTIVE INVESTIGATION", "PENDING REVIEW", "CASE CLOSED", "CLASSIFIED"] as const;
const statusDots: Record<string, string> = {
  "ACTIVE INVESTIGATION": "bg-green-500",
  "PENDING REVIEW": "bg-yellow-500",
  "CASE CLOSED": "bg-neutral-400",
  "CLASSIFIED": "bg-red-500",
};

export default function AboutContent() {
  const t = useTranslations("about");
  const tc = useTranslations("classification");
  const ts = useTranslations("status");

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 space-y-20">
      {/* Mission */}
      <section className="max-w-3xl">
        <p className="text-xs font-mono font-bold tracking-widest text-brand-600 mb-3">{t("missionLabel")}</p>
        <h1 className="mb-6">{t("missionTitle")}</h1>
        <div className="space-y-4 text-neutral-600 leading-relaxed">
          <p>{t("missionP1")}</p>
          <p>{t("missionP2")}</p>
          <p>{t("missionP3")}</p>
        </div>
      </section>

      {/* Team Photo */}
      <section className="max-w-3xl">
        <div className="rounded-lg overflow-hidden border border-neutral-200">
          <img src="/about-team.jpg" alt="CRF Field Research Team" className="w-full" />
        </div>
        <p className="text-xs text-neutral-400 font-mono mt-2 text-center">{t("teamCaption")}</p>
      </section>

      {/* Classification System */}
      <section>
        <p className="text-xs font-mono font-bold tracking-widest text-brand-600 mb-3">{t("classLabel")}</p>
        <h2 className="mb-3">{t("classTitle")}</h2>
        <p className="text-neutral-500 mb-8 max-w-2xl">{t("classDescription")}</p>
        <div className="space-y-4">
          {classLevels.map((level) => (
            <div key={level} className="flex items-start gap-4 bg-white rounded-lg border border-neutral-200 p-5">
              <span className={`${classColors[level]} text-white text-xs font-mono font-bold px-3 py-1 rounded shrink-0`}>{level}</span>
              <div>
                <p className="font-semibold text-neutral-800">{tc(`${level}.name`)}</p>
                <p className="text-sm text-neutral-500 mt-1">{tc(`${level}.description`)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Investigation Status */}
      <section className="max-w-3xl">
        <p className="text-xs font-mono font-bold tracking-widest text-brand-600 mb-3">{t("statusLabel")}</p>
        <h2 className="mb-3">{t("statusTitle")}</h2>
        <p className="text-neutral-500 mb-8">{t("statusDescription")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {statusKeys.map((key) => (
            <div key={key} className="flex items-center gap-3 bg-white rounded-lg border border-neutral-200 p-4">
              <span className={`${statusDots[key]} w-2.5 h-2.5 rounded-full shrink-0`} />
              <div>
                <p className="text-sm font-mono font-semibold text-neutral-800">{key}</p>
                <p className="text-xs text-neutral-500">{ts(key)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About This Site */}
      <section className="max-w-3xl border-t border-neutral-200 pt-16">
        <p className="text-xs font-mono font-bold tracking-widest text-brand-600 mb-3">{t("siteLabel")}</p>
        <h2 className="mb-6">{t("siteTitle")}</h2>
        <div className="space-y-4 text-neutral-600 leading-relaxed">
          <p>{t("siteP1")}</p>
          <p>{t("siteP2")}</p>
        </div>
        <div className="mt-6">
          <a href="https://www.etsy.com/shop/InkDropStudioStore" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-medium px-5 py-2.5 rounded-md no-underline hover:bg-brand-700 transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]">
            {t("shopButton")}
          </a>
        </div>
      </section>
    </div>
  );
}

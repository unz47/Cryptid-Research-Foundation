"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import EvidenceUpload from "./EvidenceUpload";

export default function ReportForm() {
  const t = useTranslations("report");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: POST to Google Forms or API endpoint
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-24 text-center">
        <div className="mx-auto max-w-xl">
          <p className="text-xs font-mono font-bold tracking-widest text-green-600 mb-2">REPORT RECEIVED</p>
          <h1 className="mb-4">{t("successTitle")}</h1>
          <p className="text-neutral-600">{t("successMessage")}</p>
        </div>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-2.5 rounded border-2 border-neutral-300 bg-white font-mono text-sm focus:outline-none focus:border-brand-500 transition-colors";
  const labelClass = "block text-xs font-mono font-bold tracking-widest text-neutral-500 mb-1.5";

  return (
    <div>
      {/* Meta Bar */}
      <div className="bg-[#1a1a2e] border-b border-brand-900">
        <div className="mx-auto max-w-7xl px-12 py-4 flex items-center gap-6 text-xs font-mono">
          <span className="text-brand-400 font-bold tracking-widest">{t("newReport")}</span>
          <span className="w-px h-4 bg-[#333344]" />
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500" />
            <span className="text-neutral-300">{t("pendingSubmission")}</span>
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-xs font-mono font-bold tracking-widest text-brand-600 mb-2">{t("label")}</p>
        <h1 className="mb-2">{t("title")}</h1>
        <p className="text-neutral-500 text-sm mb-10">{t("description")}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Reporter */}
          <div>
            <label className={labelClass}>{t("reporterName")} <span className="text-neutral-400 font-normal">({t("optional")})</span></label>
            <input name="reporter" className={inputClass} />
          </div>

          {/* Date & Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{t("sightingDate")}</label>
              <input name="date" type="date" required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t("sightingLocation")}</label>
              <input name="location" required placeholder={t("locationPlaceholder")} className={inputClass} />
            </div>
          </div>

          {/* Type */}
          <div>
            <label className={labelClass}>{t("reportType")}</label>
            <div className="flex gap-4">
              {["creature", "zone", "other"].map((v) => (
                <label key={v} className="flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
                  <input type="radio" name="type" value={v} required className="accent-brand-500" />
                  {t(`type_${v}`)}
                </label>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <label className={labelClass}>{t("features")}</label>
            <input name="features" required placeholder={t("featuresPlaceholder")} className={inputClass} />
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>{t("detailDescription")}</label>
            <textarea name="description" required rows={5} placeholder={t("descriptionPlaceholder")} className={`${inputClass} resize-none`} />
          </div>

          {/* Evidence */}
          <div>
            <label className={labelClass}>{t("evidence")} <span className="text-neutral-400 font-normal">({t("optional")})</span></label>
            <EvidenceUpload />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button type="submit" className="w-full py-3 rounded-md bg-brand-600 hover:bg-brand-700 text-white font-mono font-bold text-sm transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]">
              {t("submit")}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-neutral-200">
          <p className="text-[10px] font-mono text-neutral-400 text-center">
            {t("disclaimer")}
          </p>
        </div>
      </div>
    </div>
  );
}

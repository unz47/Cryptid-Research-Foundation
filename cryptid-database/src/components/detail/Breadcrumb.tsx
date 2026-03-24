"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Breadcrumb({ fileNo, nameEn, type = "creature" }: { fileNo: string; nameEn: string; type?: "creature" | "zone" }) {
  const t = useTranslations("nav");
  const isDark = type === "zone";

  return (
    <div className={isDark ? "bg-neutral-900 border-b border-neutral-700" : "bg-neutral-50 border-b border-neutral-200"}>
      <div className="mx-auto max-w-7xl px-12 py-3 flex items-center gap-2 text-[13px]">
        <Link href="/" className={`font-medium no-underline hover:underline ${isDark ? "text-brand-400" : "text-brand-500"}`}>{t("home")}</Link>
        <span className={isDark ? "text-neutral-600" : "text-neutral-400"}>/</span>
        <Link href={type === "zone" ? "/" : "/creatures"} className={`font-medium no-underline hover:underline ${isDark ? "text-brand-400" : "text-brand-500"}`}>
          {type === "zone" ? "Zones" : t("creatures")}
        </Link>
        <span className={isDark ? "text-neutral-600" : "text-neutral-400"}>/</span>
        <span className={`font-medium ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>{fileNo} {nameEn}</span>
      </div>
    </div>
  );
}

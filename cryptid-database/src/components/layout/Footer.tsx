"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="border-t border-neutral-200 bg-white py-4">
      <div className="mx-auto max-w-7xl px-4 text-center text-xs text-neutral-400">
        <p className="mb-1">{t("disclaimer")}</p>
        <p>{t("copyright", { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}

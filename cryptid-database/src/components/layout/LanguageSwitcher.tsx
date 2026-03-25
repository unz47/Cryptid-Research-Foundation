"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = locale === "en" ? "ja" : "en";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: switchTo })}
      className="text-xs font-mono font-bold border border-neutral-300 rounded px-2 py-1 text-neutral-600 hover:text-brand-600 hover:border-brand-600 transition-colors duration-200"
    >
      {locale === "ja" ? "日本語" : "EN"}
    </button>
  );
}

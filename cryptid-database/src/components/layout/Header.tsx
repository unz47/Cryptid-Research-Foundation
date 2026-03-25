"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/creatures", label: t("creatures") },
    { href: "/zones", label: t("zones") },
    { href: "/about", label: t("about") },
  ] as const;

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-brand-600 no-underline hover:no-underline">
          <Image src="/logo.svg" alt="" width={32} height={32} />
          Cryptid Research Foundation
        </Link>

        <nav className="flex items-center gap-6">
          {navLinks.map((link) => {
            const localePath = `/${locale}${link.href === "/" ? "" : link.href}`;
            const isActive = link.href === "/"
              ? pathname === `/${locale}` || pathname === `/${locale}/`
              : pathname.startsWith(localePath);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link no-underline ${isActive ? "active" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}

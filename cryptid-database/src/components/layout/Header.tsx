import Image from "next/image";
import Link from "next/link";

// ナビゲーションリンクの定義
const navLinks = [
  { href: "/creatures", label: "Creatures" },
  { href: "/regions", label: "Regions" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 flex items-center justify-between h-16">
        {/* ロゴ */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-brand-600 no-underline hover:no-underline">
          <Image src="/logo.svg" alt="" width={32} height={32} />
          Cryptid Research Foundation
        </Link>

        {/* ナビゲーション */}
        <nav className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-600 hover:text-brand-600 no-underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

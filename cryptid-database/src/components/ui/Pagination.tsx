import { Link } from "@/i18n/navigation";

const PER_PAGE = 12;

export default function Pagination({ total, current, basePath, dark }: { total: number; current: number; basePath: string; dark?: boolean }) {
  const totalPages = Math.ceil(total / PER_PAGE);
  if (totalPages <= 1) return null;

  const inactive = dark
    ? "border border-neutral-600 text-neutral-400 hover:bg-neutral-800"
    : "border border-neutral-300 text-neutral-600 hover:bg-neutral-100";

  return (
    <div className="flex items-center justify-center gap-2 mt-12 font-mono text-sm">
      {current > 1 && (
        <Link href={`${basePath}?page=${current - 1}`} className={`px-3 py-1.5 rounded no-underline transition-colors ${inactive}`}>←</Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <Link
          key={p}
          href={`${basePath}?page=${p}`}
          className={`px-3 py-1.5 rounded no-underline transition-colors ${p === current ? "bg-brand-600 text-white" : inactive}`}
        >
          {p}
        </Link>
      ))}
      {current < totalPages && (
        <Link href={`${basePath}?page=${current + 1}`} className={`px-3 py-1.5 rounded no-underline transition-colors ${inactive}`}>→</Link>
      )}
    </div>
  );
}

export { PER_PAGE };

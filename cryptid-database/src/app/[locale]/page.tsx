import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import FeaturedCryptids from "@/components/home/FeaturedCryptids";
import AnomalousZones from "@/components/home/AnomalousZones";

export default function HomePage() {
  const t = useTranslations("hero");

  return (
    <>
      <section className="bg-brand-900 text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-white mb-4">{t("title")}</h1>
          <p className="text-brand-200 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            {t("subtitle")}
          </p>
          <Link
            href="/creatures"
            className="inline-block bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-md transition-all duration-200 no-underline hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
          >
            {t("cta")}
          </Link>
        </div>
      </section>

      <FeaturedCryptids />
      <AnomalousZones />
    </>
  );
}

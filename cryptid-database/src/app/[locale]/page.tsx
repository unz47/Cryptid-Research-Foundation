import { useTranslations } from "next-intl";
import FeaturedCryptids from "@/components/home/FeaturedCryptids";
import AnomalousZones from "@/components/home/AnomalousZones";
import HeroSearch from "@/components/home/HeroSearch";

export default function HomePage() {
  const t = useTranslations("hero");

  return (
    <>
      <section className="bg-brand-900 text-white py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-white mb-4">{t("title")}</h1>
          <p className="text-brand-200 text-lg md:text-xl max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
          <HeroSearch />
        </div>
      </section>

      <FeaturedCryptids />
      <AnomalousZones />
    </>
  );
}

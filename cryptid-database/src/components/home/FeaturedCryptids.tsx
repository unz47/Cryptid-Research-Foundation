"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getImage } from "@/lib/defaultImage";
import Image from "next/image";

const featuredCreatures = [
  { id: "tsuchinoko", name: "ツチノコ", nameEn: "Tsuchinoko", fileNo: "CRF-0042", classification: "CLASS-III", classColor: "bg-warning", region: "Japan", description: "日本の山林に生息するとされる太く短い蛇のような未確認生物。" },
  { id: "bigfoot", name: "ビッグフット", nameEn: "Bigfoot", fileNo: "CRF-0001", classification: "CLASS-IV", classColor: "bg-accent-500", region: "North America", description: "北米の森林地帯で目撃される大型の二足歩行類人猿。" },
  { id: "mothman", name: "モスマン", nameEn: "Mothman", fileNo: "CRF-0017", classification: "CLASS-IV", classColor: "bg-accent-500", region: "North America", description: "赤い目を持つ翼のある人型生物。災害の前兆として目撃される。" },
];

export default function FeaturedCryptids() {
  const t = useTranslations("featured");

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-xs font-mono font-bold tracking-widest text-brand-600 mb-2">{t("label")}</p>
        <div className="flex items-center justify-between mb-8">
          <h2>{t("title")}</h2>
          <Link href="/creatures" className="text-sm font-mono text-brand-500 no-underline hover:underline">{t("viewAll")} →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCreatures.map((creature) => (
            <Link
              key={creature.id}
              href={`/creatures/${creature.id}`}
              className="group block bg-white rounded-lg border border-neutral-200 overflow-hidden no-underline transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                <Image
                  src={getImage(undefined, creature.id)}
                  alt={creature.nameEn}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-neutral-400">{creature.fileNo}</span>
                  <span className={`${creature.classColor} text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded`}>{creature.classification}</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-800 group-hover:text-brand-600 transition-colors duration-200">{creature.name}</h3>
                <p className="text-sm text-neutral-500 mb-2">{creature.nameEn} — {creature.region}</p>
                <p className="text-sm text-neutral-600 line-clamp-2">{creature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

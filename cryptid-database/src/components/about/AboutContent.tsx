const classificationLevels = [
  { level: "CLASS-I", name: "Harmless", color: "bg-success", description: "無害。人間に対する脅威は確認されていない。観察・記録のみで対応可能。" },
  { level: "CLASS-II", name: "Caution", color: "bg-info", description: "注意。直接的な危害の報告は少ないが、遭遇時には警戒が必要。不用意な接近は推奨しない。" },
  { level: "CLASS-III", name: "Dangerous", color: "bg-warning", description: "危険。人間への攻撃・負傷事例が複数報告されている。調査時は必ず複数名で行動し、防護装備を携行すること。" },
  { level: "CLASS-IV", name: "High Threat", color: "bg-accent-500", description: "高脅威。死亡事例または重大な被害報告あり。専門訓練を受けた調査員のみ対応可。一般研究員の接近を禁止。" },
  { level: "CLASS-V", name: "Critical", color: "bg-red-800", description: "最高危険度。遭遇した場合、生存率が著しく低下する。調査は遠隔手段に限定。現地入りには本部の特別許可が必要。" },
  { level: "CLASS-S", name: "Catastrophic", color: "bg-neutral-900", description: "特級。存在そのものが広域災害に匹敵する脅威。全調査記録は最高機密扱い。対応プロトコルは本部理事会の直轄管理下に置かれ、一切の情報開示が禁止されている。" },
];

const statuses = [
  { status: "ACTIVE INVESTIGATION", dot: "bg-green-500", desc: "現在進行中の調査対象" },
  { status: "PENDING REVIEW", dot: "bg-yellow-500", desc: "新規報告の審査待ち" },
  { status: "CASE CLOSED", dot: "bg-neutral-400", desc: "調査完了・結論確定" },
  { status: "CLASSIFIED", dot: "bg-red-500", desc: "機密扱い・アクセス制限" },
];

export default function AboutContent() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 space-y-20">
      {/* Mission */}
      <section className="max-w-3xl">
        <p className="text-xs font-mono font-bold tracking-widest text-brand-600 mb-3">OUR MISSION</p>
        <h1 className="mb-6">Cryptid Research Foundation</h1>
        <div className="space-y-4 text-neutral-600 leading-relaxed">
          <p>Cryptid Research Foundation（CRF）は、世界各地で報告される未確認生物——いわゆるクリプティッド——の目撃情報を収集・分析し、体系的に記録することを目的とした民間研究機関です。</p>
          <p>1987年の設立以来、フィールド調査員のネットワークを通じて1,200件以上の調査報告を蓄積。科学的手法に基づく分析と、各地の伝承・民俗学的知見を組み合わせた独自のアプローチで、未知の生物の実態解明に取り組んでいます。</p>
          <p>本データベースは、CRFの調査記録を一般に公開し、クリプティッド研究への関心と理解を広めることを目的としています。</p>
        </div>
      </section>

      {/* Team Photo */}
      <section className="max-w-3xl">
        <div className="rounded-lg overflow-hidden border border-neutral-200">
          <img src="/about-team.jpg" alt="CRF調査団 集合写真" className="w-full" />
        </div>
        <p className="text-xs text-neutral-400 font-mono mt-2 text-center">CRF Field Research Team — Annual Expedition, 2024</p>
      </section>

      {/* Classification System */}
      <section>
        <p className="text-xs font-mono font-bold tracking-widest text-brand-600 mb-3">CLASSIFICATION SYSTEM</p>
        <h2 className="mb-3">CRF分類等級</h2>
        <p className="text-neutral-500 mb-8 max-w-2xl">CRFでは、各クリプティッドの危険度に基づき、独自の5段階分類を適用しています。調査員の安全確保と適切な対応プロトコルの選定に使用されます。</p>
        <div className="space-y-4">
          {classificationLevels.map((cls) => (
            <div key={cls.level} className="flex items-start gap-4 bg-white rounded-lg border border-neutral-200 p-5">
              <span className={`${cls.color} text-white text-xs font-mono font-bold px-3 py-1 rounded shrink-0`}>{cls.level}</span>
              <div>
                <p className="font-semibold text-neutral-800">{cls.name}</p>
                <p className="text-sm text-neutral-500 mt-1">{cls.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Investigation Status */}
      <section className="max-w-3xl">
        <p className="text-xs font-mono font-bold tracking-widest text-brand-600 mb-3">INVESTIGATION STATUS</p>
        <h2 className="mb-3">調査ステータス</h2>
        <p className="text-neutral-500 mb-8">各クリプティッドの調査ファイルには、以下のステータスが付与されます。</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {statuses.map((item) => (
            <div key={item.status} className="flex items-center gap-3 bg-white rounded-lg border border-neutral-200 p-4">
              <span className={`${item.dot} w-2.5 h-2.5 rounded-full shrink-0`} />
              <div>
                <p className="text-sm font-mono font-semibold text-neutral-800">{item.status}</p>
                <p className="text-xs text-neutral-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About This Site */}
      <section className="max-w-3xl border-t border-neutral-200 pt-16">
        <p className="text-xs font-mono font-bold tracking-widest text-brand-600 mb-3">ABOUT THIS SITE</p>
        <h2 className="mb-6">このサイトについて</h2>
        <div className="space-y-4 text-neutral-600 leading-relaxed">
          <p>このサイトは、未確認生物（UMA / Cryptid）の情報をまとめたデータベースサイトです。世界中のクリプティッドの伝承、目撃情報、科学的考察を楽しめます。</p>
          <p>クリプティッドをモチーフにしたオリジナルグッズも制作しています。</p>
        </div>
        <div className="mt-6">
          <a href="https://www.etsy.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-medium px-5 py-2.5 rounded-md no-underline hover:bg-brand-700 transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]">
            Visit Our Shop →
          </a>
        </div>
      </section>
    </div>
  );
}

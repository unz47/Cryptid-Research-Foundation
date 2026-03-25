export interface FileEntry {
  slug: string;
  fileNo: string;
  name: string;
  nameEn: string;
  classification: string;
  classColor: string;
  status: string;
  statusColor: string;
  filedDate: string;
  lastUpdated: string;
  region: string;
  firstRecord: string;
  estSize: string;
  sightings: number;
  credibility: number;
  tags: string[];
  image: string;
  overview: string;
  logs: { date: string; content: string }[];
  type: "creature" | "zone";
  searchAliases: string[];
}

export const fileEntries: Record<string, FileEntry> = {
  tsuchinoko: {
    slug: "tsuchinoko",
    fileNo: "CRF-0042",
    name: "ツチノコ",
    nameEn: "Tsuchinoko",
    classification: "CLASS-III",
    classColor: "bg-warning",
    status: "ACTIVE INVESTIGATION",
    statusColor: "bg-green-500",
    filedDate: "2024-03-15",
    lastUpdated: "2026-03-15T09:42:00Z",
    region: "Shikoku, Japan",
    firstRecord: "712 CE (Kojiki)",
    estSize: "30-80 cm",
    sightings: 1247,
    credibility: 7.2,
    tags: ["REPTILIAN", "JAPAN", "TERRESTRIAL"],
    image: "",
    overview: "ツチノコは、日本各地の山林で目撃されている未確認動物です。通常の蛇とは異なり、胴体が太く短い形状をしており、時には跳躍するとも報告されています。古事記にも類似の記述があり、日本最古のクリプティッドの一つとされています。",
    logs: [
      { date: "2026-02-14", content: "四国山地にて新たな目撃報告を受理。調査チームAlpha-7を派遣。現地での痕跡採取を実施。" },
      { date: "2025-11-03", content: "奈良県吉野郡にて体毛サンプルを回収。DNA分析の結果、既知の爬虫類とは一致せず。追加調査を勧告。" },
    ],
    type: "creature",
    searchAliases: ["つちのこ", "tsuchinoko"],
  },
  bigfoot: {
    slug: "bigfoot",
    fileNo: "CRF-0001",
    name: "ビッグフット",
    nameEn: "Bigfoot",
    classification: "CLASS-IV",
    classColor: "bg-accent-500",
    status: "ACTIVE INVESTIGATION",
    statusColor: "bg-green-500",
    filedDate: "1987-06-01",
    lastUpdated: "2026-03-10T14:20:00Z",
    region: "Pacific Northwest, USA",
    firstRecord: "1958 (Humboldt Times)",
    estSize: "2.0-3.0 m",
    sightings: 10342,
    credibility: 6.8,
    tags: ["PRIMATE", "NORTH AMERICA", "TERRESTRIAL"],
    image: "",
    overview: "ビッグフット（サスカッチ）は、北米太平洋岸北西部の森林地帯で目撃される大型の二足歩行類人猿型クリプティッドです。1967年のパターソン・ギムリンフィルムが最も有名な証拠資料として知られています。",
    logs: [
      { date: "2026-01-20", content: "ワシントン州オリンピック国立公園にて大型の足跡を確認。石膏型を採取し分析中。" },
      { date: "2025-09-15", content: "オレゴン州にて赤外線カメラが未確認の大型二足歩行生物を捕捉。映像解析を継続。" },
    ],
    type: "creature",
    searchAliases: ["びっぐふっと", "bigfoot", "sasquatch", "サスカッチ", "さすかっち"],
  },
  mothman: {
    slug: "mothman",
    fileNo: "CRF-0017",
    name: "モスマン",
    nameEn: "Mothman",
    classification: "CLASS-IV",
    classColor: "bg-accent-500",
    status: "ACTIVE INVESTIGATION",
    statusColor: "bg-green-500",
    filedDate: "1988-11-15",
    lastUpdated: "2026-02-28T11:00:00Z",
    region: "Point Pleasant, West Virginia, USA",
    firstRecord: "1966",
    estSize: "2.0 m (wingspan 3-5 m)",
    sightings: 487,
    credibility: 5.4,
    tags: ["WINGED", "NORTH AMERICA", "AERIAL"],
    image: "",
    overview: "モスマンは、1966年から1967年にかけてウェストバージニア州ポイントプレザントで集中的に目撃された翼を持つ人型クリプティッドです。赤く光る目が特徴で、シルバーブリッジ崩落事故との関連が指摘されています。",
    logs: [
      { date: "2025-12-01", content: "シカゴ上空にて翼を持つ人型生物の目撃報告が複数寄せられる。パターンはポイントプレザント事例と一致。" },
      { date: "2025-08-20", content: "目撃者インタビューを実施。共通する特徴：赤い発光体、無音飛行、強い恐怖感の誘発。" },
    ],
    type: "creature",
    searchAliases: ["もすまん", "mothman"],
  },
  "bermuda-triangle": {
    slug: "bermuda-triangle",
    fileNo: "CRF-Z001",
    name: "バミューダトライアングル",
    nameEn: "Bermuda Triangle",
    classification: "CLASS-V",
    classColor: "bg-red-800",
    status: "ACTIVE INVESTIGATION",
    statusColor: "bg-green-500",
    filedDate: "1987-06-01",
    lastUpdated: "2026-03-01T08:00:00Z",
    region: "Atlantic Ocean",
    firstRecord: "1945 (Flight 19)",
    estSize: "1,300,000 km²",
    sightings: 312,
    credibility: 4.1,
    tags: ["ANOMALOUS ZONE", "OCEANIC", "ELECTROMAGNETIC"],
    image: "",
    overview: "バミューダトライアングルは、マイアミ、バミューダ諸島、プエルトリコを結ぶ大西洋上の三角海域です。1945年のフライト19消失事件以来、航空機・船舶の原因不明の消失が多数報告されています。",
    logs: [
      { date: "2026-01-10", content: "海域内で異常な磁場変動を観測。計測機器の誤作動が複数報告される。" },
      { date: "2025-07-22", content: "衛星画像解析により、海面温度の局所的異常を確認。原因調査を継続。" },
    ],
    type: "zone",
    searchAliases: ["ばみゅーだ", "bermuda"],
  },
  "skinwalker-ranch": {
    slug: "skinwalker-ranch",
    fileNo: "CRF-Z008",
    name: "スキンウォーカー牧場",
    nameEn: "Skinwalker Ranch",
    classification: "CLASS-S",
    classColor: "bg-neutral-900",
    status: "CLASSIFIED",
    statusColor: "bg-red-500",
    filedDate: "1994-03-20",
    lastUpdated: "2026-03-12T16:30:00Z",
    region: "Utah, USA",
    firstRecord: "1994",
    estSize: "2 km²",
    sightings: 892,
    credibility: 6.0,
    tags: ["ANOMALOUS ZONE", "MULTI-PHENOMENON", "RESTRICTED"],
    image: "",
    overview: "スキンウォーカー牧場は、ユタ州ユインタ盆地に位置する約2km²の特異地点です。UFO、ポルターガイスト、未確認生物、時空間異常など、複合的な異常現象が集中的に報告されています。",
    logs: [
      { date: "2026-02-05", content: "[REDACTED] — 本記録はCLASS-S指定により閲覧制限されています。" },
      { date: "2025-10-18", content: "[REDACTED] — アクセスには本部理事会の特別許可が必要です。" },
    ],
    type: "zone",
    searchAliases: ["すきんうぉーかー", "skinwalker"],
  },
  aokigahara: {
    slug: "aokigahara",
    fileNo: "CRF-Z012",
    name: "青木ヶ原樹海",
    nameEn: "Aokigahara",
    classification: "CLASS-III",
    classColor: "bg-warning",
    status: "ACTIVE INVESTIGATION",
    statusColor: "bg-green-500",
    filedDate: "1991-08-10",
    lastUpdated: "2026-02-20T10:15:00Z",
    region: "Yamanashi, Japan",
    firstRecord: "Ancient",
    estSize: "35 km²",
    sightings: 156,
    credibility: 5.8,
    tags: ["ANOMALOUS ZONE", "JAPAN", "ELECTROMAGNETIC"],
    image: "",
    overview: "青木ヶ原樹海は、富士山北西麓に広がる約35km²の原生林です。溶岩台地上に形成された特異な地形により、磁場異常とコンパスの狂いが報告されています。複数の未解明現象が記録されています。",
    logs: [
      { date: "2025-12-15", content: "樹海内部にて磁場測定を実施。複数地点で通常値の3倍以上の変動を確認。" },
      { date: "2025-06-30", content: "夜間調査にて原因不明の発光現象を記録。音響異常も同時に観測。" },
    ],
    type: "zone",
    searchAliases: ["あおきがはら", "じゅかい", "aokigahara", "樹海"],
  },
};

// fileEntries is still used by HeroSearch and SearchResults for client-side predictive search

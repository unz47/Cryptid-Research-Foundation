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
  image: string | string[];
  overview: string;
  logs: { date: string; content: string }[];
  type: "creature" | "zone";
  searchAliases: string[];
  shopUrl?: string;
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
    lastUpdated: "2026-03-29T17:40:00Z",
    region: "Western Honshu / Shikoku, Japan",
    firstRecord: "712 CE (Kojiki)",
    estSize: "30-80 cm",
    sightings: 1289,
    credibility: 7.2,
    tags: ["REPTILIAN", "JAPAN", "TERRESTRIAL", "VENOMOUS", "JUMPING"],
    image: ["/creatures/tsuchinoko-1.jpg", "/creatures/tsuchinoko-video-1.mp4"],
    overview: "ツチノコ（槌の子）は、日本の山林地帯で目撃が報告されている蛇型の未確認動物である。体長30〜80cm、胴体中央部が極端に太く頭部と尾部が細い独特の体型を持ち、マムシに似た毒牙を有するとされる。最大の特徴は最大2mとも言われる跳躍能力で、体を丸めて転がる、尾を咥えて輪状になり斜面を転がり落ちるといった通常の蛇には見られない移動手段が多数証言されている。最古の記録は712年成立の古事記に遡り、「野槌」の名で言及される。関西・四国地方を中心に目撃が集中し、奈良県下北山村や岐阜県東白川村など複数の自治体が懸賞金付きの捕獲イベントを開催している。東白川村では1989年から毎年5月3日に「つちのこフェスタ」が開催され、捕獲賞金は132万円に達している。「チー」という鳴き声を発する、いびきをかいて眠る、人語を解し嘘をつく、酒を好むといった伝承も各地に残る。正体についてはヤマカガシやマムシの肥満個体、ヒメハブの誤認、アオジタトカゲの逸走個体など複数の仮説が提唱されているが、跳躍行動や転がり移動を説明できる既知種は特定されていない。CRFは四国山地および紀伊半島を重点調査区域に指定し、環境DNA調査とトレイルカメラ網による継続監視を実施中。",
    logs: [
      { date: "2026-03-18", content: "岐阜県東白川村「つちのこフェスタ」実行委員会と連携協定を締結。5月3日の捕獲イベントにCRF調査班を派遣予定。トレイルカメラ6台を村内の過去目撃多発地点に設置完了。" },
      { date: "2026-02-14", content: "四国山地・剣山系にて新たな目撃報告を受理。調査チームAlpha-7を派遣。落葉層に幅約12cm・深さ3cmの不自然な圧痕を発見。通常の蛇の這行痕とは明らかに異なる形状。土壌サンプルおよび周辺の環境DNA水サンプルを採取し本部ラボへ送付。" },
      { date: "2025-11-03", content: "奈良県吉野郡下北山村にて鱗状の組織片を回収。DNA分析の結果、ナミヘビ科・クサリヘビ科いずれとも一致せず、部分配列にヘビ亜目の特徴を示すものの既知種データベースに該当なし。サンプルの追加解析を国立遺伝学研究所に依頼。" },
    ],
    type: "creature",
    searchAliases: ["つちのこ", "tsuchinoko", "ノツチ", "のつち", "ツチヘビ", "つちへび", "野槌", "バチヘビ", "ばちへび"],
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
  nessie: {
    slug: "nessie",
    fileNo: "CRF-0002",
    name: "ネッシー",
    nameEn: "Loch Ness Monster",
    classification: "CLASS-II",
    classColor: "bg-blue-500",
    status: "ACTIVE INVESTIGATION",
    statusColor: "bg-green-500",
    filedDate: "1987-06-01",
    lastUpdated: "2026-03-25T22:13:00Z",
    region: "Scottish Highlands, UK",
    firstRecord: "565 CE (Saint Columba)",
    estSize: "5.0-15.0 m",
    sightings: 4271,
    credibility: 5.2,
    tags: ["AQUATIC", "EUROPE", "LACUSTRINE"],
    image: ["/creatures/nessie-1.jpg", "/creatures/nessie-2.jpg"],
    overview: "ネッシーは、スコットランド北部のネス湖に生息するとされる大型水棲クリプティッドである。",
    logs: [
      { date: "2026-03-10", content: "ネス湖南岸にて水面の異常な波紋を観測。ソナーに全長約8mの移動体を捕捉するも、追跡中にロスト。" },
    ],
    type: "creature",
    searchAliases: ["ねっしー", "nessie", "loch ness monster", "ロッホネスモンスター", "ネス湖の怪獣"],
    shopUrl: "https://www.etsy.com/jp/listing/4477542096/cute-loch-ness-monster-sticker-kawaii",
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

-- CRF File Entries table
CREATE TABLE file_entries (
  slug TEXT PRIMARY KEY,
  file_no TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  name_en TEXT NOT NULL,
  classification TEXT NOT NULL,
  class_color TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'ACTIVE INVESTIGATION',
  status_color TEXT NOT NULL DEFAULT 'bg-green-500',
  filed_date DATE NOT NULL DEFAULT CURRENT_DATE,
  last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  region TEXT NOT NULL,
  first_record TEXT NOT NULL,
  est_size TEXT NOT NULL,
  sightings INTEGER NOT NULL DEFAULT 0,
  credibility NUMERIC(3,1) NOT NULL DEFAULT 5.0,
  tags TEXT[] NOT NULL DEFAULT '{}',
  image TEXT NOT NULL DEFAULT '',
  overview TEXT NOT NULL,
  logs JSONB NOT NULL DEFAULT '[]',
  type TEXT NOT NULL CHECK (type IN ('creature', 'zone')),
  search_aliases TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_file_entries_type ON file_entries(type);
CREATE INDEX idx_file_entries_classification ON file_entries(classification);
CREATE INDEX idx_file_entries_region ON file_entries(region);
CREATE INDEX idx_file_entries_tags ON file_entries USING GIN(tags);

-- Enable Row Level Security
ALTER TABLE file_entries ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read access" ON file_entries
  FOR SELECT USING (true);

-- Seed data
INSERT INTO file_entries (slug, file_no, name, name_en, classification, class_color, status, status_color, filed_date, last_updated, region, first_record, est_size, sightings, credibility, tags, image, overview, logs, type, search_aliases) VALUES
('tsuchinoko', 'CRF-0042', 'ツチノコ', 'Tsuchinoko', 'CLASS-III', 'bg-warning', 'ACTIVE INVESTIGATION', 'bg-green-500', '2024-03-15', '2026-03-29T17:40:00Z', 'Western Honshu / Shikoku, Japan', '712 CE (Kojiki)', '30-80 cm', 1289, 7.2, ARRAY['REPTILIAN','JAPAN','TERRESTRIAL','VENOMOUS','JUMPING'], '/creatures/tsuchinoko-1.jpg,/creatures/tsuchinoko-video-1.mp4', 'ツチノコ（槌の子）は、日本の山林地帯で目撃が報告されている蛇型の未確認動物である。体長30〜80cm、胴体中央部が極端に太く頭部と尾部が細い独特の体型を持ち、マムシに似た毒牙を有するとされる。最大の特徴は最大2mとも言われる跳躍能力で、体を丸めて転がる、尾を咥えて輪状になり斜面を転がり落ちるといった通常の蛇には見られない移動手段が多数証言されている。最古の記録は712年成立の古事記に遡り、「野槌」の名で言及される。関西・四国地方を中心に目撃が集中し、奈良県下北山村や岐阜県東白川村など複数の自治体が懸賞金付きの捕獲イベントを開催している。東白川村では1989年から毎年5月3日に「つちのこフェスタ」が開催され、捕獲賞金は132万円に達している。「チー」という鳴き声を発する、いびきをかいて眠る、人語を解し嘘をつく、酒を好むといった伝承も各地に残る。正体についてはヤマカガシやマムシの肥満個体、ヒメハブの誤認、アオジタトカゲの逸走個体など複数の仮説が提唱されているが、跳躍行動や転がり移動を説明できる既知種は特定されていない。CRFは四国山地および紀伊半島を重点調査区域に指定し、環境DNA調査とトレイルカメラ網による継続監視を実施中。', '[{"date":"2026-03-18","content":"岐阜県東白川村「つちのこフェスタ」実行委員会と連携協定を締結。5月3日の捕獲イベントにCRF調査班を派遣予定。トレイルカメラ6台を村内の過去目撃多発地点に設置完了。"},{"date":"2026-02-14","content":"四国山地・剣山系にて新たな目撃報告を受理。調査チームAlpha-7を派遣。落葉層に幅約12cm・深さ3cmの不自然な圧痕を発見。通常の蛇の這行痕とは明らかに異なる形状。土壌サンプルおよび周辺の環境DNA水サンプルを採取し本部ラボへ送付。"},{"date":"2025-11-03","content":"奈良県吉野郡下北山村にて鱗状の組織片を回収。DNA分析の結果、ナミヘビ科・クサリヘビ科いずれとも一致せず、部分配列にヘビ亜目の特徴を示すものの既知種データベースに該当なし。サンプルの追加解析を国立遺伝学研究所に依頼。"}]', 'creature', ARRAY['つちのこ','tsuchinoko','ノツチ','のつち','ツチヘビ','つちへび','野槌','バチヘビ','ばちへび']),
('bigfoot', 'CRF-0001', 'ビッグフット', 'Bigfoot', 'CLASS-IV', 'bg-accent-500', 'ACTIVE INVESTIGATION', 'bg-green-500', '1987-06-01', '2026-03-10T14:20:00Z', 'Pacific Northwest, USA', '1958 (Humboldt Times)', '2.0-3.0 m', 10342, 6.8, ARRAY['PRIMATE','NORTH AMERICA','TERRESTRIAL'], '', 'ビッグフット（サスカッチ）は、北米太平洋岸北西部の森林地帯で目撃される大型の二足歩行類人猿型クリプティッドです。1967年のパターソン・ギムリンフィルムが最も有名な証拠資料として知られています。', '[{"date":"2026-01-20","content":"ワシントン州オリンピック国立公園にて大型の足跡を確認。石膏型を採取し分析中。"},{"date":"2025-09-15","content":"オレゴン州にて赤外線カメラが未確認の大型二足歩行生物を捕捉。映像解析を継続。"}]', 'creature', ARRAY['びっぐふっと','bigfoot','sasquatch','サスカッチ','さすかっち']),
('mothman', 'CRF-0017', 'モスマン', 'Mothman', 'CLASS-IV', 'bg-accent-500', 'ACTIVE INVESTIGATION', 'bg-green-500', '1988-11-15', '2026-02-28T11:00:00Z', 'Point Pleasant, West Virginia, USA', '1966', '2.0 m (wingspan 3-5 m)', 487, 5.4, ARRAY['WINGED','NORTH AMERICA','AERIAL'], '', 'モスマンは、1966年から1967年にかけてウェストバージニア州ポイントプレザントで集中的に目撃された翼を持つ人型クリプティッドです。赤く光る目が特徴で、シルバーブリッジ崩落事故との関連が指摘されています。', '[{"date":"2025-12-01","content":"シカゴ上空にて翼を持つ人型生物の目撃報告が複数寄せられる。パターンはポイントプレザント事例と一致。"},{"date":"2025-08-20","content":"目撃者インタビューを実施。共通する特徴：赤い発光体、無音飛行、強い恐怖感の誘発。"}]', 'creature', ARRAY['もすまん','mothman']),
('bermuda-triangle', 'CRF-Z001', 'バミューダトライアングル', 'Bermuda Triangle', 'CLASS-V', 'bg-red-800', 'ACTIVE INVESTIGATION', 'bg-green-500', '1987-06-01', '2026-03-01T08:00:00Z', 'Atlantic Ocean', '1945 (Flight 19)', '1,300,000 km²', 312, 4.1, ARRAY['ANOMALOUS ZONE','OCEANIC','ELECTROMAGNETIC'], '', 'バミューダトライアングルは、マイアミ、バミューダ諸島、プエルトリコを結ぶ大西洋上の三角海域です。1945年のフライト19消失事件以来、航空機・船舶の原因不明の消失が多数報告されています。', '[{"date":"2026-01-10","content":"海域内で異常な磁場変動を観測。計測機器の誤作動が複数報告される。"},{"date":"2025-07-22","content":"衛星画像解析により、海面温度の局所的異常を確認。原因調査を継続。"}]', 'zone', ARRAY['ばみゅーだ','bermuda']),
('skinwalker-ranch', 'CRF-Z008', 'スキンウォーカー牧場', 'Skinwalker Ranch', 'CLASS-S', 'bg-neutral-900', 'CLASSIFIED', 'bg-red-500', '1994-03-20', '2026-03-12T16:30:00Z', 'Utah, USA', '1994', '2 km²', 892, 6.0, ARRAY['ANOMALOUS ZONE','MULTI-PHENOMENON','RESTRICTED'], '', 'スキンウォーカー牧場は、ユタ州ユインタ盆地に位置する約2km²の特異地点です。UFO、ポルターガイスト、未確認生物、時空間異常など、複合的な異常現象が集中的に報告されています。', '[{"date":"2026-02-05","content":"[REDACTED] — 本記録はCLASS-S指定により閲覧制限されています。"},{"date":"2025-10-18","content":"[REDACTED] — アクセスには本部理事会の特別許可が必要です。"}]', 'zone', ARRAY['すきんうぉーかー','skinwalker']),
('aokigahara', 'CRF-Z012', '青木ヶ原樹海', 'Aokigahara', 'CLASS-III', 'bg-warning', 'ACTIVE INVESTIGATION', 'bg-green-500', '1991-08-10', '2026-02-20T10:15:00Z', 'Yamanashi, Japan', 'Ancient', '35 km²', 156, 5.8, ARRAY['ANOMALOUS ZONE','JAPAN','ELECTROMAGNETIC'], '', '青木ヶ原樹海は、富士山北西麓に広がる約35km²の原生林です。溶岩台地上に形成された特異な地形により、磁場異常とコンパスの狂いが報告されています。複数の未解明現象が記録されています。', '[{"date":"2025-12-15","content":"樹海内部にて磁場測定を実施。複数地点で通常値の3倍以上の変動を確認。"},{"date":"2025-06-30","content":"夜間調査にて原因不明の発光現象を記録。音響異常も同時に観測。"}]', 'zone', ARRAY['あおきがはら','じゅかい','aokigahara','樹海']);

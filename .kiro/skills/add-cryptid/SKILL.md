# Add Cryptid / Zone Entry

CRFデータベースに新しいクリーチャーまたは異常空間エントリを追加するスキル。

## 使い方

`@add-cryptid 'name:ジャージーデビル, type:creature'` のように呼び出す。

## 手順

1. ユーザーから生物名/地点名を受け取る
2. **著作権・商標チェック** を実施する:
   - その生物/地点の名称が商標登録されていないか確認
   - 特定の映画、ゲーム、書籍等のオリジナルキャラクターでないか確認
   - 民間伝承・都市伝説ベースであればOK（ビッグフット、ネッシー等）
   - 特定企業・個人が権利を持つキャラクター（SCP財団の個別エントリ等）はNG
   - 判定結果を「✅ 著作権クリア」または「⚠️ 要確認: [理由]」で報告する
3. 以下の情報を調査・生成する:
   - 日本語名、英語名
   - 概要（日本語 + 英語、CRFの調査報告書風の文体）
   - 地域、最初の記録、推定サイズ、目撃件数、信憑性スコア
   - 分類タグ（大文字英語）
   - CLASS分類（脅威度ベース: I=無害 〜 V=最高危険度, S=特級）
   - 調査ログ2-3件（日本語 + 英語、CRF調査員の報告書風）
   - 検索用エイリアス（ひらがな読み、ローマ字、別名）
3. データ追加ガイドに従ってエントリを構成する
4. Supabase に INSERT SQL を生成して実行する
5. `src/lib/data.ts` の `fileEntries` にも同じデータを追加する（予測検索用）

## 参照ファイル

- `.kiro/steering/13-data-entry-guide.md` — フィールド定義、CLASS/ステータス対応表、採番ルール、テンプレート
- `cryptid-database/src/lib/data.ts` — 既存エントリの形式参照、予測検索用データ
- `cryptid-database/supabase/001_create_file_entries.sql` — テーブルスキーマ

## ファイル番号の採番

- 既存番号を確認し、重複しない番号を採番する
- クリーチャー: `CRF-XXXX`（4桁ゼロ埋め）
- ゾーン: `CRF-ZXXX`（3桁ゼロ埋め）

## CLASS判定基準

| CLASS | 基準 |
|-------|------|
| CLASS-I | 人間への脅威なし |
| CLASS-II | 遭遇時に注意が必要 |
| CLASS-III | 攻撃・負傷事例あり |
| CLASS-IV | 死亡事例・重大被害あり |
| CLASS-V | 遭遇時の生存率が著しく低い |
| CLASS-S | 広域災害レベルの脅威 |

## 文体ガイド

- 概要: 客観的・学術的な記述。「〜とされている」「〜が報告されている」
- 調査ログ: CRF調査員の一人称視点。日付付き。具体的な行動と結果を記述
- CLASS-Sのログは `[REDACTED]` を含める

## SQL INSERT テンプレート

```sql
INSERT INTO file_entries (slug, file_no, name, name_en, classification, class_color, status, status_color, filed_date, last_updated, region, first_record, est_size, sightings, credibility, tags, image, overview, overview_en, logs, logs_en, type, search_aliases)
VALUES (
  'slug-here',
  'CRF-XXXX',
  '日本語名',
  'English Name',
  'CLASS-III',
  'bg-warning',
  'ACTIVE INVESTIGATION',
  'bg-green-500',
  CURRENT_DATE,
  NOW(),
  'Region, Country',
  'Year',
  'X.X m',
  0,
  5.0,
  ARRAY['TAG1', 'TAG2'],
  '',
  '概要テキスト（日本語）',
  'Overview text (English)',
  '[{"date":"2026-03-25","content":"調査ログ（日本語）"}]',
  '[{"date":"2026-03-25","content":"Investigation log (English)"}]',
  'creature',
  ARRAY['ひらがな', 'romaji']
);
```

## data.ts 追加テンプレート

```ts
"slug-here": {
  slug: "slug-here",
  fileNo: "CRF-XXXX",
  name: "日本語名",
  nameEn: "English Name",
  classification: "CLASS-III",
  classColor: "bg-warning",
  status: "ACTIVE INVESTIGATION",
  statusColor: "bg-green-500",
  filedDate: "2026-03-25",
  lastUpdated: "2026-03-25T00:00:00Z",
  region: "Region, Country",
  firstRecord: "Year",
  estSize: "X.X m",
  sightings: 0,
  credibility: 5.0,
  tags: ["TAG1", "TAG2"],
  image: "",
  overview: "概要テキスト",
  logs: [
    { date: "2026-03-25", content: "調査ログ" },
  ],
  type: "creature",
  searchAliases: ["ひらがな", "romaji"],
},
```

## 画像・動画プロンプト生成

エントリ作成時に、以下の3種類のプロンプトも生成する。

### nanobanana（画像生成）用プロンプト — 調査記録写真風

カード用サムネイル画像。「本物の目撃写真」に見えるリアリティが最重要。SNSでシェアされたときに「これ本物？」と思わせる画像を目指す。

**必須要素（この順序で構成する）:**
1. **カメラ/メディア指定** — 撮影機材を明示してリアリティを出す
2. **被写体** — 部分的にしか見えない（全体像は絶対に見せない）
3. **環境** — 具体的な生息地、天候、時間帯
4. **光源** — 自然光、懐中電灯、月明かり等の具体的な光源
5. **テクスチャ** — フィルムグレイン、レンズの汚れ、ノイズ等の劣化要素
6. **ムード** — 不安感、緊張感を演出する形容詞

**バズるためのルール:**
- 被写体は画面の端や奥に配置（中央に堂々と置かない）
- 「撮影者が慌てて撮った」感を出す（ブレ、ピンボケ、フレーミングのズレ）
- 暗すぎず明るすぎず、「ギリギリ何かが見える」程度の露出
- 赤い目、発光、異常な影など「一つだけ不自然な要素」を入れる

**NG:**
- カートゥーン、アニメ、イラスト風
- 明るく鮮明な写真
- 被写体が完全に見えている構図
- テキスト、ウォーターマーク

**テンプレート（クリーチャー）:**
```
Trail camera photograph, night vision green tint, [creature] partially visible [position: behind trees / at edge of frame / in fog], [specific habitat with detail], [specific weather/time], motion blur on subject, lens flare from [light source], heavy film grain, slightly overexposed highlights, timestamp overlay style, raw unprocessed look, no text, no watermark
```

**テンプレート（ゾーン）:**
```
Aerial reconnaissance photograph of [location], taken from [altitude/angle], [specific atmospheric anomaly: strange lights / unusual fog pattern / color distortion], [surrounding landscape detail], overcast sky, desaturated color palette, visible film grain, slight lens distortion at edges, declassified document aesthetic, no text, no watermark
```

**良い例:**
```
Trail camera photograph, infrared night vision, large bipedal silhouette partially visible behind dense pine trees at the far right edge of frame, Pacific Northwest old-growth forest, heavy ground fog, 2AM timestamp feel, motion blur on the subject suggesting rapid movement, two faint reflective points where eyes would be, heavy ISO noise, slightly out of focus, raw unprocessed trail cam quality, no text, no watermark
```

### Kling（動画生成）用プロンプト

5-10秒の「偶然撮れた映像」。Klingはショット単位で考えるので、映画監督のように指示する。

**必須要素（Kling 3.0最適化）:**
1. **カメラ** — 具体的なカメラの動き（handheld drift, crash zoom等）
2. **被写体** — 何が映り、どう動くか（一瞬だけ映る）
3. **環境** — 場所の具体的なディテール
4. **光源** — 光の質と方向
5. **テクスチャ** — VHSノイズ、グレイン、グリッチ等
6. **感情** — 撮影者の反応（カメラが揺れる、急にパンする等）

**バズるためのルール:**
- 最初の2秒は「普通の風景」→ 突然何かが映る構成
- カメラの動きで撮影者の驚きを表現（急なパン、ズーム、手ブレ増加）
- 被写体は3秒以内に消える（長く映しすぎない）
- 音の指示は不要（Klingは映像のみ）

**テンプレート（クリーチャー）:**
```
Handheld camcorder footage, slight drift and sway, [environment establishing shot for 2 seconds], suddenly [creature action] at [position in frame], camera operator startles and [camera reaction: whip-pan / crash zoom / stumble], subject [disappearance action] in [direction], camera lingers on empty [environment] with [residual evidence], VHS camcorder aesthetic with chromatic aberration and tracking lines, shot on consumer-grade camcorder, [time of day] lighting
```

**テンプレート（ゾーン）:**
```
Drone footage, smooth forward glide over [location landscape], steady establishing shot, suddenly [anomaly: electromagnetic interference / visual distortion / impossible light], camera [glitch behavior: static burst / frame skip / color inversion] for 1 second, footage stabilizes showing [aftermath or empty scene], then [second subtle anomaly], desaturated color grade with crushed blacks, surveillance footage timestamp feel
```

**良い例:**
```
Handheld camcorder footage with subtle shoulder-cam sway, filming a misty Scottish loch at dawn from the shoreline, calm water reflecting grey sky for 2 seconds, suddenly a long dark shape breaks the surface 50 meters out creating a wake, camera operator gasps and crash-zooms in shakily, the shape submerges leaving only ripples, camera holds on the disturbing still water, VHS camcorder aesthetic with heavy grain and chromatic aberration, early morning diffused light, visible breath condensation near lens
```

### nanobanana（グッズ用カワイイ）プロンプト

Etsyショップ向けのグッズデザイン。ステッカー、Tシャツ、トートバッグ等に使える。「買いたくなる」デザインが最重要。

**売れるデザインの法則（Etsy調査に基づく）:**
- **大きな目 + 小さな体** — chibi/デフォルメ比率（頭:体 = 1:1 or 2:1）
- **丸いシルエット** — 角張った形より丸い方が「かわいい」と認識される
- **2-3色のシンプルな配色** — パステル系 or ビビッド系（中途半端な色は避ける）
- **表情は「ちょっと困り顔」or「ニコニコ」** — 無表情はNG
- **小物やアクセサリー** — その生物の特徴を可愛くアレンジした小物を持たせる
- **太いアウトライン** — ダイカットステッカーとして映える
- **白背景** — 印刷・加工しやすい

**必須要素:**
1. **被写体** — chibi/kawaii版の生物名
2. **体型** — round body, chubby, squishy等
3. **表情** — big sparkly eyes + 具体的な表情
4. **色** — 具体的なパステルカラー指定（"pastel mint and lavender"等）
5. **小物** — その生物らしい可愛い小物（マフラー、帽子、食べ物等）
6. **スタイル** — flat illustration, thick outline, die-cut sticker
7. **背景** — solid white background

**NG:**
- リアル、怖い、グロテスク、暗い
- 細かすぎるディテール（印刷で潰れる）
- 背景が複雑（ステッカーカットが難しくなる）

**テンプレート（クリーチャー）:**
```
Cute kawaii chibi [creature name], [body shape: round chubby body / squishy bean shape], [head-to-body ratio], big sparkly [eye color] eyes, [specific expression: happy smile / shy blush / playful wink], [2-3 pastel colors specified], [signature cute accessory related to creature's lore], thick black outline, simple flat illustration style, die-cut vinyl sticker design, solid white background, no text, no watermark
```

**テンプレート（ゾーン）:**
```
Cute kawaii illustration of [location], chibi style, [location rendered as adorable character or scene], [2-3 pastel colors], tiny cute [relevant creatures: ghosts / spirits / mysterious orbs] with big eyes scattered around, [signature element of the location made cute], thick outlines, simple flat design, die-cut sticker layout, solid white background, no text, no watermark
```

**良い例:**
```
Cute kawaii chibi Loch Ness Monster, squishy bean-shaped body, head slightly larger than body, big sparkly teal eyes with star-shaped highlights, shy blushing smile with tiny fangs, pastel teal and soft lavender color scheme, wearing a tiny red tartan scarf, holding a small fish in one flipper, thick black outline, simple flat illustration style, die-cut vinyl sticker design, solid white background, no text, no watermark
```

### 出力フォーマット

エントリ作成後、以下の形式でプロンプトを提示する:

```
📸 nanobanana プロンプト（調査写真風）:
[生成したプロンプト]

🎬 Kling プロンプト:
[生成したプロンプト]

🧸 nanobanana プロンプト（グッズ用カワイイ）:
[生成したプロンプト]

🛒 Etsy出品テキスト:
[タイトル]
[説明文]
[タグ]
```

### Etsy出品テキスト生成

グッズ用カワイイプロンプトとセットで、Etsy出品に必要なテキストを生成する。

**Etsy SEO の鉄則（調査に基づく）:**
- タイトルの最初の70文字に最重要キーワードを配置（モバイルで切れるため）
- 13個のタグで同じ単語を繰り返さない（アルゴリズムが自動で組み合わせる）
- タグは長尾キーワード（multi-word phrases）を使う（単語1つは競合が多すぎる）
- 説明文の最初の160文字がGoogle検索のメタディスクリプションになる
- 属性（色、素材等）は全て埋める（フィルター検索で消えないように）

**生成する項目:**

1. **タイトル（英語・140文字フル活用）**
   - 最初の70文字: メインキーワード（商品名 + 最重要検索語）
   - 残り70文字: サブキーワード（用途、ギフト、季節等）
   - パイプ `|` で区切って読みやすく
   - フォーマット: `Cute [Creature] Sticker | Kawaii [Creature] Vinyl Decal | [特徴] Cryptid Gift | Waterproof Laptop Water Bottle Sticker`

2. **説明文（英語）**
   - 最初の160文字: SEOフック（キーワード + ベネフィット、"Thank you for visiting"等のNG）
   - 箇条書きでスキャンしやすく
   - 構成:
     - キャッチコピー（絵文字1-2個）
     - 商品説明（2-3文、デザインの特徴を具体的に）
     - スペック（箇条書き: サイズ、素材、耐水性、仕上げ）
     - 用途提案（箇条書き: ラップトップ、水筒、ノート等）
     - CRFブランドの一言
     - ギフト訴求（"Perfect gift for..."）

3. **タグ（英語・13個、各20文字以内）**
   - 同じ単語を繰り返さない
   - 長尾キーワードを使う（"cute nessie decal" > "nessie"）
   - 生物名、スタイル、用途、ギフト、地域を網羅

**説明文テンプレート:**
```
🔍 The cutest [creature] sticker for cryptid lovers! This adorable kawaii [creature] features [specific design details: colors, expression, accessories].

Perfect as a gift for anyone who loves mysterious creatures, folklore, and all things cute!

📏 Details:
• Size: ~3 inches (7.5 cm)
• Material: Premium vinyl, waterproof & UV resistant
• Finish: Glossy die-cut
• Dishwasher safe

💡 Stick it on:
• Laptops & tablets
• Water bottles & tumblers
• Phone cases & notebooks
• Planners & journals

🎁 Great gift for: cryptid enthusiasts, mythology fans, sticker collectors, Halloween lovers

🏛️ From the Cryptid Research Foundation — where mystery meets cute.
```

**タグ生成ルール（13個、単語重複なし）:**
```
1. [creature] sticker        — メイン商品名
2. kawaii [creature]          — スタイル + 生物名
3. cute cryptid decal         — スタイル + カテゴリ
4. [creature] vinyl           — 素材
5. [region] folklore gift     — 地域 + ギフト
6. mythology lover present    — ターゲット
7. waterproof laptop decal    — 機能 + 用途
8. water bottle decoration    — 用途
9. spooky cute art            — ムード
10. monster fan accessory     — ターゲット
11. halloween party favor     — 季節
12. journal planner sticker   — 用途
13. unique nerdy gift idea    — ギフト + ニッチ
```

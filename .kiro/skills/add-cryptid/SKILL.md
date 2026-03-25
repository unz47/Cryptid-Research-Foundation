# Add Cryptid / Zone Entry

CRFデータベースに新しいクリーチャーまたは異常空間エントリを追加するスキル。

## 使い方

`@add-cryptid 'name:ジャージーデビル, type:creature'` のように呼び出す。

## 手順

1. ユーザーから生物名/地点名を受け取る
2. 以下の情報を調査・生成する:
   - 日本語名、英語名
   - 概要（日本語、CRFの調査報告書風の文体）
   - 地域、最初の記録、推定サイズ、目撃件数、信憑性スコア
   - 分類タグ（大文字英語）
   - CLASS分類（脅威度ベース: I=無害 〜 V=最高危険度, S=特級）
   - 調査ログ2-3件（CRF調査員の報告書風）
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
INSERT INTO file_entries (slug, file_no, name, name_en, classification, class_color, status, status_color, filed_date, last_updated, region, first_record, est_size, sightings, credibility, tags, image, overview, logs, type, search_aliases)
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
  '概要テキスト',
  '[{"date":"2026-03-25","content":"調査ログ"}]',
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

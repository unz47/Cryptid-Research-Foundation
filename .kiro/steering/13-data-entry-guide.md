# データ追加ガイド

`src/lib/data.ts` の `fileEntries` にエントリを追加する際の手順とルール。

---

## 必須フィールド

| フィールド | 型 | 説明 | 例 |
|-----------|-----|------|-----|
| slug | string | URLパス（英語、ケバブケース） | `"jersey-devil"` |
| fileNo | string | クリーチャー: `CRF-XXXX`、ゾーン: `CRF-ZXXX` | `"CRF-0055"` |
| name | string | 日本語名 | `"ジャージーデビル"` |
| nameEn | string | 英語名 | `"Jersey Devil"` |
| classification | string | CLASS-I〜V または CLASS-S | `"CLASS-III"` |
| classColor | string | CLASSに対応するTailwindクラス（下表参照） | `"bg-warning"` |
| status | string | 調査ステータス（下表参照） | `"ACTIVE INVESTIGATION"` |
| statusColor | string | ステータスに対応する色 | `"bg-green-500"` |
| filedDate | string | ファイル登録日 `YYYY-MM-DD` | `"2025-01-15"` |
| lastUpdated | string | 最終更新 ISO 8601 | `"2026-03-20T10:00:00Z"` |
| region | string | 生息地域 / 所在地 | `"Pine Barrens, New Jersey, USA"` |
| firstRecord | string | 最初の記録 | `"1735"` |
| estSize | string | 推定サイズ | `"1.0-1.8 m"` |
| sightings | number | 目撃件数 | `2300` |
| credibility | number | 信憑性スコア（0〜10） | `5.5` |
| tags | string[] | 分類タグ（大文字英語） | `["WINGED", "NORTH AMERICA", "TERRESTRIAL"]` |
| image | string | 画像パス（空文字ならデフォルト画像が使われる） | `""` or `"/creatures/jersey-devil.jpg"` |
| overview | string | 概要テキスト（日本語） | `"ジャージーデビルは..."` |
| logs | array | 調査ログ（`{ date, content }` の配列） | 下記参照 |
| type | string | `"creature"` または `"zone"` | `"creature"` |
| searchAliases | string[] | 検索用の読み・別名（下記参照） | `["じゃーじーでびる", "jersey devil"]` |

---

## CLASS と色の対応

| CLASS | classColor | 意味 |
|-------|-----------|------|
| CLASS-I | `"bg-green-500"` | Harmless（無害） |
| CLASS-II | `"bg-blue-500"` | Caution（注意） |
| CLASS-III | `"bg-warning"` | Dangerous（危険） |
| CLASS-IV | `"bg-accent-500"` | High Threat（高脅威） |
| CLASS-V | `"bg-red-800"` | Critical（最高危険度） |
| CLASS-S | `"bg-neutral-900"` | Catastrophic（特級） |

## ステータスと色の対応

| status | statusColor | 意味 |
|--------|-----------|------|
| ACTIVE INVESTIGATION | `"bg-green-500"` | 調査中 |
| PENDING REVIEW | `"bg-yellow-500"` | 審査待ち |
| CASE CLOSED | `"bg-neutral-500"` | 調査完了 |
| CLASSIFIED | `"bg-red-500"` | 機密 |

---

## searchAliases の書き方

検索バーでヒットさせるための読み・別名リスト。**必ず以下を含める**:

1. **ひらがな読み** — カタカナ名のひらがな表記（例: `"つちのこ"`）
2. **ローマ字** — slug と同じでOK（例: `"tsuchinoko"`）
3. **別名・通称** — あれば追加（例: サスカッチ → `"sasquatch"`, `"サスカッチ"`, `"さすかっち"`）

```ts
searchAliases: ["じゃーじーでびる", "jersey devil", "リーズポイントの悪魔"],
```

---

## ファイル番号の採番ルール

- クリーチャー: `CRF-` + 4桁ゼロ埋め（`CRF-0001` 〜）
- ゾーン: `CRF-Z` + 3桁ゼロ埋め（`CRF-Z001` 〜）
- 既存番号と重複しないこと
- 番号は登録順（欠番OK）

### 現在の使用済み番号

**クリーチャー**: 0001 (Bigfoot), 0017 (Mothman), 0042 (Tsuchinoko)
**ゾーン**: Z001 (Bermuda Triangle), Z008 (Skinwalker Ranch), Z012 (Aokigahara)

---

## 画像について

- 個別画像がある場合: `/public/creatures/` or `/public/zones/` に配置し、パスを `image` に設定
- 画像がない場合: `image: ""` にすると `default-1.jpg` or `default-2.jpg` がslugに基づいて自動選択される

---

## 調査ログの書き方

```ts
logs: [
  { date: "2026-02-14", content: "調査内容の記述。CRFの調査報告書風に書く。" },
  { date: "2025-11-03", content: "新しい順に並べる。" },
],
```

- 日付は新しい順
- CLASS-S のエントリは `[REDACTED]` を使って機密感を出す

---

## i18n対応（将来）

現在 `overview` と `logs` は日本語ハードコード。将来的に多言語対応する場合は `messages/en.json` と `messages/ja.json` にキーを追加し、コンポーネント側で `useTranslations` を使う形に移行する。

---

## 追加テンプレート

```ts
"new-slug": {
  slug: "new-slug",
  fileNo: "CRF-XXXX",
  name: "日本語名",
  nameEn: "English Name",
  classification: "CLASS-III",
  classColor: "bg-warning",
  status: "ACTIVE INVESTIGATION",
  statusColor: "bg-green-500",
  filedDate: "2026-01-01",
  lastUpdated: "2026-01-01T00:00:00Z",
  region: "Region, Country",
  firstRecord: "Year or description",
  estSize: "X.X m",
  sightings: 0,
  credibility: 5.0,
  tags: ["TAG1", "TAG2"],
  image: "",
  overview: "概要テキスト。",
  logs: [
    { date: "2026-01-01", content: "調査ログ。" },
  ],
  type: "creature",
  searchAliases: ["ひらがな読み", "romaji"],
},
```

---

**更新日**: 2026年3月25日

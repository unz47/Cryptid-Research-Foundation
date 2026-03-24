# デザインシステム — Cryptid Research Foundation (CRF)

## 🎨 カラーパレット

### Brand（紫系 — 神秘的・ダーク）

サイトのメインカラー。ボタン、リンク、アクティブ状態に使用。

| トークン | HEX | 用途 |
|---------|---------|------|
| brand-50 | `#f5f3ff` | 背景アクセント |
| brand-100 | `#ede9fe` | ホバー背景（薄） |
| brand-200 | `#ddd6fe` | — |
| brand-300 | `#c4b5fd` | — |
| brand-400 | `#a78bfa` | — |
| brand-500 | `#8b5cf6` | **Primary**（ボタン、リンク） |
| brand-600 | `#7c3aed` | **Primary Hover** |
| brand-700 | `#6d28d9` | — |
| brand-800 | `#5b21b6` | — |
| brand-900 | `#4c1d95` | ダークモード背景 |

### Accent（赤系 — 活気・発見）

CTA、ハイライト、Etsyへの誘導ボタンなどに使用。

| トークン | HEX | 用途 |
|---------|---------|------|
| accent-50 | `#fef2f2` | — |
| accent-100 | `#fee2e2` | — |
| accent-300 | `#fca5a5` | — |
| accent-500 | `#ef4444` | **Accent** |
| accent-600 | `#dc2626` | **Accent Hover** |
| accent-900 | `#7f1d1d` | — |

### Neutral（グレー系 — 背景・テキスト）

| トークン | HEX | 用途 |
|---------|---------|------|
| neutral-50 | `#fafafa` | ページ背景 |
| neutral-100 | `#f5f5f5` | カード背景 |
| neutral-200 | `#e5e5e5` | ボーダー |
| neutral-300 | `#d4d4d4` | — |
| neutral-400 | `#a3a3a3` | プレースホルダー |
| neutral-500 | `#737373` | サブテキスト |
| neutral-600 | `#525252` | — |
| neutral-700 | `#404040` | 本文テキスト |
| neutral-800 | `#262626` | 見出し |
| neutral-900 | `#171717` | ダークモード背景 |

### セマンティックカラー

| 名前 | HEX | 用途 |
|------|---------|------|
| success | `#22c55e` | 成功メッセージ |
| warning | `#f59e0b` | 警告 |
| error | `#ef4444` | エラー |
| info | `#3b82f6` | 情報 |

---

## 🔤 タイポグラフィ

### フォント

| 用途 | フォント | CSS変数 |
|------|---------|---------|
| 見出し・本文 | Geist Sans | `var(--font-geist-sans)` |
| コード | Geist Mono | `var(--font-geist-mono)` |

### サイズスケール

| レベル | サイズ | 行間 | ウェイト | 備考 |
|--------|--------|------|---------|------|
| h1 | 3rem〜3.75rem (48〜60px) | tight | bold | tracking-tight |
| h2 | 2.25rem〜3rem (36〜48px) | tight | bold | tracking-tight |
| h3 | 1.5rem〜1.875rem (24〜30px) | tight | semibold | — |
| h4 | 1.25rem〜1.5rem (20〜24px) | — | semibold | — |
| body | 1rem (16px) | 1.75rem (28px) | normal | neutral-700 |
| small | 0.875rem (14px) | — | — | — |
| caption | 0.75rem (12px) | — | — | — |

※ h1〜h2はレスポンシブ（モバイル→デスクトップで段階的に拡大）

---

## 📐 スペーシング

基本単位: **4px (0.25rem)**

| トークン | 値 | Tailwind | 主な用途 |
|---------|-----|---------|---------|
| xs | 4px | `gap-1`, `p-1` | アイコンとテキストの間 |
| sm | 8px | `gap-2`, `p-2` | 小さな余白 |
| md | 16px | `gap-4`, `p-4` | カード内パディング |
| lg | 24px | `gap-6`, `p-6` | グリッド間隔 |
| xl | 32px | `gap-8`, `p-8` | セクション内余白 |
| 2xl | 48px | `py-12` | セクション上下 |
| 3xl | 64px | `py-16` | ページセクション間 |

---

## 🧩 コンポーネントルール

### カード（CreatureCard）

| プロパティ | 値 | Tailwind |
|-----------|-----|---------|
| 角丸 | 8px | `rounded-lg` |
| 影 | 通常 / ホバー | `shadow-md` → `hover:shadow-xl` |
| 画像比率 | 4:3 | `aspect-[4/3]` |
| パディング | 16px | `p-4` |
| トランジション | 影 | `transition-shadow` |
| 画像ホバー | 拡大 | `group-hover:scale-105 transition-transform duration-300` |

### ボタン

| サイズ | 高さ | パディング | フォント |
|--------|------|-----------|---------|
| sm | 36px (`h-9`) | `px-3` | `text-sm` |
| md | 40px (`h-10`) | `px-4` | デフォルト |
| lg | 44px (`h-11`) | `px-8` | `text-lg` |

| バリアント | スタイル |
|-----------|---------|
| default | `bg-brand-600 text-white hover:bg-brand-700` |
| outline | `border border-brand-600 text-brand-600 hover:bg-brand-50` |
| ghost | `hover:bg-neutral-100 text-neutral-900` |
| link | `underline-offset-4 hover:underline text-brand-600` |

共通: `rounded-md`, `font-medium`, `transition-colors`, `focus-visible:ring-2`

### コンテナ

| プロパティ | 値 | Tailwind |
|-----------|-----|---------|
| 最大幅 | 1280px | `max-w-7xl` |
| 左右余白 | 16px | `px-4` |
| 中央寄せ | — | `mx-auto` |

---

## 📱 グリッド・レスポンシブ

### クリーチャー一覧グリッド

| ブレークポイント | 列数 | Tailwind |
|----------------|------|---------|
| モバイル (<768px) | 1列 | `grid-cols-1` |
| タブレット (≥768px) | 2列 | `md:grid-cols-2` |
| デスクトップ (≥1024px) | 3列 | `lg:grid-cols-3` |

gap: `gap-6` (24px)

### ブレークポイント一覧

| 名前 | 幅 | Tailwind |
|------|-----|---------|
| sm | 640px | `sm:` |
| md | 768px | `md:` |
| lg | 1024px | `lg:` |
| xl | 1280px | `xl:` |

---

## 🌙 ダークモード方針

初期リリースは**ライトモードのみ**。将来対応時の方針：

| 要素 | ライト | ダーク |
|------|--------|--------|
| ページ背景 | neutral-50 | neutral-900 |
| カード背景 | white | neutral-800 |
| 見出し | neutral-800 | neutral-100 |
| 本文 | neutral-700 | neutral-300 |
| ボーダー | neutral-200 | neutral-700 |

---

## ✅ デザイン原則

1. **神秘的だが親しみやすい** — ダークすぎず、カワイイ要素も取り入れる
2. **コンテンツファースト** — クリーチャーの情報が主役。装飾は控えめに
3. **一貫性** — カラー・スペーシング・角丸はトークンに従う
4. **アクセシビリティ** — コントラスト比 WCAG AA 以上を維持
5. **パフォーマンス** — 画像は AVIF/WebP、遅延読み込み必須

---

**更新日**: 2026年3月24日

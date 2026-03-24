# ウェブサイト開発ガイド（Next.js + AWS）

## 🎯 エグゼクティブサマリー

**技術スタック**: Next.js 15 + AWS (SST) + Contentful CMS
**開発期間**: 4-8週間（経験レベルによる）
**初期コスト**: $150-600
**月額運用コスト**: $25-50（初期）→ $50-100（成長期）

**目標**:
- SEOに最適化されたUMAデータベースサイト
- Etsyストアへの自然な誘導
- 管理しやすいコンテンツ管理システム
- スケーラブルなインフラ

---

## 📚 目次

1. [サイト構成と機能要件](#サイト構成と機能要件)
2. [技術スタックの選定理由](#技術スタックの選定理由)
3. [プロジェクトセットアップ](#プロジェクトセットアップ)
4. [CMSの選定と設定](#cmsの選定と設定)
5. [Next.js実装ガイド](#nextjs実装ガイド)
6. [デザインシステムの構築](#デザインシステムの構築)
7. [SEO最適化](#seo最適化)
8. [パフォーマンス最適化](#パフォーマンス最適化)
9. [テストとQA](#テストとqa)
10. [デプロイとモニタリング](#デプロイとモニタリング)

---

## 🏗️ サイト構成と機能要件

### サイトマップ

```
cryptid-database.com
├── / (ホーム)
│   ├── ヒーローセクション
│   ├── 注目のUMA
│   ├── 最新追加UMA
│   └── CTA（Etsyへの誘導）
│
├── /creatures (一覧ページ)
│   ├── フィルター機能
│   │   ├── 地域別
│   │   ├── タイプ別
│   │   └── 人気順
│   └── ページネーション
│
├── /creatures/[slug] (詳細ページ)
│   ├── 基本情報
│   ├── 目撃情報マップ
│   ├── 歴史・伝承
│   ├── 科学的考察
│   └── 関連商品（Etsy）
│
├── /regions (地域別)
│   ├── /regions/japan
│   ├── /regions/north-america
│   └── ...
│
├── /about (このサイトについて)
├── /shop (Etsyリダイレクト)
└── /blog (オプション)
```

### 必須機能

#### Phase 1（MVP - 1-2ヶ月）
- [ ] UMA一覧表示（20-30種類）
- [ ] UMA詳細ページ
- [ ] 基本的な検索・フィルター
- [ ] レスポンシブデザイン
- [ ] Etsyストアへのリンク
- [ ] 基本的なSEO対策

#### Phase 2（機能拡充 - 3-4ヶ月）
- [ ] 高度な検索機能
- [ ] 目撃情報マップ（Google Maps API）
- [ ] 多言語対応（英語・日本語）
- [ ] ブログ機能
- [ ] ニュースレター登録
- [ ] SNS共有機能

#### Phase 3（強化 - 5-6ヶ月）
- [ ] ユーザーレビュー・コメント
- [ ] UMAクイズ
- [ ] 「今日のUMA」機能
- [ ] Eコマース統合（将来的に自社ストア）
- [ ] コミュニティフォーラム

---

## 💻 技術スタックの選定理由

### Next.js 15（フレームワーク）

**選定理由**:
1. **SEO最適**: SSR/SSGで検索エンジンに最適化
2. **高速**: 自動コード分割、画像最適化
3. **開発効率**: App Router、Server Components
4. **エコシステム**: 豊富なライブラリ、活発なコミュニティ
5. **AWS親和性**: SST/OpenNextで簡単デプロイ

**代替案との比較**:
| 項目 | Next.js | Gatsby | Astro |
|------|---------|--------|-------|
| SEO | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 学習曲線 | ⭐⭐⭐☆☆ | ⭐⭐⭐⭐☆ | ⭐⭐⭐⭐☆ |
| パフォーマンス | ⭐⭐⭐⭐☆ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 柔軟性 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐☆☆ | ⭐⭐⭐⭐☆ |
| AWS対応 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐☆☆ | ⭐⭐⭐☆☆ |

### TypeScript（言語）

**選定理由**:
1. **型安全性**: バグの早期発見
2. **開発効率**: IDEの補完機能
3. **保守性**: リファクタリングが容易
4. **業界標準**: Next.jsとの相性抜群

### Tailwind CSS（スタイリング）

**選定理由**:
1. **高速開発**: ユーティリティクラスで素早くスタイリング
2. **一貫性**: デザインシステムを簡単に構築
3. **パフォーマンス**: 未使用CSSを自動削除
4. **カスタマイズ性**: 柔軟な設定

**代替案との比較**:
| 項目 | Tailwind | CSS Modules | Styled Components |
|------|----------|-------------|-------------------|
| 開発速度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐☆☆ | ⭐⭐⭐☆☆ |
| パフォーマンス | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐☆ | ⭐⭐⭐☆☆ |
| 学習曲線 | ⭐⭐⭐⭐☆ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐☆☆ |
| カスタマイズ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐☆ | ⭐⭐⭐⭐⭐ |

### Contentful（CMS）

**選定理由**:
1. **無料プラン**: 25,000レコード/月まで無料
2. **API-First**: GraphQL/REST APIで柔軟
3. **使いやすい**: 直感的な管理画面
4. **Next.js対応**: 公式SDKあり

**代替案との比較**:
| CMS | 無料プラン | 学習曲線 | Next.js対応 | 推奨度 |
|-----|----------|---------|-------------|-------|
| **Contentful** | 25K/月 | ⭐⭐⭐⭐☆ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Notion** | 無制限 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐☆ | ⭐⭐⭐⭐☆ |
| **WordPress** | 要ホスティング | ⭐⭐⭐☆☆ | ⭐⭐⭐☆☆ | ⭐⭐⭐☆☆ |
| **Sanity** | 無料 | ⭐⭐⭐☆☆ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐☆ |

### SST + AWS（インフラ）

詳細は[AWS Next.js デプロイガイド](./06-aws-nextjs-deployment-guide.md)を参照

---

## 🚀 プロジェクトセットアップ

### 前提条件

**必要なツール**:
```bash
Node.js: v20.x以上
npm: v10.x以上
Git: v2.x以上
VS Code（推奨エディタ）
```

**インストール確認**:
```bash
node --version  # v20.11.0
npm --version   # v10.2.4
git --version   # git version 2.39.2
```

### ステップ1: Next.jsプロジェクト作成

```bash
# プロジェクトディレクトリ作成
npx create-next-app@latest cryptid-database

# 設定オプション（対話形式）
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like to use `src/` directory? … Yes
✔ Would you like to use App Router? … Yes
✔ Would you like to customize the default import alias? … No

# プロジェクトに移動
cd cryptid-database
```

### ステップ2: 必要な依存関係のインストール

```bash
# Contentful SDK
npm install contentful @contentful/rich-text-react-renderer

# 画像処理
npm install sharp

# アイコン
npm install lucide-react

# フォーム処理
npm install react-hook-form zod @hookform/resolvers

# SEO
npm install next-seo

# アニメーション
npm install framer-motion

# ユーティリティ
npm install clsx tailwind-merge

# 開発ツール
npm install -D @types/node @types/react @types/react-dom
npm install -D prettier prettier-plugin-tailwindcss
npm install -D eslint-config-prettier
```

### ステップ3: プロジェクト構造の整理

```
cryptid-database/
├── src/
│   ├── app/                    # App Router
│   │   ├── layout.tsx          # ルートレイアウト
│   │   ├── page.tsx            # ホームページ
│   │   ├── creatures/
│   │   │   ├── page.tsx        # 一覧ページ
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # 詳細ページ
│   │   ├── regions/
│   │   │   └── [region]/
│   │   │       └── page.tsx
│   │   └── about/
│   │       └── page.tsx
│   │
│   ├── components/             # Reactコンポーネント
│   │   ├── ui/                 # 再利用可能なUIコンポーネント
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── ...
│   │   ├── layout/             # レイアウトコンポーネント
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   └── creatures/          # UMA関連コンポーネント
│   │       ├── CreatureCard.tsx
│   │       ├── CreatureGrid.tsx
│   │       └── CreatureDetail.tsx
│   │
│   ├── lib/                    # ユーティリティ・ヘルパー
│   │   ├── contentful.ts       # Contentful API
│   │   ├── utils.ts            # 汎用関数
│   │   └── constants.ts        # 定数
│   │
│   ├── types/                  # TypeScript型定義
│   │   ├── creature.ts
│   │   ├── contentful.ts
│   │   └── index.ts
│   │
│   └── styles/                 # グローバルスタイル
│       └── globals.css
│
├── public/                     # 静的ファイル
│   ├── images/
│   ├── favicon.ico
│   └── robots.txt
│
├── .env.local                  # 環境変数（ローカル）
├── .env.example                # 環境変数テンプレート
├── next.config.ts              # Next.js設定
├── tailwind.config.ts          # Tailwind設定
├── tsconfig.json               # TypeScript設定
└── package.json                # npm設定
```

### ステップ4: 環境変数の設定

```bash
# .env.localファイル作成
cat > .env.local << 'EOF'
# Contentful
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_access_token_here
CONTENTFUL_PREVIEW_TOKEN=your_preview_token_here

# Next.js
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ETSY_SHOP_URL=https://www.etsy.com/shop/YourShopName

# Analytics (オプション)
NEXT_PUBLIC_GA_TRACKING_ID=
EOF
```

```bash
# .env.exampleファイル作成（Gitにコミット用）
cat > .env.example << 'EOF'
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_PREVIEW_TOKEN=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_ETSY_SHOP_URL=
NEXT_PUBLIC_GA_TRACKING_ID=
EOF
```

### ステップ5: 基本設定ファイルの作成

**next.config.ts**:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net", // Contentful
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  // ISR: 1時間ごとに再生成
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 3600,
    },
  },
};

export default nextConfig;
```

**tailwind.config.ts**:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fef2f2",
          100: "#fee2e2",
          500: "#ef4444",
          900: "#7f1d1d",
        },
        accent: {
          50: "#f0fdf4",
          500: "#22c55e",
          900: "#14532d",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};

export default config;
```

---

## 📝 CMSの選定と設定

### Contentfulのセットアップ

#### ステップ1: アカウント作成

1. [Contentful](https://www.contentful.com/)にアクセス
2. 「Start building for free」をクリック
3. アカウント作成（Google/GitHub認証可）
4. 新しいSpaceを作成（例: "Cryptid Database"）

#### ステップ2: コンテンツモデルの設計

**Creature（UMA）モデル**:

| フィールド名 | タイプ | 必須 | 説明 |
|------------|--------|------|------|
| name | Short text | ✅ | UMA名（例: ツチノコ） |
| nameEn | Short text | ✅ | 英語名（例: Tsuchinoko） |
| slug | Short text | ✅ | URL用（例: tsuchinoko） |
| category | Reference | ✅ | カテゴリー |
| region | Reference | ✅ | 地域 |
| thumbnail | Media | ✅ | サムネイル画像 |
| description | Rich text | ✅ | 短い説明（200字） |
| fullDescription | Rich text | ✅ | 詳細説明 |
| history | Rich text |  | 歴史・伝承 |
| sightings | Rich text |  | 目撃情報 |
| scientificAnalysis | Rich text |  | 科学的考察 |
| features | Reference (多) |  | 特徴タグ |
| relatedProducts | Short text (多) |  | Etsy商品URL |
| seo | Object |  | SEOメタデータ |
| publishedAt | Date |  | 公開日時 |
| featured | Boolean |  | 注目フラグ |

**Category（カテゴリー）モデル**:

| フィールド名 | タイプ | 必須 | 説明 |
|------------|--------|------|------|
| name | Short text | ✅ | カテゴリー名 |
| slug | Short text | ✅ | URL用 |
| description | Long text |  | 説明 |
| icon | Short text |  | アイコン名 |

**Region（地域）モデル**:

| フィールド名 | タイプ | 必須 | 説明 |
|------------|--------|------|------|
| name | Short text | ✅ | 地域名 |
| slug | Short text | ✅ | URL用 |
| description | Long text |  | 説明 |
| mapCenter | Object |  | 地図中心座標 |

#### ステップ3: APIキーの取得

1. Settings → API keys
2. 「Add API key」をクリック
3. Name: "Next.js Production"
4. 以下をコピー:
   - Space ID
   - Content Delivery API - access token
   - Content Preview API - access token

5. `.env.local`に貼り付け

#### ステップ4: サンプルコンテンツの作成

**例: ツチノコのエントリー**:

```
Name: ツチノコ
Name (English): Tsuchinoko
Slug: tsuchinoko
Category: → Reptile
Region: → Japan

Description:
日本の山林に生息するとされる未確認生物。胴体が太く短い、蛇に似た姿が特徴。

Full Description:
ツチノコは、日本各地の山林で目撃されている未確認動物です。
通常の蛇とは異なり、胴体が太く短い形状をしており、
時には1メートル以上にもなるとされています...

History:
江戸時代の文献にも記録が残っており、
地域によって「ノツチ」「ツチヘビ」など様々な呼び名があります...

Features:
→ Short body
→ Wide girth
→ Fast movement

Related Products:
- https://www.etsy.com/listing/123456789/cute-tsuchinoko-sticker
- https://www.etsy.com/listing/987654321/tsuchinoko-tshirt

SEO:
Title: ツチノコ（Tsuchinoko）| 日本の未確認生物データベース
Description: ツチノコは日本の山林に生息するとされる太く短い蛇のような未確認生物。歴史、目撃情報、科学的考察を詳しく解説。
Keywords: ツチノコ, Tsuchinoko, UMA, 未確認生物, 日本, 妖怪
```

---

## ⚛️ Next.js実装ガイド

### 型定義の作成

**src/types/creature.ts**:

```typescript
export interface Creature {
  sys: {
    id: string;
  };
  fields: {
    name: string;
    nameEn: string;
    slug: string;
    category: Category;
    region: Region;
    thumbnail: Asset;
    description: string;
    fullDescription: Document;
    history?: Document;
    sightings?: Document;
    scientificAnalysis?: Document;
    features?: Feature[];
    relatedProducts?: string[];
    seo?: SEO;
    publishedAt?: string;
    featured?: boolean;
  };
}

export interface Category {
  fields: {
    name: string;
    slug: string;
    description?: string;
    icon?: string;
  };
}

export interface Region {
  fields: {
    name: string;
    slug: string;
    description?: string;
    mapCenter?: {
      lat: number;
      lng: number;
    };
  };
}

export interface Asset {
  fields: {
    title: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
    };
  };
}

export interface Document {
  nodeType: string;
  content: any[];
}

export interface Feature {
  fields: {
    name: string;
    slug: string;
  };
}

export interface SEO {
  title: string;
  description: string;
  keywords: string[];
}
```

### Contentful APIクライアントの作成

**src/lib/contentful.ts**:

```typescript
import { createClient } from "contentful";
import type { Creature } from "@/types/creature";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// すべてのUMAを取得
export async function getAllCreatures(): Promise<Creature[]> {
  const response = await client.getEntries<Creature>({
    content_type: "creature",
    order: ["-fields.publishedAt"],
  });

  return response.items;
}

// 注目のUMAを取得
export async function getFeaturedCreatures(): Promise<Creature[]> {
  const response = await client.getEntries<Creature>({
    content_type: "creature",
    "fields.featured": true,
    limit: 6,
  });

  return response.items;
}

// 特定のUMAを取得
export async function getCreatureBySlug(
  slug: string
): Promise<Creature | null> {
  const response = await client.getEntries<Creature>({
    content_type: "creature",
    "fields.slug": slug,
    limit: 1,
  });

  return response.items[0] || null;
}

// すべてのスラッグを取得（SSG用）
export async function getAllCreatureSlugs(): Promise<string[]> {
  const response = await client.getEntries<Creature>({
    content_type: "creature",
    select: ["fields.slug"],
  });

  return response.items.map((item) => item.fields.slug);
}

// 地域別のUMAを取得
export async function getCreaturesByRegion(
  regionSlug: string
): Promise<Creature[]> {
  const response = await client.getEntries<Creature>({
    content_type: "creature",
    "fields.region.sys.contentType.sys.id": "region",
    "fields.region.fields.slug": regionSlug,
  });

  return response.items;
}

// カテゴリー別のUMAを取得
export async function getCreaturesByCategory(
  categorySlug: string
): Promise<Creature[]> {
  const response = await client.getEntries<Creature>({
    content_type: "creature",
    "fields.category.sys.contentType.sys.id": "category",
    "fields.category.fields.slug": categorySlug,
  });

  return response.items;
}
```

### ホームページの実装

**src/app/page.tsx**:

```typescript
import { getFeaturedCreatures } from "@/lib/contentful";
import { CreatureGrid } from "@/components/creatures/CreatureGrid";
import { HeroSection } from "@/components/layout/HeroSection";
import { CTASection } from "@/components/layout/CTASection";

export const revalidate = 3600; // ISR: 1時間ごとに再生成

export default async function HomePage() {
  const featuredCreatures = await getFeaturedCreatures();

  return (
    <main>
      <HeroSection />

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">
          Featured Cryptids
        </h2>
        <CreatureGrid creatures={featuredCreatures} />
      </section>

      <CTASection />
    </main>
  );
}
```

### 一覧ページの実装

**src/app/creatures/page.tsx**:

```typescript
import { getAllCreatures } from "@/lib/contentful";
import { CreatureGrid } from "@/components/creatures/CreatureGrid";
import { FilterBar } from "@/components/creatures/FilterBar";

export const revalidate = 3600;

export const metadata = {
  title: "All Cryptids | Cryptid Database",
  description: "Browse our complete collection of cryptids and mythical creatures from around the world.",
};

export default async function CreaturesPage({
  searchParams,
}: {
  searchParams: { category?: string; region?: string };
}) {
  const creatures = await getAllCreatures();

  // フィルタリング（クライアント側でも可能）
  const filteredCreatures = creatures.filter((creature) => {
    if (searchParams.category && creature.fields.category.fields.slug !== searchParams.category) {
      return false;
    }
    if (searchParams.region && creature.fields.region.fields.slug !== searchParams.region) {
      return false;
    }
    return true;
  });

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">All Cryptids</h1>

      <FilterBar />

      <CreatureGrid creatures={filteredCreatures} />
    </main>
  );
}
```

### 詳細ページの実装

**src/app/creatures/[slug]/page.tsx**:

```typescript
import { notFound } from "next/navigation";
import { getCreatureBySlug, getAllCreatureSlugs } from "@/lib/contentful";
import { CreatureDetail } from "@/components/creatures/CreatureDetail";
import type { Metadata } from "next";

export const revalidate = 3600;

// SSG: 全ページを事前生成
export async function generateStaticParams() {
  const slugs = await getAllCreatureSlugs();
  return slugs.map((slug) => ({ slug }));
}

// 動的メタデータ
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const creature = await getCreatureBySlug(params.slug);

  if (!creature) {
    return {
      title: "Creature Not Found",
    };
  }

  const seo = creature.fields.seo;

  return {
    title: seo?.title || `${creature.fields.name} | Cryptid Database`,
    description: seo?.description || creature.fields.description,
    keywords: seo?.keywords || [],
    openGraph: {
      title: seo?.title || creature.fields.name,
      description: seo?.description || creature.fields.description,
      images: [
        {
          url: `https:${creature.fields.thumbnail.fields.file.url}`,
          width: creature.fields.thumbnail.fields.file.details.image?.width,
          height: creature.fields.thumbnail.fields.file.details.image?.height,
        },
      ],
    },
  };
}

export default async function CreaturePage({
  params,
}: {
  params: { slug: string };
}) {
  const creature = await getCreatureBySlug(params.slug);

  if (!creature) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-16">
      <CreatureDetail creature={creature} />
    </main>
  );
}
```

### コンポーネントの実装例

**src/components/creatures/CreatureCard.tsx**:

```typescript
import Image from "next/image";
import Link from "next/link";
import type { Creature } from "@/types/creature";

interface CreatureCardProps {
  creature: Creature;
}

export function CreatureCard({ creature }: CreatureCardProps) {
  const { name, nameEn, slug, thumbnail, description, category, region } =
    creature.fields;

  return (
    <Link
      href={`/creatures/${slug}`}
      className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={`https:${thumbnail.fields.file.url}`}
          alt={thumbnail.fields.title || name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
          <span className="px-2 py-1 bg-gray-100 rounded">
            {category.fields.name}
          </span>
          <span className="px-2 py-1 bg-gray-100 rounded">
            {region.fields.name}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-1 group-hover:text-brand-500 transition-colors">
          {name}
        </h3>
        <p className="text-gray-500 text-sm mb-2">{nameEn}</p>
        <p className="text-gray-700 line-clamp-2">{description}</p>
      </div>
    </Link>
  );
}
```

**src/components/creatures/CreatureGrid.tsx**:

```typescript
import { CreatureCard } from "./CreatureCard";
import type { Creature } from "@/types/creature";

interface CreatureGridProps {
  creatures: Creature[];
}

export function CreatureGrid({ creatures }: CreatureGridProps) {
  if (creatures.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">No cryptids found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {creatures.map((creature) => (
        <CreatureCard key={creature.sys.id} creature={creature} />
      ))}
    </div>
  );
}
```

---

## 🎨 デザインシステムの構築

### カラーパレット

```typescript
// tailwind.config.ts内で定義

colors: {
  // ブランドカラー（神秘的・ダーク）
  brand: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",  // Primary
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
  },

  // アクセントカラー（活気・発見）
  accent: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",  // Accent
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },

  // ニュートラル（背景・テキスト）
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
  },
}
```

### タイポグラフィ

```css
/* globals.css */

@layer base {
  h1 {
    @apply text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight;
  }

  h2 {
    @apply text-3xl md:text-4xl font-bold tracking-tight;
  }

  h3 {
    @apply text-2xl md:text-3xl font-semibold tracking-tight;
  }

  h4 {
    @apply text-xl md:text-2xl font-semibold;
  }

  p {
    @apply text-base leading-7 text-neutral-700 dark:text-neutral-300;
  }

  a {
    @apply text-brand-600 hover:text-brand-700 transition-colors underline-offset-4 hover:underline;
  }
}
```

### 再利用可能なUIコンポーネント

**Button.tsx**:

```typescript
import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-brand-600 text-white hover:bg-brand-700",
        outline: "border border-brand-600 text-brand-600 hover:bg-brand-50",
        ghost: "hover:bg-neutral-100 text-neutral-900",
        link: "underline-offset-4 hover:underline text-brand-600",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-sm",
        lg: "h-11 px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

---

## 🔍 SEO最適化

### メタデータの最適化

**ルートレイアウト（src/app/layout.tsx）**:

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Cryptid Database | Discover Mythical Creatures & UMAs",
    template: "%s | Cryptid Database",
  },
  description:
    "Explore the world's most fascinating cryptids and unidentified mysterious animals. From Bigfoot to Tsuchinoko, discover legends, sightings, and scientific analysis.",
  keywords: [
    "cryptid",
    "UMA",
    "Bigfoot",
    "Nessie",
    "Mothman",
    "Tsuchinoko",
    "mythical creatures",
    "未確認生物",
  ],
  authors: [{ name: "Cryptid Database" }],
  creator: "Cryptid Database",
  publisher: "Cryptid Database",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ja_JP"],
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Cryptid Database",
    title: "Cryptid Database | Discover Mythical Creatures & UMAs",
    description:
      "Explore the world's most fascinating cryptids and unidentified mysterious animals.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Cryptid Database",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cryptid Database",
    description: "Discover mythical creatures and UMAs from around the world",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`],
    creator: "@CryptidDB",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};
```

### 構造化データ（JSON-LD）

**src/components/seo/JsonLd.tsx**:

```typescript
import type { Creature } from "@/types/creature";

interface CreatureJsonLdProps {
  creature: Creature;
}

export function CreatureJsonLd({ creature }: CreatureJsonLdProps) {
  const { name, nameEn, description, thumbnail, publishedAt } =
    creature.fields;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: name,
    alternativeHeadline: nameEn,
    description: description,
    image: `https:${thumbnail.fields.file.url}`,
    datePublished: publishedAt,
    author: {
      "@type": "Organization",
      name: "Cryptid Database",
    },
    publisher: {
      "@type": "Organization",
      name: "Cryptid Database",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

### サイトマップの生成

**src/app/sitemap.ts**:

```typescript
import { getAllCreatureSlugs } from "@/lib/contentful";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  const creatureSlugs = await getAllCreatureSlugs();

  const creatures = creatureSlugs.map((slug) => ({
    url: `${baseUrl}/creatures/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/creatures`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...creatures,
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
```

### robots.txt

**src/app/robots.ts**:

```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

---

## ⚡ パフォーマンス最適化

### 画像最適化

```typescript
// next.config.ts
images: {
  formats: ["image/avif", "image/webp"],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60 * 60 * 24 * 365, // 1年
}
```

### フォント最適化

```typescript
// src/app/layout.tsx
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### コード分割

```typescript
// 動的インポートでコンポーネントを遅延読み込み
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), {
  loading: () => <p>Loading map...</p>,
  ssr: false, // クライアントサイドのみ
});
```

### キャッシュ戦略

```typescript
// ISR（Incremental Static Regeneration）
export const revalidate = 3600; // 1時間

// 特定のパスを再検証
import { revalidatePath } from "next/cache";
revalidatePath("/creatures");

// タグベースの再検証
fetch(url, {
  next: { tags: ["creatures"] },
});

import { revalidateTag } from "next/cache";
revalidateTag("creatures");
```

---

## ✅ テストとQA

### ユニットテスト（Jest + React Testing Library）

**インストール**:

```bash
npm install -D jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

**jest.config.js**:

```javascript
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

module.exports = createJestConfig(customJestConfig);
```

**テスト例（src/components/creatures/CreatureCard.test.tsx）**:

```typescript
import { render, screen } from "@testing-library/react";
import { CreatureCard } from "./CreatureCard";

const mockCreature = {
  sys: { id: "1" },
  fields: {
    name: "ツチノコ",
    nameEn: "Tsuchinoko",
    slug: "tsuchinoko",
    category: { fields: { name: "Reptile", slug: "reptile" } },
    region: { fields: { name: "Japan", slug: "japan" } },
    thumbnail: {
      fields: {
        title: "Tsuchinoko",
        file: { url: "//example.com/image.jpg", details: {} },
      },
    },
    description: "日本の山林に生息するとされる未確認生物。",
  },
};

describe("CreatureCard", () => {
  it("renders creature information correctly", () => {
    render(<CreatureCard creature={mockCreature} />);

    expect(screen.getByText("ツチノコ")).toBeInTheDocument();
    expect(screen.getByText("Tsuchinoko")).toBeInTheDocument();
    expect(screen.getByText("Reptile")).toBeInTheDocument();
    expect(screen.getByText("Japan")).toBeInTheDocument();
  });

  it("has correct link href", () => {
    render(<CreatureCard creature={mockCreature} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/creatures/tsuchinoko");
  });
});
```

### E2Eテスト（Playwright）

```bash
npm install -D @playwright/test
npx playwright install
```

**playwright.config.ts**:

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 13"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

**テスト例（e2e/creatures.spec.ts）**:

```typescript
import { test, expect } from "@playwright/test";

test("should navigate to creature detail page", async ({ page }) => {
  await page.goto("/");

  // 最初のUMAカードをクリック
  await page.click('[href^="/creatures/"]');

  // 詳細ページに遷移したことを確認
  await expect(page).toHaveURL(/\/creatures\/.+/);

  // ページタイトルが表示されていることを確認
  await expect(page.locator("h1")).toBeVisible();
});

test("should filter creatures by region", async ({ page }) => {
  await page.goto("/creatures");

  // 地域フィルターを選択
  await page.selectOption('select[name="region"]', "japan");

  // URLパラメータが更新されることを確認
  await expect(page).toHaveURL(/region=japan/);

  // 日本のUMAのみ表示されることを確認
  const cards = page.locator('[data-region="japan"]');
  await expect(cards).toHaveCount(await cards.count());
});
```

---

## 🚀 デプロイとモニタリング

詳細は[AWS Next.js デプロイガイド](./06-aws-nextjs-deployment-guide.md)を参照

### デプロイ前のチェックリスト

```
□ すべてのテストが通過している
□ 環境変数が正しく設定されている
□ ビルドエラーがない（npm run build）
□ Lighthouseスコアが80以上
□ 画像がすべて最適化されている
□ メタデータが正しく設定されている
□ robots.txt、sitemap.xmlが生成されている
□ エラーページ（404、500）が実装されている
□ Google Analyticsが設定されている
□ HTTPS設定が完了している
```

### モニタリングツール

**Google Analytics 4**:

```typescript
// src/lib/analytics.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

export const pageview = (url: string) => {
  window.gtag("config", GA_TRACKING_ID!, {
    page_path: url,
  });
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
```

**CloudWatch Logs（エラー監視）**:

```typescript
// src/lib/logger.ts
export function logError(error: Error, context?: Record<string, any>) {
  console.error({
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
  });

  // 本番環境では外部サービスに送信
  if (process.env.NODE_ENV === "production") {
    // AWS CloudWatch Logsに送信するロジック
  }
}
```

---

## 📋 次のステップ

1. **[IaC & CI/CDガイド](./08-iac-cicd-implementation.md)を読む**
   - インフラコード化
   - 自動デプロイ設定

2. **[12ヶ月ロードマップ](./09-12-month-roadmap.md)を読む**
   - 段階的な機能追加計画
   - KPI管理

3. **実際に開発を始める**
   - プロジェクトセットアップ
   - 最初のUMAエントリー作成
   - ローカルでの動作確認

---

**更新日**: 2026年3月22日

---

## 関連ドキュメント

- [← Printify × Etsyガイド](./04-printify-etsy-complete-guide.md)
- [→ AWS Next.jsデプロイガイド](./06-aws-nextjs-deployment-guide.md)
- [📄 ビジネス実現可能性](./01-business-feasibility-overview.md)

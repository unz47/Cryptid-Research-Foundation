# AWS + Next.js デプロイ完全ガイド

## 🎯 推奨構成の結論

**未確認生物データベースサイトの最適解**:
- **IaC**: SST (Serverless Stack) + OpenNext
- **アーキテクチャ**: Lambda + CloudFront
- **コスト**: 年間**$306** (月平均$25.5)
- **パフォーマンス**: 十分な速度、グローバルCDN
- **運用負荷**: 低（ほぼメンテナンスフリー）

---

## 📋 目次

1. [デプロイオプション比較](#デプロイオプション比較)
2. [推奨構成: SST + Lambda](#推奨構成-sst--lambda)
3. [セットアップ手順](#セットアップ手順)
4. [環境変数管理](#環境変数管理)
5. [CI/CD構築](#cicd構築)
6. [パフォーマンス最適化](#パフォーマンス最適化)
7. [トラブルシューティング](#トラブルシューティング)

---

## デプロイオプション比較

### 全5オプションの概要

| オプション | 初期設定 | 運用負荷 | 月額コスト（小規模） | 推奨度 |
|-----------|---------|---------|-------------------|--------|
| **SST + Lambda** | ⭐⭐⭐ 中 | ⭐⭐⭐⭐ 低 | **$6** | ⭐⭐⭐⭐⭐ |
| AWS Amplify | ⭐⭐⭐⭐⭐ 最易 | ⭐⭐⭐⭐⭐ 最低 | $5 | ⭐⭐⭐⭐☆ |
| ECS Fargate | ⭐⭐ 難 | ⭐⭐ 高 | $40-60 | ⭐⭐⭐☆☆ |
| App Runner | ⭐⭐ 易 | ⭐⭐⭐ 低 | $15-25 | ⭐⭐⭐☆☆ |
| EC2 | ⭐⭐ 難 | ⭐ 最高 | $37-62 | ⭐⭐☆☆☆ |

### 詳細比較

#### 1. SST + Lambda + CloudFront ⭐推奨

**アーキテクチャ**:
```
Route 53 (DNS)
    ↓
CloudFront (CDN)
    ├→ S3 (静的アセット)
    └→ Lambda@Edge (SSR/ISR)
         └→ DynamoDB (ISRキャッシュ)
```

**メリット**:
- ✅ 最低コスト（従量課金）
- ✅ TypeScriptでIaC記述
- ✅ Next.js完全対応（OpenNext）
- ✅ 自動スケーリング
- ✅ Infrastructure as Code

**デメリット**:
- ❌ コールドスタート（初回レスポンス遅延）
- ❌ 学習曲線あり

**適用ケース**:
- ✅ 小〜中規模サイト
- ✅ コスト重視
- ✅ 不定期トラフィック

---

#### 2. AWS Amplify Hosting

**アーキテクチャ**:
```
Amplify（フルマネージド）
    ├→ CloudFront
    ├→ S3
    ├→ Lambda@Edge
    └→ 自動CI/CD
```

**メリット**:
- ✅ 最も簡単なセットアップ
- ✅ Git連携でCI/CD自動
- ✅ プレビュー環境自動生成
- ✅ 運用負荷ゼロ

**デメリット**:
- ❌ オンデマンドISR非対応
- ❌ カスタマイズ性低い
- ❌ ビルドタイムアウト15分

**適用ケース**:
- ✅ 最速で始めたい
- ✅ インフラ管理したくない
- ✅ MVP・プロトタイプ

**コスト**: $5-150/月

---

#### 3. ECS Fargate

**アーキテクチャ**:
```
Route 53
    ↓
CloudFront
    ↓
ALB (Application Load Balancer)
    ↓
ECS Fargate (Dockerコンテナ)
    └→ EFS (ISRキャッシュ共有)
```

**メリット**:
- ✅ 最高パフォーマンス
- ✅ コールドスタートなし
- ✅ 完全な制御
- ✅ ISR完全対応

**デメリット**:
- ❌ 設定が複雑
- ❌ 最小構成でも$40-60/月
- ❌ 運用負荷が高い

**適用ケース**:
- ✅ エンタープライズ
- ✅ 高トラフィック
- ✅ 安定パフォーマンス必須

**コスト**: $40-500/月

---

## 推奨構成: SST + Lambda

### なぜSSTを選ぶか

1. **Next.js特化**: OpenNext統合で最高の互換性
2. **TypeScript IaC**: Next.jsと同じ言語でインフラ管理
3. **低コスト**: 初年度はほぼ無料、成長後も$20-60/月
4. **Developer Experience**: Live Lambda Development

### 技術スタック

```typescript
// フルスタック構成
{
  "frontend": "Next.js 15 (App Router)",
  "cms": "Contentful (無料枠)",
  "infrastructure": {
    "iac": "SST v3",
    "compute": "AWS Lambda",
    "cdn": "CloudFront",
    "storage": "S3",
    "database": "DynamoDB (ISR)",
  },
  "cicd": "GitHub Actions + OIDC",
  "monitoring": "CloudWatch + X-Ray"
}
```

---

## セットアップ手順

### 前提条件

```bash
# 必要なもの
□ AWSアカウント
□ AWS CLI インストール済み
□ Node.js 20以上
□ Next.js 15プロジェクト
□ GitHubアカウント
```

### Step 1: AWSアカウント設定

```bash
# AWS CLI設定
aws configure

# 入力する情報
AWS Access Key ID: [your-access-key]
AWS Secret Access Key: [your-secret-key]
Default region name: ap-northeast-1
Default output format: json
```

### Step 2: Next.jsプロジェクト作成

```bash
# プロジェクト作成
npx create-next-app@latest cryptid-database \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd cryptid-database
```

### Step 3: SST初期化

```bash
# SST追加
npx sst@latest init

# 質問に答える
? What do you want to call your app? cryptid-database
? Pick a template: (Use arrow keys)
  ❯ The minimal template (推奨)
    Examples
    Templates
```

これで以下のファイルが生成されます:
```
cryptid-database/
├── sst.config.ts       # SST設定ファイル
├── sst-env.d.ts        # 型定義
└── .sst/               # SST内部ファイル
```

### Step 4: SST設定（sst.config.ts）

```typescript
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "cryptid-database",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: "ap-northeast-1",
        },
      },
    };
  },
  async run() {
    // Next.jsサイトのデプロイ
    const site = new sst.aws.Nextjs("CryptidSite", {
      // カスタムドメイン（オプション）
      domain: {
        name: $app.stage === "prod"
          ? "cryptid-database.com"
          : `${$app.stage}.cryptid-database.com`,
        // ACM証明書（us-east-1で作成必須）
        cert: "arn:aws:acm:us-east-1:123456789:certificate/xxx",
      },

      // 環境変数
      environment: {
        NEXT_PUBLIC_API_URL:
          $app.stage === "prod"
            ? "https://api.cryptid-database.com"
            : `https://api-${$app.stage}.cryptid-database.com`,
        DATABASE_URL: process.env.DATABASE_URL || "",
      },

      // パフォーマンス最適化
      server: {
        architecture: "arm64", // Graviton2（コスト削減）
        memory: "1024 MB",

        // X-Ray有効化
        tracing: "Active",
      },

      // Warmer設定（コールドスタート対策）
      warm: 10, // 10個の同時実行を温めておく
    });

    // アウトプット
    return {
      url: site.url,
      customDomainUrl: site.customDomainUrl,
    };
  },
});
```

### Step 5: 開発環境での実行

```bash
# 開発モード（ローカルNext.js + AWS実リソース）
npx sst dev

# ブラウザで http://localhost:3000 を開く
```

**重要**: `sst dev`では:
- Next.jsは**ローカル**で実行（高速）
- AWSリソース（S3等）は**実際にデプロイ**される
- Lambda関数はローカルで実行可能

### Step 6: 本番デプロイ

```bash
# ステージング環境
npx sst deploy --stage staging

# 本番環境
npx sst deploy --stage production

# デプロイ結果
✔  Complete
   CryptidSite: https://d111111abcdef8.cloudfront.net
   customDomainUrl: https://cryptid-database.com
```

---

## 環境変数管理

### SST Secrets（推奨）

**利点**:
- AWS Secrets Manager統合
- 型安全
- ステージ別管理

**設定方法**:

```typescript
// sst.config.ts
const databaseUrl = new sst.Secret("DATABASE_URL");
const contentfulToken = new sst.Secret("CONTENTFUL_ACCESS_TOKEN");

new sst.aws.Nextjs("CryptidSite", {
  link: [databaseUrl, contentfulToken],
});
```

```bash
# シークレット設定（CLI）
npx sst secret set DATABASE_URL "postgresql://..." --stage dev
npx sst secret set DATABASE_URL "postgresql://..." --stage prod

npx sst secret set CONTENTFUL_ACCESS_TOKEN "xxx" --stage dev
npx sst secret set CONTENTFUL_ACCESS_TOKEN "yyy" --stage prod
```

**Next.jsで使用**:

```typescript
// app/api/posts/route.ts
import { Resource } from "sst";

export async function GET() {
  // SST Secretsから取得（型安全）
  const dbUrl = Resource.DATABASE_URL.value;
  const contentfulToken = Resource.CONTENTFUL_ACCESS_TOKEN.value;

  // データベース接続...

  return Response.json({ data: "success" });
}
```

### 環境変数の種類

#### 1. ビルド時環境変数（Public）

```typescript
// sst.config.ts
new sst.aws.Nextjs("CryptidSite", {
  environment: {
    // ビルド時にバンドルされる（クライアント側で見える）
    NEXT_PUBLIC_SITE_NAME: "Cryptid Database",
    NEXT_PUBLIC_API_URL: "https://api.example.com",
  },
});
```

#### 2. ランタイム環境変数（Private）

```typescript
// sst.config.ts
const apiKey = new sst.Secret("API_KEY");

new sst.aws.Nextjs("CryptidSite", {
  link: [apiKey],
  environment: {
    // サーバーサイドのみで使用可能
    NODE_ENV: "production",
  },
});
```

---

## CI/CD構築

### GitHub Actions + OIDC認証

**メリット**:
- ✅ 長期アクセスキー不要（セキュア）
- ✅ 一時的なクレデンシャル
- ✅ IAM Roleベースの権限管理

### Step 1: AWS IAM設定

#### 1-1. OpenID Connect プロバイダー作成

```bash
# AWS Console → IAM → Identity providers
1. "Add provider"をクリック
2. Provider type: OpenID Connect
3. Provider URL: https://token.actions.githubusercontent.com
4. Audience: sts.amazonaws.com
5. "Add provider"
```

#### 1-2. IAM Role作成

**信頼ポリシー**:
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {
      "Federated": "arn:aws:iam::YOUR-ACCOUNT-ID:oidc-provider/token.actions.githubusercontent.com"
    },
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": {
        "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
      },
      "StringLike": {
        "token.actions.githubusercontent.com:sub": "repo:YOUR-ORG/cryptid-database:*"
      }
    }
  }]
}
```

**権限ポリシー**:
- `AdministratorAccess` (開発環境)
- または必要最小限の権限（本番環境推奨）

### Step 2: GitHub Secrets設定

```bash
# GitHub Repository → Settings → Secrets and variables → Actions

New repository secret:
Name: AWS_ROLE_ARN
Value: arn:aws:iam::YOUR-ACCOUNT-ID:role/GitHubActionsRole
```

### Step 3: GitHub Actionsワークフロー

```yaml
# .github/workflows/deploy.yml
name: Deploy to AWS

on:
  push:
    branches:
      - main
      - develop
  pull_request:
    types: [opened, synchronize, reopened]

env:
  NODE_VERSION: '20'
  AWS_REGION: 'ap-northeast-1'

permissions:
  id-token: write  # OIDC認証に必要
  contents: read
  pull-requests: write  # PRコメント用

jobs:
  # ステージ決定
  determine-stage:
    runs-on: ubuntu-latest
    outputs:
      stage: ${{ steps.set-stage.outputs.stage }}
    steps:
      - id: set-stage
        run: |
          if [[ "${{ github.ref }}" == "refs/heads/main" ]]; then
            echo "stage=prod" >> $GITHUB_OUTPUT
          elif [[ "${{ github.ref }}" == "refs/heads/develop" ]]; then
            echo "stage=dev" >> $GITHUB_OUTPUT
          else
            echo "stage=preview" >> $GITHUB_OUTPUT
          fi

  # テスト
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test

  # デプロイ
  deploy:
    needs: [determine-stage, test]
    if: github.event_name == 'push'
    runs-on: ubuntu-latest
    environment:
      name: ${{ needs.determine-stage.outputs.stage }}
      url: ${{ steps.deploy.outputs.url }}
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      # OIDC認証
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
          role-session-name: GitHubActions-${{ github.run_id }}
          aws-region: ${{ env.AWS_REGION }}

      - run: npm ci

      # SSTデプロイ
      - name: Deploy with SST
        id: deploy
        run: |
          STAGE="${{ needs.determine-stage.outputs.stage }}"
          npx sst deploy --stage $STAGE

          # デプロイ結果からURL取得
          URL=$(npx sst secrets list --stage $STAGE | grep url | awk '{print $2}')
          echo "url=$URL" >> $GITHUB_OUTPUT
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          CONTENTFUL_ACCESS_TOKEN: ${{ secrets.CONTENTFUL_ACCESS_TOKEN }}

      # スモークテスト
      - name: Run smoke tests
        run: |
          URL="${{ steps.deploy.outputs.url }}"
          npm run test:smoke -- --url=$URL

  # PRプレビュー
  preview:
    needs: test
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
          aws-region: ${{ env.AWS_REGION }}

      - run: npm ci

      - name: Deploy preview
        id: preview
        run: |
          STAGE="pr-${{ github.event.pull_request.number }}"
          npx sst deploy --stage $STAGE

          URL=$(npx sst secrets list --stage $STAGE | grep url | awk '{print $2}')
          echo "url=$URL" >> $GITHUB_OUTPUT
          echo "stage=$STAGE" >> $GITHUB_OUTPUT

      # PRにコメント
      - name: Comment PR
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## 🚀 Preview Deployment\n\n✅ Preview deployed!\n\n🔗 **URL:** ${{ steps.preview.outputs.url }}\n📦 **Stage:** ${{ steps.preview.outputs.stage }}\n\nThis preview will be deleted when PR is closed.`
            })
```

---

## パフォーマンス最適化

### 1. コールドスタート対策

**Warmer機能**:
```typescript
// sst.config.ts
new sst.aws.Nextjs("CryptidSite", {
  warm: 20, // 20個の同時実行を常時ウォーム
});
```

**効果**:
- コールドスタート: <1%のリクエスト
- 平均レスポンス: 200-400ms

### 2. 画像最適化

```typescript
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60,
  },
};
```

### 3. ISR（Incremental Static Regeneration）

```typescript
// app/creatures/[slug]/page.tsx
export const revalidate = 3600; // 1時間

export default async function CreaturePage({ params }) {
  const creature = await fetch(
    `https://api.example.com/creatures/${params.slug}`,
    { next: { revalidate: 3600 } }
  );

  return <div>{/* ... */}</div>;
}
```

### 4. CloudFrontキャッシュ最適化

```typescript
// sst.config.ts
new sst.aws.Nextjs("CryptidSite", {
  transform: {
    cdn: (args) => {
      args.defaultBehavior = {
        ...args.defaultBehavior,
        compress: true,
        viewerProtocolPolicy: "redirect-to-https",
        cachedMethods: ["GET", "HEAD", "OPTIONS"],
      };
    },
  },
});
```

---

## トラブルシューティング

### 問題1: デプロイが失敗する

**エラー例**:
```
Error: Failed to deploy stack
```

**解決法**:
```bash
# 1. AWSクレデンシャル確認
aws sts get-caller-identity

# 2. リージョン確認
echo $AWS_REGION

# 3. SST再初期化
rm -rf .sst
npx sst deploy --stage dev

# 4. ログ確認
npx sst logs --stage dev --tail
```

### 問題2: 環境変数が undefined

**原因**:
- `NEXT_PUBLIC_`プレフィックス忘れ
- SST Secretsの設定漏れ

**解決法**:
```bash
# Secrets確認
npx sst secret list --stage dev

# Secrets再設定
npx sst secret set DATABASE_URL "xxx" --stage dev
```

### 問題3: ビルドが遅い

**原因**:
- 依存関係が多い
- Turbopackを使っていない

**解決法**:
```json
// package.json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build"
  }
}
```

---

## 次のステップ

1. **[コスト分析レポート](./07-aws-cost-analysis.md)**
   - 詳細なコスト試算
   - 最適化戦略

2. **[IaC + CI/CDガイド](./08-iac-cicd-implementation.md)**
   - より高度な設定
   - マルチ環境構成

3. **実装開始**
   - SSTプロジェクト作成
   - 初回デプロイ
   - CI/CD構築

---

**更新日**: 2026年3月22日

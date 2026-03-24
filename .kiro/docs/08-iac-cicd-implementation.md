# IaC & CI/CD実装ガイド

## 🎯 エグゼクティブサマリー

**推奨アプローチ**: SST v3 + GitHub Actions + OIDC認証
**セットアップ時間**: 2-4時間（初回）
**自動化レベル**: コミット → テスト → デプロイまで完全自動化
**コスト**: $0（GitHub Actions無料枠内で十分）

**メリット**:
- コード変更の即座な反映
- 人的ミスの削減
- 複数環境の簡単管理（dev, staging, prod）
- ロールバックの容易化

---

## 📚 目次

1. [Infrastructure as Code（IaC）の基礎](#infrastructure-as-codeiacの基礎)
2. [SST v3のセットアップ](#sst-v3のセットアップ)
3. [GitHub Actionsのセットアップ](#github-actionsのセットアップ)
4. [OIDC認証の設定](#oidc認証の設定)
5. [マルチ環境管理](#マルチ環境管理)
6. [シークレット管理](#シークレット管理)
7. [デプロイワークフロー](#デプロイワークフロー)
8. [モニタリングとアラート](#モニタリングとアラート)
9. [トラブルシューティング](#トラブルシューティング)

---

## 🏗️ Infrastructure as Code（IaC）の基礎

### IaCとは

**定義**: インフラ構成をコードとして管理する手法

**メリット**:
- ✅ バージョン管理（Git）
- ✅ 再現性（誰でも同じ環境を構築可能）
- ✅ レビュー可能（Pull Requestでレビュー）
- ✅ 自動化（CI/CDで自動デプロイ）
- ✅ ドキュメント（コードが設計書）

**従来の方法との比較**:

| 項目 | 手動構築 | IaC |
|------|---------|-----|
| **再現性** | 低（手順書に依存） | 高（コードで保証） |
| **スピード** | 遅（数時間～数日） | 速（数分） |
| **エラー** | 人的ミス多 | 少ない |
| **バージョン管理** | 困難 | 容易（Git） |
| **チーム共有** | 困難（ドキュメント依存） | 容易（コード） |
| **コスト** | 時間コスト大 | 初期学習コストのみ |

### IaCツールの比較

| ツール | 学習曲線 | Next.js対応 | TypeScript | 推奨度 |
|--------|---------|------------|-----------|-------|
| **SST v3** | ⭐⭐⭐⭐☆ | ⭐⭐⭐⭐⭐ | ✅ | ⭐⭐⭐⭐⭐ |
| **AWS CDK** | ⭐⭐⭐☆☆ | ⭐⭐⭐⭐☆ | ✅ | ⭐⭐⭐⭐☆ |
| **Terraform** | ⭐⭐☆☆☆ | ⭐⭐⭐☆☆ | ❌ (HCL) | ⭐⭐⭐☆☆ |
| **Serverless Framework** | ⭐⭐⭐⭐☆ | ⭐⭐⭐☆☆ | ✅ | ⭐⭐⭐☆☆ |
| **Pulumi** | ⭐⭐⭐☆☆ | ⭐⭐⭐⭐☆ | ✅ | ⭐⭐⭐⭐☆ |

**推奨: SST v3**

理由:
1. Next.js専用の統合（OpenNext内蔵）
2. TypeScriptで書ける（型安全）
3. ローカル開発環境（`sst dev`）
4. シンプルな設定
5. 活発なコミュニティ

---

## 🚀 SST v3のセットアップ

### 前提条件

```bash
# 必要なツール
Node.js: v20.x以上
npm: v10.x以上
AWS CLI: v2.x以上
Git: v2.x以上

# AWSアカウント
- AWS アカウント（無料枠でOK）
- IAMユーザー（AdministratorAccess権限）
```

### ステップ1: AWS CLIの設定

```bash
# AWS CLIインストール確認
aws --version

# AWS認証情報の設定
aws configure

# 入力項目
AWS Access Key ID: YOUR_ACCESS_KEY
AWS Secret Access Key: YOUR_SECRET_KEY
Default region name: ap-northeast-1
Default output format: json

# 確認
aws sts get-caller-identity
```

### ステップ2: SSTのインストール

```bash
# プロジェクトディレクトリに移動
cd cryptid-database

# SSTをインストール
npm install --save-dev sst@latest

# SSTの初期化
npx sst@latest init
```

### ステップ3: sst.config.ts の作成

**sst.config.ts**:

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
    // Next.jsサイトの作成
    const site = new sst.aws.Nextjs("CryptidSite", {
      // カスタムドメイン（オプション）
      domain: {
        name:
          $app.stage === "production"
            ? "cryptid-database.com"
            : `${$app.stage}.cryptid-database.com`,
        dns: sst.aws.dns(),
      },

      // 環境変数
      environment: {
        NEXT_PUBLIC_SITE_URL:
          $app.stage === "production"
            ? "https://cryptid-database.com"
            : `https://${$app.stage}.cryptid-database.com`,
        NEXT_PUBLIC_ETSY_SHOP_URL: process.env.NEXT_PUBLIC_ETSY_SHOP_URL || "",
        CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID || "",
        CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN || "",
      },

      // サーバー設定
      server: {
        architecture: "arm64", // Graviton（コスト削減）
        memory: "1024 MB",
        timeout: "30 seconds",
        tracing: $app.stage === "production" ? "active" : "disabled",
      },

      // Lambda関数のウォーミング（コールドスタート対策）
      warm:
        $app.stage === "production"
          ? {
              count: 10, // 常時10インスタンス起動
              schedule: "rate(5 minutes)", // 5分ごとに実行
            }
          : undefined,

      // キャッシュ設定
      edge: {
        viewerRequest: {
          injection: `
            // カスタムヘッダーの追加
            request.headers['x-forwarded-stage'] = '${$app.stage}';
          `,
        },
      },
    });

    // Secretの作成（オプション）
    const secrets = {
      ContentfulSpaceId: new sst.Secret("ContentfulSpaceId"),
      ContentfulAccessToken: new sst.Secret("ContentfulAccessToken"),
    };

    // 出力
    return {
      url: site.url,
      customDomainUrl: site.domain?.domainName,
    };
  },
});
```

### ステップ4: ローカル開発環境の起動

```bash
# 開発環境の起動（初回はAWSリソース作成に5-10分）
npx sst dev

# 別のターミナルでNext.jsを起動
npm run dev
```

**sst dev のメリット**:
- AWS Lambda関数をローカルでテスト
- 環境変数を自動で取得
- CloudWatch Logsをリアルタイム表示

### ステップ5: デプロイ

```bash
# 開発環境へのデプロイ
npx sst deploy --stage dev

# ステージング環境
npx sst deploy --stage staging

# 本番環境
npx sst deploy --stage production
```

**初回デプロイ時間**: 5-10分
**2回目以降**: 1-3分（差分のみ）

### ステップ6: リソースの確認

```bash
# デプロイされたリソース一覧
npx sst list

# 特定のリソースの詳細
npx sst console

# CloudFormationスタックの確認
aws cloudformation list-stacks --region ap-northeast-1
```

---

## ⚙️ GitHub Actionsのセットアップ

### GitHub Actionsとは

**定義**: GitHubが提供するCI/CDサービス

**メリット**:
- ✅ GitHubと完全統合
- ✅ 無料枠が豊富（2,000分/月）
- ✅ 設定がシンプル（YAMLファイル）
- ✅ 豊富なアクション（Marketplace）

### ワークフローファイルの構成

```
.github/
└── workflows/
    ├── ci.yml           # テスト・Lint（PR時）
    ├── deploy-dev.yml   # 開発環境デプロイ（main push時）
    ├── deploy-staging.yml # ステージングデプロイ（手動）
    └── deploy-prod.yml  # 本番デプロイ（タグpush時）
```

### CI ワークフロー（テスト・Lint）

**.github/workflows/ci.yml**:

```yaml
name: CI

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Run TypeScript check
        run: npx tsc --noEmit

      - name: Run tests
        run: npm test -- --coverage

      - name: Build project
        run: npm run build
        env:
          CONTENTFUL_SPACE_ID: ${{ secrets.CONTENTFUL_SPACE_ID }}
          CONTENTFUL_ACCESS_TOKEN: ${{ secrets.CONTENTFUL_ACCESS_TOKEN }}
          NEXT_PUBLIC_SITE_URL: https://dev.cryptid-database.com

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          fail_ci_if_error: true
```

### 開発環境デプロイワークフロー

**.github/workflows/deploy-dev.yml**:

```yaml
name: Deploy to Dev

on:
  push:
    branches: [develop]

permissions:
  id-token: write # OIDC認証に必要
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_TO_ASSUME_DEV }}
          aws-region: ap-northeast-1

      - name: Deploy to Dev
        run: npx sst deploy --stage dev
        env:
          CONTENTFUL_SPACE_ID: ${{ secrets.CONTENTFUL_SPACE_ID }}
          CONTENTFUL_ACCESS_TOKEN: ${{ secrets.CONTENTFUL_ACCESS_TOKEN }}
          NEXT_PUBLIC_ETSY_SHOP_URL: ${{ secrets.NEXT_PUBLIC_ETSY_SHOP_URL }}

      - name: Comment on PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '✅ Deployed to Dev: https://dev.cryptid-database.com'
            })
```

### 本番環境デプロイワークフロー

**.github/workflows/deploy-prod.yml**:

```yaml
name: Deploy to Production

on:
  push:
    tags:
      - "v*.*.*" # v1.0.0形式のタグ

permissions:
  id-token: write
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://cryptid-database.com

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_TO_ASSUME_PROD }}
          aws-region: ap-northeast-1

      - name: Deploy to Production
        run: npx sst deploy --stage production
        env:
          CONTENTFUL_SPACE_ID: ${{ secrets.CONTENTFUL_SPACE_ID_PROD }}
          CONTENTFUL_ACCESS_TOKEN: ${{ secrets.CONTENTFUL_ACCESS_TOKEN_PROD }}
          NEXT_PUBLIC_ETSY_SHOP_URL: ${{ secrets.NEXT_PUBLIC_ETSY_SHOP_URL }}

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          generate_release_notes: true
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Notify Slack
        if: always()
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: "Production deployment ${{ job.status }}"
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

---

## 🔐 OIDC認証の設定

### OIDC認証とは

**従来の方法（アクセスキー）**:
```
問題点:
- アクセスキーの漏洩リスク
- 定期的なローテーション必要
- 管理が煩雑
```

**OIDC認証**:
```
メリット:
- アクセスキー不要
- 一時的な認証情報のみ
- セキュリティリスク低
- 管理がシンプル
```

### AWS IAM Roleの作成

#### ステップ1: GitHub OIDC Identity Providerの作成

```bash
# AWS Management Consoleにログイン
# IAM → Identity providers → Add provider

Provider type: OpenID Connect
Provider URL: https://token.actions.githubusercontent.com
Audience: sts.amazonaws.com

# 作成後、ARNをメモ（例: arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com）
```

#### ステップ2: IAM Roleの作成（開発環境用）

**AWS CLI使用**:

```bash
# trust-policy.jsonファイルの作成
cat > trust-policy-dev.json << 'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::YOUR_ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:YOUR_GITHUB_USERNAME/cryptid-database:ref:refs/heads/develop"
        }
      }
    }
  ]
}
EOF

# IAM Roleの作成
aws iam create-role \
  --role-name GithubActionsDeployDev \
  --assume-role-policy-document file://trust-policy-dev.json

# ポリシーのアタッチ
aws iam attach-role-policy \
  --role-name GithubActionsDeployDev \
  --policy-arn arn:aws:iam::aws:policy/AdministratorAccess

# Role ARNをメモ
aws iam get-role --role-name GithubActionsDeployDev --query 'Role.Arn' --output text
```

#### ステップ3: IAM Role（本番環境用）

```bash
# trust-policy-prod.jsonの作成
cat > trust-policy-prod.json << 'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::YOUR_ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:YOUR_GITHUB_USERNAME/cryptid-database:ref:refs/tags/*"
        }
      }
    }
  ]
}
EOF

# IAM Roleの作成
aws iam create-role \
  --role-name GithubActionsDeployProd \
  --assume-role-policy-document file://trust-policy-prod.json

aws iam attach-role-policy \
  --role-name GithubActionsDeployProd \
  --policy-arn arn:aws:iam::aws:policy/AdministratorAccess
```

#### ステップ4: GitHub Secretsの設定

```bash
# GitHubリポジトリ → Settings → Secrets and variables → Actions

# Secretsの追加
AWS_ROLE_TO_ASSUME_DEV: arn:aws:iam::123456789012:role/GithubActionsDeployDev
AWS_ROLE_TO_ASSUME_PROD: arn:aws:iam::123456789012:role/GithubActionsDeployProd

CONTENTFUL_SPACE_ID: your_space_id
CONTENTFUL_ACCESS_TOKEN: your_token
CONTENTFUL_SPACE_ID_PROD: your_prod_space_id
CONTENTFUL_ACCESS_TOKEN_PROD: your_prod_token

NEXT_PUBLIC_ETSY_SHOP_URL: https://www.etsy.com/shop/YourShop

SLACK_WEBHOOK: https://hooks.slack.com/services/xxx/yyy/zzz
```

---

## 🌍 マルチ環境管理

### 環境の分離

```
開発環境 (dev)
├─ ブランチ: develop
├─ URL: dev.cryptid-database.com
├─ 用途: 日常開発、機能テスト
└─ 自動デプロイ: develop pushで自動

ステージング環境 (staging)
├─ ブランチ: main
├─ URL: staging.cryptid-database.com
├─ 用途: リリース前の最終確認
└─ 自動デプロイ: main pushで自動（または手動）

本番環境 (production)
├─ タグ: v1.0.0, v1.1.0...
├─ URL: cryptid-database.com
├─ 用途: 一般ユーザー向け
└─ 自動デプロイ: タグpushで自動
```

### 環境別の設定管理

**sst.config.ts（環境変数の管理）**:

```typescript
// 環境別の設定
const envConfig = {
  dev: {
    domain: "dev.cryptid-database.com",
    memory: "512 MB",
    timeout: "10 seconds",
    warm: undefined,
    tracing: false,
  },
  staging: {
    domain: "staging.cryptid-database.com",
    memory: "1024 MB",
    timeout: "20 seconds",
    warm: 5,
    tracing: true,
  },
  production: {
    domain: "cryptid-database.com",
    memory: "1024 MB",
    timeout: "30 seconds",
    warm: 10,
    tracing: true,
  },
};

const config = envConfig[$app.stage as keyof typeof envConfig];

const site = new sst.aws.Nextjs("CryptidSite", {
  domain: { name: config.domain },
  server: {
    architecture: "arm64",
    memory: config.memory,
    timeout: config.timeout,
    tracing: config.tracing ? "active" : "disabled",
  },
  warm: config.warm
    ? {
        count: config.warm,
        schedule: "rate(5 minutes)",
      }
    : undefined,
});
```

### 環境の切り替え

```bash
# ローカル開発
npx sst dev --stage dev

# 開発環境へのデプロイ
npx sst deploy --stage dev

# ステージング環境へのデプロイ
npx sst deploy --stage staging

# 本番環境へのデプロイ
npx sst deploy --stage production

# 環境の削除
npx sst remove --stage dev
```

---

## 🔒 シークレット管理

### AWS Secrets Managerの使用

**sst.config.ts**:

```typescript
// シークレットの定義
const contentfulSpaceId = new sst.Secret("ContentfulSpaceId");
const contentfulToken = new sst.Secret("ContentfulAccessToken");

const site = new sst.aws.Nextjs("CryptidSite", {
  link: [contentfulSpaceId, contentfulToken],
  environment: {
    CONTENTFUL_SPACE_ID: contentfulSpaceId.value,
    CONTENTFUL_ACCESS_TOKEN: contentfulToken.value,
  },
});
```

**シークレットの設定**:

```bash
# CLIでシークレットを設定
npx sst secret set ContentfulSpaceId your_space_id --stage production
npx sst secret set ContentfulAccessToken your_token --stage production

# 確認
npx sst secret list --stage production
```

### GitHub Secretsとの使い分け

| シークレットの種類 | 管理場所 | 用途 |
|-----------------|---------|------|
| **ビルド時に必要** | GitHub Secrets | ビルドプロセスで使用 |
| **ランタイムで必要** | AWS Secrets Manager | Lambda実行時に使用 |
| **両方** | 両方に設定 | 重複管理 |

**例**:

```
GitHub Secrets:
- AWS_ROLE_TO_ASSUME（OIDC認証）
- SLACK_WEBHOOK（通知用）

AWS Secrets Manager:
- CONTENTFUL_ACCESS_TOKEN（Lambda実行時）
- DATABASE_PASSWORD（Lambda実行時）

両方:
- CONTENTFUL_SPACE_ID（ビルド時・実行時）
```

---

## 🔄 デプロイワークフロー

### フロー図

```
[開発者]
   │
   ├─ 機能開発
   │  ├─ ブランチ作成: feature/new-creature-page
   │  ├─ コード変更
   │  ├─ ローカルテスト: npm run dev
   │  └─ Push: git push origin feature/new-creature-page
   │
   ├─ Pull Request作成
   │  ├─ GitHub Actions: CI実行
   │  │  ├─ Lint
   │  │  ├─ TypeScript check
   │  │  ├─ Tests
   │  │  └─ Build
   │  └─ レビュー承認
   │
   ├─ develop ブランチにマージ
   │  └─ GitHub Actions: 開発環境デプロイ
   │     ├─ SST deploy --stage dev
   │     └─ URL: dev.cryptid-database.com
   │
   ├─ 開発環境での動作確認
   │
   ├─ main ブランチにマージ
   │  └─ GitHub Actions: ステージング環境デプロイ
   │     ├─ SST deploy --stage staging
   │     └─ URL: staging.cryptid-database.com
   │
   ├─ ステージング環境での最終確認
   │
   ├─ リリースタグ作成: v1.0.0
   │  └─ GitHub Actions: 本番環境デプロイ
   │     ├─ Tests実行
   │     ├─ SST deploy --stage production
   │     ├─ URL: cryptid-database.com
   │     └─ GitHub Release作成
   │
   └─ 本番環境での動作確認
```

### ロールバック手順

**方法1: 前のタグでデプロイ**

```bash
# 前のバージョンのタグをチェックアウト
git checkout v1.0.0

# 本番環境に再デプロイ
npx sst deploy --stage production

# または、新しいタグを作成
git tag v1.0.1-rollback
git push origin v1.0.1-rollback
# → GitHub Actionsが自動デプロイ
```

**方法2: CloudFormationスタックのロールバック**

```bash
# AWS Management Console
# CloudFormation → スタック選択 → "Roll back"

# または CLI
aws cloudformation rollback-stack \
  --stack-name cryptid-database-production \
  --region ap-northeast-1
```

### デプロイのベストプラクティス

1. **小さく、頻繁にデプロイ**
   - 1機能 = 1 Pull Request
   - 大きな変更は複数のPRに分割

2. **常にテストを通す**
   - PRマージ前に必ずテスト実行
   - テストが失敗したらデプロイしない

3. **デプロイ後の監視**
   - CloudWatch Metricsを確認
   - エラーログをチェック
   - ユーザーからのフィードバックを待つ

4. **段階的ロールアウト**
   - dev → staging → production
   - 各段階で十分な確認時間を取る

5. **ロールバックの準備**
   - 常に前のバージョンに戻せるようにする
   - ロールバック手順をドキュメント化

---

## 📊 モニタリングとアラート

### CloudWatch Metricsの監視

**主要メトリクス**:

```
Lambda関数:
- Invocations（実行回数）
- Duration（実行時間）
- Errors（エラー数）
- Throttles（スロットル数）
- ConcurrentExecutions（同時実行数）

CloudFront:
- Requests（リクエスト数）
- BytesDownloaded（ダウンロードバイト数）
- 4xxErrorRate（クライアントエラー率）
- 5xxErrorRate（サーバーエラー率）
```

### CloudWatch Alarmsの設定

**例: Lambda関数のエラーアラート**

```bash
# CLI でアラーム作成
aws cloudwatch put-metric-alarm \
  --alarm-name cryptid-lambda-errors-prod \
  --alarm-description "Lambda function errors in production" \
  --metric-name Errors \
  --namespace AWS/Lambda \
  --statistic Sum \
  --period 300 \
  --threshold 10 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 1 \
  --dimensions Name=FunctionName,Value=cryptid-database-production-server \
  --alarm-actions arn:aws:sns:ap-northeast-1:123456789012:alerts
```

**SST設定内でアラーム定義**:

```typescript
// sst.config.ts
const topic = new aws.sns.Topic("Alerts", {
  subscriptions: [
    {
      protocol: "email",
      endpoint: "alerts@example.com",
    },
  ],
});

const alarm = new aws.cloudwatch.MetricAlarm("LambdaErrors", {
  alarmName: `${$app.name}-${$app.stage}-lambda-errors`,
  comparisonOperator: "GreaterThanThreshold",
  evaluationPeriods: 1,
  metricName: "Errors",
  namespace: "AWS/Lambda",
  period: 300,
  statistic: "Sum",
  threshold: 10,
  alarmActions: [topic.arn],
  dimensions: {
    FunctionName: site.nodes.server.name,
  },
});
```

### ログの集約と分析

**CloudWatch Logs Insights**:

```sql
-- エラーログの検索
fields @timestamp, @message
| filter @message like /ERROR/
| sort @timestamp desc
| limit 20

-- レスポンスタイムの分析
fields @timestamp, @duration
| stats avg(@duration), max(@duration), min(@duration)
| sort @timestamp desc

-- 特定のパスへのリクエスト
fields @timestamp, @message
| filter @message like /\/creatures\/.*/
| stats count() by bin(5m)
```

### 外部監視サービス

**推奨ツール**:

| サービス | 無料プラン | 用途 | 推奨度 |
|---------|----------|------|-------|
| **UptimeRobot** | ✅ 50モニター | ダウンタイム監視 | ⭐⭐⭐⭐⭐ |
| **Better Uptime** | ✅ 10モニター | 監視+インシデント管理 | ⭐⭐⭐⭐☆ |
| **Sentry** | ✅ 5Kイベント/月 | エラー追跡 | ⭐⭐⭐⭐⭐ |
| **LogRocket** | ✅ 1Kセッション/月 | セッション記録 | ⭐⭐⭐☆☆ |

**Sentryの設定例**:

```typescript
// src/instrumentation.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NEXT_PUBLIC_ENV || "development",
});
```

---

## 🔧 トラブルシューティング

### よくある問題と解決策

#### 問題1: デプロイが失敗する

**症状**:
```
Error: Failed to deploy stack
```

**原因と対策**:

1. **AWS権限不足**
   ```bash
   # IAM Roleの権限を確認
   aws iam get-role-policy --role-name GithubActionsDeployProd --policy-name DeployPolicy

   # AdministratorAccessがアタッチされているか確認
   aws iam list-attached-role-policies --role-name GithubActionsDeployProd
   ```

2. **環境変数の設定漏れ**
   ```bash
   # GitHub Secretsを確認
   # リポジトリ Settings → Secrets and variables → Actions

   # 必須: CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN等
   ```

3. **CloudFormationスタックの状態異常**
   ```bash
   # スタックの状態を確認
   aws cloudformation describe-stacks --stack-name cryptid-database-production

   # ROLLBACK_COMPLETE状態の場合は削除して再デプロイ
   aws cloudformation delete-stack --stack-name cryptid-database-production
   npx sst deploy --stage production
   ```

#### 問題2: OIDC認証エラー

**症状**:
```
Error: Unable to assume role
```

**対策**:

1. **Trust Policyの確認**
   ```bash
   aws iam get-role --role-name GithubActionsDeployProd --query 'Role.AssumeRolePolicyDocument'

   # "sub"の条件を確認
   # "repo:USERNAME/REPO:ref:refs/tags/*" が正しいか
   ```

2. **OIDC Providerの確認**
   ```bash
   aws iam list-open-id-connect-providers

   # token.actions.githubusercontent.com が存在するか確認
   ```

3. **GitHubワークフローの設定**
   ```yaml
   # permissions が正しく設定されているか
   permissions:
     id-token: write
     contents: read
   ```

#### 問題3: デプロイ後にサイトが表示されない

**症状**:
- 502 Bad Gateway
- 504 Gateway Timeout

**対策**:

1. **Lambda関数のログを確認**
   ```bash
   # CloudWatch Logsを確認
   aws logs tail /aws/lambda/cryptid-database-production-server --follow
   ```

2. **環境変数の確認**
   ```bash
   # Lambda関数の環境変数を確認
   aws lambda get-function-configuration \
     --function-name cryptid-database-production-server \
     --query 'Environment.Variables'
   ```

3. **タイムアウトの調整**
   ```typescript
   // sst.config.ts
   server: {
     timeout: "30 seconds", // 増やす
   }
   ```

#### 問題4: ビルドエラー

**症状**:
```
Error: TypeScript errors found
```

**対策**:

1. **ローカルで確認**
   ```bash
   npm run build
   npx tsc --noEmit
   ```

2. **依存関係の更新**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **型定義の修正**
   ```typescript
   // tsconfig.jsonの確認
   {
     "compilerOptions": {
       "strict": true,
       "skipLibCheck": true // 一時的に
     }
   }
   ```

---

## 📋 チェックリスト

### 初期セットアップ

```
□ AWS CLIインストール・設定完了
□ SSTインストール完了
□ sst.config.ts作成完了
□ ローカルで sst dev が起動できる
□ 開発環境にデプロイできる（npx sst deploy --stage dev）
```

### GitHub Actions設定

```
□ .github/workflows/ ディレクトリ作成
□ ci.yml, deploy-dev.yml, deploy-prod.yml作成
□ GitHub OIDC Identity Provider作成（AWS）
□ IAM Role作成（開発・本番）
□ GitHub Secrets設定完了
□ テストPush → ワークフロー実行確認
```

### セキュリティ

```
□ IAM Roleの権限を最小限に（本番では）
□ GitHub Secretsに機密情報を保存
□ AWS Secrets Managerでランタイムシークレット管理
□ OIDC認証を使用（アクセスキー不使用）
```

### モニタリング

```
□ CloudWatch Alarms設定
□ CloudWatch Logs確認
□ Sentry等のエラートラッキング設定
□ UptimeRobot等のアップタイム監視設定
```

---

## 🔗 参考リンク

### 公式ドキュメント
- [SST Documentation](https://sst.dev/docs)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [AWS CloudFormation](https://docs.aws.amazon.com/cloudformation/)
- [OpenID Connect in GitHub Actions](https://docs.github.com/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)

### コミュニティ
- [SST Discord](https://sst.dev/discord)
- [SST GitHub](https://github.com/sst/sst)

---

**更新日**: 2026年3月22日

---

## 関連ドキュメント

- [← AWSコスト分析](./07-aws-cost-analysis.md)
- [→ 12ヶ月ロードマップ](./09-12-month-roadmap.md)
- [📄 AWS Next.jsデプロイガイド](./06-aws-nextjs-deployment-guide.md)

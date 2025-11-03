# Technology Stack

## Architecture

**静的サイト生成 (SSG) + 外部API連携 + Content Collectionsアーキテクチャ**

- Astroによる静的サイト生成で高速なページ配信
- 外部プラットフォーム（Zenn/Qiita）のAPIからブログ記事を取得
- Astro Content Collectionsによるガジェット・書籍の管理（Markdown + Frontmatter）
- ビルド時のデータフェッチとSSG
- レスポンシブデザインによるマルチデバイス対応

## Frontend

### フレームワーク
- **Astro 5.2.5**: メインフレームワーク - 静的サイト生成とコンポーネントベースのUI構築
  - `.astro`ファイルによるコンポーネント定義
  - TypeScriptサポート
  - ビルトインCSSスコープ機能

### スタイリング
- **CSS-in-Astro**: Astroファイル内の`<style>`タグによるスコープドCSS
- **@fontsource/noto-sans-jp**: 日本語Webフォント (400/500/700)
- **カスタムカラーパレット**:
  - Programming: `#95c7ec` (青)
  - Gadget: `#7dc2bb` (緑)
  - Books: `#f9d77f` (黄)

### UI/UX
- レスポンシブグリッドレイアウト
- ホバーアニメーション・トランジション効果
- Sticky ヘッダー
- アクティブナビゲーション表示

## Backend / Data Layer

### 外部API連携
- **Zenn API**: `https://zenn.dev/api/articles?username={username}`
  - ユーザー記事一覧の取得
  - ビルド時にAPIからデータ取得
- **Qiita API**: `https://qiita.com/api/v2/users/{username}/items`
  - ユーザー記事一覧の取得（最大100件/ページ）
  - ビルド時にAPIからデータ取得

### Content Collections
- **Astro Content Collections**: Markdown + Frontmatterによるデータ管理
  - `src/content/gadgets/`: ガジェット情報
  - `src/content/books/`: 書籍情報
  - Zodスキーマによる型安全性
  - ビルド時の型生成とバリデーション

### データモデル
```typescript
// Blog Posts (外部API)
type BlogPost = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  external_url: string;
  platform: 'zenn' | 'qiita';
  published_at: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

// Gadgets (Content Collection)
type Gadget = {
  name: string;
  description: string;
  image_url?: string;
  category: string;
  review_url?: string;
  amazon_url?: string;
  tags: string[];
  created_at: string;
}

// Books (Content Collection)
type Book = {
  title: string;
  author: string;
  description: string;
  image_url?: string;
  review_url?: string;
  amazon_url?: string;
  read_date?: string;
  rating?: number; // 1-5
  tags: string[];
  created_at: string;
}
```

## Development Environment

### 必須ツール
- **Node.js**: JavaScript ランタイム (v18以上推奨)
- **npm**: パッケージマネージャー
- **TypeScript**: 型安全なコード記述
- **Git**: バージョン管理

### エディタ・IDE
- VSCode推奨 (Astro拡張機能あり)

### 開発ブラウザ
- モダンブラウザ (Chrome, Firefox, Safari, Edge)

## Common Commands

| コマンド | アクション |
|---------|---------|
| `npm install` | 依存関係のインストール |
| `npm run dev` | 開発サーバー起動 (`localhost:4321`) |
| `npm run build` | プロダクションビルド (`./dist/`) |
| `npm run preview` | ビルド結果のプレビュー |
| `npm run astro ...` | Astro CLI コマンド実行 |
| `npm run astro -- --help` | Astro CLI ヘルプ表示 |

## Environment Variables

### 必須環境変数
```
VITE_ZENN_USERNAME         # Zennのユーザー名
VITE_QIITA_USERNAME        # Qiitaのユーザー名
```

### 設定ファイル
- `.env`: ローカル環境変数 (Gitに含めない)
- `VITE_`プレフィックス: クライアントサイドで利用可能な環境変数

### セキュリティ注意事項
- `.env`ファイルは`.gitignore`に含める
- 外部APIはパブリックAPIのため認証不要
- 本番環境では環境変数を適切に設定

## Port Configuration

### 開発環境
- **4321**: Astro開発サーバー (デフォルト)
- **4322**: Astroプレビューサーバー (デフォルト)

### 外部サービス
- **Zenn API**: HTTPSによる外部API接続 (ポート443)
- **Qiita API**: HTTPSによる外部API接続 (ポート443)

## Build & Deployment

### ビルド出力
- `dist/`: 静的ファイル出力ディレクトリ
- HTMLファイル、CSS、JavaScriptが最適化されて生成

### デプロイ先候補
- Vercel (推奨)
- Netlify
- Cloudflare Pages
- GitHub Pages
- 任意の静的ホスティングサービス

### デプロイ時の注意点
- 環境変数を適切に設定（`VITE_ZENN_USERNAME`, `VITE_QIITA_USERNAME`）
- ビルドコマンド: `npm run build`
- 出力ディレクトリ: `dist`
- Node.jsバージョン指定 (v18以上)
- ビルド時に外部API（Zenn/Qiita）へアクセス可能であること

## サイト設定の中央管理

### メタデータ管理
サイト全体のメタデータは`BaseLayout.astro`で中央管理されています：

```typescript
// src/layouts/BaseLayout.astro
const { pageTitle } = Astro.props;
const title = 'くじらのTech';
const description = 'プログラミング、ガジェット、読書の記録';

// HTMLヘッダー
<title>{title} | {pageTitle}</title>
<meta name="description" content={description} />
```

このアプローチにより：
- サイトタイトルとディスクリプションが一箇所で管理される
- 全ページで一貫したブランディングが保たれる
- SEOに必要なメタ情報が統一される
- HeaderとFooterにもtitleが渡され、表示に使用される

## Technology Migration History

### 2025-11-03: Supabase削除とAPI連携への移行
**変更内容:**
- Supabase依存を完全削除
- Zenn/Qiita APIからビルド時にブログ記事を取得
- ガジェット・書籍をAstro Content Collectionsで管理
- サイトタイトル「くじらのTech」の設定とメタデータの中央管理

**削除されたもの:**
- `@supabase/supabase-js`パッケージ
- `src/lib/supabase.ts`
- Supabaseマイグレーションファイル（blog, gadget, books テーブル）

**追加されたもの:**
- `src/lib/api/zenn.ts` - Zenn API クライアント
- `src/lib/api/qiita.ts` - Qiita API クライアント
- `src/content/config.ts` - Content Collections設定
- `src/content/gadgets/` - ガジェットMarkdownファイル
- `src/content/books/` - 書籍Markdownファイル

**改善されたもの:**
- `BaseLayout.astro` - サイトタイトルとディスクリプションの中央管理
- `Header.astro`/`Footer.astro` - titleをpropsで受け取るように変更
- `index.astro`/`about.astro` - ページタイトルとコンテンツの充実化

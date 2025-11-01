# Technology Stack

## Architecture

**静的サイト生成 (SSG) + バックエンドAPI連携アーキテクチャ**

- Astroによる静的サイト生成で高速なページ配信
- Supabaseをバックエンドとしたデータ管理
- クライアントサイドでのSupabase API呼び出し
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

## Backend

### データベース・認証
- **Supabase**: BaaS (Backend as a Service)
  - PostgreSQLデータベース
  - RESTful API
  - リアルタイムサブスクリプション対応

### クライアントライブラリ
- **@supabase/supabase-js 2.77.0**: JavaScript/TypeScript クライアント

### データモデル
```typescript
// Blog Posts
type BlogPost = {
  id, title, slug, description, content,
  external_url, platform, published_at,
  tags[], created_at, updated_at
}

// Gadgets
type Gadget = {
  id, name, slug, description, image_url,
  category, review_url, amazon_url,
  tags[], created_at, updated_at
}

// Books
type Book = {
  id, title, slug, author, description,
  image_url, review_url, amazon_url,
  read_date, rating, tags[],
  created_at, updated_at
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
VITE_SUPABASE_URL          # SupabaseプロジェクトのURL
VITE_SUPABASE_ANON_KEY     # Supabaseの匿名キー (公開可能)
```

### 設定ファイル
- `.env`: ローカル環境変数 (Gitに含めない)
- `VITE_`プレフィックス: クライアントサイドで利用可能な環境変数

### セキュリティ注意事項
- `.env`ファイルは`.gitignore`に含める
- ANON_KEYは公開可能だが、Row Level Security (RLS)を適切に設定すること
- 本番環境では環境変数を適切に設定

## Port Configuration

### 開発環境
- **4321**: Astro開発サーバー (デフォルト)
- **4322**: Astroプレビューサーバー (デフォルト)

### 外部サービス
- **Supabase**: HTTPSによる外部API接続 (ポート443)

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
- 環境変数を適切に設定
- ビルドコマンド: `npm run build`
- 出力ディレクトリ: `dist`
- Node.jsバージョン指定 (v18以上)

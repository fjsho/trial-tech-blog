# Project Structure

## Root Directory Organization

```
/
├── .astro/              # Astroが生成する型定義ファイル
├── .bolt/               # Bolt関連の設定
├── .claude/             # Claude Code設定 (スラッシュコマンド等)
├── .codesandbox/        # CodeSandbox設定
├── .git/                # Gitリポジトリ
├── .kiro/               # Kiro Spec-Driven Development関連
│   └── steering/        # プロジェクトステアリングドキュメント
├── .vscode/             # VSCode設定
├── public/              # 静的アセット (favicon等)
├── src/                 # ソースコード
├── supabase/            # Supabaseマイグレーション
├── astro.config.mjs     # Astro設定ファイル
├── package.json         # npm依存関係定義
├── tsconfig.json        # TypeScript設定
├── .env                 # 環境変数 (Gitに含めない)
├── .gitignore           # Git除外設定
├── CLAUDE.md            # Claudeへの指示書
└── README.md            # プロジェクトドキュメント
```

## Subdirectory Structures

### `.kiro/` - Spec-Driven Development
```
.kiro/
├── steering/           # プロジェクト全体のコンテキスト
│   ├── product.md      # プロダクト概要
│   ├── tech.md         # 技術スタック
│   └── structure.md    # プロジェクト構造
└── specs/              # 機能仕様書 (将来追加予定)
```

### `src/` - アプリケーションソースコード
```
src/
├── components/         # 再利用可能なAstroコンポーネント
│   ├── EmptyState.astro  # 空状態表示コンポーネント
│   ├── Footer.astro      # フッターコンポーネント
│   ├── Header.astro      # ヘッダーコンテナコンポーネント
│   ├── Hero.astro        # ヒーローセクションコンポーネント
│   ├── Logo.astro        # ロゴリンクコンポーネント
│   ├── Navigation.astro  # ナビゲーションメニューコンポーネント
│   ├── Section.astro     # セクションレイアウトコンポーネント
│   └── Social.astro      # ソーシャルメディアリンクコンポーネント
├── layouts/            # ページレイアウトコンポーネント
│   └── Layout.astro    # ベースレイアウト (HTML構造、メタタグ)
├── lib/                # ユーティリティ・ライブラリコード
│   └── supabase.ts     # Supabaseクライアント初期化と型定義
├── pages/              # ルーティングページ (ファイルベースルーティング)
│   ├── index.astro     # トップページ (/)
│   ├── about.astro     # アバウトページ (/about)
│   ├── blog/           # ブログセクション
│   │   └── index.astro # ブログ一覧 (/blog)
│   ├── gadget/         # ガジェットセクション
│   │   └── index.astro # ガジェット一覧 (/gadget)
│   └── books/          # 読書セクション
│       └── index.astro # 読書一覧 (/books)
└── styles/             # グローバルスタイル
    └── global.css      # CSS変数・デザイントークン定義
```

### `public/` - 静的アセット
```
public/
└── favicon.svg         # サイトアイコン
```

### `.astro/` - Astro自動生成ファイル
```
.astro/
├── content.d.ts        # コンテンツコレクション型定義
└── types.d.ts          # Astro環境型定義
```

### `supabase/` - データベーススキーマ
```
supabase/
└── migrations/         # データベースマイグレーションファイル
```

## Code Organization Patterns

### ページ構成パターン
```astro
---
// フロントマター: TypeScript/JavaScriptロジック
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import Section from '../components/Section.astro';
// データフェッチ、計算、インポート等
---

<!-- HTMLテンプレート: コンポーネント合成 -->
<Layout title="..." description="...">
  <Hero title="..." description="..." variant="..." />
  <Section maxWidth="...">
    <!-- ページコンテンツ -->
  </Section>
</Layout>

<style>
  /* ページ固有のスコープドCSS */
</style>
```

### コンポーネント階層構造
```
Layout.astro (ベースレイアウト)
├── Header.astro (ヘッダー構造)
│   ├── Logo.astro
│   ├── Navigation.astro
│   └── Social.astro
├── [Page Content] (ページ固有のコンテンツ)
│   ├── Hero.astro (ヒーローセクション)
│   ├── Section.astro (セクションコンテナ)
│   └── EmptyState.astro (空状態表示)
└── Footer.astro
```

### レイアウトコンポーネント
- `Layout.astro`: 全ページ共通のベースレイアウト
  - HTML構造（head, body）
  - メタタグ設定
  - グローバルスタイル読み込み
  - Header/Footerコンポーネントの配置

### 再利用可能コンポーネント
- `Hero.astro`: ページトップのヒーローセクション
  - Props: `title`, `description?`, `variant?`, `size?`
  - バリアント別グラデーション対応
- `Section.astro`: セクションレイアウトコンテナ
  - Props: `variant?`, `maxWidth?`, `class?`
  - 一貫したパディングとコンテナ幅管理
- `EmptyState.astro`: 空状態表示
  - Props: `message`
  - ブログ/ガジェット/読書記録が未登録時の表示
- `Header.astro`: ヘッダーコンテナ
  - Logo, Navigation, Socialのコンポジション
- `Footer.astro`: フッター（著作権表示）
- `Logo.astro`: サイトロゴリンク
- `Navigation.astro`: ナビゲーションメニュー
  - Props: `currentPath` (アクティブ状態管理)
- `Social.astro`: ソーシャルメディアリンク

### データアクセスパターン
```typescript
// src/lib/supabase.ts でクライアント初期化
import { supabase } from '../lib/supabase';

// ページコンポーネントでデータフェッチ
const { data, error } = await supabase
  .from('table_name')
  .select('*');
```

## File Naming Conventions

### Astroファイル
- **PascalCase**: コンポーネント名 (`Layout.astro`)
- **lowercase**: ページファイル (`index.astro`, `about.astro`)
- **ディレクトリベースルーティング**: `pages/blog/index.astro` → `/blog`

### TypeScript/JavaScriptファイル
- **lowercase + hyphen**: ユーティリティファイル (`supabase.ts`)
- **camelCase**: 関数・変数名
- **PascalCase**: 型定義 (`BlogPost`, `Gadget`, `Book`)

### 設定ファイル
- **lowercase + dot**: `.env`, `.gitignore`
- **kebab-case**: `astro.config.mjs`, `package-lock.json`
- **UPPERCASE**: `README.md`, `CLAUDE.md`

## Import Organization

### インポート順序
1. 外部ライブラリ (`@fontsource`, `@supabase`)
2. Astroレイアウトコンポーネント (`Layout.astro`)
3. Astro再利用コンポーネント (`Hero.astro`, `Section.astro`)
4. ローカルモジュール (`../lib/supabase`)
5. 型定義 (必要に応じて)

### パス解決
- **相対パス**: `../layouts/Layout.astro`
- **絶対パス**: 設定なし (現在はTypeScriptの`extends: "astro/tsconfigs/strict"`のみ)

## Key Architectural Principles

### 1. ファイルベースルーティング
- `src/pages/`ディレクトリ構造がURLに直接マッピング
- `index.astro`はディレクトリのルート
- 動的ルート未使用 (現時点では静的ページのみ)

### 2. コンポーネント分離
- レイアウト: `src/layouts/`
- 再利用コンポーネント: `src/components/`
- ページ: `src/pages/`

### 3. CSS設計パターン
- **グローバルCSS変数**: `src/styles/global.css`でデザイントークン定義
  - カラーパレット (`--color-primary`, `--color-text-primary`)
  - スペーシング (`--spacing-xs`, `--spacing-md`)
  - タイポグラフィ (`--font-size-base`, `--font-weight-bold`)
  - トランジション (`--transition-fast`)
- **コンポーネントスコープドCSS**: 各`.astro`ファイルの`<style>`タグ
  - Astroが自動的にユニークハッシュを生成してスコープ化
  - コンポーネント固有のスタイルを自己完結的に定義
  - CSS変数を活用して一貫性を保ちつつ独立性を維持
- **グローバルスタイル**: `:global()`セレクタで必要に応じて定義

### 4. コンポーネントコンポジション
- **Lego blockアプローチ**: 小さな独立したコンポーネントを組み合わせて構築
- **Props駆動**: コンポーネントの振る舞いと見た目をPropsで制御
  - `Hero.astro`: variant/size propsで異なるスタイルを実現
  - `Section.astro`: maxWidth/variant propsでレイアウト調整
  - `Navigation.astro`: currentPath propsでアクティブ状態管理
- **コンテナコンポーネント**: Header.astroのように子コンポーネントを配置
- **スロット**: Layout.astroで子要素を柔軟に配置

### 5. 型安全性
- TypeScript strict モード有効
- Supabaseデータ型を明示的に定義
- Astro自動型生成の活用
- コンポーネントPropsのインターフェース定義

### 6. 環境変数管理
- `VITE_`プレフィックスでクライアントサイド公開
- `.env`ファイルで管理 (Gitに含めない)

### 7. 静的生成優先
- ビルド時にHTMLを生成
- クライアントサイドでAPIコール (必要に応じて)
- SSR未使用 (現在は完全静的)

### 8. セマンティックHTML
- 適切なHTMLタグ使用 (`<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`)
- アクセシビリティ属性 (`aria-label`)
- レスポンシブデザイン

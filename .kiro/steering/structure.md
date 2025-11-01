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
├── components/         # 再利用可能なAstroコンポーネント (現在は空)
├── layouts/            # ページレイアウトコンポーネント
│   └── Layout.astro    # ベースレイアウト (ヘッダー、フッター、グローバルスタイル)
├── lib/                # ユーティリティ・ライブラリコード
│   └── supabase.ts     # Supabaseクライアント初期化と型定義
└── pages/              # ルーティングページ (ファイルベースルーティング)
    ├── index.astro     # トップページ (/)
    ├── about.astro     # アバウトページ (/about)
    ├── blog/           # ブログセクション
    │   └── index.astro # ブログ一覧 (/blog)
    ├── gadget/         # ガジェットセクション
    │   └── index.astro # ガジェット一覧 (/gadget)
    └── books/          # 読書セクション
        └── index.astro # 読書一覧 (/books)
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
// データフェッチ、計算、インポート等
---

<!-- HTMLテンプレート -->
<Layout title="..." description="...">
  <!-- ページコンテンツ -->
</Layout>

<style>
  /* スコープドCSS */
</style>
```

### レイアウトコンポーネント
- `Layout.astro`: 全ページ共通のベースレイアウト
  - グローバルフォント読み込み
  - ヘッダーナビゲーション
  - フッター
  - メタタグ設定

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
2. Astroコンポーネント (`Layout.astro`)
3. ローカルモジュール (`../lib/supabase`)
4. 型定義 (必要に応じて)

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
- 再利用コンポーネント: `src/components/` (将来的に追加)
- ページ: `src/pages/`

### 3. スコープドCSS
- 各`.astro`ファイルの`<style>`タグはそのコンポーネントにスコープ
- グローバルスタイルは`:global()`セレクタで定義

### 4. 型安全性
- TypeScript strict モード有効
- Supabaseデータ型を明示的に定義
- Astro自動型生成の活用

### 5. 環境変数管理
- `VITE_`プレフィックスでクライアントサイド公開
- `.env`ファイルで管理 (Gitに含めない)

### 6. 静的生成優先
- ビルド時にHTMLを生成
- クライアントサイドでAPIコール (必要に応じて)
- SSR未使用 (現在は完全静的)

### 7. セマンティックHTML
- 適切なHTMLタグ使用 (`<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`)
- アクセシビリティ属性 (`aria-label`)
- レスポンシブデザイン

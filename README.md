# 開示サイト評価ガイド（SustainableChecker）

企業のコーポレートサイトを評価する3領域——**サステナビリティ／ESG開示**・**IR（投資家向け情報）**・**ユーザビリティ（使いやすさ）**——について、評価機関が用いる評価軸を、良い例／悪い例／出典とともにカテゴリ別に解説する**情報サイト**。

> 沿革：v0.1はURL入力の自動診断ツール → v0.2で「評価基準の解説サイト」へ方向転換（診断エンジン廃止・完全静的化） → v0.3でトップをハブ化しIR編を追加 → v0.4でユーザビリティ編を追加（3領域）。

## 2つの領域

### 🌱 サステナビリティ開示ガイド（`/sustainability/`）
三層ルーブリック（ゴメスの配点構造＋トライベックの体験フロー＋JSBIの独自性加点）を骨格に、6カテゴリ・全項目を解説。

| カテゴリ | 内容 | 重み |
|---|---|---|
| A | サイトの使いやすさ・情報設計 | 30 |
| B | ESG共通・戦略性 | 25 |
| C | 環境 E | 15 |
| D | 社会 S | 15 |
| E | ガバナンス G | 15 |
| F | 加点：独自性・伝達力 | +10 |

### 📈 IRサイト評価ガイド（`/ir/`）
唯一配点を公開するゴメスの重み（30/25/25/20）を基軸に、日興の掲載有無チェックと大和IRスコアボードの品質観点を統合した4カテゴリ・20項目を解説。主要評価機関の比較も収録。

| カテゴリ | 内容 | 配点 |
|---|---|---|
| 1 | 使いやすさ・情報設計 | 30 |
| 2 | 財務・決算情報の充実度 | 25 |
| 3 | 企業・経営情報の充実度 | 25 |
| 4 | 積極性・先進性 | 20 |

### 🖱 ユーザビリティ評価ガイド（`/usability/`）
トライベック5軸・ニールセン10原則・WCAG 2.2・Core Web Vitals を統合した7カテゴリ・19項目。ナビゲーション（配点25）を最重要とする。主要評価機関の比較も収録。

| カテゴリ | 内容 | 配点 |
|---|---|---|
| 1 | トップページの明快性・ファーストビュー | 15 |
| 2 | ナビゲーション設計（最重要） | 25 |
| 3 | ファインダビリティ・検索性 | 15 |
| 4 | コンテンツのわかりやすさ | 10 |
| 5 | アクセシビリティ | 15 |
| 6 | モバイル対応・パフォーマンス | 10 |
| 7 | ヘルプ・安全性・フォーム | 10 |

## ページ構成

- `/` ハブ（3領域の入口）
- `/sustainability/` … landing／`categories/[id]`／`criteria/[id]`／`glossary`／`about`
- `/ir/` … landing／`categories/[id]`／`criteria/[id]`／`institutions`（評価機関比較）／`glossary`／`about`
- `/usability/` … landing／`categories/[id]`／`criteria/[id]`／`institutions`（評価機関比較）／`glossary`／`about`

## セットアップ

```bash
npm install
npm run dev          # http://localhost:3000
```

APIキーや環境変数は不要（完全静的）。

## ビルド（静的エクスポート）

```bash
npm run build        # → out/ に静的HTMLを生成（約70ページ）
NEXT_PUBLIC_BASE_PATH="/<repo>" npm run build:static  # GitHub Pages配信時
```

## コンテンツの編集

すべて設定データとして外部化：

```
lib/content/    サステナビリティ編（types / criteria(A〜F) / glossary / framework / labels）
lib/ir/         IR編（types / criteria(1〜4) / institutions / glossary / framework / labels）
lib/usability/  ユーザビリティ編（types / criteria(1〜7) / institutions / glossary / framework / labels）
```

年次改定（ゴメス／日興／大和の項目改訂、SSBJ義務化など）はこのデータを差し替えて追従する。

## 注意・免責

- **サステナ編**：C／D／F の各項目と背景・出典は SSBJ・TCFD・GHGプロトコル等に基づくドラフト（「要確認」表示）を含む。ゴメス達成率など確実な数値以外は目安。
- **IR編**：配点はゴメスが公開する唯一のカテゴリ重み（30/25/25/20）に準拠した推定・整合設計。日興・大和はカテゴリ別配分を非公開。ランキングは各年一時点の評価であり、最新の各機関プレスリリース（いずれも12月発表）で確認すること。
- **ユーザビリティ編**：トライベックの軸別ウェイトは非公表のため、配点はトライベック5軸とゴメス「使いやすさ30%」からの推定・整合設計。Core Web Vitals・一部アクセシビリティは静的読み込みだけでは完全診断できず、専用ツール（PageSpeed Insights・axe等）や実機テストの併用が必要。

## ディレクトリ

```
app/
  page.tsx              ハブ（3領域の入口）
  sustainability/       サステナビリティ編（landing/categories/criteria/glossary/about）
  ir/                   IR編（landing/categories/criteria/institutions/glossary/about）
  usability/            ユーザビリティ編（landing/categories/criteria/institutions/glossary/about）
  layout.tsx            共通レイアウト（ヘッダー／フッター）
components/              SiteHeader / Breadcrumb / ExampleBox
lib/content/            サステナビリティ編コンテンツ
lib/ir/                 IR編コンテンツ
lib/usability/          ユーザビリティ編コンテンツ
```

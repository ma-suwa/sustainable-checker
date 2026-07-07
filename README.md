# SustainableChecker

コーポレートサイトのURLを入力すると、サステナビリティ／ESG開示ページの**良い点・悪い点**を自動診断するツール（自分用プロトタイプ）。

三層ルーブリック（ゴメスの配点構造を骨格に、トライベックの体験フロー、JSBIの独自性加点を重ねたもの）のうち、**Phase1 = A（使いやすさ30点）/ B（ESG共通・戦略25点）/ E（ガバナンス15点）＝70点満点**を実装。

## 仕組み

```
URL入力 → ①Playwrightでクロール（入口検出＋クリック深度＋本文抽出＋スクショ）
        → ②決定的シグナル判定（検索窓/パンくず/報告書リンク/日英/外部評価/スキルマトリックス）
        → ③Claudeがルーブリック採点（0 / 50% / 満点 ＋良い点/悪い点/根拠URL）
        → ④集計してスコアカード表示
```

- ルーブリックは `lib/rubric/` に設定データとして外部化（年次改定・SSBJ義務化に差し替えで追従）。
- 機械判定できる A1(到達性)/A3(検索)/A4(パンくず) はコードで決定的に採点。それ以外は Claude が採点。

## セットアップ

```bash
npm install
npx playwright install chromium
cp .env.local.example .env.local   # ANTHROPIC_API_KEY を設定
npm run dev                        # http://localhost:3000
```

### 環境変数（.env.local）

| 変数 | 既定 | 説明 |
|---|---|---|
| `ANTHROPIC_API_KEY` | （必須） | Claude API キー |
| `DIAGNOSE_MODEL` | `claude-sonnet-5` | 採点モデル。高精度は `claude-opus-4-8` |
| `CRAWL_MAX_PAGES` | `10` | クロールするサステナ配下ページ数の上限（コスト/時間の制御） |
| `CRAWL_TIMEOUT_MS` | `20000` | 1ページの遷移タイムアウト |

## 使い方

1. トップの入力欄にコーポレートサイトのURL（例 `https://www.kewpie.com/`）を入れて「診断する」。
2. サステナ入口・クリック深度・カテゴリ別スコア・項目別の良い点/悪い点/根拠URL・ファーストビューのスクショが表示されます。

## 既知の制約（Phase1）

- **入口未検出**はスコア0ではなく「未検出」フラグで区別表示。
- PDF/Excel（統合報告書・第三者検証）は**リンク存在まで**判定（中身は非評価）。
- LLM採点には揺れがある（temperature=0で抑制）。配点の一部は推定。
- C（環境）/D（社会）/F（独自性加点）は未実装（`lib/rubric/index.ts` に無効化スタブあり）。

## ディレクトリ

```
app/                UI・APIルート
  page.tsx          URL入力フォーム＋結果表示
  api/diagnose/     診断オーケストレーション
lib/
  crawler/          Playwrightクロール・入口検出・本文抽出
  signals/          決定的シグナル検出
  rubric/           ルーブリック定義（設定データ）
  evaluator/        Claude採点（tool_use / JSON schema）
  score/            集計
components/          ScoreCard / CategoryBar / ItemRow / GoodBadList
```

// 評価基準の情報サイト向けコンテンツモデル。
// 旧 lib/rubric/ を継承しつつ、解説記事として読める拡張フィールドを追加している。
// データは設定として外部化し、年次改定（ゴメス項目改訂・SSBJ義務化）に差し替えで追従できる。

export type CategoryId = "A" | "B" | "C" | "D" | "E" | "F";

// 自動判定の可否を示すメタ情報（バッジ表示に流用）。
//  - "mechanical": ツールで機械的に判定しやすい（検索窓の有無など）
//  - "llm":        中身の質の判断が必要で、目視・読解が要る
//  - "hybrid":     機械判定＋目視の併用が向く
export type JudgeType = "mechanical" | "llm" | "hybrid";

export interface CriteriaItem {
  id: string; // 例: "A1"
  title: string;
  points: number; // 重み付けの目安（カテゴリ配点内の配分）
  judgeType: JudgeType;
  // 評価観点の要旨。
  criteria: string;
  // なぜこの基準が重要か（背景）。
  background?: string;
  // 評価するときの具体的な見方チェックリスト。
  checkpoints?: string[];
  // 良い例／悪い例（複数可）。
  goodExamples: string[];
  badExamples: string[];
  // ベンチマーク（ゴメス達成率など）。「上位◯%が採用」等の目安。
  benchmark?: string;
  // benchmark が確実な出典（ゴメス既存データ）か。false/未指定は要確認のドラフト。
  benchmarkConfirmed?: boolean;
  // 出典（フレームワーク名・調査名など）。
  sources?: string[];
  // 関連用語（glossary の slug）。
  relatedTerms?: string[];
  // 新規執筆のドラフト（要レビュー）フラグ。
  draft?: boolean;
}

export interface Category {
  id: CategoryId;
  title: string;
  short: string; // 一覧カード用の短い説明
  description: string; // カテゴリ概要
  points: number; // カテゴリ配点（重み付けの目安）
  items: CriteriaItem[];
}

export interface GlossaryTerm {
  slug: string;
  term: string;
  reading?: string;
  definition: string;
  relatedCriteria?: string[]; // 関連する基準ID
}

export interface FrameworkLayer {
  name: string;
  source: string;
  focus: string;
  description: string;
}

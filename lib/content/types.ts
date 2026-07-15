// 評価基準の情報サイト向けコンテンツモデル（サステナビリティ／ESG開示編）。
// 解説記事として通読できるよう、実例（企業名・URL・確認日）と出典リンクを持つ。
// データは設定として外部化し、年次改定（ゴメス項目改訂・SSBJ適用拡大）に差し替えで追従できる。

import type { Benchmark, Example } from "@/lib/shared/types";

export type { Benchmark, Example };

export type CategoryId = "A" | "B" | "C" | "D" | "E" | "F";

// 評価するときの見方を示すメタ情報（バッジ表示に流用）。
//  - "mechanical": 有無を機械的に確認しやすい（検索窓の有無など）
//  - "llm":        中身の質の判断が必要で、目視・読解が要る
//  - "hybrid":     機械確認＋目視の併用が向く
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
  // 良い例／悪い例。実企業名・URL・確認日を伴う（一般論のアンチパターンは company なしで書く）。
  goodExamples: Example[];
  badExamples: Example[];
  // ベンチマーク（ゴメス実施率など）。
  benchmark?: Benchmark;
  // 出典（lib/sources.ts のキー配列）。
  sources?: string[];
  // さらに深く読むための一次情報（lib/sources.ts のキー配列）。
  furtherReading?: string[];
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

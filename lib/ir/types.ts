// IRサイト評価軸の情報サイト向けコンテンツモデル。
// 配点はゴメス/BBSec（3機関で唯一公開されているカテゴリ重み 30/25/25/20）に準拠。
// 日興アイ・アールの掲載有無チェック、大和IRスコアボードの品質観点を統合している。

import type { Benchmark, Example } from "@/lib/shared/types";

export type { Benchmark, Example };

export type IrCategoryId = "1" | "2" | "3" | "4";

// 評価するときの見方。
//  - "url":       ページの有無・リンク先など客観的に確認できる
//  - "screen":    実際に見て回らないと判断できない（質・レイアウト）
//  - "url-screen": 併用
//  - "technical": 外部ツールでの計測が要る（速度・構造化データ等）
export type IrJudgeMethod = "url" | "screen" | "url-screen" | "technical";

export interface IrCriteriaItem {
  id: string; // 例: "1-1"
  title: string;
  points: number;
  criteria: string; // 評価観点
  judgeMethod: IrJudgeMethod;
  background?: string; // なぜ重要か・背景
  checkpoints?: string[]; // 評価するときの見方
  goodExamples: Example[];
  badExamples: Example[];
  benchmark?: Benchmark;
  sources?: string[]; // lib/sources.ts のキー
  furtherReading?: string[]; // lib/sources.ts のキー
  relatedTerms?: string[]; // glossary slug
}

export interface IrCategory {
  id: IrCategoryId;
  title: string;
  short: string;
  description: string;
  points: number;
  items: IrCriteriaItem[];
}

// 評価機関の横断比較。
export interface Institution {
  slug: string;
  name: string; // 表彰/ランキング名
  org: string; // 実施主体
  type: string; // 種別
  target: string; // 対象
  audience: string; // 主目線
  axis: string; // 評価軸
  scoring: string; // 数値配点の公開状況
  english: string; // 英文評価
  latest: string; // 最新実施
  detail: string; // 概要（本文）
  note?: string; // 補足
  url?: string; // 公式ページ
  source?: string; // lib/sources.ts のキー（一次資料）
}

export interface IrGlossaryTerm {
  slug: string;
  term: string;
  reading?: string;
  definition: string;
  relatedCriteria?: string[];
}

export interface RegulationNote {
  title: string;
  body: string;
}

// コーポレートサイト・ユーザビリティ評価軸の情報サイト向けコンテンツモデル。
// カテゴリ配点はトライベック5軸（ナビ最重要の示唆）とGomes「使いやすさ30%」を勘案した設計。

export type UxCategoryId = "1" | "2" | "3" | "4" | "5" | "6" | "7";

// 自動診断での判定手段。CWV・一部アクセシビリティは外部計測が必要。
export type UxJudgeMethod = "url" | "screen" | "url-screen" | "external";

export interface UxCriteriaItem {
  id: string; // 例: "2-1"
  title: string;
  points: number;
  criteria: string; // 評価観点
  goodExample: string;
  badExample: string;
  judgeMethod: UxJudgeMethod;
  background?: string;
  relatedTerms?: string[];
}

export interface UxCategory {
  id: UxCategoryId;
  title: string;
  short: string;
  description: string;
  points: number;
  items: UxCriteriaItem[];
}

export interface UxInstitution {
  slug: string;
  name: string;
  org: string;
  type: string; // 評価主体
  target: string;
  axis: string; // 軸/指標構成
  items: string; // 項目数
  scoring: string; // 満点/配点
  usability: string; // 使いやすさの扱い
  latest: string;
  detail: string;
  note?: string;
}

export interface UxGlossaryTerm {
  slug: string;
  term: string;
  reading?: string;
  definition: string;
  relatedCriteria?: string[];
}

export interface Heuristic {
  no: number;
  title: string;
  desc: string;
}

// Rubric data model. The rubric is intentionally externalized as config so it can
// be swapped yearly to follow Gomez item revisions / SSBJ mandates (see plan "Recommendations 5").

export type CategoryId = "A" | "B" | "C" | "D" | "E" | "F";

// How an item is scored:
//  - "mechanical": fully determined by crawler-detected signals (deterministic).
//  - "llm": judged by Claude from page text.
//  - "hybrid": mechanical signal informs Claude, Claude makes the final call.
export type JudgeType = "mechanical" | "llm" | "hybrid";

// Keys of the deterministic signals produced by the crawler (see lib/signals/mechanical.ts).
export type SignalKey =
  | "hasSiteSearch"
  | "hasBreadcrumb"
  | "hasReportLink"
  | "hasDataBook"
  | "hasEnglish"
  | "hasExternalEval"
  | "hasSkillMatrix"
  | "clickDepth";

export interface RubricItem {
  id: string; // e.g. "A1"
  title: string;
  points: number; // max points for this item
  judgeType: JudgeType;
  // What to look for. Shown to Claude and (for mechanical) documents the rule.
  criteria: string;
  goodExample: string;
  badExample: string;
  // Mechanical detection signal(s) this item keys off of.
  signals?: SignalKey[];
  // Benchmark note (Gomez achievement rates etc.) used as the "full marks / pass line" anchor.
  benchmark?: string;
}

export interface RubricCategory {
  id: CategoryId;
  title: string;
  points: number; // category weight (sum of item points)
  enabled: boolean; // Phase1: A/B/E enabled; C/D/F stubbed.
  items: RubricItem[];
}

export interface Rubric {
  version: string;
  categories: RubricCategory[];
}

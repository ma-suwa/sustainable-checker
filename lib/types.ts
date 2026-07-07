import type { CategoryId, SignalKey } from "./rubric/types";

// Deterministic signals detected by the crawler across the visited pages.
export interface MechanicalSignals {
  hasSiteSearch: boolean;
  hasBreadcrumb: boolean;
  hasReportLink: boolean; // 統合報告書 link found
  hasDataBook: boolean; // ESGデータ集 (Excel/PDF) link found
  hasEnglish: boolean; // language switch / /en path present
  hasExternalEval: boolean; // CDP/DJSI/FTSE/MSCI etc.
  hasSkillMatrix: boolean; // スキルマトリックス
  clickDepth: number | null; // clicks from corporate top to sustainability entry; null = not detected
  // Evidence URLs for the above (best-effort), used to render clickable links.
  evidence: Partial<Record<SignalKey, string>>;
}

export interface CrawledPage {
  url: string;
  title: string;
  text: string; // main article text (trimmed)
}

export interface CrawlResult {
  inputUrl: string;
  corporateTopUrl: string;
  // The detected sustainability entry. null when not found (distinct from "score 0").
  sustainabilityUrl: string | null;
  entryFound: boolean;
  clickDepth: number | null;
  pages: CrawledPage[];
  signals: MechanicalSignals;
  screenshotDataUrl: string | null; // first-view screenshot of sustainability top (data: URI)
  notes: string[]; // crawler warnings (SPA, timeouts, robots, etc.)
}

// One scored rubric item.
export interface ItemScore {
  id: string;
  categoryId: CategoryId;
  title: string;
  maxPoints: number;
  score: number; // 0, 50% of max, or full
  level: "none" | "partial" | "good";
  good: string[]; // 良い点
  bad: string[]; // 悪い点
  evidenceUrls: string[];
  notDetected: boolean; // true when a required page/signal was not found (not the same as "absent")
  needsHumanReview: boolean; // content-quality items that URL/screenshot alone can't fully judge
}

export interface CategoryScore {
  id: CategoryId;
  title: string;
  score: number;
  maxPoints: number;
  items: ItemScore[];
}

export interface DiagnosisResult {
  inputUrl: string;
  sustainabilityUrl: string | null;
  entryFound: boolean;
  clickDepth: number | null;
  totalScore: number;
  maxPoints: number; // enabled max (Phase1: 70)
  scoreOutOf100: number; // normalized to 100
  categories: CategoryScore[];
  screenshotDataUrl: string | null;
  crawlNotes: string[];
  model: string;
  disclaimer: string;
}

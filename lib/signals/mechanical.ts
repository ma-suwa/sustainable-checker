import type { MechanicalSignals } from "../types";
import type { Anchor } from "../crawler/findSustainability";

// Per-page DOM flags collected in-browser during the crawl.
export interface PageProbe {
  url: string;
  hasSearchInput: boolean;
  hasBreadcrumb: boolean;
  hasLangSwitch: boolean;
  anchors: Anchor[];
}

const REPORT_TERMS = ["統合報告", "統合レポート", "integrated report", "annual report", "アニュアル"];
const DATABOOK_TERMS = ["esgデータ", "データ集", "データブック", "esg data", "databook", "data book"];
const EXTERNAL_EVAL_TERMS = [
  "cdp",
  "djsi",
  "ftse",
  "msci",
  "sustainalytics",
  "dow jones",
  "健康経営",
  "eco vadis",
  "ecovadis",
  "外部評価",
];
const SKILL_MATRIX_TERMS = ["スキルマトリックス", "スキル・マトリックス", "skill matrix", "skills matrix"];

function anchorMatches(anchors: Anchor[], terms: string[]): string | null {
  for (const a of anchors) {
    const hay = `${a.text} ${a.href}`.toLowerCase();
    if (terms.some((t) => hay.includes(t.toLowerCase()))) return a.href;
  }
  return null;
}

// Aggregate deterministic signals across all probed pages.
export function detectSignals(
  probes: PageProbe[],
  opts: { sustainabilityUrl: string | null; clickDepth: number | null; hasEnglish: boolean; englishUrl?: string }
): MechanicalSignals {
  const allAnchors = probes.flatMap((p) => p.anchors);
  const evidence: MechanicalSignals["evidence"] = {};

  const searchProbe = probes.find((p) => p.hasSearchInput);
  if (searchProbe) evidence.hasSiteSearch = searchProbe.url;
  const crumbProbe = probes.find((p) => p.hasBreadcrumb);
  if (crumbProbe) evidence.hasBreadcrumb = crumbProbe.url;

  const reportUrl = anchorMatches(allAnchors, REPORT_TERMS);
  if (reportUrl) evidence.hasReportLink = reportUrl;
  const databookUrl = anchorMatches(allAnchors, DATABOOK_TERMS);
  if (databookUrl) evidence.hasDataBook = databookUrl;
  const evalUrl = anchorMatches(allAnchors, EXTERNAL_EVAL_TERMS);
  if (evalUrl) evidence.hasExternalEval = evalUrl;
  const skillUrl = anchorMatches(allAnchors, SKILL_MATRIX_TERMS);
  if (skillUrl) evidence.hasSkillMatrix = skillUrl;

  if (opts.hasEnglish && opts.englishUrl) evidence.hasEnglish = opts.englishUrl;
  if (opts.clickDepth != null && opts.sustainabilityUrl) evidence.clickDepth = opts.sustainabilityUrl;

  return {
    hasSiteSearch: !!searchProbe,
    hasBreadcrumb: !!crumbProbe,
    hasReportLink: !!reportUrl,
    hasDataBook: !!databookUrl,
    hasEnglish: opts.hasEnglish,
    hasExternalEval: !!evalUrl,
    hasSkillMatrix: !!skillUrl,
    clickDepth: opts.clickDepth,
    evidence,
  };
}

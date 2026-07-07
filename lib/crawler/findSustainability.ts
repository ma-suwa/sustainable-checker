// Heuristics for locating the sustainability entry point and prioritizing sub-pages.

export interface Anchor {
  href: string; // absolute URL
  text: string;
}

// Strong signals that an anchor IS the sustainability entry.
const STRONG_LABELS = [
  "サステナビリティ",
  "サステイナビリティ",
  "サステナ",
  "sustainability",
  "sustainable",
  "esg",
];
// Weaker signals (used only if no strong match).
const WEAK_LABELS = ["csr", "社会・環境", "環境・社会", "社会性", "責任経営", "社会貢献"];

const ENTRY_URL_HINTS = ["sustainab", "esg", "csr"];

// Intermediate pages worth visiting when the entry isn't on the top page.
const INTERMEDIATE_LABELS = [
  "会社情報",
  "企業情報",
  "about",
  "company",
  "corporate",
  "ir",
  "投資家",
];

// Keywords that make a sustainability sub-page high priority to crawl.
const PRIORITY_KEYWORDS = [
  "マテリアリティ",
  "重要課題",
  "materiality",
  "目標",
  "実績",
  "ガバナンス",
  "governance",
  "トップメッセージ",
  "メッセージ",
  "message",
  "方針",
  "価値創造",
  "環境",
  "社会",
  "人権",
  "データ",
  "報告書",
  "report",
  "評価",
];

function norm(s: string): string {
  return (s || "").toLowerCase().trim();
}

// Score an anchor's likelihood of being the sustainability entry. Higher = better; 0 = not a candidate.
export function entryScore(a: Anchor): number {
  const label = norm(a.text);
  const href = norm(a.href);
  let score = 0;
  for (const k of STRONG_LABELS) {
    if (label.includes(k)) score += 10;
    if (href.includes(k)) score += 6;
  }
  for (const k of WEAK_LABELS) {
    if (label.includes(k)) score += 4;
  }
  for (const k of ENTRY_URL_HINTS) {
    if (href.includes(`/${k}`)) score += 3;
  }
  // Penalize obviously wrong targets.
  if (label.length > 40) score -= 2;
  if (href.endsWith(".pdf")) score -= 3;
  return score;
}

export function pickEntry(anchors: Anchor[]): Anchor | null {
  let best: Anchor | null = null;
  let bestScore = 0;
  for (const a of anchors) {
    const s = entryScore(a);
    if (s > bestScore) {
      bestScore = s;
      best = a;
    }
  }
  return bestScore >= 6 ? best : null;
}

export function pickIntermediates(anchors: Anchor[], limit: number): Anchor[] {
  const seen = new Set<string>();
  const out: Anchor[] = [];
  for (const a of anchors) {
    const label = norm(a.text);
    const href = norm(a.href);
    if (INTERMEDIATE_LABELS.some((k) => label.includes(k) || href.includes(`/${k}`))) {
      if (!seen.has(a.href)) {
        seen.add(a.href);
        out.push(a);
      }
    }
    if (out.length >= limit) break;
  }
  return out;
}

export function priorityScore(a: Anchor): number {
  const label = norm(a.text);
  const href = norm(a.href);
  let score = 0;
  for (const k of PRIORITY_KEYWORDS) {
    if (label.includes(k)) score += 2;
    if (href.includes(k)) score += 1;
  }
  return score;
}

// Rank same-origin sub-page anchors by priority, dedupe, and cap.
export function rankSubPages(
  anchors: Anchor[],
  origin: string,
  entryUrl: string,
  limit: number
): Anchor[] {
  const seen = new Set<string>([entryUrl]);
  const candidates: { a: Anchor; score: number }[] = [];
  for (const a of anchors) {
    let u: URL;
    try {
      u = new URL(a.href);
    } catch {
      continue;
    }
    if (u.origin !== origin) continue;
    if (u.href.endsWith(".pdf") || u.href.endsWith(".xlsx") || u.href.endsWith(".xls")) continue;
    const clean = u.origin + u.pathname;
    if (seen.has(clean)) continue;
    seen.add(clean);
    candidates.push({ a: { href: clean, text: a.text }, score: priorityScore(a) });
  }
  candidates.sort((x, y) => y.score - x.score);
  return candidates.slice(0, limit).map((c) => c.a);
}

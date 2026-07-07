import type { CrawlResult, DiagnosisResult, CategoryScore, ItemScore } from "../types";
import { enabledCategories, enabledMaxPoints } from "../rubric";
import type { RubricItem } from "../rubric/types";
import { HUMAN_REVIEW_IDS } from "../evaluator/prompt";
import type { LlmItemResult } from "../evaluator/evaluate";

function levelToScore(level: "none" | "partial" | "good", max: number): number {
  if (level === "good") return max;
  if (level === "partial") return Math.round(max * 0.5 * 10) / 10;
  return 0;
}

// Deterministic scoring for code-scored items (A1 click depth, A3 search, A4 breadcrumb).
function scoreCodeItem(item: RubricItem, crawl: CrawlResult): ItemScore | null {
  const base = {
    id: item.id,
    categoryId: "A" as const,
    title: item.title,
    maxPoints: item.points,
    needsHumanReview: false,
  };
  if (item.id === "A1") {
    const d = crawl.clickDepth;
    if (d == null) {
      return {
        ...base,
        score: 0,
        level: "none",
        good: [],
        bad: ["サステナビリティ入口を自動検出できませんでした。"],
        evidenceUrls: [],
        notDetected: true,
      };
    }
    const good = d === 1;
    return {
      ...base,
      score: good ? item.points : levelToScore("partial", item.points),
      level: good ? "good" : "partial",
      good: good ? [`トップから1クリックで到達（クリック深度=${d}）。`] : [`${d}クリックで到達。`],
      bad: good ? [] : ["トップ第一階層への配置が望ましい（2クリック以上）。"],
      evidenceUrls: crawl.sustainabilityUrl ? [crawl.sustainabilityUrl] : [],
      notDetected: false,
    };
  }
  if (item.id === "A3") {
    const ok = crawl.signals.hasSiteSearch;
    const url = crawl.signals.evidence.hasSiteSearch;
    return {
      ...base,
      score: ok ? item.points : 0,
      level: ok ? "good" : "none",
      good: ok ? ["サイト内検索を検出。"] : [],
      bad: ok ? [] : ["サイト内検索が見つかりませんでした（上位98.9%が導入）。"],
      evidenceUrls: url ? [url] : [],
      notDetected: false,
    };
  }
  if (item.id === "A4") {
    const ok = crawl.signals.hasBreadcrumb;
    const url = crawl.signals.evidence.hasBreadcrumb;
    return {
      ...base,
      score: ok ? item.points : 0,
      level: ok ? "good" : "none",
      good: ok ? ["パンくず（現在地表示）を検出。"] : [],
      bad: ok ? [] : ["パンくず等の現在地表示が見つかりませんでした。"],
      evidenceUrls: url ? [url] : [],
      notDetected: false,
    };
  }
  return null;
}

export function aggregate(
  crawl: CrawlResult,
  llm: Map<string, LlmItemResult>,
  model: string
): DiagnosisResult {
  const categories: CategoryScore[] = [];
  let total = 0;

  for (const cat of enabledCategories()) {
    const items: ItemScore[] = [];
    for (const item of cat.items) {
      const coded = scoreCodeItem(item, crawl);
      let scored: ItemScore;
      if (coded) {
        scored = coded;
      } else {
        const r = llm.get(item.id);
        const level = r?.level ?? "none";
        scored = {
          id: item.id,
          categoryId: cat.id,
          title: item.title,
          maxPoints: item.points,
          score: levelToScore(level, item.points),
          level,
          good: r?.good ?? [],
          bad: r?.bad ?? (r ? [] : ["評価結果を取得できませんでした。"]),
          evidenceUrls: r?.evidenceUrls ?? [],
          notDetected: !crawl.entryFound && level === "none",
          needsHumanReview: HUMAN_REVIEW_IDS.has(item.id),
        };
      }
      items.push(scored);
      total += scored.score;
    }
    const catScore = items.reduce((s, i) => s + i.score, 0);
    categories.push({ id: cat.id, title: cat.title, score: catScore, maxPoints: cat.points, items });
  }

  const maxPoints = enabledMaxPoints();
  const totalRounded = Math.round(total * 10) / 10;

  return {
    inputUrl: crawl.inputUrl,
    sustainabilityUrl: crawl.sustainabilityUrl,
    entryFound: crawl.entryFound,
    clickDepth: crawl.clickDepth,
    totalScore: totalRounded,
    maxPoints,
    scoreOutOf100: Math.round((totalRounded / maxPoints) * 100),
    categories,
    screenshotDataUrl: crawl.screenshotDataUrl,
    crawlNotes: crawl.notes,
    model,
    disclaimer:
      "Phase1（A/B/E=70点満点）の自動診断です。配点の一部は推定を含み、LLM採点には揺れがあります。" +
      "PDF内部の内容・第三者検証の有無・データの正確性は本ツールだけでは判定できないため、機械判定＋人的レビューの併用を推奨します。",
  };
}

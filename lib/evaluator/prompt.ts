import type { CrawlResult } from "../types";
import type { RubricItem } from "../rubric/types";
import type { SignalKey } from "../rubric/types";

// Items whose score is computed deterministically in code (not sent to the LLM).
export const CODE_SCORED_IDS = new Set(["A1", "A3", "A4"]);

// Items where URL/screenshot alone can't fully judge content quality -> flag for human review.
export const HUMAN_REVIEW_IDS = new Set(["A6", "B4"]);

export interface LlmItemInput {
  id: string;
  title: string;
  maxPoints: number;
  criteria: string;
  goodExample: string;
  badExample: string;
  signalHint?: string; // for hybrid items: what the mechanical crawler detected
}

export function buildLlmItems(
  items: (RubricItem & { categoryId: string })[],
  signals: CrawlResult["signals"]
): LlmItemInput[] {
  return items
    .filter((it) => !CODE_SCORED_IDS.has(it.id))
    .map((it) => {
      let signalHint: string | undefined;
      if (it.signals?.length) {
        const parts = it.signals
          .filter((s) => s !== "clickDepth")
          .map((s) => {
            const found = (signals as unknown as Record<SignalKey, unknown>)[s];
            const url = signals.evidence[s];
            return `${s}=${found ? "検出" : "未検出"}${url ? ` (${url})` : ""}`;
          });
        if (parts.length) signalHint = `機械判定シグナル: ${parts.join(", ")}`;
      }
      return {
        id: it.id,
        title: it.title,
        maxPoints: it.points,
        criteria: it.criteria,
        goodExample: it.goodExample,
        badExample: it.badExample,
        signalHint,
      };
    });
}

export function buildSystemPrompt(): string {
  return [
    "あなたは企業のサステナビリティ／ESG開示サイトを評価する専門アナリストです。",
    "与えられたルーブリック項目ごとに、クロール済みページ本文・機械判定シグナル・（あれば）スクリーンショットのみを根拠に採点します。",
    "各項目は3段階で判定します: good=優れている(満点), partial=有るが弱い(配点の50%), none=無い/不十分(0点)。",
    "推測で加点しないこと。根拠が本文/シグナル/画像に無ければ none とし、良い点/悪い点は事実ベースで簡潔に日本語で書くこと。",
    "evidenceUrls には判断の根拠となったページURL（与えられたページ一覧の中のもの）を入れること。",
    "必ず submit_scores ツールを1回だけ呼び出して結果を返すこと。",
  ].join("\n");
}

export function buildUserText(crawl: CrawlResult, items: LlmItemInput[]): string {
  const lines: string[] = [];
  lines.push(`# 診断対象`);
  lines.push(`入力URL: ${crawl.inputUrl}`);
  lines.push(`サステナビリティ入口: ${crawl.sustainabilityUrl ?? "未検出"}`);
  lines.push(`トップからのクリック深度: ${crawl.clickDepth ?? "不明"}`);
  lines.push("");
  lines.push(`# 機械判定シグナル（決定的）`);
  const s = crawl.signals;
  lines.push(
    `検索窓=${s.hasSiteSearch}, パンくず=${s.hasBreadcrumb}, 統合報告書リンク=${s.hasReportLink}, ` +
      `ESGデータ集=${s.hasDataBook}, 英語切替=${s.hasEnglish}, 外部評価=${s.hasExternalEval}, スキルマトリックス=${s.hasSkillMatrix}`
  );
  lines.push("");
  lines.push(`# 採点対象のルーブリック項目`);
  for (const it of items) {
    lines.push(
      `- [${it.id}] ${it.title}（配点${it.maxPoints}）\n  観点: ${it.criteria}\n  良い例: ${it.goodExample}\n  悪い例: ${it.badExample}` +
        (it.signalHint ? `\n  ${it.signalHint}` : "")
    );
  }
  lines.push("");
  lines.push(`# クロール済みページ本文（${crawl.pages.length}ページ）`);
  for (const p of crawl.pages) {
    lines.push(`\n## ${p.title || "(無題)"}\nURL: ${p.url}\n${p.text || "(本文抽出なし)"}`);
  }
  return lines.join("\n");
}

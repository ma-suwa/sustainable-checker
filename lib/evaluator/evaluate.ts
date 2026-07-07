import Anthropic from "@anthropic-ai/sdk";
import type { CrawlResult } from "../types";
import { allEnabledItems } from "../rubric";
import {
  buildLlmItems,
  buildSystemPrompt,
  buildUserText,
  CODE_SCORED_IDS,
} from "./prompt";

export type LlmLevel = "none" | "partial" | "good";

export interface LlmItemResult {
  id: string;
  level: LlmLevel;
  good: string[];
  bad: string[];
  evidenceUrls: string[];
}

const MODEL = process.env.DIAGNOSE_MODEL ?? "claude-sonnet-5";

const tool: Anthropic.Tool = {
  name: "submit_scores",
  description: "ルーブリック各項目の採点結果を提出する。",
  input_schema: {
    type: "object",
    properties: {
      items: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string", description: "項目ID（例: A2）" },
            level: {
              type: "string",
              enum: ["none", "partial", "good"],
              description: "none=0点, partial=配点50%, good=満点",
            },
            good: { type: "array", items: { type: "string" }, description: "良い点（日本語・簡潔）" },
            bad: { type: "array", items: { type: "string" }, description: "悪い点（日本語・簡潔）" },
            evidenceUrls: { type: "array", items: { type: "string" } },
          },
          required: ["id", "level", "good", "bad", "evidenceUrls"],
        },
      },
    },
    required: ["items"],
  },
};

// Call Claude to score all non-code-scored rubric items. Returns a map id -> result.
export async function evaluateWithLlm(
  crawl: CrawlResult
): Promise<{ results: Map<string, LlmItemResult>; model: string }> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY が未設定です。.env.local に設定してください。"
    );
  }
  const client = new Anthropic({ apiKey });

  const items = allEnabledItems();
  const llmItems = buildLlmItems(items, crawl.signals);
  const userText = buildUserText(crawl, llmItems);

  const content: Anthropic.ContentBlockParam[] = [{ type: "text", text: userText }];
  if (crawl.screenshotDataUrl) {
    const m = crawl.screenshotDataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
    if (m) {
      content.push({
        type: "image",
        source: { type: "base64", media_type: m[1] as "image/jpeg", data: m[2] },
      });
    }
  }

  const msg = await client.messages.create({
    model: MODEL,
    max_tokens: 4096,
    temperature: 0,
    system: buildSystemPrompt(),
    tools: [tool],
    tool_choice: { type: "tool", name: "submit_scores" },
    messages: [{ role: "user", content }],
  });

  const results = new Map<string, LlmItemResult>();
  for (const block of msg.content) {
    if (block.type === "tool_use" && block.name === "submit_scores") {
      const input = block.input as { items?: LlmItemResult[] };
      for (const r of input.items ?? []) {
        if (r?.id && !CODE_SCORED_IDS.has(r.id)) {
          results.set(r.id, {
            id: r.id,
            level: r.level,
            good: r.good ?? [],
            bad: r.bad ?? [],
            evidenceUrls: r.evidenceUrls ?? [],
          });
        }
      }
    }
  }
  return { results, model: MODEL };
}

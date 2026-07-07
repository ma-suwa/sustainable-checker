import { NextRequest, NextResponse } from "next/server";
import { crawl } from "@/lib/crawler/browser";
import { evaluateWithLlm } from "@/lib/evaluator/evaluate";
import { aggregate } from "@/lib/score/aggregate";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(req: NextRequest) {
  let url: string;
  try {
    const body = await req.json();
    url = String(body?.url ?? "").trim();
  } catch {
    return NextResponse.json({ error: "リクエストボディが不正です。" }, { status: 400 });
  }
  if (!url) {
    return NextResponse.json({ error: "URLを入力してください。" }, { status: 400 });
  }

  try {
    const crawlResult = await crawl(url);
    const { results, model } = await evaluateWithLlm(crawlResult);
    const diagnosis = aggregate(crawlResult, results, model);
    return NextResponse.json(diagnosis);
  } catch (e) {
    const message = e instanceof Error ? e.message : "診断中に不明なエラーが発生しました。";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

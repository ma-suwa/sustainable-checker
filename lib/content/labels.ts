import type { JudgeType } from "./types";

// 自動判定の可否バッジ用ラベル。
export function judgeLabel(judge: JudgeType): string {
  switch (judge) {
    case "mechanical":
      return "機械判定しやすい";
    case "hybrid":
      return "機械＋目視";
    case "llm":
      return "要目視・読解";
  }
}

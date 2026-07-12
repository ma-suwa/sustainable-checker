import type { UxJudgeMethod } from "./types";

// 自動診断での判定手段バッジのラベル。
export function uxJudgeLabel(method: UxJudgeMethod): string {
  switch (method) {
    case "url":
      return "URL判定";
    case "screen":
      return "画面（スクショ）評価";
    case "url-screen":
      return "URL＋画面";
    case "external":
      return "外部計測が必要";
  }
}

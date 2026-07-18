// 各領域の評価項目が実際に参照している出典キーを集める。
// 「評価の枠組み」ページと「出典・参考資料」ページで同じ集合を使うための共通処理。

import { uxAllItems } from "@/lib/usability/criteria";
import { uxInstitutions } from "@/lib/usability/institutions";
import { allItems } from "@/lib/content/criteria";
import { irAllItems } from "@/lib/ir/criteria";
import { institutions as irInstitutions } from "@/lib/ir/institutions";

type Item = {
  sources?: string[];
  furtherReading?: string[];
  benchmark?: { source?: string };
};

function collect(
  items: Item[],
  institutions: { source?: string }[] = [],
): string[] {
  const keys = new Set<string>();
  for (const item of items) {
    for (const k of item.sources ?? []) keys.add(k);
    for (const k of item.furtherReading ?? []) keys.add(k);
    if (item.benchmark?.source) keys.add(item.benchmark.source);
  }
  for (const inst of institutions) {
    if (inst.source) keys.add(inst.source);
  }
  return [...keys];
}

export function uxUsedSourceKeys(): string[] {
  return collect(uxAllItems(), uxInstitutions);
}

export function sustainabilityUsedSourceKeys(): string[] {
  return collect(allItems());
}

export function irUsedSourceKeys(): string[] {
  return collect(irAllItems(), irInstitutions);
}

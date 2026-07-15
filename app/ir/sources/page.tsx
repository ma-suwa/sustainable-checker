import type { Metadata } from "next";
import { irAllItems } from "@/lib/ir/criteria";
import { institutions } from "@/lib/ir/institutions";
import { getSources } from "@/lib/sources";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SourceList } from "@/components/SourceList";

export const metadata: Metadata = {
  title: "出典・参考資料（IR編）",
  description:
    "IRサイト評価ガイドで参照した評価機関・フレームワーク・制度の一次情報リンク集。",
};

function usedSourceKeys(): string[] {
  const keys = new Set<string>();
  for (const item of irAllItems()) {
    for (const k of item.sources ?? []) keys.add(k);
    for (const k of item.furtherReading ?? []) keys.add(k);
    if (item.benchmark?.source) keys.add(item.benchmark.source);
  }
  for (const inst of institutions) {
    if (inst.source) keys.add(inst.source);
  }
  return [...keys];
}

export default function IrSourcesPage() {
  const keys = usedSourceKeys();
  const count = getSources(keys).length;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "IRサイト評価", href: "/ir/" },
          { label: "出典・参考資料" },
        ]}
      />

      <div className="page-head">
        <span className="eyebrow">出典・参考資料</span>
        <h1>このガイドが参照している一次情報</h1>
        <p className="lead">
          IR編の各評価軸で引用している評価機関・フレームワーク・制度を、
          公式ページのリンクとともにまとめました（{count}件）。ランキング上位企業や実施率の数値は、
          各機関のプレスリリース（いずれも例年12月発表）で最新版を確認してください。
        </p>
      </div>

      <SourceList keys={keys} label="一次情報リンク集" />
    </>
  );
}

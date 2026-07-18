import type { Metadata } from "next";
import { allItems } from "@/lib/content/criteria";
import { getSources } from "@/lib/sources";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SourceList } from "@/components/SourceList";

export const metadata: Metadata = {
  title: "出典・参考資料（サステナビリティ編）",
  description:
    "サステナビリティ開示サイト評価ガイドで参照した評価機関・フレームワーク・制度の一次情報リンク集。",
};

// この領域の全項目で参照している出典キーを重複なく集める。
function usedSourceKeys(): string[] {
  const keys = new Set<string>();
  for (const item of allItems()) {
    for (const k of item.sources ?? []) keys.add(k);
    for (const k of item.furtherReading ?? []) keys.add(k);
    if (item.benchmark?.source) keys.add(item.benchmark.source);
  }
  return [...keys];
}

export default function SustainabilitySourcesPage() {
  const keys = usedSourceKeys();
  const count = getSources(keys).length;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "サステナビリティ", href: "/sustainability/" },
          { label: "出典・参考資料" },
        ]}
      />

      <div className="page-head">
        <span className="eyebrow">出典・参考資料</span>
        <h1>このガイドが参照している一次情報</h1>
        <p className="lead">
          サステナビリティ編の各評価軸で引用している評価機関・フレームワーク・制度を、
          公式ページのリンクとともにまとめました（{count}件）。数値や評価基準の裏づけは、
          各項目ページの「出典」からも同じリンクに到達できます。
        </p>
      </div>

      <SourceList keys={keys} grouped />
    </>
  );
}

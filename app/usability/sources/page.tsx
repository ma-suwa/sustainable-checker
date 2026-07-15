import type { Metadata } from "next";
import { uxAllItems } from "@/lib/usability/criteria";
import { uxInstitutions } from "@/lib/usability/institutions";
import { getSources } from "@/lib/sources";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SourceList } from "@/components/SourceList";

export const metadata: Metadata = {
  title: "出典・参考資料（ユーザビリティ編）",
  description:
    "ユーザビリティ評価ガイドで参照した評価機関・ガイドライン・指標の一次情報リンク集。",
};

function usedSourceKeys(): string[] {
  const keys = new Set<string>();
  for (const item of uxAllItems()) {
    for (const k of item.sources ?? []) keys.add(k);
    for (const k of item.furtherReading ?? []) keys.add(k);
    if (item.benchmark?.source) keys.add(item.benchmark.source);
  }
  for (const inst of uxInstitutions) {
    if (inst.source) keys.add(inst.source);
  }
  return [...keys];
}

export default function UxSourcesPage() {
  const keys = usedSourceKeys();
  const count = getSources(keys).length;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "ユーザビリティ", href: "/usability/" },
          { label: "出典・参考資料" },
        ]}
      />

      <div className="page-head">
        <span className="eyebrow">出典・参考資料</span>
        <h1>このガイドが参照している一次情報</h1>
        <p className="lead">
          ユーザビリティ編の各評価軸で引用している評価機関・ガイドライン・指標を、
          公式ページのリンクとともにまとめました（{count}件）。WCAGやCore Web Vitalsは
          随時更新されるため、実際の評価では公式の最新版を参照してください。
        </p>
      </div>

      <SourceList keys={keys} label="一次情報リンク集" />
    </>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FindingArticle } from "@/components/FindingArticle";
import { Toc } from "@/components/Toc";
import { findings } from "@/lib/press/findings";
import { releases } from "@/lib/press/releases";

export const metadata: Metadata = {
  title: "評価されるサイトの特徴と対応策",
  description:
    "収集したプレスリリースを横断して読み取れた、評価されるコーポレートサイトの特徴と、それぞれに対する具体的な対応策。",
};

// 全特徴を1本の記事として通し読みする。個別ページは findings/[id] にパーマリンクを置く。
export default function FindingsLongform() {
  const entries = findings.map((f) => ({ id: f.id, label: f.short }));

  return (
    <>
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "評価の傾向", href: "/press/" },
          { label: "特徴と対応策" },
        ]}
      />

      <div className="page-head">
        <span className="eyebrow">プレスリリース{releases.length}件から</span>
        <h1>評価されるサイトの特徴と対応策</h1>
        <p className="lead">
          複数の評価機関が共通して見ている観点を優先して抽出しました。
          各特徴には、根拠とした一次情報の記述と、着手順の目安をつけた対応策を添えています。
        </p>
      </div>

      <div className="longform">
        <Toc entries={entries} />
        <div className="longform-body">
          {findings.map((f) => (
            <FindingArticle key={f.id} finding={f} />
          ))}

          <p className="criterion-permalink" style={{ marginTop: "2rem" }}>
            <Link href="/press/releases/">→ 根拠にしたプレスリリースの一覧を見る</Link>
          </p>
        </div>
      </div>
    </>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { irCategories, irTotalPoints, irAllItems } from "@/lib/ir/criteria";
import { irIntro } from "@/lib/ir/framework";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "IRサイト評価ガイド",
  description:
    "IRサイトの評価軸を、使いやすさ・財務決算・企業経営・積極性の4カテゴリ・20項目で解説。ゴメス配点準拠のルーブリックと、主要評価機関の比較。",
};

export default function IrHome() {
  const itemCount = irAllItems().length;
  return (
    <>
      <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "IRサイト評価" }]} />

      <div className="page-head">
        <span className="eyebrow">IRサイト評価軸</span>
        <h1>IRサイトの「評価軸」を、体系的に。</h1>
        <p className="lead">
          日本の主要なIRサイト評価は、日興アイ・アール・ゴメス・大和IRの3機関に集約されます。
          本ガイドは、唯一配点を公開するゴメスの重み（30/25/25/20）を基軸に、
          {irCategories.length}カテゴリ・{itemCount}項目の評価軸を良い例・悪い例とともに解説します。
        </p>
      </div>

      <section className="card prose">
        <p style={{ margin: 0 }}>{irIntro}</p>
        <p style={{ margin: "0.8rem 0 0" }}>
          <Link href="/ir/about/">→ 評価の枠組み（5T&C・制度背景）と出典を見る</Link>
        </p>
      </section>

      <h2 style={{ fontSize: "1.15rem", margin: "2rem 0 1rem" }}>
        評価カテゴリ（合計{irTotalPoints()}点・ゴメス配点準拠）
      </h2>
      <div className="grid">
        {irCategories.map((c) => (
          <Link key={c.id} href={`/ir/categories/${c.id}/`} className="link-card">
            <h3>
              <span className="cat-letter">{c.id}</span>
              {c.title}
            </h3>
            <p>{c.short}</p>
            <div className="card-meta">
              <span>配点 {c.points}</span>
              <span>{c.items.length}項目</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid" style={{ marginTop: "1.5rem" }}>
        <Link href="/ir/institutions/" className="link-card">
          <h3>🏛 評価機関の比較</h3>
          <p>日興・ゴメス・大和・日本IR協議会・英IR Societyの評価軸・対象・配点を横断比較。</p>
        </Link>
        <Link href="/ir/glossary/" className="link-card">
          <h3>📚 用語集</h3>
          <p>適時開示・FDルール・スキルマトリックス・資本コスト経営などIR用語を解説。</p>
        </Link>
        <Link href="/ir/about/" className="link-card">
          <h3>🧭 評価の枠組み</h3>
          <p>5T&C理念、制度背景（FDルール・プライム英文開示）、配点の考え方と出典。</p>
        </Link>
      </div>
    </>
  );
}

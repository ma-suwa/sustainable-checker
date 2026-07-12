import Link from "next/link";
import type { Metadata } from "next";
import {
  irIntro,
  fiveTandC,
  regulations,
  iaBestPractices,
  scoringThresholds,
  irSources,
  irDisclaimer,
} from "@/lib/ir/framework";
import { irCategories, irTotalPoints } from "@/lib/ir/criteria";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "IR評価の枠組み・制度背景・出典",
  description:
    "IRサイト評価ルーブリックの配点の考え方（ゴメス準拠）、大和IRの5T&C理念、適時開示・FDルール・プライム英文開示などの制度背景、情報設計のベストプラクティス、出典と免責。",
};

export default function IrAboutPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "IRサイト評価", href: "/ir/" },
          { label: "評価の枠組み" },
        ]}
      />

      <div className="page-head">
        <span className="eyebrow">評価の枠組み</span>
        <h1>IRサイト評価の枠組みと出典</h1>
        <p className="lead">{irIntro}</p>
      </div>

      <section className="section">
        <h2>配点の考え方（合計{irTotalPoints()}・ゴメス準拠）</h2>
        <div className="tag-row" style={{ marginBottom: "0.75rem" }}>
          {irCategories.map((c) => (
            <Link key={c.id} href={`/ir/categories/${c.id}/`} className="tag">
              {c.id}. {c.title}（{c.points}）
            </Link>
          ))}
        </div>
        <p className="note">{scoringThresholds}</p>
      </section>

      <section className="section">
        <h2>大和IRの理念：5T&C</h2>
        {fiveTandC.map((t) => (
          <div key={t.key} className="layer">
            <h3>
              {t.key}（{t.label}）
            </h3>
            <p>{t.desc}</p>
          </div>
        ))}
      </section>

      <section className="section">
        <h2>制度的背景</h2>
        {regulations.map((r) => (
          <div key={r.title} className="layer">
            <h3>{r.title}</h3>
            <p>{r.body}</p>
          </div>
        ))}
      </section>

      <section className="section">
        <h2>情報設計（IA）のベストプラクティス</h2>
        <ul className="checklist">
          {iaBestPractices.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>出典・参考</h2>
        <ul className="source-list">
          {irSources.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>免責</h2>
        <p className="note">{irDisclaimer}</p>
      </section>
    </>
  );
}

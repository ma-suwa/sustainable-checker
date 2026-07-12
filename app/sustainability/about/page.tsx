import Link from "next/link";
import type { Metadata } from "next";
import {
  frameworkIntro,
  frameworkLayers,
  scoringNote,
  disclaimer,
  sources,
} from "@/lib/content/framework";
import { categories, totalPoints } from "@/lib/content/criteria";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "評価の枠組み・出典",
  description:
    "本サイトの評価基準の骨格である三層ルーブリック（ゴメスの配点構造・トライベックの体験フロー・JSBIの独自性加点）の考え方、配点の目安、出典と免責。",
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "サステナビリティ", href: "/sustainability/" }, { label: "評価の枠組み" }]} />

      <div className="page-head">
        <span className="eyebrow">評価の枠組み</span>
        <h1>三層ルーブリックの考え方と出典</h1>
        <p className="lead">{frameworkIntro}</p>
      </div>

      <section className="section">
        <h2>3つの層</h2>
        {frameworkLayers.map((l) => (
          <div key={l.name} className="layer">
            <h3>{l.name}</h3>
            <span className="layer-src">
              {l.source} ／ 重点: {l.focus}
            </span>
            <p>{l.description}</p>
          </div>
        ))}
      </section>

      <section className="section">
        <h2>配点の目安（合計{totalPoints()}）</h2>
        <div className="tag-row" style={{ marginBottom: "0.75rem" }}>
          {categories.map((c) => (
            <Link key={c.id} href={`/sustainability/categories/${c.id}/`} className="tag">
              {c.id}. {c.title}（{c.points}）
            </Link>
          ))}
        </div>
        <p className="note">{scoringNote}</p>
      </section>

      <section className="section">
        <h2>出典・参考</h2>
        <ul className="source-list">
          {sources.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>免責</h2>
        <p className="note">{disclaimer}</p>
      </section>
    </>
  );
}

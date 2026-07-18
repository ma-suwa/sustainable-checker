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
import { SourceList } from "@/components/SourceList";
import { getSources } from "@/lib/sources";
import { sustainabilityUsedSourceKeys } from "@/lib/usedSources";

export const metadata: Metadata = {
  title: "評価の枠組み・出典",
  description:
    "本サイトの評価基準の骨格である三層ルーブリック（ゴメスの配点構造・トライベックの体験フロー・JSBIの独自性加点）の考え方、配点の目安、出典と免責。",
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "サステナビリティ", href: "/sustainability/" },
          { label: "評価の枠組み" },
        ]}
      />

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
            <Link
              key={c.id}
              href={`/sustainability/categories/${c.id}/`}
              className="tag"
            >
              {c.id}. {c.title}（{c.points}）
            </Link>
          ))}
        </div>
        <p className="note">{scoringNote}</p>
      </section>

      <section className="section">
        <h2>この配点の土台にした評価機関</h2>
        <p className="note" style={{ marginBottom: "0.9rem" }}>
          三層ルーブリックの配点は、下記の第三者評価が公表している評価軸・項目数・配点を
          突き合わせて組み立てています。各機関のページを実際に見ると、何をどこまで公開して
          いるか（配点まで出すのか、項目数だけか）に差があることが分かります。
        </p>
        <SourceList
          keys={sustainabilityUsedSourceKeys()}
          grouped
          only={["ranking"]}
          headingLevel={3}
        />
        <p className="note" style={{ marginTop: "1rem" }}>
          標準・ガイドライン、計測ツール、制度を含む全
          {getSources(sustainabilityUsedSourceKeys()).length}件は
          <Link href="/sustainability/sources/">出典・参考資料</Link>
          にまとめています。
        </p>
      </section>

      <section className="section">
        <h2>そのほか参照した枠組み</h2>
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

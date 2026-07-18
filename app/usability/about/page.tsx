import Link from "next/link";
import type { Metadata } from "next";
import {
  uxIntro,
  heuristics,
  commonAxes,
  iaBestPractices,
  scoringNote,
  scoringThresholds,
  uxSources,
  uxDisclaimer,
} from "@/lib/usability/framework";
import { uxCategories, uxTotalPoints } from "@/lib/usability/criteria";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SourceList } from "@/components/SourceList";
import { getSources } from "@/lib/sources";
import { uxUsedSourceKeys } from "@/lib/usedSources";

export const metadata: Metadata = {
  title: "ユーザビリティ評価の枠組み・原則・出典",
  description:
    "ニールセンのユーザビリティ10原則、共通評価軸、IA/ナビ設計のベストプラクティス、配点の考え方（トライベック5軸＋Gomez使いやすさ30%）、出典と免責。",
};

export default function UxAboutPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "ユーザビリティ", href: "/usability/" },
          { label: "評価の枠組み" },
        ]}
      />

      <div className="page-head">
        <span className="eyebrow">評価の枠組み</span>
        <h1>ユーザビリティ評価の枠組みと原則</h1>
        <p className="lead">{uxIntro}</p>
      </div>

      <section className="section">
        <h2>配点の考え方（合計{uxTotalPoints()}）</h2>
        <div className="tag-row" style={{ marginBottom: "0.75rem" }}>
          {uxCategories.map((c) => (
            <Link
              key={c.id}
              href={`/usability/categories/${c.id}/`}
              className="tag"
            >
              {c.id}. {c.title}（{c.points}）
            </Link>
          ))}
        </div>
        <p className="note">{scoringNote}</p>
        <p className="note" style={{ marginTop: "0.6rem" }}>
          {scoringThresholds}
        </p>
      </section>

      <section className="section">
        <h2>ニールセンのユーザビリティ10原則</h2>
        {heuristics.map((h) => (
          <div key={h.no} className="layer">
            <h3>
              {h.no}. {h.title}
            </h3>
            <p>{h.desc}</p>
          </div>
        ))}
      </section>

      <section className="section">
        <h2>共通する評価軸</h2>
        <ul className="checklist">
          {commonAxes.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>情報設計・ナビゲーションのベストプラクティス</h2>
        <ul className="checklist">
          {iaBestPractices.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>この配点の土台にした評価機関</h2>
        <p className="note" style={{ marginBottom: "0.9rem" }}>
          カテゴリ構成と配点は、下記の第三者評価が公表している評価軸・項目数・配点を突き合わせて
          組み立てています。各機関のページを実際に見ると、何をどこまで公開しているか（配点まで出す
          のか、項目数だけか）に差があることが分かります。
        </p>
        <SourceList
          keys={uxUsedSourceKeys()}
          grouped
          only={["ranking"]}
          headingLevel={3}
        />
        <p className="note" style={{ marginTop: "1rem" }}>
          標準・ガイドライン、計測ツール、制度を含む全
          {getSources(uxUsedSourceKeys()).length}件は
          <Link href="/usability/sources/">出典・参考資料</Link>
          にまとめています。
        </p>
      </section>

      <section className="section">
        <h2>そのほか参照した枠組み</h2>
        <ul className="source-list">
          {uxSources.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>免責</h2>
        <p className="note">{uxDisclaimer}</p>
      </section>
    </>
  );
}

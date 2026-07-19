import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  ORG_DESC,
  ORG_LABEL,
  ORG_ORDER,
  releases,
  releasesByOrg,
} from "@/lib/press/releases";
import type { ReleaseKind } from "@/lib/press/types";

export const metadata: Metadata = {
  title: "収集したプレスリリース一覧",
  description:
    "コーポレートサイト評価・ランキング・サイトブランド調査のプレスリリースを発行主体ごとに整理。調査概要・評価軸・掲載率など一次情報から読み取れた事実を併記。",
};

const KIND_LABEL: Record<ReleaseKind, string> = {
  survey: "調査発表",
  award: "表彰・受賞企業",
  method: "調査手法",
  corporate: "受賞企業の発表",
};

export default function ReleasesPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "評価の傾向", href: "/press/" },
          { label: "プレスリリース一覧" },
        ]}
      />

      <div className="page-head">
        <span className="eyebrow">一次情報</span>
        <h1>収集したプレスリリース（{releases.length}件）</h1>
        <p className="lead">
          発行主体ごとに整理しています。「わかること」は各リリースの位置づけ、
          その下の箇条書きは一次情報から読み取れた事実です。数値は原文の表現に合わせています。
          収集日は2026-07-19。
        </p>
      </div>

      {ORG_ORDER.map((org) => {
        const list = releasesByOrg(org);
        if (list.length === 0) return null;
        return (
          <section key={org} id={org} className="source-group">
            <h2 style={{ fontSize: "1.1rem", margin: "2rem 0 0.4rem" }}>
              {ORG_LABEL[org]}
              <span className="source-count">{list.length}件</span>
            </h2>
            <p className="source-group-desc">{ORG_DESC[org]}</p>

            {list.map((r) => (
              <div key={r.id} className="card" style={{ marginTop: "0.9rem" }}>
                <div className="release-head">
                  <span className="badge judge">{KIND_LABEL[r.kind]}</span>
                  {r.date && <span className="badge points">{r.date}</span>}
                </div>
                <h3 style={{ fontSize: "0.98rem", margin: "0.5rem 0 0.3rem" }}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer">
                    {r.title}
                  </a>
                </h3>
                <p className="source-org">{r.org}</p>
                {r.summary && (
                  <p className="criterion-body" style={{ marginTop: "0.5rem" }}>
                    {r.summary}
                  </p>
                )}
                {r.facts && r.facts.length > 0 && (
                  <details className="release-facts">
                    <summary>一次情報から読み取れた事実（{r.facts.length}件）</summary>
                    <ul className="checklist">
                      {r.facts.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            ))}
          </section>
        );
      })}

      <p className="criterion-permalink" style={{ marginTop: "2rem" }}>
        <Link href="/press/findings/">
          → ここから読み取れた特徴と対応策を見る
        </Link>
      </p>
    </>
  );
}

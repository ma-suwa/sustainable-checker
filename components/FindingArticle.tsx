import Link from "next/link";
import type { Finding } from "@/lib/press/types";
import { getRelease } from "@/lib/press/releases";

// 「評価されるサイトの特徴」1件の本文。通し読みページと単体パーマリンクで共用する。
//
// 他の3領域の CriterionArticle と違い、評価軸の規範ではなく観測結果を扱うため、
// 根拠（どのリリースの、どの記述か）を本文と同じ重さで見せる。
export function FindingArticle({
  finding,
  standalone = false,
}: {
  finding: Finding;
  standalone?: boolean;
}) {
  const Heading = standalone ? "h2" : "h3";

  return (
    <article className="criterion" id={finding.id}>
      {!standalone && (
        <h2 className="criterion-head">
          <a
            href={`#${finding.id}`}
            className="anchor"
            aria-label={`${finding.id}へのリンク`}
          >
            #
          </a>
          <span className="criterion-id">{finding.id}</span>
          <span className="criterion-title">{finding.title}</span>
        </h2>
      )}

      <p className="criterion-lead">{finding.lead}</p>

      {finding.body.map((p, i) => (
        <p key={i} className="criterion-body">
          {p}
        </p>
      ))}

      <div className="criterion-block">
        <Heading className="criterion-sub">根拠（一次情報での記述）</Heading>
        <ul className="evidence-list">
          {finding.evidence.map((e, i) => {
            const rel = getRelease(e.releaseId);
            return (
              <li key={i}>
                <span className="evidence-text">{e.text}</span>
                {rel && (
                  <span className="evidence-src">
                    —{" "}
                    <a href={rel.url} target="_blank" rel="noopener noreferrer">
                      {rel.org}「{rel.title}」
                    </a>
                    {rel.date && <span className="evidence-date">（{rel.date}）</span>}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="criterion-block">
        <Heading className="criterion-sub">具体的な対応策</Heading>
        <ul className="action-list">
          {finding.actions.map((a, i) => (
            <li key={i}>
              <span className={`badge level-${levelSlug(a.level)}`}>{a.level}</span>
              <span>{a.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {!standalone && (
        <p className="criterion-permalink">
          <Link href={`/press/findings/${finding.id}/`}>
            {finding.id} を単独ページで開く →
          </Link>
        </p>
      )}
    </article>
  );
}

function levelSlug(level: string): string {
  if (level === "まず着手") return "first";
  if (level === "標準") return "standard";
  return "advanced";
}

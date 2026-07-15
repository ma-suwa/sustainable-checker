import type { Metadata } from "next";
import { uxInstitutions } from "@/lib/usability/institutions";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "ユーザビリティ評価機関の比較",
  description:
    "トライベック（専門家評価）／日経BP（生活者アンケート）／日興アイ・アール（客観チェック）／ゴメスの、評価主体・軸・項目数・使いやすさの扱いを横断比較。",
};

export default function UxInstitutionsPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "ユーザビリティ", href: "/usability/" },
          { label: "評価機関の比較" },
        ]}
      />

      <div className="page-head">
        <span className="eyebrow">評価機関の比較</span>
        <h1>ユーザビリティ評価機関の横断比較</h1>
        <p className="lead">
          評価の「主体」が根本的に異なります——専門家によるヒューリスティック評価（トライベック）、
          生活者アンケート（日経BP）、客観的な有無チェック（日興）、アナリスト＋計測（ゴメス）。
          純粋な使いやすさ診断にはトライベック型とニールセン10原則が最も参照価値が高いです。
        </p>
      </div>

      <div className="table-scroll">
        <table className="cmp-table">
          <thead>
            <tr>
              <th>機関</th>
              <th>評価主体</th>
              <th>対象</th>
              <th>軸／指標</th>
              <th>項目数</th>
              <th>満点／配点</th>
              <th>使いやすさの扱い</th>
            </tr>
          </thead>
          <tbody>
            {uxInstitutions.map((i) => (
              <tr key={i.slug}>
                <th scope="row">
                  <a href={`#${i.slug}`}>{i.org}</a>
                </th>
                <td>{i.type}</td>
                <td>{i.target}</td>
                <td>{i.axis}</td>
                <td>{i.items}</td>
                <td>{i.scoring}</td>
                <td>{i.usability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "2rem" }}>
        {uxInstitutions.map((i) => (
          <section key={i.slug} id={i.slug} className="card" style={{ scrollMarginTop: "4rem" }}>
            <h2 style={{ margin: "0 0 0.2rem", fontSize: "1.1rem" }}>{i.org}</h2>
            <p style={{ margin: "0 0 0.6rem", color: "var(--muted)", fontSize: "0.9rem" }}>
              {i.name}／{i.latest}
            </p>
            <p style={{ margin: 0 }}>{i.detail}</p>
            {i.note && (
              <p className="note" style={{ marginTop: "0.75rem" }}>
                {i.note}
              </p>
            )}
            {i.url && (
              <p style={{ margin: "0.75rem 0 0", fontSize: "0.85rem" }}>
                <a href={i.url} target="_blank" rel="noopener noreferrer">
                  公式サイトで最新の調査結果を見る
                  <span className="ext" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </p>
            )}
          </section>
        ))}
      </div>
    </>
  );
}

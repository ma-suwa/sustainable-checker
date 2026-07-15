import type { Metadata } from "next";
import { institutions } from "@/lib/ir/institutions";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "IR評価機関の比較",
  description:
    "日興アイ・アール／ゴメス（BBSec）／大和IR／日本IR協議会／英IR Societyの、対象・目線・評価軸・数値配点・英文評価を横断比較。",
};

export default function InstitutionsPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "IRサイト評価", href: "/ir/" },
          { label: "評価機関の比較" },
        ]}
      />

      <div className="page-head">
        <span className="eyebrow">評価機関の比較</span>
        <h1>主要IRサイト評価機関の横断比較</h1>
        <p className="lead">
          日本の主要3機関（日興・ゴメス・大和）と日本IR協議会、海外ベンチマークの英IR Societyを、
          対象・目線・評価軸・数値配点・英文評価の観点で比較します。
        </p>
      </div>

      <div className="table-scroll">
        <table className="cmp-table">
          <thead>
            <tr>
              <th>機関</th>
              <th>種別</th>
              <th>対象</th>
              <th>主目線</th>
              <th>評価軸</th>
              <th>数値配点</th>
              <th>英文評価</th>
            </tr>
          </thead>
          <tbody>
            {institutions.map((i) => (
              <tr key={i.slug}>
                <th scope="row">
                  <a href={`#${i.slug}`}>{i.org}</a>
                </th>
                <td>{i.type}</td>
                <td>{i.target}</td>
                <td>{i.audience}</td>
                <td>{i.axis}</td>
                <td>{i.scoring}</td>
                <td>{i.english}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "2rem" }}>
        {institutions.map((i) => (
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

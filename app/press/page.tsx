import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { findings } from "@/lib/press/findings";
import { releases, ORG_LABEL, ORG_ORDER, releasesByOrg } from "@/lib/press/releases";

export const metadata: Metadata = {
  title: "プレスリリースから読む評価の傾向",
  description:
    "コーポレートサイト評価・ランキング・サイトブランド調査のプレスリリースを収集し、評価されるサイトに共通する特徴と具体的な対応策を、一次情報の記述とともに整理。",
};

export default function PressHome() {
  const surveyCount = releases.filter((r) => r.kind !== "corporate").length;
  const corporateCount = releases.filter((r) => r.kind === "corporate").length;
  const orgCount = ORG_ORDER.filter((o) => o !== "company").length;

  return (
    <>
      <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "評価の傾向" }]} />

      <div className="page-head">
        <span className="eyebrow">プレスリリースから読む</span>
        <h1>評価されるサイトには、何が共通しているのか。</h1>
        <p className="lead">
          コーポレートサイトの評価・ランキング・サイトブランド調査のプレスリリースを
          {releases.length}件収集し、横断して読み取れた{findings.length}
          の特徴と、それぞれに対する具体的な対応策をまとめました。
          すべての記述に、どのリリースのどの記述を根拠にしたかを併記しています。
        </p>
      </div>

      <section className="card prose">
        <p style={{ margin: 0 }}>
          日本の主要なコーポレートサイト評価は、発表時期がほぼ固定されています。
          <strong>9月</strong>にゴメスESGとトライベックのサステナビリティサイト、
          <strong>12月</strong>に日興アイ・アール・大和IR・ゴメスIR・トライベックのユーザビリティ、
          <strong>2月</strong>にサステナビリティサイト・アワード。
          12月〜1月は受賞企業側の発表も集中します。
          この周期を押さえておくと、毎年の基準改定を追いやすくなります。
        </p>
      </section>

      <div className="grid" style={{ marginTop: "1.5rem" }}>
        <div className="link-card" style={{ cursor: "default" }}>
          <h3>{releases.length}件</h3>
          <p>
            収集したプレスリリース。調査機関による発表{surveyCount}件、
            受賞企業側の発表{corporateCount}件。
          </p>
        </div>
        <div className="link-card" style={{ cursor: "default" }}>
          <h3>{orgCount}機関</h3>
          <p>
            日興アイ・アール／大和IR／ゴメス／トライベック／サステナビリティコミュニケーション協会／日経BPコンサルティング。
          </p>
        </div>
        <div className="link-card" style={{ cursor: "default" }}>
          <h3>{findings.length}の特徴</h3>
          <p>
            複数機関が共通して見ている観点を優先して抽出。単一機関の癖は採用していません。
          </p>
        </div>
      </div>

      <h2 style={{ fontSize: "1.15rem", margin: "2.5rem 0 0.5rem" }}>
        評価されるサイトに見られる特徴
      </h2>
      <p className="lead" style={{ fontSize: "0.9rem", marginTop: 0 }}>
        <Link href="/press/findings/">→ {findings.length}件をまとめて通し読みする</Link>
      </p>

      <div className="criteria-list" style={{ marginTop: "1rem" }}>
        {findings.map((f) => (
          <Link
            key={f.id}
            href={`/press/findings/${f.id}/`}
            className="criteria-row"
          >
            <span className="criterion-id">{f.id}</span>
            <span>
              <strong>{f.title}</strong>
              <br />
              <span style={{ color: "var(--muted)", fontSize: "0.88rem" }}>
                {f.lead}
              </span>
            </span>
          </Link>
        ))}
      </div>

      <h2 style={{ fontSize: "1.15rem", margin: "2.5rem 0 1rem" }}>
        収集したプレスリリース
      </h2>
      <div className="grid">
        {ORG_ORDER.map((org) => (
          <Link key={org} href={`/press/releases/#${org}`} className="link-card">
            <h3>{ORG_LABEL[org]}</h3>
            <p>{releasesByOrg(org).length}件</p>
          </Link>
        ))}
      </div>

      <div className="grid" style={{ marginTop: "1.5rem" }}>
        <Link href="/press/releases/" className="link-card">
          <h3>🗂 プレスリリース一覧</h3>
          <p>
            収集した全{releases.length}件を発行主体ごとに整理。調査概要・評価軸・掲載率など、
            一次情報から読み取れた事実を添えています。
          </p>
        </Link>
        <Link href="/press/findings/" className="link-card">
          <h3>📖 特徴と対応策（通し読み）</h3>
          <p>{findings.length}件を追従目次つきで一気に読めます。</p>
        </Link>
      </div>

      <div className="note" style={{ marginTop: "2rem" }}>
        <p style={{ margin: 0 }}>
          <strong>読み方の注意。</strong>
          ランキングは各年一時点の評価であり、サイトは随時改修されます。
          掲載率などの数値は各リリースの調査時点のものです。
          実際の施策検討では、必ず各機関の最新の発表資料に当たってください。
          収集日は2026-07-19です。
        </p>
      </div>
    </>
  );
}

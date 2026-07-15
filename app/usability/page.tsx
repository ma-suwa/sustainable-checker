import Link from "next/link";
import type { Metadata } from "next";
import { uxCategories, uxTotalPoints, uxAllItems } from "@/lib/usability/criteria";
import { uxIntro } from "@/lib/usability/framework";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "コーポレートサイト ユーザビリティ評価ガイド",
  description:
    "コーポレートサイトのユーザビリティ（使いやすさ）評価軸を、トップページ・ナビゲーション・検索性・アクセシビリティ・パフォーマンスなど7カテゴリ・19項目で解説。",
};

export default function UsabilityHome() {
  const itemCount = uxAllItems().length;
  return (
    <>
      <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "ユーザビリティ" }]} />

      <div className="page-head">
        <span className="eyebrow">ユーザビリティ評価軸</span>
        <h1>コーポレートサイトの「使いやすさ」を、体系的に。</h1>
        <p className="lead">
          トライベックの5軸評価とニールセンの10原則、WCAG・Core Web Vitals を統合し、
          {uxCategories.length}カテゴリ・{itemCount}項目のユーザビリティ評価軸を、良い例・悪い例とともに解説します。
          最重要はナビゲーション設計です。
        </p>
      </div>

      <section className="card prose">
        <p style={{ margin: 0 }}>{uxIntro}</p>
        <p style={{ margin: "0.8rem 0 0" }}>
          <Link href="/usability/about/">→ 評価の枠組み（ニールセン10原則・出典）を見る</Link>
        </p>
      </section>

      <h2 style={{ fontSize: "1.15rem", margin: "2rem 0 1rem" }}>
        評価カテゴリ（合計{uxTotalPoints()}点）
      </h2>
      <div className="grid">
        {uxCategories.map((c) => (
          <Link key={c.id} href={`/usability/categories/${c.id}/`} className="link-card">
            <h3>
              <span className="cat-letter">{c.id}</span>
              {c.title}
            </h3>
            <p>{c.short}</p>
            <ul className="item-peek">
              {c.items.map((it) => (
                <li key={it.id}>
                  {it.id} {it.title}
                </li>
              ))}
            </ul>
            <div className="card-meta">
              <span>配点 {c.points}</span>
              <span>{c.items.length}項目</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid" style={{ marginTop: "1.5rem" }}>
        <Link href="/usability/institutions/" className="link-card">
          <h3>🏛 評価機関の比較</h3>
          <p>トライベック・日経BP・日興・ゴメスの評価主体・軸・項目数を横断比較。</p>
        </Link>
        <Link href="/usability/sources/" className="link-card">
          <h3>🔗 出典・参考資料</h3>
          <p>WCAG・Core Web Vitals・ニールセン原則など、評価軸の一次情報リンク集。</p>
        </Link>
        <Link href="/usability/glossary/" className="link-card">
          <h3>📚 用語集</h3>
          <p>ファインダビリティ・ヒューリスティック評価・Core Web Vitals などUX用語を解説。</p>
        </Link>
        <Link href="/usability/about/" className="link-card">
          <h3>🧭 評価の枠組み</h3>
          <p>ニールセン10原則、IA/ナビ設計のベストプラクティス、配点の考え方と出典。</p>
        </Link>
      </div>
    </>
  );
}

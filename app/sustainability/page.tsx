import Link from "next/link";
import type { Metadata } from "next";
import { categories, totalPoints, allItems } from "@/lib/content/criteria";
import { frameworkIntro } from "@/lib/content/framework";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "サステナビリティ開示サイト 評価基準",
  description:
    "サステナビリティ／ESG開示サイトの評価基準を、使いやすさ・ESG戦略・環境・社会・ガバナンス・独自性のカテゴリ別に解説。",
};

export default function SustainabilityHome() {
  const itemCount = allItems().length;
  return (
    <>
      <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "サステナビリティ開示" }]} />
      <div className="page-head">
        <span className="eyebrow">サステナビリティサイト評価基準</span>
        <h1>サステナビリティ開示サイトの「評価基準」を、体系的に。</h1>
        <p className="lead">
          コーポレートのサステナビリティ／ESG開示サイトは、何をもって「良い」とされるのか。
          使いやすさから環境・社会・ガバナンス開示、独自性まで、
          {categories.length}カテゴリ・{itemCount}項目の評価基準を、良い例・悪い例・出典とともに解説します。
        </p>
      </div>

      <section className="card prose">
        <p style={{ margin: 0 }}>{frameworkIntro}</p>
        <p style={{ margin: "0.8rem 0 0" }}>
          <Link href="/sustainability/about/">→ 評価の枠組み（三層ルーブリック）と出典を見る</Link>
        </p>
      </section>

      <h2 style={{ fontSize: "1.15rem", margin: "2rem 0 1rem" }}>
        評価カテゴリ（合計{totalPoints()}点の重み付け）
      </h2>
      <div className="grid">
        {categories.map((c) => (
          <Link key={c.id} href={`/sustainability/categories/${c.id}/`} className="link-card">
            <h3>
              <span className="cat-letter">{c.id}</span>
              {c.title}
            </h3>
            <p>{c.short}</p>
            <div className="card-meta">
              <span>重み {c.points}</span>
              <span>{c.items.length}項目</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid" style={{ marginTop: "1.5rem" }}>
        <Link href="/sustainability/glossary/" className="link-card">
          <h3>📚 用語集</h3>
          <p>TCFD・マテリアリティ・スキルマトリックスなど、開示でよく使う用語を解説。</p>
        </Link>
        <Link href="/sustainability/about/" className="link-card">
          <h3>🧭 評価の枠組み</h3>
          <p>三層ルーブリックの考え方、配点の目安、出典と免責。</p>
        </Link>
      </div>
    </>
  );
}

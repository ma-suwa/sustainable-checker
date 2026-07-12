import Link from "next/link";
import type { Metadata } from "next";
import { glossary } from "@/lib/content/glossary";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "用語集",
  description:
    "TCFD・マテリアリティ・スキルマトリックス・Scope3・SSBJなど、サステナビリティ開示でよく使われる用語を解説。",
};

export default function GlossaryPage() {
  const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term, "ja"));
  return (
    <>
      <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "サステナビリティ", href: "/sustainability/" }, { label: "用語集" }]} />

      <div className="page-head">
        <span className="eyebrow">用語集</span>
        <h1>サステナビリティ開示 用語集</h1>
        <p className="lead">
          評価基準の解説で参照される用語をまとめています。各基準ページの「関連用語」からもここに来られます。
        </p>
      </div>

      <div className="term-index">
        {sorted.map((t) => (
          <a key={t.slug} href={`#${t.slug}`}>
            {t.term}
          </a>
        ))}
      </div>

      <div>
        {sorted.map((t) => (
          <div key={t.slug} id={t.slug} className="term">
            <h3>
              {t.term}
              {t.reading && <span className="reading">{t.reading}</span>}
            </h3>
            <p>{t.definition}</p>
            {t.relatedCriteria && t.relatedCriteria.length > 0 && (
              <div className="tag-row">
                {t.relatedCriteria.map((cid) => (
                  <Link key={cid} href={`/sustainability/criteria/${cid}/`} className="tag">
                    {cid}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

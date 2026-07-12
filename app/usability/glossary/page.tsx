import Link from "next/link";
import type { Metadata } from "next";
import { uxGlossary } from "@/lib/usability/glossary";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "ユーザビリティ用語集",
  description:
    "ファインダビリティ・ニールセン10原則・WCAG・Core Web Vitals・ファセット検索など、ユーザビリティでよく使われる用語を解説。",
};

export default function UxGlossaryPage() {
  const sorted = [...uxGlossary].sort((a, b) => a.term.localeCompare(b.term, "ja"));
  return (
    <>
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "ユーザビリティ", href: "/usability/" },
          { label: "用語集" },
        ]}
      />

      <div className="page-head">
        <span className="eyebrow">ユーザビリティ用語集</span>
        <h1>ユーザビリティ 用語集</h1>
        <p className="lead">
          評価軸の解説で参照される用語をまとめています。各項目ページの「関連用語」からもここに来られます。
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
                  <Link key={cid} href={`/usability/criteria/${cid}/`} className="tag">
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

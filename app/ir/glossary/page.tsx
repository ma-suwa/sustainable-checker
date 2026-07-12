import Link from "next/link";
import type { Metadata } from "next";
import { irGlossary } from "@/lib/ir/glossary";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "IR用語集",
  description:
    "適時開示（TDnet）・FDルール・スキルマトリックス・資本コスト経営・エクイティストーリーなど、IRサイトでよく使われる用語を解説。",
};

export default function IrGlossaryPage() {
  const sorted = [...irGlossary].sort((a, b) => a.term.localeCompare(b.term, "ja"));
  return (
    <>
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "IRサイト評価", href: "/ir/" },
          { label: "用語集" },
        ]}
      />

      <div className="page-head">
        <span className="eyebrow">IR用語集</span>
        <h1>IRサイト 用語集</h1>
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
                  <Link key={cid} href={`/ir/criteria/${cid}/`} className="tag">
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

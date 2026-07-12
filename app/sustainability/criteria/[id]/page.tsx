import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allItems, getItem } from "@/lib/content/criteria";
import { getTerm } from "@/lib/content/glossary";
import { judgeLabel } from "@/lib/content/labels";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ExampleBox } from "@/components/ExampleBox";

export function generateStaticParams() {
  return allItems().map((it) => ({ id: it.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = getItem(id);
  if (!item) return {};
  return {
    title: `${item.id} ${item.title}`,
    description: item.criteria,
  };
}

export default async function CriteriaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getItem(id);
  if (!item) notFound();

  const related = (item.relatedTerms ?? [])
    .map((slug) => getTerm(slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <>
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" }, { label: "サステナビリティ", href: "/sustainability/" },
          { label: `${item.categoryId}. ${item.categoryTitle}`, href: `/sustainability/categories/${item.categoryId}/` },
          { label: `${item.id} ${item.title}` },
        ]}
      />

      <div className="page-head">
        <span className="eyebrow">
          {item.categoryId} ／ {item.id}・重み {item.points}点
        </span>
        <h1>{item.title}</h1>
        <p className="lead">{item.criteria}</p>
        <div className="tag-row">
          <span className="badge judge">{judgeLabel(item.judgeType)}</span>
          {item.draft && <span className="badge draft">ドラフト（要確認）</span>}
        </div>
      </div>

      {item.background && (
        <section className="section">
          <h2>なぜ重要か</h2>
          <p style={{ margin: 0 }}>{item.background}</p>
        </section>
      )}

      {item.checkpoints && item.checkpoints.length > 0 && (
        <section className="section">
          <h2>評価の見方（チェックポイント）</h2>
          <ul className="checklist">
            {item.checkpoints.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="section">
        <h2>良い例・悪い例</h2>
        <ExampleBox variant="good" items={item.goodExamples} />
        <ExampleBox variant="bad" items={item.badExamples} />
      </section>

      {item.benchmark && (
        <section className="section">
          <h2>ベンチマーク</h2>
          <p style={{ margin: 0 }}>
            {item.benchmark}
            {!item.benchmarkConfirmed && (
              <span className="badge draft" style={{ marginLeft: "0.5rem" }}>
                要確認
              </span>
            )}
          </p>
        </section>
      )}

      {related.length > 0 && (
        <section className="section">
          <h2>関連用語</h2>
          <div className="tag-row">
            {related.map((t) => (
              <Link key={t.slug} href={`/sustainability/glossary/#${t.slug}`} className="tag">
                {t.term}
              </Link>
            ))}
          </div>
        </section>
      )}

      {item.sources && item.sources.length > 0 && (
        <section className="section">
          <h2>出典・参考</h2>
          <ul className="source-list">
            {item.sources.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>
      )}

      <CriteriaPager currentId={item.id} />
    </>
  );
}

function CriteriaPager({ currentId }: { currentId: string }) {
  const items = allItems();
  const idx = items.findIndex((it) => it.id === currentId);
  const prev = idx > 0 ? items[idx - 1] : null;
  const next = idx < items.length - 1 ? items[idx + 1] : null;
  return (
    <div className="pager">
      {prev ? (
        <Link className="prev" href={`/sustainability/criteria/${prev.id}/`}>
          <span className="pager-label">前の基準</span>
          {prev.id} {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link className="next" href={`/sustainability/criteria/${next.id}/`}>
          <span className="pager-label">次の基準</span>
          {next.id} {next.title}
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}

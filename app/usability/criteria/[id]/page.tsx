import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { uxAllItems, getUxItem } from "@/lib/usability/criteria";
import { getUxTerm } from "@/lib/usability/glossary";
import { uxJudgeLabel } from "@/lib/usability/labels";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ExampleBox } from "@/components/ExampleBox";

export function generateStaticParams() {
  return uxAllItems().map((it) => ({ id: it.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = getUxItem(id);
  if (!item) return {};
  return { title: `${item.id} ${item.title}（ユーザビリティ）`, description: item.criteria };
}

export default async function UxCriteriaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getUxItem(id);
  if (!item) notFound();

  const related = (item.relatedTerms ?? [])
    .map((slug) => getUxTerm(slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <>
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "ユーザビリティ", href: "/usability/" },
          { label: `${item.categoryId}. ${item.categoryTitle}`, href: `/usability/categories/${item.categoryId}/` },
          { label: `${item.id} ${item.title}` },
        ]}
      />

      <div className="page-head">
        <span className="eyebrow">
          UX カテゴリ{item.categoryId} ／ {item.id}・配点 {item.points}点
        </span>
        <h1>{item.title}</h1>
        <p className="lead">{item.criteria}</p>
        <div className="tag-row">
          <span className="badge judge">判定手段：{uxJudgeLabel(item.judgeMethod)}</span>
        </div>
      </div>

      {item.background && (
        <section className="section">
          <h2>なぜ重要か</h2>
          <p style={{ margin: 0 }}>{item.background}</p>
        </section>
      )}

      <section className="section">
        <h2>良い例・悪い例</h2>
        <ExampleBox variant="good" items={[item.goodExample]} />
        <ExampleBox variant="bad" items={[item.badExample]} />
      </section>

      {related.length > 0 && (
        <section className="section">
          <h2>関連用語</h2>
          <div className="tag-row">
            {related.map((t) => (
              <Link key={t.slug} href={`/usability/glossary/#${t.slug}`} className="tag">
                {t.term}
              </Link>
            ))}
          </div>
        </section>
      )}

      <UxCriteriaPager currentId={item.id} />
    </>
  );
}

function UxCriteriaPager({ currentId }: { currentId: string }) {
  const items = uxAllItems();
  const idx = items.findIndex((it) => it.id === currentId);
  const prev = idx > 0 ? items[idx - 1] : null;
  const next = idx < items.length - 1 ? items[idx + 1] : null;
  return (
    <div className="pager">
      {prev ? (
        <Link className="prev" href={`/usability/criteria/${prev.id}/`}>
          <span className="pager-label">前の項目</span>
          {prev.id} {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link className="next" href={`/usability/criteria/${next.id}/`}>
          <span className="pager-label">次の項目</span>
          {next.id} {next.title}
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}

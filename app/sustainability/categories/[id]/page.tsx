import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, getCategory } from "@/lib/content/criteria";
import { judgeLabel } from "@/lib/content/labels";
import { Breadcrumb } from "@/components/Breadcrumb";

export function generateStaticParams() {
  return categories.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const cat = getCategory(id);
  if (!cat) return {};
  return {
    title: `${cat.id}. ${cat.title}`,
    description: cat.short,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cat = getCategory(id);
  if (!cat) notFound();

  return (
    <>
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" }, { label: "サステナビリティ", href: "/sustainability/" },
          { label: `${cat.id}. ${cat.title}` },
        ]}
      />

      <div className="page-head">
        <span className="eyebrow">評価カテゴリ {cat.id}・重み {cat.points}</span>
        <h1>{cat.title}</h1>
        <p className="lead">{cat.description}</p>
      </div>

      <div className="criteria-list">
        {cat.items.map((item) => (
          <Link
            key={item.id}
            href={`/sustainability/criteria/${item.id}/`}
            className="criteria-row"
          >
            <div className="row-head">
              <span className="row-id">{item.id}</span>
              <span className="row-title">{item.title}</span>
              <span className="badge points" style={{ marginLeft: "auto" }}>
                {item.points}点
              </span>
              <span className="badge judge">{judgeLabel(item.judgeType)}</span>
              {item.draft && <span className="badge draft">ドラフト</span>}
            </div>
            <p className="row-crit">{item.criteria}</p>
          </Link>
        ))}
      </div>

      <CategoryPager currentId={cat.id} />
    </>
  );
}

function CategoryPager({ currentId }: { currentId: string }) {
  const idx = categories.findIndex((c) => c.id === currentId);
  const prev = idx > 0 ? categories[idx - 1] : null;
  const next = idx < categories.length - 1 ? categories[idx + 1] : null;
  return (
    <div className="pager">
      {prev ? (
        <Link className="prev" href={`/sustainability/categories/${prev.id}/`}>
          <span className="pager-label">前のカテゴリ</span>
          {prev.id}. {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link className="next" href={`/sustainability/categories/${next.id}/`}>
          <span className="pager-label">次のカテゴリ</span>
          {next.id}. {next.title}
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}

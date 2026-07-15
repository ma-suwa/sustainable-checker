import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, getCategory } from "@/lib/content/criteria";
import { toArticle } from "@/lib/content/article";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CriterionArticle } from "@/components/CriterionArticle";
import { Toc } from "@/components/Toc";

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

// カテゴリ配下の全項目を1本の記事として展開する（クリックして潜らずに通し読みできる）。
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cat = getCategory(id);
  if (!cat) notFound();

  const entries = cat.items.map((it) => ({
    id: it.id,
    label: it.title,
    points: it.points,
  }));

  return (
    <>
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "サステナビリティ", href: "/sustainability/" },
          { label: `${cat.id}. ${cat.title}` },
        ]}
      />

      <div className="page-head">
        <span className="eyebrow">
          評価カテゴリ {cat.id}・重み {cat.points}・{cat.items.length}項目
        </span>
        <h1>{cat.title}</h1>
        <p className="lead">{cat.description}</p>
      </div>

      <div className="longform">
        <Toc entries={entries} />
        <div className="longform-body">
          {cat.items.map((item) => (
            <CriterionArticle key={item.id} item={toArticle(item)} />
          ))}
          <CategoryPager currentId={cat.id} />
        </div>
      </div>
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

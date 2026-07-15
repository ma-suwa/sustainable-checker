import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { uxCategories, getUxCategory } from "@/lib/usability/criteria";
import { toUxArticle } from "@/lib/usability/article";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CriterionArticle } from "@/components/CriterionArticle";
import { Toc } from "@/components/Toc";

export function generateStaticParams() {
  return uxCategories.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const cat = getUxCategory(id);
  if (!cat) return {};
  return { title: `${cat.id}. ${cat.title}（ユーザビリティ）`, description: cat.short };
}

// カテゴリ配下の全項目を1本の記事として展開する。
export default async function UxCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cat = getUxCategory(id);
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
          { label: "ユーザビリティ", href: "/usability/" },
          { label: `${cat.id}. ${cat.title}` },
        ]}
      />

      <div className="page-head">
        <span className="eyebrow">
          UX 評価カテゴリ {cat.id}・配点 {cat.points}・{cat.items.length}項目
        </span>
        <h1>{cat.title}</h1>
        <p className="lead">{cat.description}</p>
      </div>

      <div className="longform">
        <Toc entries={entries} />
        <div className="longform-body">
          {cat.items.map((item) => (
            <CriterionArticle key={item.id} item={toUxArticle(item)} />
          ))}
          <UxCategoryPager currentId={cat.id} />
        </div>
      </div>
    </>
  );
}

function UxCategoryPager({ currentId }: { currentId: string }) {
  const idx = uxCategories.findIndex((c) => c.id === currentId);
  const prev = idx > 0 ? uxCategories[idx - 1] : null;
  const next = idx < uxCategories.length - 1 ? uxCategories[idx + 1] : null;
  return (
    <div className="pager">
      {prev ? (
        <Link className="prev" href={`/usability/categories/${prev.id}/`}>
          <span className="pager-label">前のカテゴリ</span>
          {prev.id}. {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link className="next" href={`/usability/categories/${next.id}/`}>
          <span className="pager-label">次のカテゴリ</span>
          {next.id}. {next.title}
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { irCategories, getIrCategory } from "@/lib/ir/criteria";
import { toIrArticle } from "@/lib/ir/article";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CriterionArticle } from "@/components/CriterionArticle";
import { Toc } from "@/components/Toc";

export function generateStaticParams() {
  return irCategories.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const cat = getIrCategory(id);
  if (!cat) return {};
  return { title: `${cat.id}. ${cat.title}（IR）`, description: cat.short };
}

// カテゴリ配下の全項目を1本の記事として展開する。
export default async function IrCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cat = getIrCategory(id);
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
          { label: "IRサイト評価", href: "/ir/" },
          { label: `${cat.id}. ${cat.title}` },
        ]}
      />

      <div className="page-head">
        <span className="eyebrow">
          IR 評価カテゴリ {cat.id}・配点 {cat.points}・{cat.items.length}項目
        </span>
        <h1>{cat.title}</h1>
        <p className="lead">{cat.description}</p>
      </div>

      <div className="longform">
        <Toc entries={entries} />
        <div className="longform-body">
          {cat.items.map((item) => (
            <CriterionArticle key={item.id} item={toIrArticle(item)} />
          ))}
          <IrCategoryPager currentId={cat.id} />
        </div>
      </div>
    </>
  );
}

function IrCategoryPager({ currentId }: { currentId: string }) {
  const idx = irCategories.findIndex((c) => c.id === currentId);
  const prev = idx > 0 ? irCategories[idx - 1] : null;
  const next = idx < irCategories.length - 1 ? irCategories[idx + 1] : null;
  return (
    <div className="pager">
      {prev ? (
        <Link className="prev" href={`/ir/categories/${prev.id}/`}>
          <span className="pager-label">前のカテゴリ</span>
          {prev.id}. {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link className="next" href={`/ir/categories/${next.id}/`}>
          <span className="pager-label">次のカテゴリ</span>
          {next.id}. {next.title}
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}

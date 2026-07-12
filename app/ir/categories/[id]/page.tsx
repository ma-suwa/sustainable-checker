import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { irCategories, getIrCategory } from "@/lib/ir/criteria";
import { irJudgeLabel } from "@/lib/ir/labels";
import { Breadcrumb } from "@/components/Breadcrumb";

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

export default async function IrCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cat = getIrCategory(id);
  if (!cat) notFound();

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
        <span className="eyebrow">IR 評価カテゴリ {cat.id}・配点 {cat.points}</span>
        <h1>{cat.title}</h1>
        <p className="lead">{cat.description}</p>
      </div>

      <div className="criteria-list">
        {cat.items.map((item) => (
          <Link key={item.id} href={`/ir/criteria/${item.id}/`} className="criteria-row">
            <div className="row-head">
              <span className="row-id">{item.id}</span>
              <span className="row-title">{item.title}</span>
              <span className="badge points" style={{ marginLeft: "auto" }}>
                {item.points}点
              </span>
              <span className="badge judge">{irJudgeLabel(item.judgeMethod)}</span>
            </div>
            <p className="row-crit">{item.criteria}</p>
          </Link>
        ))}
      </div>

      <IrCategoryPager currentId={cat.id} />
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

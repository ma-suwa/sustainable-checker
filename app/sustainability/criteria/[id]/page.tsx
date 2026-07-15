import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allItems, getItem } from "@/lib/content/criteria";
import { toArticle } from "@/lib/content/article";
import { judgeLabel } from "@/lib/content/labels";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CriterionArticle } from "@/components/CriterionArticle";

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

// 項目単体のパーマリンク。本文はカテゴリの通し読みページと同じ CriterionArticle を使う。
export default async function CriteriaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getItem(id);
  if (!item) notFound();

  return (
    <>
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "サステナビリティ", href: "/sustainability/" },
          {
            label: `${item.categoryId}. ${item.categoryTitle}`,
            href: `/sustainability/categories/${item.categoryId}/`,
          },
          { label: `${item.id} ${item.title}` },
        ]}
      />

      <div className="page-head">
        <span className="eyebrow">
          {item.categoryId} ／ {item.id}・重み {item.points}点
        </span>
        <h1>{item.title}</h1>
        <div className="tag-row">
          <span className="badge judge">{judgeLabel(item.judgeType)}</span>
          {item.draft && <span className="badge draft">ドラフト（要確認）</span>}
        </div>
      </div>

      <CriterionArticle item={toArticle(item)} standalone />

      <p className="criterion-permalink">
        <Link href={`/sustainability/categories/${item.categoryId}/`}>
          ← {item.categoryId}. {item.categoryTitle} を最初から通して読む
        </Link>
      </p>

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

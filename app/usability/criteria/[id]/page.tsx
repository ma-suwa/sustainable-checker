import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { uxAllItems, getUxItem } from "@/lib/usability/criteria";
import { toUxArticle } from "@/lib/usability/article";
import { uxJudgeLabel } from "@/lib/usability/labels";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CriterionArticle } from "@/components/CriterionArticle";

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
  return {
    title: `${item.id} ${item.title}（ユーザビリティ）`,
    description: item.criteria,
  };
}

// 項目単体のパーマリンク。本文はカテゴリの通し読みページと同じ CriterionArticle を使う。
export default async function UxCriteriaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getUxItem(id);
  if (!item) notFound();

  return (
    <>
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "ユーザビリティ", href: "/usability/" },
          {
            label: `${item.categoryId}. ${item.categoryTitle}`,
            href: `/usability/categories/${item.categoryId}/`,
          },
          { label: `${item.id} ${item.title}` },
        ]}
      />

      <div className="page-head">
        <span className="eyebrow">
          UX カテゴリ{item.categoryId} ／ {item.id}・配点 {item.points}点
        </span>
        <h1>{item.title}</h1>
        <div className="tag-row">
          <span className="badge judge">{uxJudgeLabel(item.judgeMethod)}</span>
        </div>
      </div>

      <CriterionArticle item={toUxArticle(item)} standalone />

      <p className="criterion-permalink">
        <Link href={`/usability/categories/${item.categoryId}/`}>
          ← {item.categoryId}. {item.categoryTitle} を最初から通して読む
        </Link>
      </p>

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

import type { ArticleItem } from "@/components/CriterionArticle";
import { getUxTerm } from "./glossary";
import { uxJudgeLabel } from "./labels";
import type { UxCriteriaItem } from "./types";

// ユーザビリティ編の項目を、通し読みページ／単独ページ共通の記事形式へ正規化する。
export function toUxArticle(item: UxCriteriaItem): ArticleItem {
  return {
    id: item.id,
    title: item.title,
    points: item.points,
    criteria: item.criteria,
    judgeLabel: uxJudgeLabel(item.judgeMethod),
    background: item.background,
    checkpoints: item.checkpoints,
    goodExamples: item.goodExamples,
    badExamples: item.badExamples,
    benchmark: item.benchmark,
    sources: item.sources,
    furtherReading: item.furtherReading,
    relatedTerms: (item.relatedTerms ?? [])
      .map((slug) => getUxTerm(slug))
      .filter((t): t is NonNullable<typeof t> => Boolean(t))
      .map((t) => ({ term: t.term, href: `/usability/glossary/#${t.slug}` })),
    permalink: `/usability/criteria/${item.id}/`,
  };
}

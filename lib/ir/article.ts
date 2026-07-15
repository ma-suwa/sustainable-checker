import type { ArticleItem } from "@/components/CriterionArticle";
import { getIrTerm } from "./glossary";
import { irJudgeLabel } from "./labels";
import type { IrCriteriaItem } from "./types";

// IR編の項目を、通し読みページ／単独ページ共通の記事形式へ正規化する。
export function toIrArticle(item: IrCriteriaItem): ArticleItem {
  return {
    id: item.id,
    title: item.title,
    points: item.points,
    criteria: item.criteria,
    judgeLabel: irJudgeLabel(item.judgeMethod),
    background: item.background,
    checkpoints: item.checkpoints,
    goodExamples: item.goodExamples,
    badExamples: item.badExamples,
    benchmark: item.benchmark,
    sources: item.sources,
    furtherReading: item.furtherReading,
    relatedTerms: (item.relatedTerms ?? [])
      .map((slug) => getIrTerm(slug))
      .filter((t): t is NonNullable<typeof t> => Boolean(t))
      .map((t) => ({ term: t.term, href: `/ir/glossary/#${t.slug}` })),
    permalink: `/ir/criteria/${item.id}/`,
  };
}

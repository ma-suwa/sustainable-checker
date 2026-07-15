import type { ArticleItem } from "@/components/CriterionArticle";
import { getTerm } from "./glossary";
import { judgeLabel } from "./labels";
import type { CriteriaItem } from "./types";

// サステナ編の項目を、通し読みページ／単独ページ共通の記事形式へ正規化する。
export function toArticle(item: CriteriaItem): ArticleItem {
  return {
    id: item.id,
    title: item.title,
    points: item.points,
    criteria: item.criteria,
    judgeLabel: judgeLabel(item.judgeType),
    background: item.background,
    checkpoints: item.checkpoints,
    goodExamples: item.goodExamples,
    badExamples: item.badExamples,
    benchmark: item.benchmark,
    sources: item.sources,
    furtherReading: item.furtherReading,
    relatedTerms: (item.relatedTerms ?? [])
      .map((slug) => getTerm(slug))
      .filter((t): t is NonNullable<typeof t> => Boolean(t))
      .map((t) => ({ term: t.term, href: `/sustainability/glossary/#${t.slug}` })),
    draft: item.draft,
    permalink: `/sustainability/criteria/${item.id}/`,
  };
}

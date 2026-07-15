import Link from "next/link";
import type { Benchmark, Example } from "@/lib/shared/types";
import { ExampleBox } from "./ExampleBox";
import { SourceList } from "./SourceList";

// 1つの評価項目の本文。カテゴリの通し読みページと、項目単体のパーマリンクページの
// 両方から同じものを使う（本文を二重管理しないため）。
// 3領域でフィールド名が微妙に異なるので、各ページ側でこの形に正規化して渡す。
export interface ArticleItem {
  id: string; // "A1" / "1-1"
  title: string;
  points: number;
  criteria: string;
  judgeLabel: string;
  background?: string;
  checkpoints?: string[];
  goodExamples: Example[];
  badExamples: Example[];
  benchmark?: Benchmark;
  sources?: string[];
  furtherReading?: string[];
  relatedTerms?: { term: string; href: string }[];
  draft?: boolean;
  permalink: string; // /sustainability/criteria/A1/
}

export function CriterionArticle({
  item,
  standalone = false,
}: {
  item: ArticleItem;
  // 単体ページでは見出しレベルを上げ、パーマリンク導線は出さない。
  standalone?: boolean;
}) {
  const Heading = standalone ? "h2" : "h3";

  return (
    <article className="criterion" id={item.id}>
      {!standalone && (
        <h2 className="criterion-head">
          <a href={`#${item.id}`} className="anchor" aria-label={`${item.id}へのリンク`}>
            #
          </a>
          <span className="criterion-id">{item.id}</span>
          <span className="criterion-title">{item.title}</span>
          <span className="criterion-badges">
            <span className="badge points">{item.points}点</span>
            <span className="badge judge">{item.judgeLabel}</span>
            {item.draft && <span className="badge draft">ドラフト</span>}
          </span>
        </h2>
      )}

      <p className="criterion-lead">{item.criteria}</p>

      {item.background && (
        <div className="criterion-block">
          <Heading className="criterion-sub">なぜ重要か</Heading>
          <p className="criterion-body">{item.background}</p>
        </div>
      )}

      {item.checkpoints && item.checkpoints.length > 0 && (
        <div className="criterion-block">
          <Heading className="criterion-sub">評価の見方（チェックポイント）</Heading>
          <ul className="checklist">
            {item.checkpoints.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      {(item.goodExamples.length > 0 || item.badExamples.length > 0) && (
        <div className="criterion-block">
          <Heading className="criterion-sub">具体例</Heading>
          <ExampleBox variant="good" items={item.goodExamples} />
          <ExampleBox variant="bad" items={item.badExamples} />
        </div>
      )}

      {item.benchmark && (
        <div className="criterion-block">
          <Heading className="criterion-sub">ベンチマーク（どのくらいの企業ができているか）</Heading>
          <p className="criterion-body benchmark-line">
            {item.benchmark.text}
            {!item.benchmark.confirmed && <span className="badge draft">要確認</span>}
          </p>
          {item.benchmark.confirmed && item.benchmark.source && (
            <SourceList keys={[item.benchmark.source]} label="この数値の出所" />
          )}
        </div>
      )}

      {item.relatedTerms && item.relatedTerms.length > 0 && (
        <div className="criterion-block">
          <Heading className="criterion-sub">関連用語</Heading>
          <div className="tag-row">
            {item.relatedTerms.map((t) => (
              <Link key={t.href} href={t.href} className="tag">
                {t.term}
              </Link>
            ))}
          </div>
        </div>
      )}

      {item.sources && item.sources.length > 0 && (
        <div className="criterion-block">
          <SourceList keys={item.sources} label="この評価軸の出典" />
        </div>
      )}

      {item.furtherReading && item.furtherReading.length > 0 && (
        <div className="criterion-block">
          <SourceList keys={item.furtherReading} label="さらに読む（一次情報）" />
        </div>
      )}

      {!standalone && (
        <p className="criterion-permalink">
          <Link href={item.permalink}>{item.id} を単独ページで開く →</Link>
        </p>
      )}
    </article>
  );
}

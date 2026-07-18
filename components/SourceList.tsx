import Image from "next/image";
import {
  getSources,
  SOURCE_KIND_DESC,
  SOURCE_KIND_LABEL,
  type SourceKind,
  type SourceRef,
} from "@/lib/sources";

// images.unoptimized では next/image が basePath を付けないため、自前で前置きする。
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

// 出典キーの配列を受け取り、発行主体つきのリンク一覧を描く。
// 読者が一次情報にそのまま当たれることを最優先し、必ずリンクを出す。
//
// grouped=true では出典を性格（ランキング／標準／ツール／制度）ごとに見出し分けし、
// 一次情報ページの画面例があれば添える。出典一覧ページ向けの表示。
export function SourceList({
  keys,
  label = "出典",
  grouped = false,
  only,
  headingLevel = 2,
}: {
  keys?: string[];
  label?: string;
  grouped?: boolean;
  // 指定した性格の出典だけを出す（枠組みページで評価機関だけを見せる用途）。
  only?: SourceKind[];
  // 見出しの階層。h2 の節の中に置くときは 3 を渡す（見出しを飛ばさないため）。
  headingLevel?: 2 | 3;
}) {
  const H = headingLevel === 3 ? "h3" : "h2";
  const all = getSources(keys);
  const sources = only
    ? all.filter((s) => s.kind && only.includes(s.kind))
    : all;
  if (sources.length === 0) return null;

  if (!grouped) {
    return (
      <div className="source-block">
        <div className="source-label">{label}</div>
        <ul className="source-list">
          {sources.map((s) => (
            <SourceItem key={s.key} source={s} />
          ))}
        </ul>
      </div>
    );
  }

  const ORDER: SourceKind[] = ["ranking", "guideline", "tool", "regulation"];
  const groups = ORDER.map((kind) => ({
    kind,
    items: sources.filter((s) => s.kind === kind),
  })).filter((g) => g.items.length > 0);

  // kind 未設定のものが出ても落とさない。
  const rest = sources.filter((s) => !s.kind);

  return (
    <>
      {groups.map((g) => (
        <section key={g.kind} className="source-group">
          <H>
            {SOURCE_KIND_LABEL[g.kind]}
            <span className="source-count">{g.items.length}件</span>
          </H>
          <p className="source-group-desc">{SOURCE_KIND_DESC[g.kind]}</p>
          <div className="source-block">
            <ul className="source-list">
              {g.items.map((s) => (
                <SourceItem key={s.key} source={s} withImage />
              ))}
            </ul>
          </div>
        </section>
      ))}
      {rest.length > 0 && (
        <section className="source-group">
          <H>その他</H>
          <div className="source-block">
            <ul className="source-list">
              {rest.map((s) => (
                <SourceItem key={s.key} source={s} withImage />
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

function SourceItem({
  source: s,
  withImage,
}: {
  source: SourceRef;
  withImage?: boolean;
}) {
  const showShot = withImage && s.image;
  return (
    <li className={showShot ? "has-shot" : undefined}>
      <div className="source-main">
        <a href={s.url} target="_blank" rel="noopener noreferrer">
          {s.label}
          <span className="ext" aria-hidden="true">
            ↗
          </span>
        </a>
        <span className="source-org">
          {s.org}
          {s.year && ` ／ ${s.year}`}
        </span>
        {s.note && <p className="source-note">{s.note}</p>}
      </div>
      {showShot && (
        <figure className="ex-figure">
          <div className="shot-frame">
            <div className="shot-bar" aria-hidden="true">
              <span className="shot-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="shot-host">{hostOf(s.url)}</span>
            </div>
            <a href={s.url} target="_blank" rel="noopener noreferrer">
              <Image
                className="ex-shot"
                src={BASE_PATH + s.image!}
                alt={`${s.label}のページ`}
                width={1366}
                height={768}
                unoptimized
              />
            </a>
          </div>
        </figure>
      )}
    </li>
  );
}

function hostOf(url: string): string | undefined {
  try {
    return new URL(url).host;
  } catch {
    return undefined;
  }
}

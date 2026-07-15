import { getSources } from "@/lib/sources";

// 出典キーの配列を受け取り、発行主体つきのリンク一覧を描く。
// 読者が一次情報にそのまま当たれることを最優先し、必ずリンクを出す。
export function SourceList({
  keys,
  label = "出典",
}: {
  keys?: string[];
  label?: string;
}) {
  const sources = getSources(keys);
  if (sources.length === 0) return null;

  return (
    <div className="source-block">
      <div className="source-label">{label}</div>
      <ul className="source-list">
        {sources.map((s) => (
          <li key={s.key}>
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
          </li>
        ))}
      </ul>
    </div>
  );
}

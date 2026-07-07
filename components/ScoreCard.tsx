import type { DiagnosisResult } from "@/lib/types";
import { CategoryBar } from "./CategoryBar";
import { ItemRow } from "./ItemRow";

export function ScoreCard({ result }: { result: DiagnosisResult }) {
  return (
    <div>
      {/* Hero: total score */}
      <div className="card">
        <div className="score-hero">
          <div>
            <div className="score-big">{result.scoreOutOf100}</div>
            <div className="score-sub">/ 100点換算</div>
          </div>
          <div>
            <div>
              合計 <strong>{result.totalScore}</strong> / {result.maxPoints} 点
              （Phase1: A/B/E）
            </div>
            <div className="meta-line">
              入力: {result.inputUrl}
              <br />
              サステナ入口:{" "}
              {result.sustainabilityUrl ? (
                <a href={result.sustainabilityUrl} target="_blank" rel="noreferrer">
                  {result.sustainabilityUrl}
                </a>
              ) : (
                "未検出"
              )}
              {result.clickDepth != null && ` / クリック深度 ${result.clickDepth}`}
              <br />
              判定モデル: {result.model}
            </div>
          </div>
        </div>

        {/* Category bars */}
        <div style={{ marginTop: "1.25rem" }}>
          {result.categories.map((c) => (
            <CategoryBar key={c.id} cat={c} />
          ))}
        </div>

        {result.screenshotDataUrl && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img className="shot" src={result.screenshotDataUrl} alt="サステナビリティトップのファーストビュー" />
        )}
      </div>

      {/* Per-category item detail */}
      {result.categories.map((c) => (
        <div className="card" key={c.id}>
          <h2 className="cat-title">
            <span>
              {c.id}. {c.title}
            </span>
            <span className="item-points">
              {c.score} / {c.maxPoints}
            </span>
          </h2>
          {c.items.map((it) => (
            <ItemRow key={it.id} item={it} />
          ))}
        </div>
      ))}

      {/* Crawl notes + disclaimer */}
      <div className="card">
        {result.crawlNotes.length > 0 && (
          <>
            <strong>クロール時の注記</strong>
            <ul className="notes">
              {result.crawlNotes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </>
        )}
        <p className="notes" style={{ marginTop: "0.75rem" }}>
          {result.disclaimer}
        </p>
      </div>
    </div>
  );
}

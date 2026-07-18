import Image from "next/image";
import type { Example } from "@/lib/shared/types";

// images.unoptimized では next/image が basePath を付けないため、自前で前置きする。
// （_next 配下のCSS/JSには自動で付くので、画像だけ404になり気づきにくい）
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

function assetUrl(src: string): string {
  return src.startsWith("/") ? BASE_PATH + src : src;
}

// 良い例／悪い例を色分けして表示する。
// 実企業の例には社名・URL・確認日を添える（サイトは改修されるため、日付なしで断定しない）。
export function ExampleBox({
  variant,
  items,
}: {
  variant: "good" | "bad";
  items: Example[];
}) {
  if (items.length === 0) return null;
  return (
    <div className={`example ${variant}`}>
      <div className="ex-label">
        {variant === "good" ? "◎ 良い例" : "△ 悪い例・つまずきやすい点"}
      </div>
      <ul className="ex-list">
        {items.map((ex, i) => (
          <li key={i}>
            {ex.company && (
              <span className="ex-company">
                {ex.url ? (
                  <a href={ex.url} target="_blank" rel="noopener noreferrer">
                    {ex.company}
                    <span className="ext" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                ) : (
                  ex.company
                )}
              </span>
            )}
            <span className="ex-text">{ex.text}</span>
            {ex.note && <span className="ex-note">{ex.note}</span>}
            {ex.url && (
              <span className="ex-meta">
                <a href={ex.url} target="_blank" rel="noopener noreferrer">
                  {shortUrl(ex.url)}
                </a>
                {ex.checkedOn && <span className="ex-checked">確認日 {ex.checkedOn}</span>}
              </span>
            )}
            {ex.image && (
              <figure className="ex-figure">
                {ex.url ? (
                  <a href={ex.url} target="_blank" rel="noopener noreferrer">
                    <Image
                      className="ex-shot"
                      src={assetUrl(ex.image.src)}
                      alt={`${ex.company ?? "参考サイト"}の画面例`}
                      width={1366}
                      height={768}
                      unoptimized
                    />
                  </a>
                ) : (
                  <Image
                    className="ex-shot"
                    src={assetUrl(ex.image.src)}
                    alt={`${ex.company ?? "参考サイト"}の画面例`}
                    width={1366}
                    height={768}
                    unoptimized
                  />
                )}
                <figcaption>
                  {ex.image.caption ??
                    `${ex.company ?? ""}の画面例${ex.checkedOn ? `（確認日 ${ex.checkedOn}）` : ""}`}
                </figcaption>
              </figure>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

// 表示用にドメイン＋先頭パスへ短縮する（長いURLで本文が読みにくくなるのを避ける）。
function shortUrl(url: string): string {
  try {
    const u = new URL(url);
    const path = u.pathname.replace(/\/$/, "");
    const shown = path.length > 28 ? path.slice(0, 28) + "…" : path;
    return u.host + shown;
  } catch {
    return url;
  }
}

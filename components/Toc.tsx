"use client";

import { useEffect, useState } from "react";

export interface TocEntry {
  id: string;
  label: string;
  points?: number;
}

// 通し読みページの追従目次。いま読んでいる項目をハイライトする。
// モバイルでは折りたたみ（details）にして、本文の縦の流れを邪魔しない。
export function Toc({ entries }: { entries: TocEntry[] }) {
  const [active, setActive] = useState<string>(entries[0]?.id ?? "");

  useEffect(() => {
    const targets = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (records) => {
        // 画面内に入っている見出しのうち、最も上にあるものを現在地とする。
        const visible = records
          .filter((r) => r.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // ヘッダー分を除いた上部帯に入ったら「現在地」とみなす。
      { rootMargin: "-88px 0px -70% 0px", threshold: 0 },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [entries]);

  const list = (
    <ol className="toc-list">
      {entries.map((e) => (
        <li key={e.id} className={e.id === active ? "toc-item active" : "toc-item"}>
          <a href={`#${e.id}`}>
            <span className="toc-id">{e.id}</span>
            <span className="toc-label">{e.label}</span>
            {e.points !== undefined && <span className="toc-points">{e.points}点</span>}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <nav className="toc" aria-label="このページの目次">
        <p className="toc-head">この記事の項目</p>
        {list}
      </nav>
      <details className="toc-mobile">
        <summary>この記事の項目（{entries.length}件）</summary>
        {list}
      </details>
    </>
  );
}

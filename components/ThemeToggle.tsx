"use client";

import { useEffect, useState } from "react";

// 「OSに従う → ライト → ダーク」を順に切り替える。
// 選択は localStorage に保存し、layout.tsx の先読みスクリプトが描画前に適用する。
type Theme = "system" | "light" | "dark";

const ORDER: Theme[] = ["system", "light", "dark"];

const LABEL: Record<Theme, { icon: string; text: string }> = {
  system: { icon: "🖥", text: "OSに従う" },
  light: { icon: "☀", text: "ライト" },
  dark: { icon: "🌙", text: "ダーク" },
};

export function ThemeToggle() {
  // サーバー描画時は既定値。マウント後に保存値へ合わせる（表示のズレを避けるため）。
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
    setMounted(true);
  }, []);

  function apply(next: Theme) {
    setTheme(next);
    if (next === "system") {
      delete document.documentElement.dataset.theme;
      localStorage.removeItem("theme");
    } else {
      document.documentElement.dataset.theme = next;
      localStorage.setItem("theme", next);
    }
  }

  const label = LABEL[theme];

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => apply(ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length])}
      aria-label={`表示テーマ: ${label.text}（クリックで切り替え）`}
      title={`表示テーマ: ${label.text}`}
      // 未マウント時はサーバー描画と食い違う可能性があるため読み上げから外す
      suppressHydrationWarning
    >
      <span className="tt-icon" aria-hidden="true">
        {mounted ? label.icon : LABEL.system.icon}
      </span>
      <span>{mounted ? label.text : LABEL.system.text}</span>
    </button>
  );
}

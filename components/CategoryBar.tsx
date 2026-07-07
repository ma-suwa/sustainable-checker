import type { CategoryScore } from "@/lib/types";

export function CategoryBar({ cat }: { cat: CategoryScore }) {
  const pct = cat.maxPoints > 0 ? (cat.score / cat.maxPoints) * 100 : 0;
  return (
    <div className="bar-row">
      <span className="bar-label">
        {cat.id}. {cat.title}
      </span>
      <span className="bar-track">
        <span className="bar-fill" style={{ width: `${pct}%` }} />
      </span>
      <span className="bar-num">
        {cat.score} / {cat.maxPoints}
      </span>
    </div>
  );
}

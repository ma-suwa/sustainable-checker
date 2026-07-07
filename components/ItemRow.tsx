import type { ItemScore } from "@/lib/types";
import { GoodBadList } from "./GoodBadList";

const LEVEL_LABEL: Record<ItemScore["level"], string> = {
  good: "満点",
  partial: "一部",
  none: "不十分",
};

export function ItemRow({ item }: { item: ItemScore }) {
  return (
    <div className="item">
      <div className="item-head">
        <span className={`badge ${item.level}`}>{LEVEL_LABEL[item.level]}</span>
        <span className="item-title">
          [{item.id}] {item.title}
        </span>
        {item.notDetected && <span className="badge flag">未検出</span>}
        {item.needsHumanReview && <span className="badge flag">要人的確認</span>}
        <span className="item-points">
          {item.score} / {item.maxPoints}
        </span>
      </div>
      <GoodBadList good={item.good} bad={item.bad} />
      {item.evidenceUrls.length > 0 && (
        <div className="evidence">
          根拠:{" "}
          {item.evidenceUrls.map((u, i) => (
            <span key={i}>
              {i > 0 && " / "}
              <a href={u} target="_blank" rel="noreferrer">
                {u}
              </a>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

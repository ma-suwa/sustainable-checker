// 良い例／悪い例を色分けして表示するボックス。
export function ExampleBox({
  variant,
  items,
}: {
  variant: "good" | "bad";
  items: string[];
}) {
  if (items.length === 0) return null;
  return (
    <div className={`example ${variant}`}>
      <div className="ex-label">{variant === "good" ? "◎ 良い例" : "△ 悪い例"}</div>
      <ul>
        {items.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

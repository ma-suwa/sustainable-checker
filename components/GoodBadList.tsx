export function GoodBadList({ good, bad }: { good: string[]; bad: string[] }) {
  return (
    <>
      {good.length > 0 && (
        <ul className="gb good">
          {good.map((g, i) => (
            <li key={`g${i}`}>◎ {g}</li>
          ))}
        </ul>
      )}
      {bad.length > 0 && (
        <ul className="gb bad">
          {bad.map((b, i) => (
            <li key={`b${i}`}>△ {b}</li>
          ))}
        </ul>
      )}
    </>
  );
}

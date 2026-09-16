const TICKER_ITEMS = [
  { label: "PL", value: "Arsenal 2-1 Chelsea", change: "67'", dir: "up" },
  { label: "LaLiga", value: "Real Madrid 0-0 Barcelona", change: "HT", dir: "neutral" },
  { label: "UCL", value: "Man City 3-0 PSG", change: "FT", dir: "up" },
  { label: "Serie A", value: "Inter 1-1 Juventus", change: "78'", dir: "down" },
  { label: "Bundesliga", value: "Bayern 4-2 Dortmund", change: "FT", dir: "up" },
];

export default function Ticker() {
  return (
    <div className="ticker">
      {TICKER_ITEMS.map((item, i) => (
        <span key={i}>
          <b>{item.label}</b> {item.value}{" "}
          <span className={item.dir}>{item.change}</span>
        </span>
      ))}
    </div>
  );
}

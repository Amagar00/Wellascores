import { getTodayMatches } from "@/lib/football-data";

const LEAGUE_LABELS = {
  "Premier League": "PL",
  "La Liga": "LaLiga",
  "Bundesliga": "BL",
  "Ligue 1": "L1",
  "Serie A": "SA",
  "Saudi Pro League": "SPL",
  "MLS": "MLS",
  "Primeira Liga": "POR",
};

export default async function Ticker() {
  const leagueGroups = await getTodayMatches();

  const items = leagueGroups.flatMap((group) =>
    group.matches.map((m) => ({
      label: LEAGUE_LABELS[group.name] || group.name,
      value: `${m.teams.home.name} ${m.goals.home ?? "-"}-${m.goals.away ?? "-"} ${m.teams.away.name}`,
      change:
        m.fixture.status.short === "FT"
          ? "FT"
          : m.fixture.status.elapsed
          ? `${m.fixture.status.elapsed}'`
          : m.fixture.status.short,
    }))
  );

  if (items.length === 0) {
    return (
      <div className="ticker">
        <span>No live matches today</span>
      </div>
    );
  }

  return (
    <div className="ticker">
      {items.map((item, i) => (
        <span key={i}>
          <b>{item.label}</b> {item.value}{" "}
          <span className="neutral">{item.change}</span>
        </span>
      ))}
    </div>
  );
}

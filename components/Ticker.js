import Link from "next/link";
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

const LIVE = ["1H", "HT", "2H", "ET", "BT", "P", "LIVE", "INT"];

function statusText(f) {
  const s = f.status.short;
  if (LIVE.includes(s)) return s === "HT" ? "HT" : f.status.elapsed ? `${f.status.elapsed}'` : s;
  if (s === "NS") {
    return new Date(f.date).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Africa/Lagos",
    });
  }
  return s;
}

export default async function Ticker() {
  const leagueGroups = await getTodayMatches();

  const items = leagueGroups
    .flatMap((group) =>
      group.matches.map((m) => ({
        id: m.fixture.id,
        label: LEAGUE_LABELS[group.name] || group.name,
        home: m.teams.home.name,
        away: m.teams.away.name,
        score:
          m.goals.home === null || m.goals.away === null
            ? "v"
            : `${m.goals.home}–${m.goals.away}`,
        status: statusText(m.fixture),
      }))
    )
    .slice(0, 24);

  return (
    <Link href="/live-score" className="ps-ticker" aria-label="Live scores">
      {items.length === 0 ? (
        <span>Live scores temporarily unavailable</span>
      ) : (
        items.map((it) => (
          <span key={it.id}>
            <span className="ps-t-st">{it.label}</span> {it.home} <b>{it.score}</b> {it.away}{" "}
            <span className="ps-t-st">{it.status}</span>
          </span>
        ))
      )}
    </Link>
  );
}

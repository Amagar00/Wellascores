 const BASE_URL = "https://v3.football.api-sports.io";

const FEATURED_LEAGUES = [
  { id: 39, name: "Premier League" },
  { id: 140, name: "La Liga" },
  { id: 78, name: "Bundesliga" },
  { id: 61, name: "Ligue 1" },
  { id: 135, name: "Serie A" },
  { id: 307, name: "Saudi Pro League" },
  { id: 253, name: "MLS" },
  { id: 94, name: "Primeira Liga" },
];

export async function getTodayMatches() {
  const today = new Date().toISOString().split("T")[0];
  const url = `${BASE_URL}/fixtures?date=${today}`;

  const res = await fetch(url, {
    headers: { "x-apisports-key": process.env.APIFOOTBALL_KEY },
    cache: "no-store",
  });

  const bodyText = await res.text();

  if (!res.ok) {
    return [{ id: "debug", name: `DEBUG: status ${res.status} — ${bodyText.slice(0, 300)}`, matches: [] }];
  }

  let data;
  try {
    data = JSON.parse(bodyText);
  } catch {
    return [{ id: "debug", name: `DEBUG: bad JSON — ${bodyText.slice(0, 300)}`, matches: [] }];
  }

  const allMatches = data.response || [];

  if (allMatches.length === 0) {
    return [{ id: "debug", name: `DEBUG: status 200, 0 total matches returned, date=${today}, results=${data.results}, errors=${JSON.stringify(data.errors)}`, matches: [] }];
  }

  const grouped = FEATURED_LEAGUES.map((league) => ({
    ...league,
    matches: allMatches.filter((m) => m.league.id === league.id),
  })).filter((group) => group.matches.length > 0);

  return grouped;
}

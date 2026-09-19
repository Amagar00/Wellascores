const BASE_URL = "https://v3.football.api-sports.io";

// Priority order — leagues appear on the page in this sequence
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

  if (!res.ok) {
    console.error("API-Football error:", res.status, await res.text());
    return [];
  }

  const data = await res.json();
  const allMatches = data.response || [];

  // Group into our featured leagues only, in priority order
  const grouped = FEATURED_LEAGUES.map((league) => ({
    ...league,
    matches: allMatches.filter((m) => m.league.id === league.id),
  })).filter((group) => group.matches.length > 0);

  return grouped;
}

const BASE_URL = "https://api.football-data.org/v4";

export async function getTodayMatches() {
  const today = new Date().toISOString().split("T")[0];

  const res = await fetch(
    `${BASE_URL}/matches?dateFrom=${today}&dateTo=${today}`,
    {
      headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_TOKEN },
      next: { revalidate: 60 }, // refresh every 60s
    }
  );

  if (!res.ok) {
    console.error("football-data.org error:", res.status);
    return [];
  }

  const data = await res.json();
  return data.matches || [];
}

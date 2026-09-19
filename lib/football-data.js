const BASE_URL = "https://api.football-data.org/v4";

export async function getTodayMatches() {
  const today = new Date().toISOString().split("T")[0];
  const url = `${BASE_URL}/matches?dateFrom=${today}&dateTo=${today}`;

  console.log("football-data.org request:", url);
  console.log("Token present:", Boolean(process.env.FOOTBALL_DATA_TOKEN));

  const res = await fetch(url, {
    headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_TOKEN },
    cache: "no-store",
  });

  console.log("football-data.org response status:", res.status);

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("football-data.org error body:", errorBody);
    return [];
  }

  const data = await res.json();
  console.log("football-data.org matches count:", data.matches?.length ?? 0);

  return data.matches || [];
}

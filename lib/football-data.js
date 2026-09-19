const BASE_URL = "https://v3.football.api-sports.io";

export async function getTodayMatches() {
  const today = new Date().toISOString().split("T")[0];
  const url = `${BASE_URL}/fixtures?date=${today}`;

  console.log("API-Football request:", url);
  console.log("Key present:", Boolean(process.env.APIFOOTBALL_KEY));

  const res = await fetch(url, {
    headers: {
      "x-apisports-key": process.env.APIFOOTBALL_KEY,
    },
    cache: "no-store",
  });

  console.log("API-Football response status:", res.status);

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("API-Football error body:", errorBody);
    return [];
  }

  const data = await res.json();
  console.log("API-Football matches count:", data.response?.length ?? 0);

  return data.response || [];
}

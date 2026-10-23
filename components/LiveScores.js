const LIVE = ["1H", "HT", "2H", "ET", "BT", "P", "LIVE", "INT"];
const DONE = ["FT", "AET", "PEN", "AWD", "WO"];

function Status({ fixture }) {
  const s = fixture.status.short;
  if (LIVE.includes(s)) {
    const label = s === "HT" ? "HT" : fixture.status.elapsed ? `${fixture.status.elapsed}'` : s;
    return (
      <span className="ps-st live">
        <i /> {label}
      </span>
    );
  }
  if (DONE.includes(s)) return <span className="ps-st">{s}</span>;
  if (s === "NS" || s === "TBD") {
    const t = new Date(fixture.date).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Africa/Lagos",
    });
    return <span className="ps-st">{t} WAT</span>;
  }
  return <span className="ps-st">{fixture.status.long}</span>;
}

export default function LiveScores({ leagueGroups }) {
  if (!leagueGroups || leagueGroups.length === 0) {
    return <p className="ps-empty">Live scores are temporarily unavailable — check back soon.</p>;
  }

  return (
    <div>
      {leagueGroups.map((group) => (
        <section key={group.id} className="ps-block">
          <div className="ps-sec">
            <h2>{group.name}</h2>
          </div>
          <div className="ps-grid">
            {group.matches.map((m) => (
              <div key={m.fixture.id} className="ps-score">
                <div className="ps-lg">{m.league.name}</div>
                <Status fixture={m.fixture} />
                <div className="ps-teams">
                  <div className="ps-tm">
                    <span title={m.teams.home.name}>{m.teams.home.name}</span>
                    <b>{m.goals.home ?? "–"}</b>
                  </div>
                  <div className="ps-tm">
                    <span title={m.teams.away.name}>{m.teams.away.name}</span>
                    <b>{m.goals.away ?? "–"}</b>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default function LiveScores({ matches }) {
  if (!matches || matches.length === 0) {
    return <p style={{ opacity: 0.6 }}>No matches today.</p>;
  }

  return (
    <div className="live-scores-list">
      {matches.map((m) => (
        <div key={m.fixture.id} className="live-score-item">
          <div className="competition" style={{ fontSize: "0.8rem", opacity: 0.6 }}>
            {m.league.name} — {m.league.country}
          </div>
          <div className="match-row" style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{m.teams.home.name}</span>
            <span>{m.goals.home ?? "-"} : {m.goals.away ?? "-"}</span>
            <span>{m.teams.away.name}</span>
          </div>
          <div className="status" style={{ fontSize: "0.75rem", opacity: 0.5 }}>
            {m.fixture.status.long}
            {m.fixture.status.elapsed ? ` (${m.fixture.status.elapsed}')` : ""}
          </div>
        </div>
      ))}
    </div>
  );
            }

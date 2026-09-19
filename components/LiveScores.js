export default function LiveScores({ leagueGroups }) {
  if (!leagueGroups || leagueGroups.length === 0) {
    return <p style={{ opacity: 0.6 }}>No matches today in the top leagues.</p>;
  }

  return (
    <div className="live-scores-list">
      {leagueGroups.map((group) => (
        <div key={group.id} style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>{group.name}</h3>
          {group.matches.map((m) => (
            <div key={m.fixture.id} style={{ marginBottom: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{m.teams.home.name}</span>
                <span>{m.goals.home ?? "-"} : {m.goals.away ?? "-"}</span>
                <span>{m.teams.away.name}</span>
              </div>
              <div style={{ fontSize: "0.75rem", opacity: 0.5 }}>
                {m.fixture.status.long}
                {m.fixture.status.elapsed ? ` (${m.fixture.status.elapsed}')` : ""}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

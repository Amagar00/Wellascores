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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span
                  title={m.teams.home.name}
                  style={{
                    flex: "1 1 0",
                    minWidth: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    textAlign: "right",
                  }}
                >
                  {m.teams.home.name}
                </span>
                <span
                  style={{
                    flex: "0 0 auto",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  {m.goals.home ?? "-"} : {m.goals.away ?? "-"}
                </span>
                <span
                  title={m.teams.away.name}
                  style={{
                    flex: "1 1 0",
                    minWidth: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    textAlign: "left",
                  }}
                >
                  {m.teams.away.name}
                </span>
              </div>
              <div style={{ fontSize: "0.75rem", opacity: 0.5, textAlign: "center" }}>
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

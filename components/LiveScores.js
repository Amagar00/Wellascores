export default function LiveScores({ matches }) {
  if (!matches || matches.length === 0) {
    return <p style={{ opacity: 0.6 }}>No matches today.</p>;
  }

  return (
    <div className="live-scores-list">
      {matches.map((m) => (
        <div key={m.id} className="live-score-item">
          <div className="competition" style={{ fontSize: "0.8rem", opacity: 0.6 }}>
            {m.competition.name}
          </div>
          <div className="match-row" style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{m.homeTeam.shortName || m.homeTeam.name}</span>
            <span>{m.score.fullTime.home ?? "-"} : {m.score.fullTime.away ?? "-"}</span>
            <span>{m.awayTeam.shortName || m.awayTeam.name}</span>
          </div>
          <div className="status" style={{ fontSize: "0.75rem", opacity: 0.5 }}>{m.status}</div>
        </div>
      ))}
    </div>
  );
}

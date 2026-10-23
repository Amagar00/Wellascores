import PlayerTile from "./PlayerTile";
import { getPlayers } from "@/lib/players";
import { optimize } from "@/lib/img";

export default async function RisingPlayers() {
  let players = [];
  try {
    players = await getPlayers();
  } catch (e) {
    // If the Firestore rules for /players aren't published yet, the rest of the homepage must still work
    console.error("players:", e);
  }
  if (players.length === 0) return null;

  return (
    <section className="ps-block">
      <div className="ps-sec">
        <h2>Top Rising Players</h2>
        <span className="ps-hint">Tap a card</span>
      </div>
      <div className="ps-players">
        {players.slice(0, 12).map((p) => (
          <PlayerTile key={p.id} player={p} img={p.image ? optimize(p.image, 400) : null} />
        ))}
      </div>
    </section>
  );
}

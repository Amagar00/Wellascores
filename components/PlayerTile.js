"use client";

import { useState } from "react";
import { gradientStyle, initials } from "@/lib/thumb";

export default function PlayerTile({ player, img }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      className={`ps-pl${flipped ? " flip" : ""}`}
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={`${player.name}, ${player.club}. Tap to ${flipped ? "hide" : "see"} details`}
    >
      <span className="ps-pl-in">
        <span
          className="ps-pl-face ps-pl-front"
          style={img ? undefined : gradientStyle(player.name)}
        >
          {img ? (
            <img className="ps-img" src={img} alt="" loading="lazy" decoding="async" />
          ) : (
            <span className="ps-ini" aria-hidden="true">
              {initials(player.name)}
            </span>
          )}
          <span className="ps-pl-cap">
            <strong>{player.name}</strong>
            <small>{player.club}</small>
          </span>
        </span>
        <span className="ps-pl-face ps-pl-back">
          <strong>{player.name}</strong>
          <span>
            {player.position}
            {player.age ? ` · ${player.age}` : ""}
          </span>
          {player.stat ? <em>{player.stat}</em> : null}
        </span>
      </span>
    </button>
  );
}

// Helpers for card thumbnails, player tiles and dates

function hueOf(s = "") {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 360;
  return h;
}

// Fallback look when a story or player has no image: a colour made from the title
export function gradientStyle(text) {
  const h = hueOf(text || "");
  return {
    background: `linear-gradient(160deg,hsl(${h} 55% 38%),hsl(${(h + 40) % 360} 60% 18%))`,
  };
}

export function initials(title = "") {
  return title
    .split(/\s+/)
    .map((w) => (w.match(/[A-Za-z0-9]/) || [""])[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function fmtDate(d) {
  if (!d) return "";
  const date = new Date(d);
  if (isNaN(date)) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

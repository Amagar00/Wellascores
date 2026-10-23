"use client";

import { useEffect, useState } from "react";

// desktop / mobile: { key, width, height } (mobile may be null = show nothing on phones)
export default function AdBanner({ desktop, mobile }) {
  const [unit, setUnit] = useState(null);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)").matches;
    setUnit(wide ? desktop : mobile);
  }, [desktop, mobile]);

  if (!unit || !unit.key) return null;

  // Each ad lives in its own iframe so units on the same page can't overwrite each other's settings
  const html = `<!DOCTYPE html><html><head><style>body{margin:0;padding:0;overflow:hidden}</style></head><body>
<script>atOptions={'key':'${unit.key}','format':'iframe','height':${unit.height},'width':${unit.width},'params':{}};</script>
<script src="https://bauval.org/22/${unit.key}"></script>
</body></html>`;

  return (
    <iframe
      title="Advertisement"
      width={unit.width}
      height={unit.height}
      scrolling="no"
      loading="lazy"
      srcDoc={html}
      style={{ border: "none", overflow: "hidden", maxWidth: "100%" }}
    />
  );
}

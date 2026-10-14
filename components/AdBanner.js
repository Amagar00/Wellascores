"use client";

import { useEffect, useRef } from "react";

export default function AdBanner({ dataKey, width, height }) {
  const bannerRef = useRef(null);

  useEffect(() => {
    if (!bannerRef.current) return;
    bannerRef.current.innerHTML = "";

    const conf = document.createElement("script");
    conf.type = "text/javascript";
    conf.innerHTML = `
      atOptions = {
        'key' : '${dataKey}',
        'format' : 'iframe',
        'height' : ${height},
        'width' : ${width},
        'params' : {}
      };
    `;

    const invoke = document.createElement("script");
    invoke.type = "text/javascript";
    invoke.src = `//www.highperformanceformat.com/${dataKey}/invoke.js`;

    bannerRef.current.appendChild(conf);
    bannerRef.current.appendChild(invoke);
  }, [dataKey, width, height]);

  return <div ref={bannerRef} style={{ display: "flex", justifyContent: "center" }} />;
}

 "use client";

import { useRef, useEffect } from "react";

export default function AdBanner({ dataKey, width, height }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>body{margin:0;padding:0;}</style>
        </head>
        <body>
          <script>
            atOptions = {
              'key' : '${dataKey}',
              'format' : 'iframe',
              'height' : ${height},
              'width' : ${width},
              'params' : {}
            };
          </script>
          <script src="https://bauval.org/22/${dataKey}"></script>
        </body>
      </html>
    `;

    iframeRef.current.srcdoc = html;
  }, [dataKey, width, height]);

  return (
    <iframe
      ref={iframeRef}
      title={`ad-${dataKey}`}
      width={width}
      height={height}
      style={{ border: "none", overflow: "hidden", maxWidth: "100%" }}
      scrolling="no"
    />
  );
}

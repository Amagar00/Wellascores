// Serves Cloudinary images at a sensible size. Animated GIF/WebP files keep their animation
// (we only let Cloudinary convert the format of ordinary JPG/PNG pictures).
export function optimize(url, width = 800) {
  if (typeof url !== "string" || !url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }
  const still = /\.(jpe?g|png)(\?.*)?$/i.test(url);
  const t = still ? `f_auto,q_auto,w_${width},c_limit` : `q_auto,w_${width},c_limit`;
  return url.replace("/upload/", `/upload/${t}/`);
}

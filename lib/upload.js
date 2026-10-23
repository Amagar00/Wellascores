const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const MAX_MB = 8;
const OK_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function uploadImage(file) {
  if (!CLOUD || !PRESET) {
    throw new Error("Image upload isn't set up yet (the Cloudinary settings are missing in Vercel).");
  }
  if (!OK_TYPES.includes(file.type)) {
    throw new Error("Please choose a JPG, PNG, WebP or GIF image.");
  }
  if (file.size > MAX_MB * 1024 * 1024) {
    throw new Error(`That file is over ${MAX_MB} MB. Please use a smaller one.`);
  }

  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", PRESET);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, {
    method: "POST",
    body,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.secure_url) {
    throw new Error((data && data.error && data.error.message) || "Upload failed. Please try again.");
  }
  return data.secure_url;
}

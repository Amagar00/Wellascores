"use client";

import { useRef, useState } from "react";
import { uploadImage } from "@/lib/upload";
import { optimize } from "@/lib/img";

export default function ImageUpload({ value, onChange, label = "Image" }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (err) {
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div style={{ marginBottom: "1rem" }}>
      <span style={{ display: "block", marginBottom: 6 }}>{label}</span>

      {value ? (
        <div style={{ marginBottom: 10 }}>
          <img
            src={optimize(value, 400)}
            alt=""
            style={{ width: 240, maxWidth: "100%", borderRadius: 8, display: "block", marginBottom: 8 }}
          />
          <button type="button" onClick={() => onChange("")}>
            Remove image
          </button>
        </div>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFile}
        disabled={busy}
      />
      {busy ? <p style={{ margin: "6px 0 0" }}>Uploading…</p> : null}
      {error ? <p style={{ margin: "6px 0 0", color: "#b3261e" }}>{error}</p> : null}

      <input
        type="url"
        placeholder="…or paste an image link"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        style={{ marginTop: 10 }}
      />
    </div>
  );
}

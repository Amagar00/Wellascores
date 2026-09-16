"use client";

import { useState } from "react";
import { categories, slugify } from "@/lib/articles";

export default function ArticleForm({ initial, onSubmit, submitLabel }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [slugTouched, setSlugTouched] = useState(!!initial?.slug);
  const [category, setCategory] = useState(
    initial?.category || categories[0].slug
  );
  const [excerpt, setExcerpt] = useState(initial?.excerpt || "");
  const [date, setDate] = useState(
    initial?.date || new Date().toISOString().slice(0, 10)
  );
  const [tagLabel, setTagLabel] = useState(initial?.tag?.label || "");
  const [tagType, setTagType] = useState(initial?.tag?.type || "neutral");
  const [body, setBody] = useState(
    initial?.body ? initial.body.join("\n\n") : ""
  );
  const [saving, setSaving] = useState(false);

  function handleTitleChange(value) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    const data = {
      title,
      slug: slug || slugify(title),
      category,
      excerpt,
      date,
      tag: tagLabel ? { label: tagLabel, type: tagType } : null,
      body: body
        .split("\n\n")
        .map((p) => p.trim())
        .filter(Boolean),
    };
    await onSubmit(data);
    setSaving(false);
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <label>
        Title
        <input
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
        />
      </label>

      <label>
        URL slug
        <input
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugTouched(true);
          }}
          required
        />
      </label>

      <label>
        Category
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Excerpt (shown in article lists)
        <input
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
        />
      </label>

      <label>
        Date
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>

      <div className="admin-form-row">
        <label>
          Tag label (optional)
          <input
            value={tagLabel}
            onChange={(e) => setTagLabel(e.target.value)}
            placeholder="e.g. Beginner friendly"
          />
        </label>
        <label>
          Tag color
          <select value={tagType} onChange={(e) => setTagType(e.target.value)}>
            <option value="neutral">Neutral (rust)</option>
            <option value="pos">Positive (green)</option>
          </select>
        </label>
      </div>

      <label>
        Body — separate paragraphs with a blank line
        <textarea
          rows={14}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </label>

      <button type="submit" disabled={saving}>
        {saving ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

"use client";

import { useState, useEffect } from "react";
import {
  getReactions,
  incrementReaction,
  getComments,
  addComment,
} from "@/lib/articles";

const REACTIONS = [
  { type: "like", emoji: "👍" },
  { type: "dislike", emoji: "👎" },
  { type: "clap", emoji: "👏" },
  { type: "love", emoji: "❤️" },
  { type: "heartbreak", emoji: "💔" },
  { type: "laugh", emoji: "😁" },
  { type: "angry", emoji: "😡" },
];

export default function ArticleEngagement({ articleId }) {
  const [counts, setCounts] = useState({});
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getReactions(articleId).then(setCounts);
    getComments(articleId).then(setComments);
  }, [articleId]);

  async function handleReact(type) {
    setCounts((prev) => ({ ...prev, [type]: (prev[type] || 0) + 1 }));
    await incrementReaction(articleId, type);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitting(true);
    await addComment(articleId, {
      name: name.trim() || "Anonymous",
      text: text.trim(),
    });
    setText("");
    const updated = await getComments(articleId);
    setComments(updated);
    setSubmitting(false);
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        {REACTIONS.map((r) => (
          <button
            key={r.type}
            onClick={() => handleReact(r.type)}
            style={{
              border: "1px solid #ccc",
              borderRadius: "999px",
              padding: "0.25rem 0.75rem",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            {r.emoji} {counts[r.type] || 0}
          </button>
        ))}
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3 style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>Comments</h3>

        <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ display: "block", width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
          />
          <textarea
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            style={{ display: "block", width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
          />
          <button type="submit" disabled={submitting}>
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </form>

        {comments.length === 0 && (
          <p style={{ opacity: 0.6 }}>No comments yet — be the first.</p>
        )}

        {comments.map((c) => (
          <div
            key={c.id}
            style={{ marginBottom: "1rem", borderBottom: "1px solid #eee", paddingBottom: "0.75rem" }}
          >
            <strong>{c.name}</strong>
            <div style={{ fontSize: "0.75rem", opacity: 0.5 }}>
              {new Date(c.date).toLocaleString()}
            </div>
            <p>{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
  }

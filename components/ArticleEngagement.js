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
  const [error, setError] = useState("");

  useEffect(() => {
    getReactions(articleId).then(setCounts).catch((e) => console.error("reactions:", e));
    getComments(articleId).then(setComments).catch((e) => console.error("comments:", e));
  }, [articleId]);

  async function handleReact(type) {
    setCounts((prev) => ({ ...prev, [type]: (prev[type] || 0) + 1 }));
    try {
      await incrementReaction(articleId, type);
    } catch (e) {
      console.error("react:", e);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      await addComment(articleId, {
        name: name.trim() || "Anonymous",
        text: text.trim(),
      });
      setText("");
      setComments(await getComments(articleId));
    } catch (err) {
      console.error("comment:", err);
      setError("Sorry, your comment could not be posted. Please try again.");
    }
    setSubmitting(false);
  }

  return (
    <div className="ps-eng">
      <div className="ps-react">
        {REACTIONS.map((r) => (
          <button key={r.type} className="ps-pill" onClick={() => handleReact(r.type)}>
            {r.emoji} {counts[r.type] || 0}
          </button>
        ))}
      </div>

      <h3>Comments</h3>

      <form onSubmit={handleSubmit}>
        <input
          className="ps-input"
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="ps-input"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
        />
        <button className="ps-btn" type="submit" disabled={submitting}>
          {submitting ? "Posting..." : "Post Comment"}
        </button>
        {error ? <p className="ps-note" style={{ marginTop: 10 }}>{error}</p> : null}
      </form>

      <div style={{ marginTop: 18 }}>
        {comments.length === 0 && <p className="ps-note">No comments yet — be the first.</p>}
        {comments.map((c) => (
          <div key={c.id} className="ps-comment">
            <strong>{c.name}</strong>
            <small>{new Date(c.date).toLocaleString()}</small>
            <p>{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

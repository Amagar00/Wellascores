"use client";

import { useState } from "react";
import { submitContactMessage } from "@/lib/contact";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      await submitContactMessage({
        name: name.trim() || "Anonymous",
        email: email.trim(),
        message: message.trim(),
      });
      setName("");
      setEmail("");
      setMessage("");
      setSent(true);
    } catch (err) {
      console.error("contact:", err);
      setError("Sorry, your message could not be sent. Please try again.");
    }
    setSubmitting(false);
  }

  if (sent) {
    return (
      <p className="ps-note" style={{ marginTop: 20 }}>
        Thanks — your message has been sent. We&apos;ll get back to you if a reply is needed.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20, maxWidth: 480 }}>
      <input
        className="ps-input"
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="ps-input"
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <textarea
        className="ps-input"
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={5}
        required
      />
      <button className="ps-btn" type="submit" disabled={submitting}>
        {submitting ? "Sending..." : "Send Message"}
      </button>
      {error ? <p className="ps-note" style={{ marginTop: 10 }}>{error}</p> : null}
    </form>
  );
}

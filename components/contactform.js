"use client";

import { useState } from "react";
import { submitContactMessage } from "@/lib/contact";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitting(true);
    await submitContactMessage({
      name: name.trim() || "Anonymous",
      email: email.trim(),
      message: message.trim(),
    });
    setName("");
    setEmail("");
    setMessage("");
    setSubmitting(false);
    setSent(true);
  }

  if (sent) {
    return (
      <p style={{ marginTop: "1.5rem" }}>
        Thanks — your message has been sent. We'll get back to you if a
        reply is needed.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1.5rem", maxWidth: "480px" }}>
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "0.75rem", padding: "0.5rem" }}
      />
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ display: "block", width: "100%", marginBottom: "0.75rem", padding: "0.5rem" }}
      />
      <textarea
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={5}
        required
        style={{ display: "block", width: "100%", marginBottom: "0.75rem", padding: "0.5rem" }}
      />
      <button type="submit" disabled={submitting}>
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

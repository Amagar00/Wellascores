"use client";

import { useEffect, useState } from "react";
import { useAdminAuth } from "@/lib/useAdminAuth";
import {
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
} from "@/lib/players";
import AdminNav from "@/components/AdminNav";
import ImageUpload from "@/components/ImageUpload";

const EMPTY = { name: "", club: "", position: "", age: "", stat: "", order: "", image: "" };

export default function AdminPlayersPage() {
  const { user, loading } = useAdminAuth();
  const [players, setPlayers] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) loadPlayers();
  }, [user]);

  async function loadPlayers() {
    setFetching(true);
    try {
      setPlayers(await getPlayers());
    } catch (e) {
      console.error(e);
      setError("Could not load players. Check that your Firestore rules include the /players block.");
    }
    setFetching(false);
  }

  function setField(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function startEdit(p) {
    setEditingId(p.id);
    setForm({
      name: p.name,
      club: p.club,
      position: p.position,
      age: p.age ? String(p.age) : "",
      stat: p.stat,
      order: String(p.order === 999 ? "" : p.order),
      image: p.image,
    });
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY);
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const data = {
      name: form.name.trim(),
      club: form.club.trim(),
      position: form.position.trim(),
      age: form.age ? Number(form.age) : null,
      stat: form.stat.trim(),
      order: form.order === "" ? players.length + 1 : Number(form.order),
      image: form.image || null,
    };
    try {
      if (editingId) await updatePlayer(editingId, data);
      else await createPlayer(data);
      cancelEdit();
      await loadPlayers();
    } catch (err) {
      console.error(err);
      setError("Could not save. Check that your Firestore rules allow writing to /players.");
    }
    setSaving(false);
  }

  async function handleDelete(p) {
    if (!confirm(`Delete "${p.name}"? This can't be undone.`)) return;
    try {
      await deletePlayer(p.id);
      if (editingId === p.id) cancelEdit();
      await loadPlayers();
    } catch (err) {
      console.error(err);
      setError("Could not delete that player.");
    }
  }

  if (loading) return <p className="admin-status">Loading...</p>;
  if (!user) return null;

  return (
    <>
      <AdminNav />
      <div className="admin-page">
        <h1 className="serif">Top Rising Players</h1>
        <p className="admin-status">
          These show as flip cards on the homepage (first 12, lowest order number first).
        </p>

        <form className="admin-form" onSubmit={handleSubmit}>
          <label>
            Player name
            <input value={form.name} onChange={(e) => setField("name", e.target.value)} required />
          </label>
          <label>
            Club
            <input value={form.club} onChange={(e) => setField("club", e.target.value)} required />
          </label>
          <div className="admin-form-row">
            <label>
              Position
              <input
                value={form.position}
                onChange={(e) => setField("position", e.target.value)}
                placeholder="e.g. Winger"
              />
            </label>
            <label>
              Age
              <input
                type="number"
                min="14"
                max="40"
                value={form.age}
                onChange={(e) => setField("age", e.target.value)}
              />
            </label>
          </div>
          <label>
            One-line stat (shown on the back of the card)
            <input
              value={form.stat}
              onChange={(e) => setField("stat", e.target.value)}
              placeholder="e.g. 7 goals in 9 league games"
            />
          </label>
          <label>
            Order (1 shows first; leave blank to add at the end)
            <input
              type="number"
              min="1"
              value={form.order}
              onChange={(e) => setField("order", e.target.value)}
            />
          </label>

          <ImageUpload
            value={form.image}
            onChange={(url) => setField("image", url)}
            label="Player image (illustration or avatar — optional)"
          />

          {error ? <p className="admin-status">{error}</p> : null}

          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : editingId ? "Save changes" : "Add player"}
          </button>
          {editingId ? (
            <button type="button" className="admin-link-btn" onClick={cancelEdit}>
              Cancel editing
            </button>
          ) : null}
        </form>

        {fetching && <p className="admin-status">Loading players...</p>}
        {!fetching && players.length === 0 && (
          <p className="admin-status">No players yet. Add your first one above.</p>
        )}

        <table className="admin-table">
          <tbody>
            {players.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="admin-table-title">{p.name}</div>
                  <div className="admin-table-meta">
                    {p.club}
                    {p.position ? ` · ${p.position}` : ""}
                    {p.age ? ` · ${p.age}` : ""}
                  </div>
                </td>
                <td className="admin-table-actions">
                  <button className="admin-link-btn" onClick={() => startEdit(p)}>
                    Edit
                  </button>
                  <button className="admin-link-btn admin-danger" onClick={() => handleDelete(p)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

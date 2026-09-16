"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAdminAuth } from "@/lib/useAdminAuth";
import { getAllArticles, deleteArticle, getCategory } from "@/lib/articles";
import AdminNav from "@/components/AdminNav";

export default function AdminDashboard() {
  const { user, loading } = useAdminAuth();
  const [articles, setArticles] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (user) loadArticles();
  }, [user]);

  async function loadArticles() {
    setFetching(true);
    const all = await getAllArticles();
    setArticles(all);
    setFetching(false);
  }

  async function handleDelete(id, title) {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return;
    await deleteArticle(id);
    loadArticles();
  }

  if (loading) return <p className="admin-status">Loading...</p>;
  if (!user) return null;

  return (
    <>
      <AdminNav />
      <div className="admin-page">
        <h1 className="serif">Articles</h1>

        {fetching && <p className="admin-status">Loading articles...</p>}

        {!fetching && articles.length === 0 && (
          <p className="admin-status">
            No articles yet. Tap &quot;New Article&quot; to add your first one.
          </p>
        )}

        <table className="admin-table">
          <tbody>
            {articles.map((a) => {
              const cat = getCategory(a.category);
              return (
                <tr key={a.id}>
                  <td>
                    <div className="admin-table-title">{a.title}</div>
                    <div className="admin-table-meta">
                      {cat?.label || a.category} · {a.date}
                    </div>
                  </td>
                  <td className="admin-table-actions">
                    <Link href={`/admin/edit/${a.id}`}>Edit</Link>
                    <button
                      className="admin-link-btn admin-danger"
                      onClick={() => handleDelete(a.id, a.title)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

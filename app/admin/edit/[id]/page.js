"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/lib/useAdminAuth";
import { getArticleById, updateArticle, deleteArticle } from "@/lib/articles";
import AdminNav from "@/components/AdminNav";
import ArticleForm from "@/components/ArticleForm";

export default function EditArticlePage({ params }) {
  const { user, loading } = useAdminAuth();
  const [article, setArticle] = useState(null);
  const [fetching, setFetching] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user) loadArticle();
  }, [user]);

  async function loadArticle() {
    const a = await getArticleById(params.id);
    setArticle(a);
    setFetching(false);
  }

  async function handleUpdate(data) {
    await updateArticle(params.id, data);
    router.push("/admin");
  }

  async function handleDelete() {
    if (!confirm(`Delete "${article.title}"? This can't be undone.`)) return;
    await deleteArticle(params.id);
    router.push("/admin");
  }

  if (loading || fetching) return <p className="admin-status">Loading...</p>;
  if (!user) return null;
  if (!article) return <p className="admin-status">Article not found.</p>;

  return (
    <>
      <AdminNav />
      <div className="admin-page">
        <div className="admin-page-header">
          <h1 className="serif">Edit Article</h1>
          <button className="admin-link-btn admin-danger" onClick={handleDelete}>
            Delete article
          </button>
        </div>
        <ArticleForm
          initial={article}
          onSubmit={handleUpdate}
          submitLabel="Save changes"
        />
      </div>
    </>
  );
}

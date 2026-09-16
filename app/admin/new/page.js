"use client";

import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/lib/useAdminAuth";
import { createArticle } from "@/lib/articles";
import AdminNav from "@/components/AdminNav";
import ArticleForm from "@/components/ArticleForm";

export default function NewArticlePage() {
  const { user, loading } = useAdminAuth();
  const router = useRouter();

  if (loading) return <p className="admin-status">Loading...</p>;
  if (!user) return null;

  async function handleCreate(data) {
    await createArticle(data);
    router.push("/admin");
  }

  return (
    <>
      <AdminNav />
      <div className="admin-page">
        <h1 className="serif">New Article</h1>
        <ArticleForm onSubmit={handleCreate} submitLabel="Publish" />
      </div>
    </>
  );
}

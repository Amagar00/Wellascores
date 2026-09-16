import { notFound } from "next/navigation";
import Masthead from "@/components/Masthead";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";
import Footer from "@/components/Footer";
import { getCategory, getArticlesByCategory } from "@/lib/articles";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }) {
  const category = getCategory(params.category);
  if (!category) return {};
  return {
    title: `${category.label} — WellaScores`,
    description: `${category.label} coverage from WellaScores.`,
  };
}

export default async function CategoryPage({ params }) {
  const category = getCategory(params.category);
  if (!category) notFound();

  const articles = await getArticlesByCategory(category.slug);

  return (
    <>
      <Masthead activeCategory={category.slug} />

      <AdSlot variant="top" />

      <div className="category-header">
        <div className="section-label serif">Section</div>
        <h1>{category.label}</h1>
      </div>

      <div className="article-list">
        {articles.length === 0 && (
          <p style={{ opacity: 0.6 }}>No articles published here yet.</p>
        )}
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      <AdSlot variant="bottom" />
      <Footer />
    </>
  );
}

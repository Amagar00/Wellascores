import { notFound } from "next/navigation";
import Masthead from "@/components/Masthead";
import AdSlot from "@/components/AdSlot";
import Footer from "@/components/Footer";
import { getArticleBySlug, getCategory } from "@/lib/articles";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const article = await getArticleBySlug(params.category, params.slug);
  if (!article) return {};
  return {
    title: `${article.title} — WellaScores`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }) {
  const article = await getArticleBySlug(params.category, params.slug);
  if (!article) notFound();
  const category = getCategory(article.category);

  const body = article.body || [];
  const midpoint = Math.ceil(body.length / 2);
  const firstHalf = body.slice(0, midpoint);
  const secondHalf = body.slice(midpoint);

  return (
    <>
      <Masthead activeCategory={category.slug} />

      <AdSlot variant="top" />

      <article className="article-page">
        <div className="section-label serif">{category.label}</div>
        <h1 className="serif">{article.title}</h1>
        <div className="article-meta">
          {new Date(article.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>

        <div className="article-body">
          {firstHalf.map((para, i) => (
            <p key={i}>{para}</p>
          ))}

          {secondHalf.length > 0 && <AdSlot variant="in-article" />}

          {secondHalf.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>

      <AdSlot variant="bottom" />
      <Footer />
    </>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import Masthead from "@/components/Masthead";
import AdSlot from "@/components/AdSlot";
import Footer from "@/components/Footer";
import ArticleEngagement from "@/components/ArticleEngagement";
import { getArticleBySlug, getCategory } from "@/lib/articles";
import { fmtDate } from "@/lib/thumb";
import { optimize } from "@/lib/img";
import Thumb from "@/components/Thumb";

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const article = await getArticleBySlug(params.category, params.slug);
  if (!article) return {};
  const image =
    typeof article.image === "string" && article.image ? optimize(article.image, 1200) : null;
  return {
    title: `${article.title} — WellaScores`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      ...(image ? { images: [image] } : {}),
    },
    twitter: { card: image ? "summary_large_image" : "summary" },
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

      <main className="ps-main ps-read">
        <div className="ps-crumb">
          <Link href="/">Home</Link> › <Link href={`/${category.slug}`}>{category.label}</Link>
        </div>

        <article>
          <h1 className="ps-title">{article.title}</h1>
          <div className="ps-date">{fmtDate(article.date)}</div>

          <Thumb
            article={article}
            label={category.label}
            width={1200}
            className="ps-th ps-hero"
            eager
          />

          <div className="ps-prose">
            {firstHalf.map((para, i) => (
              <p key={i}>{para}</p>
            ))}

            {secondHalf.length > 0 && <AdSlot variant="in-article" />}

            {secondHalf.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <ArticleEngagement articleId={article.id} />
        </article>
      </main>

      <AdSlot variant="bottom" />
      <Footer />
    </>
  );
}

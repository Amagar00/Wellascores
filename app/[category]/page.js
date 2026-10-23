import { notFound } from "next/navigation";
import Masthead from "@/components/Masthead";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";
import Footer from "@/components/Footer";
import LiveScores from "@/components/LiveScores";
import { getCategory, getArticlesByCategory } from "@/lib/articles";
import { getTodayMatches } from "@/lib/football-data";

export const revalidate = 60;

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

  const isLiveScore = category.slug === "live-score";
  const articles = await getArticlesByCategory(category.slug);
  const matches = isLiveScore ? await getTodayMatches() : [];

  return (
    <>
      <Masthead activeCategory={category.slug} />
      <AdSlot variant="top" />

      <main className="ps-main">
        <div className="ps-sec">
          <h1>{category.label}</h1>
        </div>

        {isLiveScore && <LiveScores leagueGroups={matches} />}

        {articles.length > 0 && isLiveScore && (
          <div className="ps-sec">
            <h2>Match reports</h2>
          </div>
        )}

        {articles.length > 0 ? (
          <div className="ps-grid">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          !isLiveScore && <p className="ps-empty">No articles published here yet.</p>
        )}
      </main>

      <AdSlot variant="bottom" />
      <Footer />
    </>
  );
}

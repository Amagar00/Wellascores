import Link from "next/link";
import Masthead from "@/components/Masthead";
import Ticker from "@/components/Ticker";
import SectionColumn from "@/components/SectionColumn";
import ArticleCard from "@/components/ArticleCard";
import RisingPlayers from "@/components/RisingPlayers";
import AdSlot from "@/components/AdSlot";
import Footer from "@/components/Footer";
import { categories, getArticlesByCategory } from "@/lib/articles";

export const revalidate = 60;

export default async function HomePage() {
  const sections = await Promise.all(
    categories.map(async (cat) => ({
      category: cat,
      articles: (await getArticlesByCategory(cat.slug)).slice(0, 3),
    }))
  );

  const latest = sections
    .flatMap((s) => s.articles)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <>
      <Masthead />
      <Ticker />
      <AdSlot variant="top" />

      <main className="ps-main">
        {latest.length > 0 && (
          <section className="ps-block">
            <div className="ps-sec">
              <h2>Latest</h2>
            </div>
            <div className="ps-grid">
              {latest.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </section>
        )}

        <RisingPlayers />

        <Link href="/live-score" className="ps-cta">
          Today&apos;s live scores <span>See all →</span>
        </Link>

        {sections.map(({ category, articles }) => (
          <SectionColumn key={category.slug} category={category} articles={articles} />
        ))}
      </main>

      <AdSlot variant="bottom" />
      <Footer />
    </>
  );
}

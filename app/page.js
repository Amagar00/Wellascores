import Masthead from "@/components/Masthead";
import Ticker from "@/components/Ticker";
import SectionColumn from "@/components/SectionColumn";
import AdSlot from "@/components/AdSlot";
import Footer from "@/components/Footer";
import { categories, getArticlesByCategory } from "@/lib/articles";

export const revalidate = 60;

const SECTION_LABELS = [
  "Section One",
  "Section Two",
  "Section Three",
  "Section Four",
  "Section Five",
  "Section Six",
];

export default async function HomePage() {
  const sections = await Promise.all(
    categories.map(async (cat) => ({
      category: cat,
      articles: (await getArticlesByCategory(cat.slug)).slice(0, 3),
    }))
  );

  return (
    <>
      <Masthead />

      <AdSlot variant="top" />

      <section className="hero">
        <div>
          <h1 className="serif">
            The transfer isn&apos;t official until you&apos;ve heard it three
            times and no two versions agree.
          </h1>
          <p className="hero-dek">
            WellaScores brings you breaking news, live scores, transfer stories,
            injury updates, and the banter — before it hits your group chat.
          </p>
        </div>
        <div className="hero-figure">
          <span className="num serif">90+3&apos;</span>
          <p>
            is when this weekend&apos;s biggest shock went in. Full breakdown
            in Breaking News.
          </p>
        </div>
      </section>

      <Ticker />

      <section className="sections">
        {sections.map(({ category, articles }, i) => (
          <SectionColumn
            key={category.slug}
            label={SECTION_LABELS[i] ?? `Section ${i + 1}`}
            category={category}
            articles={articles}
          />
        ))}
      </section>

      <AdSlot variant="bottom" />

      <Footer />
    </>
  );
              }

import Link from "next/link";
import ArticleCard from "./ArticleCard";

export default function SectionColumn({ category, articles }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="ps-block">
      <div className="ps-sec">
        <h2>{category.label}</h2>
        <Link href={`/${category.slug}`} className="ps-more">
          See all →
        </Link>
      </div>
      <div className="ps-grid">
        {articles.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";
import ArticleCard from "./ArticleCard";

export default function SectionColumn({ label, category, articles }) {
  return (
    <div className="section-col">
      <div className="section-label">{label}</div>
      <h2>
        <Link href={`/${category.slug}`}>{category.label}</Link>
      </h2>
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );
}

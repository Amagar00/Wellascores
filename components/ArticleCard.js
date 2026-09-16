import Link from "next/link";

export default function ArticleCard({ article }) {
  return (
    <div className="article">
      <h3>
        <Link href={`/${article.category}/${article.slug}`}>
          {article.title}
        </Link>
      </h3>
      <p>{article.excerpt}</p>
      {article.tag && (
        <span className={`tag ${article.tag.type === "pos" ? "pos" : ""}`}>
          {article.tag.label}
        </span>
      )}
    </div>
  );
}

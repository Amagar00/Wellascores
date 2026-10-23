import Link from "next/link";
import { getCategory } from "@/lib/articles";
import { fmtDate } from "@/lib/thumb";
import Thumb from "./Thumb";

export default function ArticleCard({ article }) {
  const cat = getCategory(article.category);

  return (
    <Link href={`/${article.category}/${article.slug}`} className="ps-card">
      <Thumb article={article} label={cat ? cat.label : "News"} />
      <div className="ps-body">
        <h3>{article.title}</h3>
        {article.excerpt ? <p>{article.excerpt}</p> : null}
        <div className="ps-meta">{fmtDate(article.date)}</div>
      </div>
    </Link>
  );
}

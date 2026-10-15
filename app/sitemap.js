import { categories, getArticlesByCategory } from "@/lib/articles";

export default async function sitemap() {
  const baseUrl = "https://www.wellascore.online";

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "hourly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];

  const categoryPages = categories.map((cat) => ({
    url: `${baseUrl}/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "hourly",
    priority: 0.8,
  }));

  const articleLists = await Promise.all(
    categories.map((cat) => getArticlesByCategory(cat.slug))
  );

  const articlePages = articleLists.flat().map((article) => ({
    url: `${baseUrl}/${article.category}/${article.slug}`,
    lastModified: article.date ? new Date(article.date) : new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}

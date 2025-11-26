import { MetadataRoute } from "next";
import { getAllNews } from "@/lib/mdx";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://context-collective.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const news = getAllNews();

  const newsUrls = news.map((article) => ({
    url: `${BASE_URL}/actualites/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/actualites`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...newsUrls,
  ];
}

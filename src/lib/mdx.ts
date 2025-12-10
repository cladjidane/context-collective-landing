import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { NewsArticle, NewsArticleMeta } from "./news-types";

export type { NewsArticle, NewsArticleMeta };
export { formatNewsDate } from "./news-types";

const newsDirectory = path.join(process.cwd(), "content/news");

export function getAllNews(): NewsArticleMeta[] {
  // Check if directory exists
  if (!fs.existsSync(newsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(newsDirectory);
  const allNews = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(newsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || "Sans titre",
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || "",
        author: data.author || "Context Collective",
        coverImage: data.coverImage,
        eventId: data.eventId,
        series: data.series,
        order: data.order,
      };
    });

  // Sort by date descending
  return allNews.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getLatestNews(limit = 3): NewsArticleMeta[] {
  return getAllNews().slice(0, limit);
}

export function getNewsBySlug(slug: string): NewsArticle | null {
  try {
    const fullPath = path.join(newsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "Sans titre",
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || "",
      author: data.author || "Context Collective",
      coverImage: data.coverImage,
      content,
      eventId: data.eventId,
      series: data.series,
      order: data.order,
    };
  } catch {
    return null;
  }
}

export function getSeriesArticles(seriesName: string): NewsArticleMeta[] {
  const allNews = getAllNews();
  return allNews
    .filter((article) => article.series === seriesName)
    .sort((a, b) => ((a.order || 0) > (b.order || 0) ? 1 : -1));
}

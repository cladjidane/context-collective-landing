export interface NewsArticle {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  coverImage?: string;
  content: string;
  tags?: string[];
}

export interface NewsArticleMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  coverImage?: string;
}

export function formatNewsDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

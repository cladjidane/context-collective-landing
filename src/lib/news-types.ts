export interface NewsArticle {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  coverImage?: string;
  content: string;
  tags?: string[];
  eventId?: string;
  series?: string;
  order?: number;
}

export interface NewsArticleMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  coverImage?: string;
  eventId?: string;
  series?: string;
  order?: number;
}

export function formatNewsDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

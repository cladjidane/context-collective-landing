import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import type { NewsArticleMeta } from "@/lib/news-types";
import { formatNewsDate } from "@/lib/news-types";

interface NewsCardProps {
  article: NewsArticleMeta;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <article className="community-card group">
      <div>
        <span className="card-tag bg-accent">Article</span>
        <h3 className="text-xl mb-2">{article.title}</h3>
        <p className="text-sm text-muted mb-4 line-clamp-3">{article.excerpt}</p>
      </div>
      <div>
        <div className="flex gap-4 text-xs text-muted mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatNewsDate(article.date)}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {article.author}
          </span>
        </div>
        <Link
          href={`/actualites/${article.slug}`}
          className="link-arrow inline-flex items-center gap-1 text-sm"
        >
          Lire la suite
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

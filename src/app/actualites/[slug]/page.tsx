import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { getAllNews, getNewsBySlug, getSeriesArticles, formatNewsDate } from "@/lib/mdx";
import { getEventById } from "@/lib/eventlite";
import { MDXContent } from "@/components/ui/mdx-content";
import { EventCardSmall } from "@/components/ui/event-card-small";
import { SeriesNavigation } from "@/components/ui/series-navigation";
import { BlogPostingSchema, BreadcrumbSchema } from "@/components/seo/json-ld";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://context-collective.org";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllNews();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) {
    return {
      title: "Article non trouvé | Context Collective",
    };
  }

  return {
    title: `${article.title} | Context Collective`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  let linkedEvent = null;
  if (article.eventId) {
    linkedEvent = await getEventById(article.eventId);
  }

  let seriesArticles = null;
  if (article.series) {
    seriesArticles = getSeriesArticles(article.series);
  }

  return (
    <>
      <BlogPostingSchema
        title={article.title}
        description={article.excerpt}
        slug={slug}
        publishedAt={article.date}
        author={article.author}
        tags={article.tags}
      />
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: BASE_URL },
          { name: "Blog", url: `${BASE_URL}/actualites` },
          { name: article.title, url: `${BASE_URL}/actualites/${slug}` },
        ]}
      />
      <article className="container-main py-16 max-w-3xl">
        <Link
          href="/actualites"
          className="inline-flex items-center gap-2 text-muted hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au blog
        </Link>

        {seriesArticles && (
          <SeriesNavigation
            currentSlug={slug}
            seriesTitle={article.series!}
            articles={seriesArticles}
          />
        )}

        <header className="mb-12">
          {article.series && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-sm font-medium text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {article.series} — Partie {article.order}
            </div>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl mb-6">{article.title}</h1>
          <div className="flex flex-wrap gap-6 text-sm text-muted">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatNewsDate(article.date)}
            </span>
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {article.author}
            </span>
          </div>
        </header>

        {linkedEvent && <EventCardSmall event={linkedEvent} />}

        <div className="prose prose-lg max-w-none">
          <MDXContent content={article.content} />
        </div>

        {seriesArticles && (
          <SeriesNavigation
            currentSlug={slug}
            seriesTitle={article.series!}
            articles={seriesArticles}
          />
        )}
      </article>
    </>
  );
}

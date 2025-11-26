import { Metadata } from "next";
import { getAllNews } from "@/lib/mdx";
import { NewsCard } from "@/components/ui/news-card";

export const metadata: Metadata = {
  title: "Actualités | Context Collective",
  description:
    "Retrouvez toutes les actualités du Context Collective : articles, annonces, retours d'expérience sur l'IA générative.",
};

export default function ActualitesPage() {
  const articles = getAllNews();

  return (
    <div className="container-main py-16">
      <h1 className="text-4xl md:text-5xl mb-4">Actualités</h1>
      <p className="text-lg text-muted mb-12 max-w-2xl">
        Retrouvez nos derniers articles, annonces et retours d&apos;expérience
        sur l&apos;IA générative et la communauté.
      </p>

      {articles.length === 0 ? (
        <p className="text-muted italic">Aucune actualité pour le moment.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <NewsCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}

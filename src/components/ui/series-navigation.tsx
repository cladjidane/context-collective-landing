import Link from "next/link";
import { ChevronLeft, ChevronRight, List } from "lucide-react";
import type { NewsArticleMeta } from "@/lib/news-types";

interface SeriesNavigationProps {
    currentSlug: string;
    seriesTitle: string;
    articles: NewsArticleMeta[];
}

export function SeriesNavigation({
    currentSlug,
    seriesTitle,
    articles,
}: SeriesNavigationProps) {
    const currentIndex = articles.findIndex((a) => a.slug === currentSlug);
    const previousArticle = articles[currentIndex - 1];
    const nextArticle = articles[currentIndex + 1];

    return (
        <div className="my-12 rounded-xl border border-border bg-bg-subtle p-6">
            <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted">
                        Série d'articles
                    </div>
                    <h3 className="text-xl font-bold text-primary">{seriesTitle}</h3>
                </div>
                <div className="text-sm text-muted">
                    Partie <span className="text-primary font-bold">{currentIndex + 1}</span> sur{" "}
                    {articles.length}
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    {articles.map((article, index) => {
                        const isCurrent = article.slug === currentSlug;
                        return (
                            <div
                                key={article.slug}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${isCurrent
                                    ? "bg-primary/5 text-primary"
                                    : "text-muted hover:bg-primary/5 hover:text-primary"
                                    }`}
                            >
                                <span
                                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${isCurrent ? "bg-primary text-white" : "bg-primary/10 text-primary/70"
                                        }`}
                                >
                                    {index + 1}
                                </span>
                                {isCurrent ? (
                                    <span className="font-medium">{article.title}</span>
                                ) : (
                                    <Link href={`/actualites/${article.slug}`} className="flex-1 truncate">
                                        {article.title}
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-border">
                    {previousArticle ? (
                        <Link
                            href={`/actualites/${previousArticle.slug}`}
                            className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span>Précédent</span>
                        </Link>
                    ) : (
                        <div />
                    )}

                    {nextArticle ? (
                        <Link
                            href={`/actualites/${nextArticle.slug}`}
                            className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
                        >
                            <span>Suivant</span>
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    ) : (
                        <div />
                    )}
                </div>
            </div>
        </div>
    );
}

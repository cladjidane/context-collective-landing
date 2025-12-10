"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsCard } from "@/components/ui/news-card";
import type { NewsArticleMeta } from "@/lib/news-types";

interface NewsProps {
  articles: NewsArticleMeta[];
}

export function News({ articles }: NewsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (articles.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} id="news" className="fade-up container-main my-16">
      <div className="flex justify-between items-end mb-8">
        <h2 className="mt-0 border-t-0 pt-0">Le Blog</h2>
        <Link
          href="/actualites"
          className="link-arrow inline-flex items-center gap-1"
        >
          Voir tous les articles
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <NewsCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";

export function Manifesto() {
  const [isExpanded, setIsExpanded] = useState(false);
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

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="fade-up container-main my-16"
    >
      <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
        <div>
          <h2 className="mt-0">Le Manifeste</h2>
        </div>
        <div>
          <p className="lead">
            L&apos;IA générative avance plus vite que notre capacité à la
            comprendre. Résultat : beaucoup de bruit, beaucoup de prétentions,
            peu de pratique partagée.
          </p>

          <p className="mb-4">
            Le <strong>Context Collective</strong> est une communauté
            d&apos;ingénierie IA à Brest. On teste ensemble, on partage ce qui
            marche et ce qui échoue, on réfléchit à ce que deviennent nos
            métiers dans la tech.
          </p>

          <p className="mb-4">
            Pas de démonstrations commerciales, pas de cours d&apos;experts.
            Juste des devs, des ingénieur.es, des étudiant.es, des freelances,
            des passionnées de technos d&apos;IA générative qui choisissent
            l&apos;expérimentation sur le discours.
          </p>

          {isExpanded && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <p className="mb-4">
                Nous croyons que l&apos;IA générative est une rupture
                technologique majeure, comparable à l&apos;arrivée d&apos;Internet ou
                du mobile. Mais nous croyons aussi que la hype actuelle nuit à
                la compréhension réelle des enjeux techniques.
              </p>
              <p className="mb-4">
                C&apos;est pourquoi nous avons créé le Context Collective. Pour
                offrir un espace de vérité technique, où l&apos;on peut ouvrir le
                capot, tester les modèles, comparer les architectures, et
                partager nos découvertes sans filtre marketing.
              </p>
              <p className="mb-4">
                Notre mission est simple : faire monter en compétence
                l&apos;écosystème tech brestois sur ces sujets, en favorisant
                l&apos;échange pair-à-pair et la pratique concrète.
              </p>
            </div>
          )}

          {!isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="read-more-link"
            >
              Lire la suite →
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

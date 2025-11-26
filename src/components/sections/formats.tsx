"use client";

import { useEffect, useRef } from "react";

const formats = [
  {
    tag: "YouTube",
    tagColor: "bg-accent-dark",
    title: "Context Live",
    description:
      "On explore une techno ou un outil d'IA générative en direct, on teste, on bugge, on commente.",
  },
  {
    tag: "Brest",
    tagColor: "bg-accent",
    title: "Context Lab",
    description:
      "On se retrouve pour mettre les mains dans le prompt : exploration collective, apprentissage guidé.",
  },
];

export function Formats() {
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
    <section ref={sectionRef} id="formats" className="fade-up container-main my-16">
      <h2>Les Formats</h2>
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        {formats.map((format, index) => (
          <div
            key={index}
            className="community-card bg-bg-subtle"
          >
            <div>
              <span className={`card-tag ${format.tagColor}`}>{format.tag}</span>
              <h3 className="text-2xl mb-2">{format.title}</h3>
              <p className="text-base">{format.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";

const testimonials = [
  {
    quote:
      "Enfin un endroit où on peut dire 'je ne sais pas' et chercher la réponse ensemble.",
    author: "Julie, Data Scientist",
  },
  {
    quote:
      "Le niveau des échanges techniques est bien au-dessus de ce qu'on trouve sur Twitter.",
    author: "Marc, CTO",
  },
  {
    quote: "Le format Lab est génial pour pratiquer concrètement.",
    author: "Léa, Étudiante",
  },
];

export function Voices() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <div
      ref={sectionRef}
      className="fade-up bg-primary text-secondary py-24 px-8 my-16"
    >
      <h2 className="text-secondary border-secondary mt-0 max-w-[1200px] mx-auto">
        Voices
      </h2>
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-16">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="voice-card">
            <blockquote>&ldquo;{testimonial.quote}&rdquo;</blockquote>
            <div className="voice-author">— {testimonial.author}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

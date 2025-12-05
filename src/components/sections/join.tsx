"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const links = [
  {
    href: "https://discord.gg/WaRNpDSU",
    label: "Discord",
    description: "La communauté au quotidien",
  },
  {
    href: "https://www.youtube.com/@ContextCollectiveBrest",
    label: "YouTube",
    description: "Replays et Lives",
  },
  {
    href: "#",
    label: "Notion",
    description: "Wiki et ressources",
  },
  {
    href: "#",
    label: "Luma",
    description: "Agenda des événements",
  },
];

export function Join() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <section ref={sectionRef} id="join" className="fade-up container-main my-16">
      <h2>Rejoindre le collectif</h2>
      <p className="mb-8">
        Le Context Collective se construit à Brest. Si cette approche te parle,
        viens enrichir le contexte.
      </p>

      <ul className="list-none p-0 my-12">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="link-item group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="flex items-center gap-2">
                {link.label}
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
              </span>
              <span className="link-desc">{link.description}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="newsletter-signup">
        <h3 className="text-2xl mb-2 text-secondary">Context is all you need.</h3>
        <p className="mb-8 text-base text-secondary/70">
          Recevez nos meilleures ressources et les dates des prochains Labs.
        </p>
        {isSubmitted ? (
          <p className="text-accent-light font-semibold">
            Merci pour votre inscription !
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex justify-center gap-4 flex-wrap">
            <input
              type="email"
              placeholder="votre@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 border-none rounded-lg w-[300px] font-sans text-primary bg-white placeholder:text-muted"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-accent text-secondary border-none rounded-lg font-extrabold cursor-pointer hover:bg-accent-dark transition-colors"
            >
              S&apos;INSCRIRE
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

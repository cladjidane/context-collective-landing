"use client";

import { useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";

export function DiscordSection() {
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
    <section ref={sectionRef} id="discord" className="fade-up container-main my-16">
      <h2>Rejoindre le Discord</h2>
      <div className="mt-8 bg-bg-subtle border border-border rounded-2xl p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex items-center gap-4">
          <span className="p-3 rounded-full bg-accent/10 text-accent">
            <MessageCircle className="w-6 h-6" aria-hidden="true" />
          </span>
          <div>
            <p className="font-serif text-lg text-muted">
              Rejoins le serveur pour discuter, partager tes projets et ne rien manquer des prochains labs.
            </p>
          </div>
        </div>
        <div className="md:ml-auto flex items-center">
          <a
            href="https://discord.gg/WaRNpDSU"
            className="cta-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rejoindre mon serveur Discord
          </a>
        </div>
      </div>
    </section>
  );
}

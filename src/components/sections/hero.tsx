"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Stars } from "@/components/icons/stars";
import { Hermine } from "@/components/icons/hermine";

export function Hero() {
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
      id="hero"
      className="fade-up min-h-[90vh] flex items-center relative overflow-hidden bg-bg-subtle"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top right stars */}
        <Stars className="absolute top-16 right-[15%] w-20 md:w-28 text-accent/20" />
        {/* Bottom left hermine */}
        <Hermine className="absolute bottom-24 left-[10%] w-24 md:w-32 text-accent/15" />
        {/* Additional decorative stars */}
        <Stars className="absolute top-1/3 left-[5%] w-12 text-accent/10 rotate-12" />
        <Stars className="absolute bottom-1/4 right-[8%] w-16 text-accent/10 -rotate-12" />
      </div>

      <div className="container-main relative z-10 py-20">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <p className="text-accent font-semibold text-sm md:text-base uppercase tracking-wider mb-6">
            Communauté IA Brest
          </p>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-8">
            Context is all
            <br />
            <span className="text-accent">you need.</span>
          </h1>

          {/* Subtitle */}
          <p className="font-serif text-lg md:text-xl lg:text-2xl text-muted max-w-2xl mb-10 leading-relaxed">
            L&apos;IA générative avance vite. Trop vite pour comprendre seul.
            <br className="hidden md:block" />
            Nous sommes une communauté d&apos;ingénieurs qui apprennent ensemble, en public.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <Link href="#join" className="cta-button">
              Rejoindre le collectif
            </Link>
            <Link href="#manifesto" className="cta-button-outline">
              Découvrir le manifeste
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-dark to-accent" />
    </section>
  );
}

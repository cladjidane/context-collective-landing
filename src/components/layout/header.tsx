"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/icons/logo";

const navLinks = [
  { href: "#manifesto", label: "Manifeste" },
  { href: "#community", label: "Communauté" },
  { href: "/actualites", label: "Blog" },
  { href: "#formats", label: "Formats" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="py-4 px-6 md:px-8 relative z-50">
      <nav className="flex justify-between items-center w-full max-w-[1200px] mx-auto">
        <Link href="/" className="relative h-10 w-32 md:w-40">
          <Logo className="absolute left-0 top-0 h-20 md:h-24 w-auto" style={{ transform: 'translateY(20%)' }} />
        </Link>

        {/* Burger button - mobile only */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMenuOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
          />
          <span
            className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""
              }`}
          />
          <span
            className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
          />
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-8 items-center list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="no-underline text-primary font-semibold text-sm hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="#join" className="cta-button">
              Rejoindre
            </Link>
          </li>
        </ul>

        {/* Mobile menu */}
        <div
          className={`md:hidden fixed inset-0 top-[72px] bg-background transition-all duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
        >
          <ul className="flex flex-col items-center gap-6 pt-8 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="no-underline text-primary font-semibold text-lg hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-4">
              <Link href="#join" onClick={closeMenu} className="cta-button">
                Rejoindre
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

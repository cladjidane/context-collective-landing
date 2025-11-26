"use client";

import Link from "next/link";
import { Logo } from "@/components/icons/logo";

const navLinks = [
  { href: "#manifesto", label: "Manifeste" },
  { href: "#community", label: "Communauté" },
  { href: "/actualites", label: "Actualités" },
  { href: "#formats", label: "Formats" },
];

export function Header() {
  return (
    <header className="py-4 px-6 md:px-8 relative z-50">
      <nav className="flex justify-between items-center w-full max-w-[1200px] mx-auto">
        <Link href="/" className="relative h-10 w-32 md:w-40">
          <Logo className="absolute left-0 top-0 h-20 md:h-24 w-auto" style={{ transform: 'translateY(20%)' }} />
        </Link>
        <ul className="flex gap-8 items-center list-none">
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
      </nav>
    </header>
  );
}

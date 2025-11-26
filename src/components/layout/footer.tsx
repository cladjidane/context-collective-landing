import Link from "next/link";

const founders = [
  {
    name: "Fabien Canu",
    linkedin: "https://www.linkedin.com/in/fabien-canu/",
  },
  {
    name: "Pierre Guirriec",
    linkedin: "https://www.linkedin.com/in/pierre-guirriec-b52372304/",
  },
];

export function Footer() {
  return (
    <footer className="py-8">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-8">
        <p className="text-sm">&copy; 2025 Context Collective</p>
        <div className="flex gap-1 items-center text-sm text-muted">
          <span>Fondateurs :</span>
          {founders.map((founder, index) => (
            <span key={founder.name}>
              <Link
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors"
              >
                {founder.name}
              </Link>
              {index < founders.length - 1 && <span> & </span>}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

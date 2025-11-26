import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-8">
      <div className="max-w-[1200px] mx-auto flex justify-between px-8">
        <p className="text-sm">&copy; 2025 Context Collective</p>
        <div className="flex gap-4">
          <Link href="#" className="text-sm text-muted hover:text-primary">
            Fondateur 1
          </Link>
          <Link href="#" className="text-sm text-muted hover:text-primary">
            Fondateur 2
          </Link>
        </div>
      </div>
    </footer>
  );
}

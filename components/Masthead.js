import Link from "next/link";
import "../app/pitchside.css";
import { categories } from "@/lib/articles";

export default function Masthead({ activeCategory }) {
  return (
    <header className="ps-top">
      <div className="ps-bar">
        <Link href="/" className="ps-logo" aria-label="WellaScores home">
          <span className="ps-ball" />
          WellaScores</em>
        </Link>
        <nav className="ps-nav" aria-label="Sections">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              aria-current={activeCategory === c.slug ? "page" : undefined}
            >
              {c.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

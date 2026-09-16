import Link from "next/link";
import { categories } from "@/lib/articles";

export default function Masthead({ activeCategory }) {
  return (
    <>
      <header className="masthead">
        <Link href="/" className="brand">
          Wella<span>Scores</span>
        </Link>
        <div className="masthead-meta">
          Breaking news, transfers &amp; banter — straight from the pitch
          <br />
          Vol. 1 — Est. 2026
        </div>
      </header>

      <nav className="subline">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/${c.slug}`}
            className={activeCategory === c.slug ? "active" : ""}
          >
            {c.label}
          </Link>
        ))}
      </nav>
    </>
  );
}

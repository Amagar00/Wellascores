import Link from "next/link";

export default function Footer() {
  return (
    <footer className="ps-footer">
      <div className="ps-foot">
        <Link href="/" className="ps-logo" aria-label="WellaScores home">
          <span className="ps-ball" />
          Wella<em>Scores</em>
        </Link>
        <span>© {new Date().getFullYear()} WellaScores</span>
        <span>
          <Link href="/about">About Us</Link> ·{" "}
          <Link href="/contact">Contact Us</Link> ·{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>
        </span>
      </div>
    </footer>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <span>© {new Date().getFullYear()} WellaScores</span>
      <span>
        <Link href="/contact">Contact Us</Link> ·{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>
      </span>
    </footer>
  );
}

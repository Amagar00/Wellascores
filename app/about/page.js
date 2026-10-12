import Masthead from "@/components/Masthead";
import AdSlot from "@/components/AdSlot";
import Footer from "@/components/Footer";

export const metadata = { title: "About Us — WellaScores" };

export default function AboutPage() {
  return (
    <>
      <Masthead />
      <AdSlot variant="top" />
      <article className="article-page">
        <h1 className="serif">About WellaScores</h1>
        <div className="article-body">
          <p>
            WellaScores was built for fans who want their football news
            straight — breaking stories, live scores, transfer gossip,
            injury updates, and the banter that comes with it, all in one
            place.
          </p>
          <p>
            We cover the leagues people actually talk about: the Premier
            League, La Liga, Bundesliga, Serie A, Ligue 1, the Saudi Pro
            League, MLS, and Portugal&apos;s Primeira Liga — plus the
            moments, memes, and arguments that come out of them.
          </p>
          <p>
            WellaScores is an independent football news site. We&apos;re not
            affiliated with any club, league, or federation — just fans
            covering the game.
          </p>
          <p>
            Got a tip, a correction, or just want to say hello? Reach out
            through our <a href="/contact">Contact page</a>.
          </p>
        </div>
      </article>
      <AdSlot variant="bottom" />
      <Footer />
    </>
  );
    }

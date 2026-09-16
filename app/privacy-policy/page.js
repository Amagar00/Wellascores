import Masthead from "@/components/Masthead";
import AdSlot from "@/components/AdSlot";
import Footer from "@/components/Footer";

export const metadata = { title: "Privacy Policy — WellaScores" };

export default function PrivacyPolicyPage() {
  return (
    <>
      <Masthead />
      <AdSlot variant="top" />
      <article className="article-page">
        <h1 className="serif">Privacy Policy</h1>
        <div className="article-body">
          <p>
            Placeholder privacy policy. Before applying for AdSense you'll
            need a real policy covering cookies, third-party ad
            personalization (Google's policy requires disclosure of this
            specifically), and any data you collect. A generator like
            termly.io or a lawyer-reviewed template is worth using here
            rather than placeholder text.
          </p>
        </div>
      </article>
      <AdSlot variant="bottom" />
      <Footer />
    </>
  );
}

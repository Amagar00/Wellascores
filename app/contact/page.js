import Masthead from "@/components/Masthead";
import AdSlot from "@/components/AdSlot";
import Footer from "@/components/Footer";

export const metadata = { title: "Contact Us — WellaScores" };

export default function ContactPage() {
  return (
    <>
      <Masthead />
      <AdSlot variant="top" />
      <article className="article-page">
        <h1 className="serif">Contact Us</h1>
        <div className="article-body">
          <p>
            Got a tip, a transfer story, or spotted something we got wrong?
            Replace this paragraph with a real contact email or a contact
            form.
          </p>
        </div>
      </article>
      <AdSlot variant="bottom" />
      <Footer />
    </>
  );
}

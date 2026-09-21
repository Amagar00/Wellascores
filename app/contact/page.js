import Masthead from "@/components/Masthead";
import AdSlot from "@/components/AdSlot";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

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
            Send us a message below.
          </p>
        </div>
        <ContactForm />
      </article>
      <AdSlot variant="bottom" />
      <Footer />
    </>
  );
}

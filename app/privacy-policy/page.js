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
          <p>Last updated: October 2026</p>

          <p>
            WellaScores ("we," "us," or "our") respects your privacy. This
            policy explains what information we collect when you use this
            site and how it's used.
          </p>

          <h3>Information We Collect</h3>
          <p>
            <strong>Comments and Reactions:</strong> When you react to an
            article or leave a comment, we store the name you provide (or
            "Anonymous" if left blank), your comment text, and the date
            submitted. We do not require an account or email to comment.
          </p>
          <p>
            <strong>Contact Form:</strong> If you submit the contact form, we
            store the name, email, and message you provide so we can respond.
          </p>
          <p>
            <strong>Analytics:</strong> We use Google Analytics to understand
            how visitors use the site — pages viewed, time on site, general
            location (city/country level), and device type. This data is
            aggregated and not used to personally identify you.
          </p>
          <p>
            <strong>Cookies:</strong> This site uses cookies for basic
            functionality and analytics. If you see advertising on this
            site, third-party advertising networks — including but not
            limited to Adsterra and, when applicable, Google AdSense — may
            use cookies and similar technologies to serve ads based on your
            visits to this site and other websites.
          </p>

          <h3>Advertising</h3>
          <p>
            WellaScores displays advertising through third-party ad
            networks, including Adsterra. These networks may use cookies,
            web beacons, or similar technologies to deliver ads and measure
            their performance. Ad networks may collect non-personally
            identifiable information such as your approximate location,
            browser type, and browsing behavior to serve more relevant ads.
          </p>
          <p>
            We do not control the specific ads shown by these networks or
            the data practices of the advertisers themselves. We encourage
            you to review the privacy policies of any third-party ad
            network — such as{" "}
            Adsterra's Privacy Policy
            {" "}— for details on how they handle your data. If Google
            AdSense is used on this site at any point, you may opt out of
            personalized advertising by visiting{" "}
            Google's Ads Settings.
          </p>

          <h3>How We Use Information</h3>
          <p>
            We use the information collected to operate and improve the
            site, respond to inquiries submitted through the contact form,
            moderate comments, and understand site traffic patterns.
          </p>

          <h3>Data Sharing</h3>
          <p>
            We do not sell your personal information. We may share data with
            service providers who help us operate the site (such as Google
            Analytics, our advertising partners, and Firebase, our
            hosting/database provider), and as required by law.
          </p>

          <h3>Children's Privacy</h3>
          <p>
            WellaScores is not directed at children under 13, and we do not
            knowingly collect personal information from children under 13.
          </p>

          <h3>Your Choices</h3>
          <p>
            You can choose not to submit a comment or use the contact form.
            You can control cookies through your browser settings, though
            disabling them may affect site functionality and ad display.
          </p>

          <h3>Changes to This Policy</h3>
          <p>
            We may update this policy from time to time. Changes will be
            posted on this page with an updated "Last updated" date.
          </p>

          <h3>Contact</h3>
          <p>
            Questions about this policy can be sent through our{" "}
            <a href="/contact">Contact page</a>.
          </p>
        </div>
      </article>
      <AdSlot variant="bottom" />
      <Footer />
    </>
  );
}

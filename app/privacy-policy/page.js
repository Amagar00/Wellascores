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
          <p>Last updated: September 2026</p>

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
            site, third-party vendors, including Google, may use cookies to
            serve ads based on your prior visits to this site or other
            websites.
          </p>

          <h3>Google Ads and Third-Party Advertising</h3>
          <p>
            We intend to display advertising on WellaScores through
            Google AdSense and/or similar ad networks. These third-party
            vendors use cookies to serve ads based on your visits to this
            site and other sites on the internet. You may opt out of
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
            Analytics and Firebase, our hosting/database provider), and as
            required by law.
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
            disabling them may affect site functionality.
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

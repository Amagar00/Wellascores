import "./globals.css";

export const metadata = {
  title: "WellaScores — Football news, scores & banter",
  description:
    "Breaking football news, live scores, transfer stories, injury updates and the banter — all in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

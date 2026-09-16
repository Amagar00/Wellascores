# WellaScores

Football news site — breaking news, live scores, transfer news, injury
updates, teams of the week, and hot banter. Built with Next.js (App
Router). Articles are stored in Firebase Firestore and managed through a
password-protected `/admin` panel — no code changes needed to publish or
edit content.

## Structure

- `app/page.js` — homepage
- `app/[category]/page.js` — category listing (Breaking News, Hot Banter,
  Live Score, Injury Updates, Teams of the Week, Transfer News)
- `app/[category]/[slug]/page.js` — individual article page
- `app/contact/page.js` — Contact Us
- `app/privacy-policy/page.js` — Privacy Policy
- `app/admin/` — admin panel (login, dashboard, new article, edit article)
- `lib/articles.js` — Firestore read/write functions for articles, and the
  list of categories
- `lib/firebase.js` — Firebase app/Firestore/Auth initialization
- `components/` — shared UI pieces (Masthead, Ticker, ArticleForm, AdminNav,
  AdSlot, etc.)

## Ad placement

Every page (homepage, each category page, article pages, Contact, and
Privacy Policy) has a banner ad slot top-center — right under the
masthead/nav — and another at the bottom, above the footer. Article pages
additionally get one ad slot in the middle of the article body. These are
placeholder `<AdSlot />` components — swap in your ad network's real script
(e.g. Google AdSense) once you're approved.

## One-time Firebase setup

1. Go to https://console.firebase.google.com → **Add project** → name it
   (e.g. "wellascores") → create it (Google Analytics optional, skip it).
2. In the project, go to **Build → Firestore Database** → **Create
   database** → start in **production mode** → pick any region.
3. Once created, go to the Firestore **Rules** tab and replace the rules
   with:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /articles/{articleId} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```
   This lets anyone read articles (needed for the public site) but only
   logged-in admins write/edit/delete them. Click **Publish**.
4. Go to **Build → Authentication** → **Get started** → enable the
   **Email/Password** sign-in provider.
5. Still in Authentication, go to the **Users** tab → **Add user** → enter
   your email and a password. This is what you'll log into `/admin` with.
6. Go to **Project settings** (gear icon) → scroll to **Your apps** → click
   the **</>** (web) icon → register an app (any nickname) → you'll get a
   `firebaseConfig` object with six values.

## Connecting the config to the deployed site

In Vercel: **Project → Settings → Environment Variables**, add each of
these (values from the `firebaseConfig` object above):

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

After adding them, go to the **Deployments** tab and redeploy (or just push
a new commit) so the build picks them up.

## Using the admin panel

- Visit `yoursite.vercel.app/admin/login`
- Sign in with the email/password you created in step 5 above
- **Dashboard** lists all articles with Edit/Delete
- **New Article** — fill in title (slug auto-fills from it, editable),
  category, excerpt, date, an optional tag, and the body. Separate
  paragraphs with a blank line.
- Changes appear on the live site immediately — no redeploy needed.

The very first time you open a category page after adding articles,
Firestore may show an error in the Vercel logs asking you to create a
composite index — it includes a direct link that creates it automatically
with one click.

## Before applying for AdSense

- Replace placeholder text in Contact Us and Privacy Policy
- Publish at least 10–15 real articles through the admin panel
- The homepage/Ticker component currently shows static placeholder live
  scores — swap in a real football data API (e.g. API-Football,
  football-data.org) before launch, or remove it
- Swap the placeholder `<AdSlot />` components for your ad network's real
  code once approved

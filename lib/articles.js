import { db } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  increment,
  setDoc,
} from "firebase/firestore";

export const categories = [
  { slug: "breaking-news", label: "Breaking News" },
  { slug: "hot-banter", label: "Hot Banter" },
  { slug: "live-score", label: "Live Score" },
  { slug: "injury-updates", label: "Injury Updates" },
  { slug: "teams-of-the-week", label: "Teams of the Week" },
  { slug: "transfer-news", label: "Transfer News" },
];

export function getCategory(categorySlug) {
  return categories.find((c) => c.slug === categorySlug);
}

const articlesCol = collection(db, "articles");

export async function getAllArticles() {
  const snap = await getDocs(query(articlesCol, orderBy("date", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getArticlesByCategory(categorySlug) {
  const q = query(
    articlesCol,
    where("category", "==", categorySlug),
    orderBy("date", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getArticleBySlug(categorySlug, slug) {
  const q = query(
    articlesCol,
    where("category", "==", categorySlug),
    where("slug", "==", slug)
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() };
}

export async function getArticleById(id) {
  const ref = doc(db, "articles", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

export function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function createArticle(data) {
  return addDoc(articlesCol, data);
}

export async function updateArticle(id, data) {
  const ref = doc(db, "articles", id);
  return updateDoc(ref, data);
}

export async function deleteArticle(id) {
  const ref = doc(db, "articles", id);
  return deleteDoc(ref);
}
import { increment, setDoc } from "firebase/firestore";
// ^ add these two to your existing "firebase/firestore" import line at the top

export async function getReactions(articleId) {
  const ref = doc(db, "reactions", articleId);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    return { like: 0, dislike: 0, clap: 0, love: 0, heartbreak: 0, laugh: 0, angry: 0 };
  }
  return snap.data();
}

export async function incrementReaction(articleId, type) {
  const ref = doc(db, "reactions", articleId);
  await setDoc(ref, { [type]: increment(1) }, { merge: true });
}

export async function getComments(articleId) {
  const q = query(
    collection(db, "comments"),
    where("articleId", "==", articleId),
    orderBy("date", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addComment(articleId, { name, text }) {
  return addDoc(collection(db, "comments"), {
    articleId,
    name,
    text,
    date: new Date().toISOString(),
  });
  }

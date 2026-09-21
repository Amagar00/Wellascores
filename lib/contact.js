import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export async function submitContactMessage({ name, email, message }) {
  return addDoc(collection(db, "messages"), {
    name,
    email,
    message,
    date: new Date().toISOString(),
  });
}

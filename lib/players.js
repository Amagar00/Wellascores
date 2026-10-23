import { db } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const playersCol = () => collection(db, "players");

// Only plain fields are returned so the homepage can pass them safely to the player tiles
export async function getPlayers() {
  const snap = await getDocs(playersCol());
  return snap.docs
    .map((d) => {
      const x = d.data();
      return {
        id: d.id,
        name: x.name || "",
        club: x.club || "",
        position: x.position || "",
        age: typeof x.age === "number" ? x.age : null,
        stat: x.stat || "",
        image: typeof x.image === "string" ? x.image : "",
        order: typeof x.order === "number" ? x.order : 999,
      };
    })
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

export async function createPlayer(data) {
  return addDoc(playersCol(), data);
}

export async function updatePlayer(id, data) {
  return updateDoc(doc(db, "players", id), data);
}

export async function deletePlayer(id) {
  return deleteDoc(doc(db, "players", id));
}

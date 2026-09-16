"use client";

import Link from "next/link";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function AdminNav() {
  const router = useRouter();

  async function handleLogout() {
    await signOut(auth);
    router.push("/admin/login");
  }

  return (
    <nav className="admin-nav">
      <Link href="/admin" className="brand" style={{ fontSize: "1.4rem" }}>
        Wella<span>Scores</span> Admin
      </Link>
      <div className="admin-nav-links">
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/new">New Article</Link>
        <Link href="/" target="_blank">
          View site
        </Link>
        <button onClick={handleLogout} className="admin-link-btn">
          Log out
        </button>
      </div>
    </nav>
  );
}

"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const logout = async () => {
    setBusy(true);
    await fetch("/api/course/auth/logout", { method: "POST" });
    router.push("/course/login");
    router.refresh();
  };
  return (
    <button
      onClick={logout}
      disabled={busy}
      className="px-4 py-2 rounded-xl bg-red-50 text-red-600 text-sm font-bold hover:bg-red-100 transition disabled:opacity-60"
    >
      {busy ? "…" : "⏻ ထွက်မယ်"}
    </button>
  );
}

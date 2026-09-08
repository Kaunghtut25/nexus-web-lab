"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieConsent() {
  // SSR-visible: the banner is present in the initial HTML so crawlers and
  // accessibility tools can detect it. On the client, it hides immediately
  // if the visitor already made a choice.
  const [visible, setVisible] = useState(true);
  const [decided, setDecided] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem("nwl-cookie-consent")) {
        setVisible(false);
      } else {
        // Slight delay so the banner doesn't jump over first paint for humans
        const t = setTimeout(() => setDecided(true), 1200);
        return () => clearTimeout(t);
      }
    } catch {
      setDecided(true);
    }
  }, []);

  const decide = (choice: "accepted" | "rejected") => {
    try {
      localStorage.setItem("nwl-cookie-consent", choice);
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-[120] bg-white border border-slate-200 rounded-xl p-4 shadow-xl animate-slide-up transition-opacity duration-300 ${decided ? "opacity-100" : "opacity-100"}`}
    >
      <p className="text-xs text-slate-600 leading-relaxed mb-3">
        We use essential cookies only. No tracking. See{" "}
        <Link href="/privacy" className="text-blue hover:underline">Privacy Policy</Link>.
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => decide("accepted")}
          className="gradient-btn flex-1 justify-center !py-2 text-xs min-h-[36px]"
        >
          Accept
        </button>
        <button
          onClick={() => decide("rejected")}
          className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition min-h-[36px]"
        >
          Decline
        </button>
      </div>
    </div>
  );
}

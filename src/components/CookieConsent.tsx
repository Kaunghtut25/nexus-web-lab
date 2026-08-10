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
      className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-[120] glass border border-white/20 rounded-2xl p-5 shadow-2xl shadow-black/30 animate-slide-up transition-opacity duration-300 ${decided ? "opacity-100" : "opacity-100"}`}
    >
      <p className="text-sm text-slate-600 leading-relaxed mb-4">
        We use essential cookies to make our website work correctly. We don&apos;t use tracking or advertising cookies. Your privacy matters to us — see our{" "}
        <Link href="/privacy" className="text-blue hover:underline inline-block py-1 min-h-[44px]">Privacy Policy</Link> for full details, including GDPR data-subject rights.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => decide("accepted")}
          className="gradient-btn flex-1 justify-center !py-2.5 text-sm min-h-[44px]"
        >
          Accept
        </button>
        <button
          onClick={() => decide("rejected")}
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition min-h-[44px]"
        >
          Decline
        </button>
      </div>
    </div>
  );
}

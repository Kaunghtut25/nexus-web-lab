"use client";
import { useEffect } from "react";

// Registers the PWA service worker (public/sw.js) after the page is idle so
// install never competes with first-load hydration. Production only — in dev
// the SW would cache stale chunks across HMR rebuilds.
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    };
    const w = window as any;
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(register, { timeout: 4000 });
      return () => w.cancelIdleCallback(id);
    }
    const t = setTimeout(register, 2500);
    return () => clearTimeout(t);
  }, []);
  return null;
}

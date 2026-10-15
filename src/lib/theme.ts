"use client";
import { useEffect, useState } from "react";

const STORAGE_KEY = "nwl-theme";

// The site is DARK BY DEFAULT (see globals.css). The `.light` class on <html>
// is the opt-in exception. This hook reports whether that class is present so
// components can render the right toggle state; the MutationObserver keeps
// React in sync however the class changes.
export function useTheme() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const update = () => setLight(root.classList.contains("light"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return { light };
}

export function toggleTheme() {
  const root = document.documentElement;
  const nextLight = !root.classList.contains("light");
  root.classList.toggle("light", nextLight);
  try {
    localStorage.setItem(STORAGE_KEY, nextLight ? "light" : "dark");
  } catch {
    /* private mode */
  }
}

// Soft navigations don't re-run the <head> no-flash script, and the server may
// render <html> without the user's saved class — this re-applies it after each
// route change so a visitor who chose light mode keeps it while browsing.
export function applySavedTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const root = document.documentElement;
    if (saved === "light") root.classList.add("light");
    else if (saved === "dark") root.classList.remove("light");
  } catch {
    /* private mode */
  }
}

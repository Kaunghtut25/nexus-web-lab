"use client";
import { useEffect, useState } from "react";

const STORAGE_KEY = "nwl-theme";

// Reads the class the no-flash script (layout.tsx <head>) set before paint.
// MutationObserver keeps React state in sync no matter who toggles the class.
export function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const update = () => setDark(root.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return { dark };
}

export function toggleTheme() {
  const next = !document.documentElement.classList.contains("dark");
  document.documentElement.classList.toggle("dark", next);
  try { localStorage.setItem(STORAGE_KEY, next ? "dark" : "light"); } catch { /* private mode */ }
}

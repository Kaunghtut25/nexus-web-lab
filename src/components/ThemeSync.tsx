"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { applySavedTheme } from "@/lib/theme";

// Re-applies the saved theme class after soft navigations: the server renders
// <html> without theme classes, and the <head> no-flash script only runs on a
// full page load. Admin routes are locked to light by the server, so skip them.
export default function ThemeSync() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    applySavedTheme();
  }, [pathname]);
  return null;
}

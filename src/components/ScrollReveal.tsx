"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Wires the .scroll-reveal CSS (globals.css) to an IntersectionObserver.
// A MutationObserver re-scans for elements that stream in AFTER first hydration
// (Next.js streams the page shell before async server content such as the
// DB-backed homepage sections, so a one-shot querySelectorAll would miss them).
// Reduced-motion users get an instant reveal via the global media query.
export default function ScrollReveal() {
  const pathname = usePathname();
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    const scan = () => {
      document.querySelectorAll(".scroll-reveal:not(.visible)").forEach((el) => io.observe(el));
    };
    scan();
    // Debounced rescan: mutations fire in bursts during hydration/streaming.
    let t = 0;
    const mo = new MutationObserver(() => {
      clearTimeout(t);
      t = window.setTimeout(scan, 150);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      clearTimeout(t);
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);
  return null;
}

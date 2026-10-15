"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Wires the .scroll-reveal CSS (globals.css) to an IntersectionObserver.
// Re-runs on route change so newly rendered sections get observed too.
// Reduced-motion users get an instant reveal via the global media query.
export default function ScrollReveal() {
  const pathname = usePathname();
  useEffect(() => {
    const nodes = document.querySelectorAll(".scroll-reveal:not(.visible)");
    document.documentElement.dataset.revealInit = String(nodes.length);
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
    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}

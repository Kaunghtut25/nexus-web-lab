"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CountUp — animated number that counts up when scrolled into view.
 *
 * - SSR-safe: renders the real value on the server (and as an sr-only fallback),
 *   so SEO / no-JS visitors always see the true number.
 * - Counts up once on first intersection with an ease-out cubic curve.
 * - Respects prefers-reduced-motion (jumps straight to the final value).
 * - Handles suffixes and decimals: "134+", "98.9%", "24/7" all parse cleanly.
 */
export default function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const numeric = match ? parseFloat(match[1]) || 0 : 0;
  const suffix = match ? match[2] : value;
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;

  useEffect(() => {
    let raf = 0;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Initial state is already the final value; nothing to animate.
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        const start = performance.now();
        const duration = 1000;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          const current = numeric * eased;
          const text = decimals > 0 ? current.toFixed(decimals) : String(Math.round(current));
          setDisplay(text + suffix);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        setDisplay((decimals > 0 ? "0." + "0".repeat(decimals) : "0") + suffix);
        raf = requestAnimationFrame(tick);
        obs.disconnect();
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [numeric, suffix, decimals, value]);

  return (
    <span ref={ref} className={className}>
      {display}
      <span className="sr-only">{value}</span>
    </span>
  );
}

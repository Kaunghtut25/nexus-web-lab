"use client";

import { useRef } from "react";

/**
 * Magnetic — wraps an element so it gently tracks toward the cursor on hover
 * and springs back to center on leave. A premium micro-interaction for primary
 * CTAs.
 *
 * - Transform-only (GPU-composited), so no layout shift or repaint cost.
 * - Disabled for touch devices (no hover) and prefers-reduced-motion.
 */
export default function Magnetic({
  children,
  className = "",
  strength = 0.25,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined") {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!window.matchMedia("(hover: hover)").matches) return;
    }
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        display: "inline-block",
        transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

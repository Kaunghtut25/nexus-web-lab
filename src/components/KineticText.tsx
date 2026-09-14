"use client";

/**
 * KineticText — splits a string into words and reveals them one-by-one with a
 * staggered rise + fade on mount. A one-time entrance (never loops), used for
 * the hero headline.
 *
 * - SSR-safe: words are plain text spans server-side; the animation only adds
 *   a transform/opacity entrance.
 * - Reduced-motion safe: the global `prefers-reduced-motion` rule collapses the
 *   animation (and, with `animation-delay: 0`, the stagger) to instant.
 */
export default function KineticText({ text, className = "" }: { text: string; className?: string }) {
  const words = (text || "").split(/\s+/).filter(Boolean);
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={`${i}-${word}`}
          className="kinetic-word"
          style={{ animationDelay: `${i * 70}ms` }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}

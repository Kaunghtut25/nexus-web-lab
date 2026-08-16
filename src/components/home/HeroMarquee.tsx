"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { prefillHref } from "@/lib/lead-prefill";

// Animated counter component (SSR renders real value; count-up on view; reduced-motion safe)
function Counter({ value, label }: { value: string; label: string }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLDivElement>(null);
  const match = value.match(/^(\d+)(.*)$/);
  const numeric = match ? parseInt(match[1], 10) || 0 : 0;
  const suffix = match ? match[2] : value;

  useEffect(() => {
    let raf = 0;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const start = performance.now();
        const duration = 900;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(String(Math.round(numeric * eased)) + suffix);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        setDisplay("0" + suffix);
        raf = requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [numeric, suffix, value]);

  return (
    <div ref={ref} className="glass px-2.5 py-2 text-center holo-border">
      <div className="text-lg sm:text-xl font-bold text-slide">{display}</div>
      <div className="text-[11px] text-slate-300 mt-0.5">{label}</div>
      <span className="sr-only">{value}</span>
    </div>
  );
}

// ═══ HERO MARQUEE — isolated from the rest of the homepage ═══
// 1) Slide state lives HERE, so a slide change re-renders only this component.
// 2) TRUE CROSSFADE, never a black gap: when the slide changes, the OLD image
//    stays mounted and fades out (opacity → 0) while the NEW image is mounted
//    on top and fades in (CSS animation 0 → 1). Only 2 layers exist during the
//    transition; the outgoing layer unmounts when done. No hidden phase, no
//    dark background flash between images.
// 3) All slide titles/subtitles are stacked and crossfade via pure CSS opacity —
//    no React remount, no drop-shadow filter replay per slide.
export default function HeroMarquee({
  slides,
  settings,
}: {
  slides: any[];
  settings: Record<string, string>;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  // The slide whose image is currently visible at full opacity.
  const [displayed, setDisplayed] = useState(0);
  // The slide whose image is still mounted and fading out (null when idle).
  const [leaving, setLeaving] = useState<number | null>(null);
  const s = (k: string, fb: string) => settings[k] || fb;

  const nextSlide = useCallback(() => setCurrentSlide((prev) => (prev + 1) % slides.length), [slides.length]);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    // Auto-advance only while the tab is visible.
    const timer = setInterval(() => {
      if (document.visibilityState === 'visible') nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Crossfade: keep the old layer fading out while the new one fades in on top.
  // The outgoing layer unmounts after the transition completes.
  useEffect(() => {
    if (currentSlide === displayed) return;
    setLeaving(displayed);
    setDisplayed(currentSlide);
    const t = setTimeout(() => setLeaving(null), 650);
    return () => clearTimeout(t);
  }, [currentSlide, displayed]);

  return (
    <section className="relative -mt-20 min-h-[420px] sm:min-h-[500px] lg:min-h-[560px] bg-[#050816] text-white overflow-hidden">
      {/* Preload the other slides into the browser cache WITHOUT mounting them as
          layers — a swap never waits on fetch. Only the outgoing + incoming layers
          exist during the crossfade. */}
      {slides.map((slide, i) => i !== displayed && i !== leaving ? (
        <link key={i} rel="preload" as="image" href={slide.img || slide.image} fetchPriority="low" />
      ) : null)}
      {/* Outgoing layer — fades out while the new image fades in on top (no black gap) */}
      {leaving !== null && leaving !== displayed && (
        <div key={`out-${leaving}`} className="absolute inset-0 transition-opacity duration-500 ease-out opacity-0" aria-hidden="true">
          <Image src={slides[leaving]?.img || slides[leaving]?.image} alt="" width={1376} height={768} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1376px" quality={75} className="absolute inset-0 w-full h-full object-cover" />
        </div>
      )}
      {/* Incoming/current layer — visible at full opacity; CSS animation fades it in on mount */}
      <div key={`in-${displayed}`} className="absolute inset-0 hero-crossfade-in">
        <Image src={slides[displayed]?.img || slides[displayed]?.image} alt={slides[displayed]?.title || ''} width={1376} height={768} priority sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1376px" quality={75} className="absolute inset-0 w-full h-full object-cover" />
      </div>
      {/* Dot grid — very subtle */}
      <div className="absolute inset-0 dot-grid z-[1] opacity-10" />
      {/* Center scrim — soft radial dark glow behind the text only */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,8,22,0.55)_0%,rgba(5,8,22,0.3)_45%,transparent_75%)] z-[1]" aria-hidden="true" />
      {/* Top scrim — keeps nav readable without a visible bar */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#050816]/45 via-[#050816]/10 to-transparent z-[2]" />

      <div className="relative z-10 flex items-center min-h-[420px] sm:min-h-[500px] lg:min-h-[560px] max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="max-w-3xl">
          <span className="hero-item hero-d1 inline-flex items-center gap-2 glass rounded-full px-3 py-1 mb-5 text-xs sm:text-sm text-cyan-200 font-semibold glow-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {s('heroBadge','Available for new projects')}
            <span className="text-slate-300">•</span>
            <span className="text-cyan-300 font-bold">2026 Ready</span>
          </span>

          {/* All titles/subtitles stacked in ONE grid cell — height stays constant
              (no layout shift), pure CSS opacity crossfade, no React remount.
              text-shadow instead of drop-shadow filter: shadows paint with the text
              layer instead of forcing a separate filtered layer per slide. */}
          <div className="grid">
            {slides.map((slide, i) => (
              <div key={i} aria-hidden={i !== currentSlide} className={`col-start-1 row-start-1 transition-opacity duration-500 ease-out ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] mb-3 cursor-default [text-shadow:0_2px_4px_rgba(5,8,22,0.95),0_4px_16px_rgba(5,8,22,0.9),0_8px_32px_rgba(5,8,22,0.7)]">
                  <span className="text-white glow-text hover-green-blue">{slide.title || s('heroTitle', '')}</span>
                </h1>
                <p className="text-sm sm:text-base mb-6 leading-relaxed max-w-xl cursor-default [text-shadow:0_1px_3px_rgba(5,8,22,0.95),0_3px_12px_rgba(5,8,22,0.95),0_6px_24px_rgba(5,8,22,0.75)]">
                  <span className="text-slide glow-text hover-green-blue" style={{ animationDuration: '7s' }}>{slide.subtitle || s('heroSubtitle', '')}</span>
                </p>
              </div>
            ))}
          </div>

          <div className="hero-item hero-d4 flex flex-wrap gap-4">
            <Link href={prefillHref('/contact', { source: 'Home page — nexusweblab.com' })} className="neon-btn min-h-[52px]">
              {s('heroCta','Start Your Project')} <ArrowRight size={20} />
            </Link>
            <Link href="/portfolio" className="inline-flex items-center gap-2 glass text-white font-semibold px-6 py-3 rounded-xl text-sm sm:text-base hover:bg-white/10 transition-all min-h-[52px]">
              {s('heroViewPortfolio','View Portfolio')}
            </Link>
          </div>

          {/* Animated counters */}
          <div className="hero-item hero-d5 hidden md:grid grid-cols-4 gap-2 mt-5 max-w-xl">
            {[
              {v:s('stat1Value','134+'), l:s('stat1Label','Projects Delivered')},
              {v:s('stat2Value','129+'), l:s('stat2Label','Happy Clients')},
              {v:s('stat3Value','98.9%'), l:s('stat3Label','Client Satisfaction')},
              {v:s('stat4Value','24/7'), l:s('stat4Label','Support')},
            ].map((st) => (
              <Counter key={st.l} value={st.v} label={st.l} />
            ))}
          </div>
        </div>
      </div>

      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 min-w-[48px] min-h-[48px] p-3 rounded-xl glass text-white hover:bg-white/10 transition-all hidden sm:block" aria-label="Previous">
        <ChevronLeft size={22} />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 min-w-[48px] min-h-[48px] p-3 rounded-xl glass text-white hover:bg-white/10 transition-all hidden sm:block" aria-label="Next">
        <ChevronRight size={22} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrentSlide(i)} className={`flex items-center justify-center min-w-[44px] min-h-[44px] group`} aria-label={`Go to slide ${i + 1}`}>
            <span className={`block h-2 rounded-full transition-all ${i === currentSlide ? 'bg-gradient-to-r from-blue to-cyan w-10' : 'bg-white/30 hover:bg-white/50 w-2 group-hover:bg-white/60'}`} />
          </button>
        ))}
      </div>
    </section>
  );
}

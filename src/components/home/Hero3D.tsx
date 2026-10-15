"use client";
import { useEffect, useRef } from "react";

// Lightweight "3D" hero layer — a perspective particle field with connecting
// lines, drawn on a 2D canvas with manual z-projection. Chosen over three.js
// (~600KB) to keep the hero's main-thread cost near zero; the whole field is
// ~80 points and pauses off-screen, on hidden tabs, and for reduced-motion.
interface Star { x: number; y: number; z: number; }

export default function Hero3D({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let W = 0, H = 0, dpr = 1;
    const COUNT = 80;
    const FOV = 320;
    const stars: Star[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width; H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    for (let i = 0; i < COUNT; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 900,
        y: (Math.random() - 0.5) * 500,
        z: Math.random() * 900 + 80,
      });
    }

    const project = (s: Star) => {
      const k = FOV / s.z;
      return { px: W / 2 + s.x * k, py: H / 2 + s.y * k, k };
    };

    let mouseX = 0, mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 24;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("resize", resize, { passive: true });

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      ctx.save();
      ctx.translate(mouseX * 0.4, mouseY * 0.4);

      for (const s of stars) {
        s.z -= 1.1;                       // drift toward the viewer
        if (s.z < 60) {
          s.z = 980;
          s.x = (Math.random() - 0.5) * 900;
          s.y = (Math.random() - 0.5) * 500;
        }
      }

      const pts = stars.map(project);
      // Connecting lines between near neighbours (limited: z-sorted window)
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          if (Math.abs(stars[i].z - stars[j].z) > 160) continue;
          const dx = pts[i].px - pts[j].px, dy = pts[i].py - pts[j].py;
          const d2 = dx * dx + dy * dy;
          if (d2 > 130 * 130) continue;
          const alpha = (1 - Math.sqrt(d2) / 130) * 0.16 * Math.min(pts[i].k, pts[j].k) * 2.2;
          if (alpha <= 0.012) continue;
          ctx.strokeStyle = `rgba(96,165,250,${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(pts[i].px, pts[i].py);
          ctx.lineTo(pts[j].px, pts[j].py);
          ctx.stroke();
        }
      }
      // Dots
      for (let i = 0; i < pts.length; i++) {
        const r = Math.max(0.6, 2.4 * pts[i].k);
        const a = Math.min(0.55, 0.18 + pts[i].k * 0.9);
        ctx.fillStyle = `rgba(148,197,255,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(pts[i].px, pts[i].py, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    // Pause when the hero scrolls away or the tab is hidden — no background cost.
    const io = new IntersectionObserver(([e]) => {
      const want = e.isIntersecting && document.visibilityState === "visible";
      if (want && !running) { running = true; raf = requestAnimationFrame(draw); }
      else if (!want && running) { running = false; cancelAnimationFrame(raf); }
    }, { threshold: 0.02 });
    io.observe(canvas);

    const onVis = () => {
      const visible = document.visibilityState === "visible";
      if (visible && !running) { running = true; raf = requestAnimationFrame(draw); }
      else if (!visible && running) { running = false; cancelAnimationFrame(raf); }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
    />
  );
}

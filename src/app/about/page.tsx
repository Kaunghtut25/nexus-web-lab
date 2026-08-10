"use client";
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers } from "lucide-react";
import { prefillHref } from "@/lib/lead-prefill";

export default function AboutPage() {
  const [settings, setSettings] = useState<Record<string,string>>({});
  useEffect(() => {
    fetch('/api/settings').then(r=>r.json()).then(d=>setSettings(d.settings||{}));
  }, []);
  const s = (k: string, d: string) => settings[k] || d;

  return (
    <>
      <title>About Us — Nexus Web Lab</title>
      <meta name="description" content="Learn about Nexus Web Lab — a professional web development & digital agency in Yangon, Myanmar. Our team, mission, and values." />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative -mt-20 h-[50vh] min-h-[400px] sm:min-h-[500px] lg:min-h-[560px] flex items-center overflow-hidden">
          <Image src="/images/hero/about-hero.jpg" alt="About Nexus" fill priority sizes="100vw" className="object-cover hero-kenburns" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,8,22,0.55)_0%,rgba(5,8,22,0.3)_42%,transparent_75%)]" aria-hidden="true" />
          <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
            <div className="hero-item hero-d1 w-14 h-1 bg-gradient-to-r from-blue to-cyan rounded mx-auto mb-5" />
            <h1 className="hero-item hero-d2 text-4xl sm:text-5xl font-extrabold text-white mb-4 [text-shadow:0_0_4px_rgba(5,8,22,0.95),0_2px_10px_rgba(5,8,22,0.95),0_5px_20px_rgba(5,8,22,0.85),0_0_48px_rgba(5,8,22,0.6)]">About {s('siteName','Nexus')}</h1>
            <p className="hero-item hero-d3 text-white text-lg [text-shadow:0_0_3px_rgba(5,8,22,0.95),0_1px_6px_rgba(5,8,22,0.95),0_3px_14px_rgba(5,8,22,0.85)]">{s('tagline','Your digital partner in Yangon, Myanmar')}</p>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 mesh-bg">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-1.5 mb-4 text-sm text-blue-600 font-semibold">
                <Layers size={14} /> About Nexus Web Lab
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3 card-hover-title">{s('aboutTitle','Who We Are')}</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">A Yangon-based digital solutions company building modern, high-performance websites for businesses in Myanmar and beyond.</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-slate-600 leading-relaxed mb-4 whitespace-pre-line">
                  {s('aboutText','Nexus Web Lab is a Yangon-based digital solutions company founded by U Kaung Htut. We specialize in building modern, high-performance websites and web applications for businesses in Myanmar and beyond.')}
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Our mission: Make world-class web development accessible and affordable for Myanmar businesses. Every project we deliver is built with the same care we&apos;d put into our own.
                </p>
                <Link href={prefillHref('/contact', { source: 'About page — nexusweblab.com/about' })} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue to-cyan text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition">
                  Work With Us <ArrowRight size={18} />
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue/10 to-cyan/10 rounded-2xl blur-3xl" />
                <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=1333&fit=crop&q=100" alt="Team working" width={1600} height={1333} loading="lazy" className="relative rounded-2xl shadow-xl w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16" style={{ background: 'linear-gradient(135deg, #0F172A, #1E3A5F)' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[s('stat1Value','105+'), s('stat2Value','104+'), s('stat3Value','100%'), s('stat4Value','24/7')].map((v, i) => (
                <div key={i}>
                  <div className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">{v}</div>
                  <div className="text-slate-400 text-sm font-medium">{[s('stat1Label','Projects Delivered'), s('stat2Label','Happy Clients'), s('stat3Label','Client Satisfaction'), s('stat4Label','Support')][i]}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-20 mesh-bg">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <div className="w-14 h-1 bg-gradient-to-r from-blue to-cyan rounded mx-auto mb-5" />
            <h2 className="text-3xl font-extrabold text-navy mb-12">Our Tech Stack</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {s('aboutTechs','Next.js, React, TypeScript, Tailwind CSS, Node.js, Vercel, Turso DB, OpenAI API, Framer Motion, Lucide Icons').split(',').map(t => t.trim()).filter(Boolean).map((t, i) => (
                <span key={i} className="px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold text-navy hover:border-blue/20 hover:shadow-md transition-all">{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-slate-50 text-center relative overflow-hidden">
          <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=960&fit=crop&q=100" alt="" aria-hidden fill loading="lazy" sizes="100vw" className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-white/60" />
          <div className="relative z-10 max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-extrabold text-navy mb-4">{s('ctaTitle','Have a Project in Mind?')}</h2>
            <p className="text-slate-600 mb-8">{s('ctaSubtitle',"Let's discuss your project. Free consultation, no obligation.")}</p>
            <Link href={prefillHref('/contact', { source: 'About page CTA — nexusweblab.com/about' })} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue to-cyan text-white font-semibold px-8 py-4 rounded-xl hover:shadow-xl hover:shadow-blue/25 transition">
              {s('ctaButton','Get in Touch')} <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

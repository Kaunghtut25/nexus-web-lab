"use client";
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, FolderOpen, Layers } from "lucide-react";
import { prefillHref } from "@/lib/lead-prefill";

export default function PortfolioPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects').then(r=>r.json()).then(d => {
      setProjects((d.projects || []).map((p: any) => ({
        ...p,
        tags: Array.isArray(p.tags) ? p.tags : (typeof p.tags === 'string' ? (() => { try { return JSON.parse(p.tags); } catch { return []; } })() : []),
      })));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <>
      <title>Portfolio — Nexus Web Lab</title>
      <meta name="description" content="See recent work by Nexus Web Lab: modern websites, e-commerce stores, dashboards, and AI integrations built with Next.js and React." />
      <Header />
      <main>
        <section className="relative -mt-20 h-[50vh] min-h-[400px] sm:min-h-[500px] lg:min-h-[560px] flex items-center overflow-hidden">
          <Image src="/images/hero/portfolio-hero.jpg" alt="Portfolio" fill priority sizes="100vw" className="object-cover hero-kenburns" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,8,22,0.55)_0%,rgba(5,8,22,0.3)_42%,transparent_75%)]" aria-hidden="true" />
          <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
            <div className="hero-item hero-d1 w-14 h-1 bg-gradient-to-r from-blue to-cyan rounded mx-auto mb-5" />
            <h1 className="hero-item hero-d2 text-4xl sm:text-5xl font-extrabold text-white mb-4 [text-shadow:0_0_4px_rgba(5,8,22,0.95),0_2px_10px_rgba(5,8,22,0.95),0_5px_20px_rgba(5,8,22,0.85),0_0_48px_rgba(5,8,22,0.6)]">Our Portfolio</h1>
            <p className="hero-item hero-d3 text-white text-lg [text-shadow:0_0_3px_rgba(5,8,22,0.95),0_1px_6px_rgba(5,8,22,0.95),0_3px_14px_rgba(5,8,22,0.85)]">Real projects. Real results. Built for real clients.</p>
          </div>
        </section>

        <section className="pt-14 sm:pt-20 pb-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-1.5 mb-2 text-sm text-blue-600 font-semibold">
                <Layers size={14} /> Featured Work
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-2 card-hover-title">Projects We&apos;re Proud Of</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">Real websites we have designed, built and launched for businesses across Myanmar and beyond.</p>
            </div>
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue animate-pulse" />
                  <span className="w-3 h-3 rounded-full bg-blue animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <span className="w-3 h-3 rounded-full bg-blue animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <FolderOpen size={48} className="mx-auto mb-4 opacity-30" />
                <p>No projects yet. Add projects in the admin panel.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((p, pi) => {
                  const PF = [
                    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=1200&fit=crop&q=100',
                    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1200&fit=crop&q=100',
                    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1920&h=1200&fit=crop&q=100',
                    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1200&fit=crop&q=100',
                    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1200&fit=crop&q=100',
                    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&h=1200&fit=crop&q=100',
                    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1200&fit=crop&q=100',
                  ];
                  return (
                  <a key={p.id} href={p.url || '#'} target="_blank" rel="noopener noreferrer" className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-blue/5 transition-all duration-300 block">
                    <div className="relative h-52 overflow-hidden bg-slate-100">
                      <img src={p.image || PF[pi % PF.length]} alt={p.title} width={800} height={600} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      {p.featured && (
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-white/90 rounded-full text-xs font-semibold text-navy">Featured</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <p className="text-xs text-slate-400 mb-1">{p.client || 'Client'}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-lg font-bold text-navy group-hover:text-blue transition">{p.title}</h3>
                        <ExternalLink size={14} className="text-slate-300 group-hover:text-blue transition" />
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed mb-4">{p.description || ''}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.tags.map((t: string) => <span key={t} className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">{t}</span>)}
                      </div>
                    </div>
                  </a>
                );
                })}
              </div>
            )}
          </div>
        </section>

        <section className="py-20 mesh-bg text-center relative overflow-hidden">
          <Image src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=960&fit=crop&q=100" alt="" aria-hidden fill loading="lazy" sizes="100vw" className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-white/50" />
          <div className="relative z-10 max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-extrabold text-navy mb-4">Want to be our next project?</h2>
            <p className="text-slate-600 mb-8">Let&apos;s build something amazing together.</p>
            <Link href={prefillHref('/contact', { source: 'Portfolio page — nexusweblab.com/portfolio' })} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue to-cyan text-white font-semibold px-8 py-4 rounded-xl hover:shadow-xl hover:shadow-blue/25 transition">
              Start Your Project <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

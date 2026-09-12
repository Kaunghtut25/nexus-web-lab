import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: "/portfolio",
  },
  title: 'Portfolio — Nexus Web Lab',
  description: 'See recent work by Nexus Web Lab: modern websites, e-commerce stores, dashboards, and AI integrations built with Next.js and React.',
};

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, FolderOpen, Layers, Target, Lightbulb, TrendingUp, Cpu } from "lucide-react";
import { prefillHref } from "@/lib/lead-prefill";

// Case-study fallbacks — used ONLY when the DB has no project with
// case-study fields (problem/solution/result). DB is the source of truth:
// the same fields can be edited in Admin → Projects.
const CASE_STUDY_FALLBACKS = [
  {
    name: 'A9 Global Travels',
    category: 'Travel & Tourism',
    problem: 'A Myanmar travel agency needed a modern booking platform to replace manual tour/hotel/car/visa inquiries, but had no online presence that could be updated without a developer.',
    solution: 'We designed a premium navy-and-gold travel site (35+ pages) with tours, hotels, car rental, visas, search and booking flows — plus a full admin panel to manage every listing in-house.',
    result: 'The agency now runs its entire catalog online with a searchable booking experience, and staff update tours, prices and hotels themselves — no developer needed.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
  },
  {
    name: 'Stardust.co',
    category: 'E-Commerce',
    problem: 'A cosmetics brand wanted to sell online in Myanmar with local payment support, but needed more than a static catalog — they needed a store that captures and converts visitors.',
    solution: 'We built a full e-commerce platform with product catalog, cart, orders, tracking and account areas, and embedded an AI live-chat assistant that answers shoppers 24/7.',
    result: 'The store went live with an AI sales assistant that qualifies visitors and captures leads around the clock — every conversation becomes a potential sale.',
    tech: ['Next.js', 'E-Commerce', 'AI Chat', 'Tailwind CSS'],
  },
  {
    name: 'Nexus AI Chatbot',
    category: 'AI / Automation',
    problem: 'Businesses lose leads after hours because nobody answers website visitors at night — and FAQs are repetitive, consuming staff time every day.',
    solution: 'We built a production AI chatbot with real-time SSE streaming, glass-morphism UI, and lead capture wired to notifications — trained on each business\'s own info.',
    result: 'The chatbot answers instantly 24/7, collects visitor contact details, and hands off to humans when needed — turning after-hours traffic into captured leads.',
    tech: ['Next.js', 'AI', 'Streaming SSE', 'Edge Runtime'],
  },
];

export default async function PortfolioPage() {
  let projects: any[] = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nexusweblab.com';
    const res = await fetch(`${baseUrl}/api/projects`, { next: { revalidate: 300 } });
    const d = await res.json();
    projects = (d.projects || []).map((p: any) => ({
      ...p,
      tags: Array.isArray(p.tags) ? p.tags : (typeof p.tags === 'string' ? (() => { try { return JSON.parse(p.tags); } catch { return []; } })() : []),
      tech: Array.isArray(p.tech) ? p.tech : (typeof p.tech === 'string' ? (() => { try { return JSON.parse(p.tech); } catch { return []; } })() : []),
    }));
  } catch { /* fallback: show empty */ }

  const caseStudies = projects
    .filter((p: any) => p.problem && p.solution && p.result)
    .map((p: any) => ({
      name: p.title,
      category: p.category || p.client || 'Case Study',
      problem: p.problem,
      solution: p.solution,
      result: p.result,
      tech: Array.isArray(p.tech) && p.tech.length ? p.tech : (typeof p.tags === 'string' ? p.tags.split(',').map((t:string)=>t.trim()).filter(Boolean) : (Array.isArray(p.tags) ? p.tags : [])),
    }));
  const displayCaseStudies = caseStudies.length > 0 ? caseStudies : CASE_STUDY_FALLBACKS;

  return (
    <>
      <link rel="preconnect" href="/api/projects" />
      <Header />
      <main id="main-content">
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
            {projects.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                <FolderOpen size={48} className="mx-auto mb-4 opacity-30" />
                <p>No projects yet. Add projects in the admin panel.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((p, pi) => {
                  const PF = [
                    '/images/remote/remote-1469854523086-cc02fe5d8800-1920w.webp',
                    '/images/remote/remote-1486406146926-c627a92ad1ab-1920w.webp',
                    '/images/remote/remote-1553877522-43269d4ea984-1920w.webp',
                    '/images/remote/remote-1522071820081-009f0129c71c-1600w.webp',
                    '/images/remote/remote-1460925895917-afdab827c52f-1920w.webp',
                    '/images/remote/remote-1504384308090-c894fdcc538d-1920w.webp',
                    '/images/remote/remote-1497366216548-37526070297c-1920w.webp',
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
                      <p className="text-xs text-slate-500 mb-1">{p.client || 'Client'}</p>
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

        {/* Case Studies — Problem → Solution → Result → Tech */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-1.5 mb-2 text-sm text-blue-600 font-semibold">
                <Target size={14} /> Case Studies
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-2 card-hover-title">How We Solve Real Problems</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">Every project starts with a problem. Here is what changed for our clients.</p>
            </div>
            <div className="space-y-8">
              {displayCaseStudies.map((cs, i) => (
                <div key={i} className="group bg-slate-50 border border-slate-100 rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:shadow-blue/5 transition-all duration-300">
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-navy card-hover-title">{cs.name}</h3>
                    <span className="px-3 py-1 bg-gradient-to-r from-blue to-cyan text-white text-xs font-bold rounded-full">{cs.category}</span>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2"><Target size={16} className="text-blue" /><h4 className="font-bold text-navy text-sm uppercase tracking-wide">Problem</h4></div>
                      <p className="text-sm text-slate-500 leading-relaxed">{cs.problem}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2"><Lightbulb size={16} className="text-cyan" /><h4 className="font-bold text-navy text-sm uppercase tracking-wide">Solution</h4></div>
                      <p className="text-sm text-slate-500 leading-relaxed">{cs.solution}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2"><TrendingUp size={16} className="text-emerald-600" /><h4 className="font-bold text-navy text-sm uppercase tracking-wide">Result</h4></div>
                      <p className="text-sm text-slate-500 leading-relaxed">{cs.result}</p>
                    </div>
                  </div>
                  <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide mr-1"><Cpu size={13} /> Technology</span>
                    {cs.tech.map((t: string) => (
                      <span key={t} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 mesh-bg text-center relative overflow-hidden">
          <Image src="/images/remote/remote-1451187580459-43490279c0fa-1920w.webp" alt="" aria-hidden fill loading="lazy" sizes="100vw" className="object-cover opacity-40" />
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

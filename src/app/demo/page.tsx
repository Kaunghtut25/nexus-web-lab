"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { prefillHref } from "@/lib/lead-prefill";
import {
  Sparkles, Globe, Palette, TrendingUp, ShoppingCart, Cloud, Wrench,
  ArrowRight, CheckCircle, Star, Zap, ChevronLeft, ChevronRight,
  Home as HomeIcon, Briefcase, FolderOpen, Info, Rocket, Layers, Gauge, Shield, Code2, Smartphone, Server, Bot, Mail, Phone, FileText
} from "lucide-react";

const TECH_STACK = [
  { name: "Next.js 16", icon: "▲", color: "text-white" },
  { name: "React 19", icon: "⚛", color: "text-cyan-400" },
  { name: "TypeScript", icon: "TS", color: "text-blue-400" },
  { name: "Tailwind CSS", icon: "~", color: "text-cyan-300" },
  { name: "Node.js", icon: "⬢", color: "text-emerald-400" },
  { name: "PostgreSQL", icon: "DB", color: "text-blue-300" },
  { name: "Turso / SQLite", icon: "▤", color: "text-slate-300" },
  { name: "AI Integration", icon: "✦", color: "text-emerald-300" },
  { name: "Vercel Deploy", icon: "▲", color: "text-white" },
  { name: "REST / GraphQL", icon: "⇄", color: "text-cyan-300" },
  { name: "SEO Optimized", icon: "◎", color: "text-emerald-400" },
  { name: "Analytics", icon: "📊", color: "text-amber-300" },
];

const COMPONENTS = [
  {
    id: "tabs",
    label: "Interactive Tabs",
    title: "Tabbed Interface",
    desc: "Content switcher with smooth transitions — exactly how we build product dashboards.",
  },
  {
    id: "counter",
    label: "Animated Counter",
    title: "Count-Up Stats",
    desc: "Numbers animate on scroll — perfect for hero stats, milestones, and KPI sections.",
  },
  {
    id: "accordion",
    label: "FAQ Accordion",
    title: "Expandable FAQ",
    desc: "Accessible accordion with smooth height animation — the standard for support pages.",
  },
  {
    id: "form",
    label: "Smart Form",
    title: "Validated Forms",
    desc: "Real-time validation, loading states, and success feedback — no dead buttons.",
  },
];

function CountUp({ target }: { target: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const start = performance.now();
        const dur = 1400;
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <div ref={ref}>{val.toLocaleString()}+</div>;
}

function MinimalHeader() {
  const nav = [
    { label: "Home", href: "/", icon: HomeIcon },
    { label: "Services", href: "/services", icon: Briefcase },
    { label: "Portfolio", href: "/portfolio", icon: FolderOpen },
    { label: "Blog", href: "/blog", icon: FileText },
    { label: "About", href: "/about", icon: Info },
  ];
  return (
    <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <img src="/logo.png" alt="Nexus Web Lab" width={512} height={512} className="h-9 w-auto transition-transform group-hover:scale-105" />
          <span className="hidden sm:block text-white font-black text-lg tracking-tight">Nexus Web Lab</span>
        </Link>
        <nav className="hidden md:flex items-center gap-0.5">
          {nav.map((n) => {
            const Icon = n.icon;
            return (
              <Link key={n.href} href={n.href} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-white hover:bg-blue/10">
                <Icon size={16} className="text-blue/70" />
                <span>{n.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

function MinimalFooter() {
  return (
    <footer className="bg-navy text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.png" alt="Nexus Web Lab" width={512} height={512} className="h-9 w-auto" />
            <span className="text-white font-black text-lg">Nexus Web Lab</span>
          </div>
          <p className="text-sm leading-relaxed">Professional web development & digital solutions.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/services/web-development" className="hover:text-cyan transition">Web Development</Link></li>
            <li><Link href="/services/ui-ux-design" className="hover:text-cyan transition">UI/UX Design</Link></li>
            <li><Link href="/services/seo-package" className="hover:text-cyan transition">SEO Optimization</Link></li>
            <li><Link href="/services/hosting-deploy" className="hover:text-cyan transition">Hosting & Deploy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/about" className="hover:text-cyan transition">About Us</Link></li>
            <li><Link href="/portfolio" className="hover:text-cyan transition">Portfolio</Link></li>
            <li><Link href="/blog" className="hover:text-cyan transition">Blog</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Nexus Web Lab. All rights reserved.
      </div>
    </footer>
  );
}

export default function DemoPage() {
  const [activeComp, setActiveComp] = useState("tabs");
  const [tab, setTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [budget, setBudget] = useState(600);
  const [form, setForm] = useState({ name: '', email: '' });
  const [formSent, setFormSent] = useState(false);
  const [formErr, setFormErr] = useState('');

  const faqs = [
    { q: "How long does a website take?", a: "A standard business site ships in 5–10 days. E-commerce and custom apps typically take 2–4 weeks depending on scope." },
    { q: "Do you include revisions?", a: "Yes — every project includes free revision rounds until you're happy with the result." },
    { q: "Is hosting included?", a: "We deploy on Vercel / Netlify with fast global CDN. Hosting setup is included; the platform bill is separate." },
    { q: "Can you work with existing code?", a: "Absolutely. We audit, extend, and modernize existing codebases too — not just greenfield builds." },
  ];

  const tabs = ["Overview", "Features", "Pricing", "Support"];

  const plans = [
    { name: "Essential", price: 300, feat: ["5-page website", "Mobile responsive", "Contact form", "Basic SEO", "1 revision round"] },
    { name: "Business", price: 800, feat: ["Up to 12 pages", "CMS / admin panel", "Blog section", "Advanced SEO", "3 revision rounds", "Priority support"] },
    { name: "Custom App", price: 1500, feat: ["Web app / dashboard", "Database + API", "AI integration", "User accounts", "Unlimited revisions", "Dedicated support"] },
  ];

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) { setFormErr("Please enter your name and a valid email."); return; }
    setFormErr(''); setFormSent(true);
  };

  const renderComponent = () => {
    switch (activeComp) {
      case "tabs":
        return (
          <div>
            <div className="flex gap-2 mb-6 flex-wrap">
              {tabs.map((t, i) => (
                <button key={t} onClick={() => setTab(i)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === i ? 'bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  {t}
                </button>
              ))}
            </div>
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 min-h-[140px]">
              {tab === 0 && <p className="text-slate-600">A fast, SEO-friendly single-page app built with Next.js — server-rendered for speed, hydrated for interactivity.</p>}
              {tab === 1 && <ul className="space-y-2 text-slate-600">{["Responsive on every device", "Dark mode support", "Accessible keyboard navigation", "Lazy-loaded images & fonts"].map(f => <li key={f} className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500" />{f}</li>)}</ul>}
              {tab === 2 && <p className="text-slate-600">Transparent pricing from <strong>$300</strong>. No hidden fees — pick a plan below and we'll tailor it to your needs.</p>}
              {tab === 3 && <p className="text-slate-600">24/7 support via chat and email. You're never left guessing.</p>}
            </div>
          </div>
        );
      case "counter":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[128, 96, 99, 24].map((n, i) => (
              <div key={i} className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"><CountUp target={n} /></div>
                <div className="text-xs text-slate-500 mt-1">{["Projects", "Clients", "% Happy", "/7 Support"][i]}</div>
              </div>
            ))}
          </div>
        );
      case "accordion":
        return (
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-navy hover:bg-slate-50 transition">
                  {f.q}
                  <span className={`text-blue transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                <div className={`px-5 text-sm text-slate-500 leading-relaxed transition-all duration-300 ${openFaq === i ? 'pb-5 max-h-40' : 'max-h-0 overflow-hidden'}`}>{f.a}</div>
              </div>
            ))}
          </div>
        );
      case "form":
        return (
          <form onSubmit={submitForm} className="max-w-md">
            {formSent ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                <CheckCircle size={36} className="text-emerald-500 mx-auto mb-3" />
                <p className="font-bold text-emerald-700 mb-1">Message sent!</p>
                <p className="text-sm text-emerald-600">This is exactly the success state we build for every form.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue/40" />
                  <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Your email" className="px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue/40" />
                </div>
                {formErr && <p className="text-xs text-red-500 mb-3">{formErr}</p>}
                <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 text-white text-sm font-semibold hover:opacity-90 transition">
                  Send Message <ArrowRight size={15} />
                </button>
              </>
            )}
          </form>
        );
    }
  };

  return (
    <>
      <MinimalHeader />
      <main>
        {/* HERO */}
        <section className="relative bg-[#050816] overflow-hidden py-20 sm:py-28">
          <div className="orb w-[500px] h-[500px] bg-blue-500/20 top-[-200px] right-[-150px]" />
          <div className="orb w-[400px] h-[400px] bg-emerald-500/15 bottom-[-150px] left-[-100px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 bg-blue/20 rounded-full px-4 py-1.5 mb-6 border border-blue/20 text-sm text-blue-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Interactive Demo
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 text-white">
                See What <span className="text-slide">Nexus Web Lab</span> Can Build For You
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
                This page is a real, working product — not a static mockup. Every component below is interactive, responsive, and production-ready. This is the quality you get on every project.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={prefillHref('/get-quote', { service: 'Web Development / Custom Web App', features: ['Real interactive demo components','Responsive, production-ready build','Next.js + React + Tailwind CSS'], source: 'Live demo page — nexusweblab.com/demo' })} className="gradient-btn text-white font-semibold px-8 py-4 rounded-xl inline-flex items-center gap-2">
                  Get a Free Quote <ArrowRight size={18} />
                </Link>
                <Link href="/portfolio" className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all">
                  View Portfolio
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ToS Disclaimer */}
        <section className="py-6 bg-gradient-to-r from-blue/10 to-cyan/10 border-y border-blue/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex items-start justify-center gap-3">
              <Sparkles size={18} className="text-blue mt-0.5 flex-shrink-0" />
              <p className="text-sm sm:text-base text-navy font-medium leading-relaxed">
                Visiting from Fiverr or Upwork? We respect platform policies. Please contact and hire us exclusively through your platform messaging thread.
              </p>
            </div>
          </div>
        </section>

        {/* TECH STACK */}
        <section className="py-16 sm:py-20 mesh-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <div className="w-14 h-1 bg-gradient-to-r from-blue to-cyan rounded mx-auto mb-5" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3">Modern Tech Stack</h2>
              <p className="text-slate-500">The tools we use to build fast, secure, future-proof products.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {TECH_STACK.map((t) => (
                <div key={t.name} className="bg-white rounded-2xl border border-slate-100 p-5 text-center hover:border-blue/20 hover:shadow-md transition-all">
                  <div className={`text-2xl font-black mb-2 ${t.color}`}>{t.icon}</div>
                  <div className="text-sm font-semibold text-navy">{t.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTERACTIVE COMPONENTS */}
        <section className="py-16 sm:py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <div className="w-14 h-1 bg-gradient-to-r from-blue to-cyan rounded mx-auto mb-5" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3">Interactive Components — Try Them</h2>
              <p className="text-slate-500">Every element is clickable. This is the level of polish you get on your project.</p>
            </div>
            <div className="grid lg:grid-cols-[280px_1fr] gap-6 mb-16">
              <div className="flex lg:flex-col gap-2">
                {COMPONENTS.map((c) => (
                  <button key={c.id} onClick={() => setActiveComp(c.id)} className={`text-left px-5 py-4 rounded-2xl border transition-all ${activeComp === c.id ? 'bg-gradient-to-r from-emerald-500 to-blue-600 text-white border-transparent shadow-lg' : 'bg-white border-slate-100 text-navy hover:border-blue/20'}`}>
                    <div className="font-bold text-sm mb-0.5">{c.label}</div>
                    <div className={`text-xs ${activeComp === c.id ? 'text-white/80' : 'text-slate-400'}`}>{c.title}</div>
                  </button>
                ))}
              </div>
              <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-10 shadow-sm">
                {renderComponent()}
              </div>
            </div>
          </div>
        </section>

        {/* PRICING CALCULATOR */}
        <section className="py-16 sm:py-20 mesh-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <div className="w-14 h-1 bg-gradient-to-r from-blue to-cyan rounded mx-auto mb-5" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3">Budget Calculator</h2>
              <p className="text-slate-500">Drag the slider — see instantly which plan fits your budget.</p>
            </div>
            <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-center max-w-5xl mx-auto">
              <div className="bg-white rounded-3xl border border-slate-100 p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-slate-500">Your Budget</span>
                  <span className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">${budget}</span>
                </div>
                <input type="range" min={200} max={2000} step={50} value={budget} onChange={e => setBudget(+e.target.value)} className="w-full accent-blue" aria-label="Budget" />
                <div className="flex justify-between text-xs text-slate-400 mt-2"><span>$200</span><span>$2,000</span></div>
                <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-600">
                  <strong className="text-navy">Recommended:</strong>{" "}
                  {budget < 500 ? "Essential Plan — perfect landing page or 5-page business site." : budget < 1100 ? "Business Plan — full site with CMS, blog & SEO." : "Custom App — dashboard, database, AI features & more."}
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {plans.map((p) => (
                  <div key={p.name} className={`rounded-2xl border p-6 flex flex-col ${budget >= p.price ? 'border-blue/30 bg-white shadow-lg' : 'border-slate-200 bg-white/60'}`}>
                    <h3 className="font-bold text-navy mb-1">{p.name}</h3>
                    <div className="text-2xl font-black text-blue mb-4">${p.price}<span className="text-xs text-slate-400 font-normal">+</span></div>
                    <ul className="space-y-2 text-xs text-slate-500 flex-1">
                      {p.feat.map(f => <li key={f} className="flex items-start gap-1.5"><CheckCircle size={13} className="text-emerald-500 mt-0.5 flex-shrink-0" />{f}</li>)}
                    </ul>
                    <Link href={prefillHref('/get-quote', { service: p.name, pkg: 'Budget Calculator plan', price: `$${p.price}+`, features: p.feat, source: `Live demo page (budget $${budget}) — nexusweblab.com/demo` })} className={`mt-5 text-center text-sm font-semibold py-2.5 rounded-xl transition ${budget >= p.price ? 'bg-gradient-to-r from-emerald-500 to-blue-600 text-white hover:opacity-90' : 'text-slate-400 pointer-events-none'}`}>
                      {budget >= p.price ? 'Choose Plan' : 'Above budget'}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section className="py-16 sm:py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <div className="w-14 h-1 bg-gradient-to-r from-blue to-cyan rounded mx-auto mb-5" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3">Why Clients Choose Us</h2>
              <p className="text-slate-500">Results you can measure, quality you can see.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Code2 size={26} />, title: "Clean Code", desc: "Type-safe, documented, easy to maintain and extend." },
                { icon: <Gauge size={26} />, title: "Fast & Secure", desc: "Lighthouse 90+ scores, HTTPS, and best-practice security." },
                { icon: <Smartphone size={26} />, title: "Mobile First", desc: "Pixel-perfect on every screen — phone to desktop." },
                { icon: <Bot size={26} />, title: "AI Integration", desc: "Chatbots and smart features that engage visitors 24/7." },
              ].map((f, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 p-7 hover:border-blue/20 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue/10 to-cyan/10 flex items-center justify-center text-blue mb-4">{f.icon}</div>
                  <h3 className="font-bold text-navy mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative bg-[#050816] overflow-hidden py-16">
          <div className="orb w-[400px] h-[400px] bg-blue-500/20 top-[-150px] left-[10%]" />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <Rocket size={40} className="text-cyan-400 mx-auto mb-5" />
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Ready to Build Something Great?</h2>
            <p className="text-slate-300 mb-8">Tell us about your project — get a free, no-obligation quote within 24 hours.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={prefillHref('/get-quote', { source: 'Live demo page — nexusweblab.com/demo' })} className="gradient-btn text-white font-semibold px-8 py-4 rounded-xl inline-flex items-center gap-2">Start Your Project <ArrowRight size={18} /></Link>
            </div>
          </div>
        </section>

        {/* ToS Footer Banner */}
        <section className="py-10 bg-navy text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="flex items-start justify-center gap-3 mb-4">
              <Sparkles size={18} className="text-cyan mt-0.5 flex-shrink-0" />
              <p className="text-sm text-slate-300 leading-relaxed">
                Visiting from Fiverr or Upwork? We respect platform policies. Please contact and hire us exclusively through your platform messaging thread.
              </p>
            </div>
          </div>
        </section>
      </main>
      <MinimalFooter />
    </>
  );
}

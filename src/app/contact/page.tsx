"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Phone, Mail, MapPin, Send, ArrowRight, CreditCard } from "lucide-react";
import PaymentLogos from "@/components/home/PaymentLogos";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<Record<string,string>>({});
  const searchParams = useSearchParams();

  // Read context passed from chatbot (/contact?chat=...) or CTA buttons
  // (/contact?svc=...&msg=...) — prefill the message box + service select.
  const chatContext = searchParams.get("msg") || searchParams.get("chat") || "";
  const svcParam = searchParams.get("svc") || "";

  // Apply service select once params are available (client-side only).
  useEffect(() => {
    const val = svcParam || (chatContext ? (() => {
      const lower = chatContext.toLowerCase();
      const services = ["web development", "e-commerce", "ui/ux", "seo", "hosting", "maintenance", "chatbot"];
      return services.find((s) => lower.includes(s)) || "";
    })() : "");
    if (!val) return;
    const el = document.querySelector<HTMLSelectElement>('select[name="service"]');
    if (!el) return;
    const norm = (s: string) => s.toLowerCase().replace(/[&\/]/g, ' ').replace(/\s+/g, ' ').trim();
    const nval = norm(val);
    const match = [...el.options].find((o) => {
      const no = norm(o.value), nt = norm(o.text);
      return no && (no.includes(nval) || nval.includes(no) || nt.includes(nval) || nval.includes(nt));
    });
    if (match) el.value = match.value;
  }, [svcParam, chatContext]);

  useEffect(() => {
    fetch('/api/settings').then(r=>r.json()).then(d=>setSettings(d.settings||{}));
  }, []);

  const s = (k: string, d: string) => settings[k] || d;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true);
    const form = new FormData(e.currentTarget);
    const body = Object.fromEntries(form);
    try {
      await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body) });
      setSent(true);
    } catch {}
    setLoading(false);
  }

  return (
    <>
      <title>Contact — Nexus Web Lab</title>
      <meta name="description" content="Contact Nexus Web Lab for web development, design, and digital solutions. We reply within 24 hours. Based in Yangon, Myanmar." />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative -mt-20 h-[50vh] min-h-[420px] sm:min-h-[500px] lg:min-h-[560px] flex items-center overflow-hidden">
          <Image src="/images/hero/contact-hero.jpg" alt="Contact" fill priority sizes="100vw" className="object-cover hero-kenburns" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,8,22,0.55)_0%,rgba(5,8,22,0.3)_42%,transparent_75%)]" aria-hidden="true" />
          <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
            <div className="hero-item hero-d1 w-14 h-1 bg-gradient-to-r from-blue to-cyan rounded mx-auto mb-5" />
            <h1 className="hero-item hero-d2 text-3xl sm:text-5xl font-extrabold text-white mb-4 [text-shadow:0_0_4px_rgba(5,8,22,0.95),0_2px_10px_rgba(5,8,22,0.95),0_5px_20px_rgba(5,8,22,0.85),0_0_48px_rgba(5,8,22,0.6)]">Get in Touch</h1>
            <p className="hero-item hero-d3 text-white text-base sm:text-lg leading-relaxed [text-shadow:0_0_3px_rgba(5,8,22,0.95),0_1px_6px_rgba(5,8,22,0.95),0_3px_14px_rgba(5,8,22,0.85)]">Free consultation. Let&apos;s discuss your project.</p>
          </div>
        </section>

        {/* Contact Body */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* How It Works — 3 steps */}
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-bold text-blue uppercase tracking-wider mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> How It Works
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3">From Message to Launch in 3 Steps</h2>
              <p className="text-slate-500 max-w-xl mx-auto">Tell us your idea, get a clear plan, and watch it come to life — simple and transparent.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 mb-16">
              {[
                { n: '01', icon: <Send size={22} />, t: 'Send a Message', d: 'Fill in the form or reach out on any channel — describe your project, goals and timeline.' },
                { n: '02', icon: <ArrowRight size={22} />, t: 'Free Consultation', d: 'We reply within 24 hours with honest advice, a clear plan and a fixed quote — no obligation.' },
                { n: '03', icon: <Mail size={22} />, t: 'Launch & Support', d: 'We design, build and deploy your solution, then stay with you for updates and growth.' },
              ].map((st) => (
                <div key={st.n} className="relative bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <span className="absolute top-5 right-6 text-5xl font-black text-slate-100 select-none">{st.n}</span>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue to-cyan flex items-center justify-center text-white shadow-lg shadow-blue/20 mb-5">{st.icon}</div>
                  <h3 className="font-bold text-navy text-lg mb-2">{st.t}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{st.d}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-5 gap-10">
              {/* Form */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
                  <h2 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
                    <Send size={20} className="text-blue" /> Send a Message
                  </h2>
                  {sent ? (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-8 text-center">
                      <div className="text-5xl mb-3">✅</div>
                      <div className="text-emerald-800 font-bold text-lg">Message Sent!</div>
                      <p className="text-emerald-600 text-sm mt-1">We&apos;ll get back to you within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <input name="name" placeholder="Your Name *" required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-base focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition" />
                        <input name="email" type="email" placeholder="Your Email *" required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-base focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition" />
                      </div>
                      <input name="phone" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-base focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition" />
                      <select name="service" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-base text-slate-600 focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition">
                        <option value="">Service interested in...</option>
                        <option>Web Development</option><option>E-Commerce</option>
                        <option>UI/UX Design</option><option>SEO</option>
                        <option>Hosting & Deploy</option><option>Maintenance</option>
                        <option>AI Chatbot / Automation</option><option>Website Redesign</option>
                        <option>Social Media Management</option><option>Content Writing</option>
                        <option>Logo & Brand Identity</option><option>Business Email Setup</option>
                        <option>Other</option>
                      </select>
                      <textarea name="message" placeholder="Tell us about your project... *" required rows={5} defaultValue={chatContext ? (chatContext.startsWith('Service:') || chatContext.startsWith('Source:') ? chatContext : `[From chatbot conversation]\n${chatContext}`) : ""} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-base focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition resize-none" />
                      <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue to-cyan text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-blue/25 transition-all disabled:opacity-70">
                        {loading ? "Sending..." : <>{'Send Message'} <ArrowRight size={18} /></>}
                      </button>
                      <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5 pt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        We reply within 24 hours — no spam, ever.
                      </p>
                    </form>
                  )}
                </div>

                {/* What Happens Next — fills the space under the form */}
                <div className="bg-gradient-to-br from-navy to-navy-light rounded-2xl p-6 sm:p-8 text-white mt-6">
                  <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> What Happens Next?
                  </h3>
                  <p className="text-sm text-slate-300 mb-6">Your message goes through a simple, fast pipeline — no runaround.</p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { n: '1', t: 'We Review', d: 'Your project details land straight in our inbox within minutes.' },
                      { n: '2', t: 'We Reply', d: 'A real human (not a bot) responds within 24 hours with next steps.' },
                      { n: '3', t: 'We Build', d: 'Free consultation, clear quote, then your project goes live — on time.' },
                    ].map((st) => (
                      <div key={st.n} className="rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-all">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue to-cyan flex items-center justify-center font-black text-sm mb-3 shadow-lg shadow-blue/30">{st.n}</div>
                        <div className="font-bold text-sm mb-1">{st.t}</div>
                        <p className="text-xs text-slate-300 leading-relaxed">{st.d}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {['No obligation', 'Fixed quotes', '24h response', 'Local support'].map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/10 border border-white/15 rounded-full px-3 py-1.5 text-cyan-200">
                        <span className="text-emerald-400">✓</span> {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Info Cards — Dynamic from Settings */}
              <div className="lg:col-span-2 space-y-4">
                {[
                  { icon: <MapPin size={22} />, title: 'Visit Us', content: s('address','No.189, Kha 6 Street\nInsein, Yangon, Myanmar') },
                  { icon: <Phone size={22} />, title: 'Call Us', content: s('phone','09945598825') },
                  { icon: <Mail size={22} />, title: 'Email Us', content: s('email','info@nexusweblab.com') },
                ].map(b => (
                  <div key={b.title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue/10 to-cyan/10 flex items-center justify-center text-blue mb-4">{b.icon}</div>
                    <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-2">{b.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed whitespace-pre-line">{b.content}</p>
                  </div>
                ))}

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-navy mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Prefer Instant Contact?
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    <a href={`tel:${s('phone','09945598825').replace(/\s/g,'')}`} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:border-blue hover:bg-blue/5 transition-all group">
                      <Phone size={17} className="text-blue shrink-0" />
                      <span className="text-sm font-semibold text-navy group-hover:text-blue">Call Now</span>
                    </a>
                    <a href={`mailto:${s('email','info@nexusweblab.com')}`} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:border-blue hover:bg-blue/5 transition-all group">
                      <Mail size={17} className="text-blue shrink-0" />
                      <span className="text-sm font-semibold text-navy group-hover:text-blue">Email Directly</span>
                    </a>
                  </div>
                </div>

                {/* Office Image */}
                <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                  <Image src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop&q=100" alt="Our office" width={1200} height={800} loading="lazy" className="w-full h-52 object-cover" />
                </div>

                {/* Payment Methods */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue/10 to-cyan/10 flex items-center justify-center text-blue"><CreditCard size={20} /></div>
                    <div>
                      <h3 className="font-bold text-navy">Payment Methods</h3>
                      <p className="text-xs text-slate-400">We accept the following banks & payment apps</p>
                    </div>
                  </div>
                  <PaymentLogos methods={s('paymentMethods','KBZ Bank|AYA Bank|CB Bank|AYA Pay|KBZPay|CB Pay|Wave Pay|Bank transfer|PayPal')} />
                </div>

                {/* Why Contact Us */}
                <div className="bg-gradient-to-br from-navy to-navy-light rounded-2xl p-6 text-white">
                  <h3 className="font-bold mb-3">Why Work With Us?</h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {s('whyBullets','Free consultation, no obligation|Response within 24 hours|Custom solution for your budget|Yangon-based, available locally').split('|').filter(Boolean).map((b, i) => (
                      <li key={i} className="flex items-start gap-2"><span className="text-blue mt-0.5">✓</span> {b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

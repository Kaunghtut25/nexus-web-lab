"use client";
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Send, ArrowRight, CheckCircle, Clock, Shield, Sparkles } from "lucide-react";

export default function GetQuote() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true);
    const form = new FormData(e.currentTarget);
    const body = Object.fromEntries(form);
    try {
      await fetch("/api/quotes", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body) });
      setSent(true);
    } catch {}
    setLoading(false);
  }

  return (
    <>
      <title>Get a Free Quote — Nexus Web Lab</title>
      <meta name="description" content="Get a free, no-obligation quote from Nexus Web Lab. Tell us about your project and we'll reply within 24 hours with a fixed quote." />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative -mt-20 h-[45vh] min-h-[350px] sm:min-h-[500px] lg:min-h-[560px] flex items-center overflow-hidden">
          <Image src="/images/hero/get-quote-hero.jpg" alt="Get a Quote" fill priority sizes="(max-width: 640px) 100vw, 1376px" quality={75} className="object-cover hero-kenburns" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,8,22,0.55)_0%,rgba(5,8,22,0.3)_42%,transparent_75%)]" aria-hidden="true" />
          <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
            <div className="hero-item hero-d1 w-14 h-1 bg-gradient-to-r from-blue to-cyan rounded mx-auto mb-5" />
            <h1 className="hero-item hero-d2 text-4xl sm:text-5xl font-extrabold text-white mb-4 [text-shadow:0_0_4px_rgba(5,8,22,0.95),0_2px_10px_rgba(5,8,22,0.95),0_5px_20px_rgba(5,8,22,0.85),0_0_48px_rgba(5,8,22,0.6)]">Get a Quote</h1>
            <p className="hero-item hero-d3 text-white text-lg [text-shadow:0_0_3px_rgba(5,8,22,0.95),0_1px_6px_rgba(5,8,22,0.95),0_3px_14px_rgba(5,8,22,0.85)]">Tell us about your project and we&apos;ll send a custom estimate within 24 hours.</p>
          </div>
        </section>

        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-5 gap-10">
              {/* Form */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
                  {sent ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-5">
                        <CheckCircle size={32} className="text-emerald-500" />
                      </div>
                      <h2 className="text-xl font-bold text-navy mb-2">Quote Request Sent!</h2>
                      <p className="text-slate-500 text-sm">We&apos;ll review your project and get back to you with a custom estimate within 24 hours.</p>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold text-navy mb-1 flex items-center gap-2">
                        <Send size={20} className="text-blue" /> Request a Quote
                      </h2>
                      <p className="text-sm text-slate-500 mb-6">Fill in the details below and we&apos;ll prepare a custom estimate.</p>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <input name="name" placeholder="Your Name *" required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-base focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition" />
                          <input name="email" type="email" placeholder="Your Email *" required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-base focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition" />
                        </div>
                        <input name="phone" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-base focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition" />
                        <input name="company" placeholder="Company / Organization (optional)" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-base focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition" />
                        <div className="grid sm:grid-cols-2 gap-4">
                          <select name="service" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-base text-slate-600 focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition">
                            <option value="">Service needed *</option>
                            <option>Web Development</option><option>E-Commerce</option>
                            <option>UI/UX Design</option><option>SEO</option>
                            <option>Hosting & Deploy</option><option>Maintenance</option>
                            <option>AI Chatbot / Integration</option><option>Other</option>
                          </select>
                          <select name="budget" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-base text-slate-600 focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition">
                            <option value="">Budget range</option>
                            <option>Under $500 (Under 2,250,000 MMK)</option>
                            <option>$500 - $1,000 (2,250,000 - 4,500,000 MMK)</option>
                            <option>$1,000 - $3,000 (4,500,000 - 13,500,000 MMK)</option>
                            <option>$3,000+ (13,500,000+ MMK)</option>
                            <option>Not sure yet</option>
                          </select>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <select name="timeline" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-base text-slate-600 focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition">
                            <option value="">Timeline</option>
                            <option>Within 1 week</option><option>2-4 weeks</option>
                            <option>1-2 months</option><option>3+ months</option>
                            <option>Flexible</option>
                          </select>
                          <select name="source" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-base text-slate-600 focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition">
                            <option value="">How did you find us?</option>
                            <option>Google Search</option><option>Facebook</option>
                            <option>Referral</option><option>Portfolio</option><option>Other</option>
                          </select>
                        </div>
                        <textarea name="message" placeholder="Describe your project in detail — goals, features, any special requirements... *" required rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-base focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition resize-none" />
                        <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue to-cyan text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-blue/25 transition-all disabled:opacity-70">
                          {loading ? "Submitting..." : <>{'Submit Request'} <ArrowRight size={18} /></>}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-2 space-y-4">
                {[
                  { icon: <Clock size={22} />, title: 'Fast Response', desc: 'Custom estimate within 24 hours of submission.' },
                  { icon: <Shield size={22} />, title: 'No Obligation', desc: 'The quote is free. No commitment required.' },
                  { icon: <Sparkles size={22} />, title: 'Tailored Solution', desc: 'We recommend the best stack for your specific needs and budget.' },
                ].map(b => (
                  <div key={b.title} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue/10 to-cyan/10 flex items-center justify-center text-blue mb-3">{b.icon}</div>
                    <h3 className="font-bold text-navy text-sm mb-1">{b.title}</h3>
                    <p className="text-xs text-slate-500">{b.desc}</p>
                  </div>
                ))}

                <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&q=100" alt="Team planning a project" width={1200} height={800} loading="lazy" decoding="async" className="w-full h-48 object-cover" />
                </div>

                <div className="bg-gradient-to-br from-navy to-navy-light rounded-2xl p-6 text-white">
                  <h3 className="font-bold mb-3">What happens next?</h3>
                  <ol className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-start gap-2"><span className="text-blue font-bold">1.</span> We review your request</li>
                    <li className="flex items-start gap-2"><span className="text-blue font-bold">2.</span> We may ask clarifying questions</li>
                    <li className="flex items-start gap-2"><span className="text-blue font-bold">3.</span> You receive a detailed estimate</li>
                    <li className="flex items-start gap-2"><span className="text-blue font-bold">4.</span> We start building 🚀</li>
                  </ol>
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

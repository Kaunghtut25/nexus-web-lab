"use client";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Globe, Palette, TrendingUp, ShoppingCart, Cloud, Wrench, ArrowRight, Check, Clock, Shield, Zap, MessageCircle, Sparkles, Layers, Rocket, FileText, Target, Mail, type LucideIcon } from "lucide-react";
import { useCurrency } from "@/lib/currency";
import { prefillHref } from "@/lib/lead-prefill";
import type { ServiceRow, ServiceDetailContent } from "@/lib/services";

const ICON_MAP: Record<string, LucideIcon> = { '🌐': Globe, '🛒': ShoppingCart, '🎨': Palette, '📈': TrendingUp, '☁️': Cloud, '🔧': Wrench, '🤖': Sparkles, '✨': Layers, '🛠️': Wrench, '📱': Sparkles, '✍️': FileText, '🎯': Target, '📧': Mail };

type Props = {
  /** Clean URL slug (".html" suffix already stripped). */
  slug: string;
  /** Matching row from the `services` table, or null when unavailable. */
  service: ServiceRow | null;
  /** Static per-slug content (deliverables, process, FAQ, packages). */
  detail: ServiceDetailContent;
  /** Hero image resolved on the server. */
  heroImg: string;
};

// Client component: only the currency switch needs the browser. All text is
// server-rendered into the initial HTML via the props above.
export default function ServiceDetailClient({ slug, service, detail, heroImg }: Props) {
  const { formatPrice } = useCurrency();
  const features = Array.isArray(service?.features) ? service.features : [];
  const IconComp = service ? (ICON_MAP[service.icon] || Globe) : Globe;
  const title = service?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());


  return (
    <>
      <Header />
      <main id="main-content">
        {/* HERO */}
        <section className="relative -mt-20 min-h-[55vh] flex items-center overflow-hidden">
          <img src={heroImg} alt={title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/75 to-navy/40" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
            <nav className="text-sm text-slate-300 mb-6 flex items-center gap-2 flex-wrap">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-white transition">Services</Link>
              <span>/</span>
              <span className="text-cyan-300 font-semibold">{title}</span>
            </nav>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-cyan-300"><IconComp size={28} /></div>
              <div>
                <div className="inline-flex items-center gap-2 text-cyan-300 text-sm font-semibold glass-light rounded-full px-3 py-1">
                  <Sparkles size={14} /> Premium Service
                </div>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 drop-shadow-lg">{title}</h1>
            <p className="text-slate-200 text-lg sm:text-xl max-w-2xl mb-8">{detail.tagline}</p>
            <div className="flex flex-wrap gap-4">
              <Link href={prefillHref('/get-quote', { service: title, price: service?.price, features: detail.deliverables, source: `${title} page — nexusweblab.com/services/${slug}` })} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue to-cyan text-white font-semibold px-7 py-3.5 rounded-xl hover:shadow-lg hover:shadow-blue/30 hover:-translate-y-0.5 transition-all">
                Get a Free Quote <ArrowRight size={18} />
              </Link>
              <Link href="/portfolio" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/25 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/20 transition-all">
                See Our Work
              </Link>
            </div>
          </div>
        </section>

        {/* OVERVIEW + PRICE */}
        <section className="py-20 sm:py-24 mesh-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-1.5 mb-4 text-sm text-blue-600 font-semibold"><Layers size={14} /> Overview</div>
                <h2 className="text-3xl font-extrabold text-navy mb-5">What this service includes</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">{detail.overview}</p>

                {/* Key features */}
                {features.length > 0 && (
                  <div className="grid sm:grid-cols-2 gap-4 mb-12">
                    {features.map((f: string, i: number) => (
                      <div key={i} className="flex items-start gap-3 bg-white border border-slate-100 rounded-xl p-4 hover:border-blue/30 hover:shadow-md transition-all">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue to-cyan flex items-center justify-center text-white flex-shrink-0"><Check size={15} /></div>
                        <span className="text-sm font-medium text-navy">{f}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Deliverables */}
                <div className="bg-white border border-slate-100 rounded-2xl p-7 mb-10">
                  <h3 className="text-xl font-extrabold text-navy mb-5 flex items-center gap-2"><Rocket size={20} className="text-blue" /> What you get</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {detail.deliverables.map((d, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <Check size={16} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SIDEBAR */}
              <aside className="space-y-6">
                <div className="bg-gradient-to-br from-navy to-navy-light rounded-2xl p-7 text-white sticky top-24">
                  <p className="text-sm text-slate-300 mb-1">Starting from</p>
                  <p className="text-3xl font-extrabold mb-4">{formatPrice(service?.price) || 'Contact us'}</p>
                  <ul className="space-y-3 mb-6 text-sm">
                    <li className="flex items-center gap-2.5 text-slate-200"><Clock size={15} className="text-cyan-300" /> Fast delivery — {detail.delivery}</li>
                    <li className="flex items-center gap-2.5 text-slate-200"><Shield size={15} className="text-cyan-300" /> Quality guaranteed, revisions included</li>
                    <li className="flex items-center gap-2.5 text-slate-200"><Zap size={15} className="text-cyan-300" /> Modern, fast, SEO-ready build</li>
                    <li className="flex items-center gap-2.5 text-slate-200"><MessageCircle size={15} className="text-cyan-300" /> Direct support within 24 hours</li>
                  </ul>
                  <Link href={prefillHref('/contact', { service: title, price: service?.price, features: detail.deliverables, source: `${title} page — nexusweblab.com/services/${slug}` })} className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue to-cyan text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-blue/30 transition-all">
                    Get Started <ArrowRight size={16} />
                  </Link>
                  <p className="text-center text-xs text-slate-400 mt-4">Free consultation — no obligation</p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <div className="w-14 h-1 bg-gradient-to-r from-blue to-cyan rounded mx-auto mb-5" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3">How it works</h2>
              <p className="text-slate-500">A clear, proven process from first message to launch.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {detail.process.map((step, i) => (
                <div key={i} className="group relative bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue/10 hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute top-4 right-5 text-5xl font-black text-slate-100 group-hover:text-blue/10 transition-colors">0{i + 1}</div>
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue to-cyan flex items-center justify-center text-white font-bold mb-4 shadow-lg shadow-blue/20">{i + 1}</div>
                  <h3 className="font-bold text-navy mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PACKAGES */}
        {detail.packages && (
          <section className="py-20 sm:py-24 mesh-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-14">
                <div className="w-14 h-1 bg-gradient-to-r from-blue to-cyan rounded mx-auto mb-5" />
                <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3">Choose your package</h2>
                <p className="text-slate-500">From a smart chatbot to a full AI Employee — scale as you grow.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {detail.packages.map((pkg, i) => (
                  <div key={i} className={`relative flex flex-col rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${pkg.popular ? 'bg-gradient-to-br from-navy to-navy-light text-white shadow-2xl shadow-blue/20 border-2 border-blue' : 'bg-white border border-slate-200 hover:shadow-blue/5'}`}>
                    {pkg.popular && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue to-cyan text-white text-xs font-bold rounded-full shadow-lg whitespace-nowrap">Most Popular</span>
                    )}
                    <h3 className={`text-lg font-extrabold mb-1 ${pkg.popular ? 'text-white' : 'text-navy'}`}>{pkg.name}</h3>
                    <p className={`text-sm mb-4 ${pkg.popular ? 'text-slate-300' : 'text-slate-400'}`}>{pkg.desc}</p>
                    <p className={`text-3xl font-extrabold mb-6 ${pkg.popular ? 'text-white' : 'text-navy'}`}>{pkg.price}</p>
                    <ul className="space-y-3 mb-8 flex-1">
                      {pkg.features.map((f, fi) => (
                        <li key={fi} className="flex items-start gap-2.5 text-sm">
                          <Check size={16} className={`mt-0.5 flex-shrink-0 ${pkg.popular ? 'text-cyan-300' : 'text-cyan'}`} />
                          <span className={pkg.popular ? 'text-slate-200' : 'text-slate-600'}>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={prefillHref('/contact', { service: title, pkg: pkg.name, price: pkg.price, features: pkg.features, source: `${title} page — nexusweblab.com/services/${slug}` })} className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all ${pkg.popular ? 'bg-gradient-to-r from-blue to-cyan text-white shadow-lg hover:shadow-blue/30' : 'bg-slate-50 text-navy hover:bg-gradient-to-r hover:from-blue hover:to-cyan hover:text-white'}`}>
                      Choose {pkg.name} <ArrowRight size={16} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="py-20 sm:py-24 mesh-bg">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <div className="w-14 h-1 bg-gradient-to-r from-blue to-cyan rounded mx-auto mb-5" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3">Frequently asked questions</h2>
              <p className="text-slate-500">Answers to the questions clients ask us most.</p>
            </div>
            <div className="space-y-4">
              {detail.faq.map((item, i) => (
                <details key={i} className="group bg-white border border-slate-100 rounded-xl overflow-hidden">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-6 py-4 font-semibold text-navy hover:text-blue transition">
                    {item.q}
                    <span className="w-6 h-6 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-open:bg-gradient-to-r group-open:from-blue group-open:to-cyan group-open:text-white group-open:border-transparent transition-all flex-shrink-0">+</span>
                  </summary>
                  <p className="px-6 pb-5 text-sm text-slate-500 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 bg-gradient-to-r from-blue to-cyan rounded-2xl p-10 text-center text-white relative overflow-hidden">
              <div className="absolute top-[-60px] right-[-60px] w-48 h-48 rounded-full bg-white/10" />
              <div className="absolute bottom-[-80px] left-[-40px] w-56 h-56 rounded-full bg-white/10" />
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 relative">Ready to get started?</h3>
              <p className="text-white/85 mb-7 relative">Tell us about your project — we will reply within 24 hours with a free quote.</p>
              <div className="flex flex-wrap gap-4 justify-center relative">
                <Link href={prefillHref('/get-quote', { service: title, price: service?.price, features: detail.deliverables, source: `${title} page — nexusweblab.com/services/${slug}` })} className="inline-flex items-center gap-2 bg-white text-blue font-bold px-7 py-3.5 rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  Get Your Free Quote <ArrowRight size={18} />
                </Link>
                <Link href="/services" className="inline-flex items-center gap-2 bg-white/15 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/25 transition-all">
                  Browse All Services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

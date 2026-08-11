"use client";
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { Globe, Palette, TrendingUp, ShoppingCart, Cloud, Wrench, ArrowRight, Check, Layers } from "lucide-react";
import { useCurrency } from "@/lib/currency";
import { prefillHref } from "@/lib/lead-prefill";
import CurrencySwitcher from "@/components/CurrencySwitcher";

const ICON_MAP: Record<string, any> = { '🌐': Globe, '🛒': ShoppingCart, '🎨': Palette, '📈': TrendingUp, '☁️': Cloud, '🔧': Wrench };
const IMAGES = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=960&fit=crop&q=100',
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&h=960&fit=crop&q=100',
  'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1920&h=960&fit=crop&q=100',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=960&fit=crop&q=100',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=960&fit=crop&q=100',
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=960&fit=crop&q=100',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&h=960&fit=crop&q=100',
  'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1920&h=960&fit=crop&q=100',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1920&h=960&fit=crop&q=100',
];

export default function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { currency, formatPrice } = useCurrency();

  useEffect(() => {
    fetch('/api/services').then(r=>r.json()).then(d => {
      setServices(d.services || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <>
      <title>Services — Nexus Web Lab</title>
      <meta name="description" content="Explore Nexus Web Lab services: web development, e-commerce, UI/UX design, SEO packages, hosting & deployment, and maintenance." />
      <Header />
      <main>
        <section className="relative -mt-20 h-[50vh] min-h-[400px] sm:min-h-[500px] lg:min-h-[560px] flex items-center overflow-hidden">
          <Image src="/images/hero/services-hero.jpg" alt="Services" fill priority sizes="(max-width: 640px) 100vw, 1376px" quality={75} className="object-cover hero-kenburns" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,8,22,0.55)_0%,rgba(5,8,22,0.3)_42%,transparent_75%)]" aria-hidden="true" />
          <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
            <div className="hero-item hero-d1 w-14 h-1 bg-gradient-to-r from-blue to-cyan rounded mx-auto mb-5" />
            <h1 className="hero-item hero-d2 text-4xl sm:text-5xl font-extrabold text-white mb-4 [text-shadow:0_0_4px_rgba(5,8,22,0.95),0_2px_10px_rgba(5,8,22,0.95),0_5px_20px_rgba(5,8,22,0.85),0_0_48px_rgba(5,8,22,0.6)]">Our Services</h1>
            <p className="hero-item hero-d3 text-white text-lg [text-shadow:0_0_3px_rgba(5,8,22,0.95),0_1px_6px_rgba(5,8,22,0.95),0_3px_14px_rgba(5,8,22,0.85)]">Everything you need to succeed online — from design to deployment.</p>
          </div>
        </section>

        <section className="pt-14 sm:pt-20 pb-20 sm:pb-28 mesh-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-1.5 mb-2 text-sm text-blue-600 font-semibold">
                <Layers size={14} /> What We Offer
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-2 card-hover-title">Services Built Around Your Business</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">From your first website to e-commerce, AI chatbots and ongoing care — everything you need to succeed online.</p>
              <div className="mt-5 flex justify-center">
                <CurrencySwitcher />
              </div>
            </div>
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue animate-pulse" />
                  <span className="w-3 h-3 rounded-full bg-blue animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <span className="w-3 h-3 rounded-full bg-blue animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <Globe size={48} className="mx-auto mb-4 opacity-30" />
                <p>No services added yet. Add services in the admin panel.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((sv, i) => {
                  const isSelected = selected === sv.id;
                  const IconComp = ICON_MAP[sv.icon] || Globe;
                  const features = Array.isArray(sv.features) ? sv.features : (typeof sv.features === 'string' ? (() => { try { return JSON.parse(sv.features); } catch { return []; } })() : []);
                  const isFirst = i === 0;
                  return (
                    <div
                      key={sv.id}
                      onClick={() => setSelected(isSelected ? null : sv.id)}
                      className={`group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-1 ${
                        isSelected
                          ? 'border-2 border-blue shadow-lg shadow-blue/10'
                          : selected ? 'border border-slate-100 hover:shadow-xl'
                          : isFirst && !selected
                            ? 'border border-blue/30 ring-2 ring-blue/10 hover:shadow-xl'
                            : 'border border-slate-100 hover:shadow-xl'
                      }`}
                    >
                      {isFirst && (
                        <span className="absolute top-3 left-4 z-20 px-4 py-1 bg-gradient-to-r from-blue to-cyan text-white text-xs font-bold rounded-full shadow-lg">Most Popular</span>
                      )}
                      <div className="relative h-64 overflow-hidden bg-slate-100">
                        <Image src={sv.image || IMAGES[i] || IMAGES[0]} alt={sv.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" quality={80} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                        <div className="absolute bottom-3 left-4 flex items-center gap-2">
                          <div className="w-9 h-9 rounded-lg bg-white/90 flex items-center justify-center text-blue"><IconComp size={20} /></div>
                          <span className="text-xs font-bold text-white bg-blue/80 px-2.5 py-0.5 rounded-full">{formatPrice(sv.price) || 'Contact us'}</span>
                        </div>
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-blue text-white flex items-center justify-center shadow-lg">
                            <Check size={16} />
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className={`text-lg font-bold mb-2 transition ${isSelected ? 'text-blue' : 'text-navy group-hover:text-blue'}`}>{sv.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed mb-4">{sv.description || ''}</p>
                        {features.length > 0 && (
                          <ul className="space-y-2 mb-6">
                            {features.map((f: string) => (
                              <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                                <Check size={15} className={`mt-0.5 flex-shrink-0 ${isSelected ? 'text-blue' : 'text-cyan'}`} />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        <Link
                          href={`/services/${({ 'web-dev-1': 'web-development', 'ecom-1': 'e-commerce', 'uiux-1': 'ui-ux-design', 'seo-1': 'seo-package', 'host-1': 'hosting-deploy', 'maint-1': 'maintenance', 'errfix-1': 'error-fixing', 'chatbot-1': 'ai-chatbot', 'redesign-1': 'website-redesign', 'smm-1': 'social-media-management', 'content-1': 'content-writing', 'brand-1': 'logo-brand-identity', 'email-1': 'business-email-setup' } as Record<string, string>)[sv.id] || sv.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-sm text-blue bg-blue-50 hover:bg-gradient-to-r hover:from-blue hover:to-cyan hover:text-white transition-all mb-2"
                        >
                          View Details <ArrowRight size={16} />
                        </Link>
                        <Link
                          href={prefillHref('/contact', { service: sv.title, price: sv.price, features, source: 'Services page — nexusweblab.com/services' })}
                          onClick={(e) => e.stopPropagation()}
                          className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                            isSelected
                              ? 'bg-gradient-to-r from-blue to-cyan text-white shadow-md'
                              : 'bg-slate-50 text-navy hover:bg-gradient-to-r hover:from-blue hover:to-cyan hover:text-white'
                          }`}
                        >
                          Get Started <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* TIERED PACKAGES */}
        <section className="py-20 sm:py-28 mesh-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <div className="w-14 h-1 bg-gradient-to-r from-blue to-cyan rounded mx-auto mb-5" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3">Service Packages</h2>
              <p className="text-slate-500">Choose the package that fits your needs. Custom quotes available.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Starter */}
              <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:shadow-blue/5 hover:-translate-y-1 transition-all duration-300 relative">
                <div className="text-4xl mb-3">🥉</div>
                <h3 className="text-xl font-extrabold text-navy mb-1">Starter / Basic</h3>
                <p className="text-sm text-slate-400 mb-4">Single Landing Page</p>
                <div className="mb-2">
                  <span className="text-3xl font-extrabold text-navy">$350</span>
                </div>
                <p className="text-sm text-slate-500 mb-6">Delivery: 3–5 days</p>
                <ul className="space-y-3 mb-8">
                  {['Single Landing Page','Fully Responsive Design','SEO Optimized','Fast Loading','1 Round of Revisions'].map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check size={16} className="mt-0.5 flex-shrink-0 text-cyan" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={prefillHref('/contact', { service: 'Web Development', pkg: 'Starter / Basic — Single Landing Page', price: '$350', features: ['Single Landing Page','Fully Responsive Design','SEO Optimized','Fast Loading','1 Round of Revisions'], source: 'Services page — nexusweblab.com/services' })} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm bg-slate-50 text-navy hover:bg-gradient-to-r hover:from-blue hover:to-cyan hover:text-white transition-all">
                  Get Started <ArrowRight size={16} />
                </Link>
              </div>

              {/* Standard */}
              <div className="bg-white border-2 border-blue rounded-2xl p-8 hover:shadow-xl hover:shadow-blue/10 hover:-translate-y-1 transition-all duration-300 relative ring-2 ring-blue/10">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue to-cyan text-white text-xs font-bold rounded-full shadow-lg whitespace-nowrap">Most Popular</span>
                <div className="text-4xl mb-3">🥈</div>
                <h3 className="text-xl font-extrabold text-navy mb-1">Standard</h3>
                <p className="text-sm text-slate-400 mb-4">Full Business Website</p>
                <div className="mb-2">
                  <span className="text-3xl font-extrabold text-navy">$600</span>
                </div>
                <p className="text-sm text-slate-500 mb-6">Delivery: 7–10 days</p>
                <ul className="space-y-3 mb-8">
                  {['Full Business Website (5–10 pages)','CMS / Admin Panel','Responsive Design','SEO Optimization','Contact Form Integration','3 Rounds of Revisions'].map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check size={16} className="mt-0.5 flex-shrink-0 text-blue" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={prefillHref('/contact', { service: 'Web Development', pkg: 'Standard — Full Business Website', price: '$600', features: ['Full Business Website (5–10 pages)','CMS / Admin Panel','Responsive Design','SEO Optimization','Contact Form Integration','3 Rounds of Revisions'], source: 'Services page — nexusweblab.com/services' })} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue to-cyan text-white shadow-md hover:shadow-lg transition-all">
                  Get Started <ArrowRight size={16} />
                </Link>
              </div>

              {/* Premium */}
              <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:shadow-blue/5 hover:-translate-y-1 transition-all duration-300 relative">
                <div className="text-4xl mb-3">🥇</div>
                <h3 className="text-xl font-extrabold text-navy mb-1">Premium</h3>
                <p className="text-sm text-slate-400 mb-4">Custom E-Commerce / AI Web App</p>
                <div className="mb-2">
                  <span className="text-3xl font-extrabold text-navy">$1,200–$2,500+</span>
                </div>
                <p className="text-sm text-slate-500 mb-6">Delivery: 2–3 weeks</p>
                <ul className="space-y-3 mb-8">
                  {['Custom E-Commerce or AI Web App','Full Admin Dashboard','Payment Gateway Integration','AI Chatbot / Smart Features','Priority Support','Unlimited Revisions'].map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check size={16} className="mt-0.5 flex-shrink-0 text-cyan" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={prefillHref('/contact', { service: 'Web Development', pkg: 'Premium — Custom E-Commerce / AI Web App', price: '$1,200–$2,500+', features: ['Custom E-Commerce or AI Web App','Full Admin Dashboard','Payment Gateway Integration','AI Chatbot / Smart Features','Priority Support','Unlimited Revisions'], source: 'Services page — nexusweblab.com/services' })} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm bg-slate-50 text-navy hover:bg-gradient-to-r hover:from-blue hover:to-cyan hover:text-white transition-all">
                  Get Started <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <div className="w-14 h-1 bg-gradient-to-r from-blue to-cyan rounded mx-auto mb-5" />
            <h2 className="text-3xl font-extrabold text-navy mb-16">How We Work</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[{step:'01',title:'Discovery',desc:'We learn about your business and goals.'},{step:'02',title:'Design',desc:'Wireframes and mockups for your approval.'},{step:'03',title:'Development',desc:'Clean, modern code with regular updates.'},{step:'04',title:'Launch',desc:'Deployment, testing, and handover.'}].map(s=>(
                <div key={s.step} className="p-6"><div className="text-4xl font-extrabold bg-gradient-to-r from-blue to-cyan bg-clip-text text-transparent mb-3">{s.step}</div><h3 className="font-bold text-navy mb-2">{s.title}</h3><p className="text-sm text-slate-500">{s.desc}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* Conversion Funnel — Visitor → AI → Requirement → Consultation */}
        <section className="py-20 sm:py-28 mesh-bg">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <div className="w-14 h-1 bg-gradient-to-r from-blue to-cyan rounded mx-auto mb-5" />
            <h2 className="text-3xl font-extrabold text-navy mb-3">From Visitor to Client in 4 Steps</h2>
            <p className="text-slate-500 mb-14 max-w-2xl mx-auto">A simple, human-friendly path — with AI doing the heavy lifting.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '💬', title: '1 · Talk to AI Assistant', desc: 'Chat with our AI on the site or Messenger — get instant answers 24/7.' },
                { icon: '📋', title: '2 · Share Your Requirement', desc: 'The AI collects your project details, budget and timeline in minutes.' },
                { icon: '🤝', title: '3 · Free Consultation', desc: 'We review your requirement and reach out with a tailored plan.' },
                { icon: '🚀', title: '4 · Become a Client', desc: 'Approve the plan — we build, launch and support your project.' },
              ].map((s, i) => (
                <div key={i} className="relative bg-white border border-slate-100 rounded-2xl p-7 hover:shadow-xl hover:shadow-blue/10 hover:-translate-y-1 transition-all duration-300">
                  {i < 3 && <div className="hidden lg:block absolute top-1/2 -right-3 z-10 text-slate-300">→</div>}
                  <div className="text-4xl mb-4">{s.icon}</div>
                  <h3 className="font-bold text-navy mb-2 card-hover-title">{s.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <Link href={prefillHref('/contact', { source: 'Services page — conversion funnel' })} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue to-cyan text-white font-semibold px-10 py-4 rounded-xl hover:shadow-xl hover:shadow-blue/25 transition-all">
                Start Step 1 — Talk to Our AI <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-navy via-navy-light to-navy text-center relative overflow-hidden">
          <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=960&fit=crop&q=80" alt="" aria-hidden fill sizes="100vw" className="object-cover opacity-50" />
          <div className="absolute inset-0 bg-navy/70" />
          <div className="relative z-10 max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-extrabold text-white mb-4 [text-shadow:0_2px_8px_rgba(5,8,22,0.9),0_4px_16px_rgba(5,8,22,0.8),0_0_32px_rgba(5,8,22,0.6)]">Not sure what you need?</h2>
            <p className="text-slate-200 mb-8 text-lg">Let&apos;s talk. Free consultation, no obligation.</p>
            <Link href={prefillHref('/contact', { source: 'Services page — nexusweblab.com/services' })} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue to-cyan text-white font-semibold px-10 py-4 rounded-xl hover:shadow-2xl transition-all">Get Free Consultation <ArrowRight size={20} /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

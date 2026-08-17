"use client";
import { useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Globe, Palette, TrendingUp, ShoppingCart, Cloud, Wrench, ArrowRight, CheckCircle, Star, Zap, Cpu, Rocket, ArrowUpRight, CreditCard, type LucideIcon } from "lucide-react";
import PaymentLogos from "@/components/home/PaymentLogos";
import HeroMarquee from "@/components/home/HeroMarquee";
import { useCurrency } from "@/lib/currency";
import { prefillHref } from "@/lib/lead-prefill";
import CurrencySwitcher from "@/components/CurrencySwitcher";
import { FAQS } from "@/lib/faq";

const ICON_MAP: Record<string, LucideIcon> = {
  '🌐': Globe, '🛒': ShoppingCart, '🎨': Palette, '📈': TrendingUp, '☁️': Cloud, '🔧': Wrench,
  globe: Globe, 'shopping-cart': ShoppingCart, palette: Palette, 'trending-up': TrendingUp, cloud: Cloud, wrench: Wrench,
};

const FALLBACK_SLIDES = [
  { img: '/images/hero/home-hero-02-ai-solutions.jpg', title: 'AI-Powered Web Development & Business Automation', subtitle: 'Custom websites, AI chatbots & automation — built with Next.js & React' },
  { img: '/images/hero/home-hero-01-web-development.jpg', title: 'Custom Web Development', subtitle: 'Modern websites built with Next.js & React' },
  { img: '/images/hero/home-hero-03-ecommerce.jpg', title: 'E-Commerce Experts', subtitle: 'Online stores that convert visitors to customers' },
];

const SERVICE_IMAGES = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=750&fit=crop&q=100', // Web Development - laptop code
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=750&fit=crop&q=100', // E-Commerce - online shopping bags
  'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&h=750&fit=crop&q=100', // UI/UX Design - designer workspace
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=750&fit=crop&q=100', // SEO - analytics
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=750&fit=crop&q=100', // Hosting - server
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=750&fit=crop&q=100', // Maintenance - tools
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=750&fit=crop&q=100', // Errors Fixing - code debug
  'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1200&h=750&fit=crop&q=100', // AI Chatbot - AI robot
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=750&fit=crop&q=100', // Redesign - design workspace
  'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&h=750&fit=crop&q=100', // Social Media - phone apps
  'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=750&fit=crop&q=100', // Content Writing - pen notebook
  'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&h=750&fit=crop&q=100', // Brand Identity - branding
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=750&fit=crop&q=100', // Business Email - email laptop
];

const DEFAULT_FEATURES = [
  { icon: <CheckCircle size={28} />, title: 'Quality Code', desc: 'Clean, type-safe code with TypeScript and modern frameworks.' },
  { icon: <Zap size={28} />, title: 'Fast Delivery', desc: 'Quick turnaround without compromising quality.' },
  { icon: <Star size={28} />, title: 'Client First', desc: 'Your satisfaction is our priority. Free revisions included.' },
  { icon: <Sparkles size={28} />, title: 'Modern Tech', desc: 'Next.js, AI integration, and cutting-edge tools.' },
];

const DEFAULT_PREMIUM = [
  { icon: '🛒', title: 'Custom E-Commerce / AI Web App', description: 'Online stores, AI-powered apps, and custom platforms built around your exact business needs.' },
  { icon: '📊', title: 'Full Admin Dashboard', description: 'Manage products, services, content, leads, and settings from your own private control panel.' },
  { icon: '💳', title: 'Payment Gateway Integration', description: 'Accept KBZPay, AYA Pay, Wave, bank transfer, or international gateways — securely integrated.' },
  { icon: '🤖', title: 'AI Chatbot / Smart Features', description: '24/7 AI assistant, smart search, and automation built into your website to capture every lead.' },
  { icon: '🎧', title: 'Priority Support', description: 'You get fast, direct support — we respond within 24 hours, every time.' },
  { icon: '♾️', title: 'Revisions Within Scope', description: 'Revisions covered within the approved project scope — so you stay in control without surprise costs.' },
];

const DEFAULT_TESTIMONIALS = [
  { name: 'A9 Global Travels', role: 'Travel Agency', content: 'Nexus Web Lab delivered a premium travel website with 35+ pages.', rating: 5 },
  { name: 'J Recruit Co., Ltd.', role: 'Recruitment Platform', content: 'Professional recruitment platform with job board and referral system.', rating: 5 },
  { name: 'Stardust.co', role: 'E-Commerce', content: 'Our e-commerce store with AI live chat exceeded expectations.', rating: 5 },
];

// Spotlight card (mouse-following glow)
function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={onMouseMove} className={`spotlight ${className}`}>
      {children}
    </div>
  );
}

interface HomeData {
  settings: Record<string, string>;
  services: any[];
  projects: any[];
  testimonials: any[];
  slides: any[];
  features: any[];
  premiumFeatures: any[];
}

export default function HomeClient({ initialData }: { initialData: HomeData }) {
  const settings = initialData.settings || {};
  const services = initialData.services || [];
  const projects = initialData.projects || [];
  const testimonials = initialData.testimonials || [];
  const slides = (initialData.slides && initialData.slides.length ? initialData.slides : FALLBACK_SLIDES);
  const features = (initialData.features && initialData.features.length
    ? initialData.features.map((f: any) => ({ icon: f.icon, title: f.title, desc: f.description }))
    : DEFAULT_FEATURES);
  const premiumFeatures = (initialData.premiumFeatures && initialData.premiumFeatures.length ? initialData.premiumFeatures : DEFAULT_PREMIUM);
  const { formatPrice } = useCurrency();

  const s = (k: string, d: string) => settings[k] || d;

  return (
    <>
      <Header />
      <main className="noise">
        {/* ═══ HERO MARQUEE — isolated component: its slide state lives inside
            HeroMarquee, so a slide change re-renders only the hero layer,
            never the services/projects/testimonials sections below. */}
        <HeroMarquee slides={slides} settings={settings} />

        {/* ═══ MARQUEE STRIP ═══ */}
        <div className="py-3 overflow-hidden mesh-bg border-y border-slate-200/70">
          <div className="marquee">
            <div className="marquee-track">
              {(() => {
                const techs = s('marqueeTechs','Next.js, React, TypeScript, AI Integration, Tailwind CSS, Vercel, Node.js, PostgreSQL, Docker, GraphQL').split(',').map(t => t.trim()).filter(Boolean);
                return [...techs, ...techs].slice(0, 20).map((tech, i) => (
                  <span key={i} className="text-2xl font-bold text-slide hover-green-blue cursor-default flex items-center gap-3" style={{ filter: 'none' }}>
                    {tech} <span className="text-cyan-500/50">◆</span>
                  </span>
                ));
              })()}
            </div>
          </div>
        </div>

        {/* ═══ SERVICES — SPOTLIGHT BENTO ═══ */}
        <section className="pt-16 sm:pt-20 pb-24 sm:pb-32 mesh-bg relative overflow-hidden">
          <div className="orb w-[400px] h-[400px] bg-blue-400/15 top-[10%] right-[-100px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-1.5 mb-2 text-sm text-blue-600 font-semibold">
                <Cpu size={14} /> Our Expertise
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-navy mb-2 card-hover-title">{s('servicesTitle','What We Do')}</h2>
              <p className="text-slate-500 text-lg">{s('servicesSubtitle','End-to-end digital services — from design to deployment.')}</p>
              <div className="mt-5 flex justify-center">
                <CurrencySwitcher />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.slice(0, 13).map((sv, i) => {
                const iconKey = sv.icon || '🌐';
                const IconComp = ICON_MAP[iconKey] || Globe;
                const slugMap: Record<string, string> = {
                  'web-dev-1': 'web-development', 'ecom-1': 'e-commerce', 'uiux-1': 'ui-ux-design',
                  'seo-1': 'seo-package', 'host-1': 'hosting-deploy', 'maint-1': 'maintenance',
                  'errfix-1': 'error-fixing', 'chatbot-1': 'ai-chatbot', 'redesign-1': 'website-redesign',
                  'smm-1': 'social-media-management', 'content-1': 'content-writing',
                  'brand-1': 'logo-brand-identity', 'email-1': 'business-email-setup',
                };
                const slug = slugMap[sv.id] || sv.id;
                return (
                  <Link key={sv.id || i} href={`/services/${slug}`} className="group block">
                    <SpotlightCard className="bento bg-white border border-slate-100 rounded-2xl group glow-pulse h-full">
                      <div className="relative h-64 overflow-hidden rounded-t-2xl bg-slate-100">
                        <Image src={sv.image || SERVICE_IMAGES[i] || SERVICE_IMAGES[0]} alt={sv.title} width={1200} height={750} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" quality={80} />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-4 flex items-center gap-2">
                          <div className="w-9 h-9 rounded-xl glass flex items-center justify-center text-cyan-300"><IconComp size={18} /></div>
                          <span className="text-xs font-bold text-white glass px-3 py-1 rounded-full">{formatPrice(sv.price) || 'Contact us'}</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-blue transition card-hover-title">{sv.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed mb-4">{sv.description || sv.desc || ''}</p>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue group-hover:gap-2.5 transition-all">View Details <ArrowRight size={16} /></span>
                      </div>
                    </SpotlightCard>
                  </Link>
                );
              })}
            </div>
            <div className="text-center mt-12">
              <Link href="/services" className="inline-flex items-center gap-2 text-blue font-semibold hover:gap-3 transition-all min-h-[48px] px-2 py-2">View All Services <ArrowRight size={18} /></Link>
            </div>
          </div>
        </section>

        {/* ═══ PREMIUM FEATURES — PREMIUM PACKAGE ═══ */}
        <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
          <div className="orb w-[500px] h-[500px] bg-cyan-300/10 top-[-100px] right-[-150px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-1.5 mb-4 text-sm text-blue-600 font-semibold">
                <Cpu size={14} /> Premium Package Features
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-4 card-hover-title">Everything You Get With Premium</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">Every project we deliver is built with the same premium standard — from custom builds to full admin control.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumFeatures.map((f: any, i: number) => (
                <div key={i} className="group bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-xl hover:shadow-blue/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue/10 to-cyan/10 rounded-bl-[100%] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue to-cyan flex items-center justify-center text-white mb-5 shadow-lg shadow-blue/20"><span className="text-xl">{f.icon}</span></div>
                  <h3 className="font-bold text-navy mb-2 card-hover-title">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PORTFOLIO — LIGHT GALLERY ═══ */}
        {projects.length > 0 && (
          <section className="py-24 sm:py-32 mesh-bg relative overflow-hidden">
            <div className="orb w-[500px] h-[500px] bg-purple-400/10 top-[20%] left-[-150px]" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-1.5 mb-4 text-sm text-blue-600 font-semibold">
                  <Rocket size={14} /> Delivered Work
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-3 text-navy card-hover-title">{s('projectsTitle','Recent Work')}</h2>
                <p className="text-slate-500 text-lg">{s('projectsSubtitle','Projects we delivered for our clients.')}</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.slice(0, 6).map((p, pi) => {
                  const tags = Array.isArray(p.tags) ? p.tags : (typeof p.tags === 'string' ? (() => { try { return JSON.parse(p.tags); } catch { return []; } })() : []);
                  const PI = [
                    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&h=1066&fit=crop&q=100',
                    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=1066&fit=crop&q=100',
                    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1600&h=1066&fit=crop&q=100',
                    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=1066&fit=crop&q=100',
                    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=1066&fit=crop&q=100',
                    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&h=1066&fit=crop&q=100',
                  ];
                  return (
                    <a key={p.id} href={p.url || '#'} target="_blank" rel="noopener noreferrer" className="bento bg-white border border-slate-100 rounded-2xl group glow-pulse block">
                      <div className="relative h-72 overflow-hidden rounded-t-2xl">
                        <Image src={p.image || PI[pi]} alt={p.title} width={1600} height={1066} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" quality={80} />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
                        <ArrowUpRight className="absolute top-4 right-4 text-white/70 group-hover:text-blue-600 group-hover:scale-110 transition-all" size={24} />
                      </div>
                      <div className="p-6">
                        <p className="text-xs text-blue-600 mb-1 font-semibold">{p.client || ''}</p>
                        <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-blue transition card-hover-title">{p.title}</h3>
                        <p className="text-sm text-slate-500 mb-3">{p.description || ''}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {tags.map((t: string) => <span key={t} className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">{t}</span>)}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
              <div className="text-center mt-12">
                <Link href="/portfolio" className="inline-flex items-center gap-2 text-blue font-semibold hover:gap-3 transition-all min-h-[44px] px-2 py-2">View All Projects <ArrowRight size={18} /></Link>
              </div>
            </div>
          </section>
        )}

        {/* ═══ WHY US — HOLOGRAPHIC ═══ */}
        <section className="py-24 sm:py-32 mesh-bg relative overflow-hidden">
          <div className="orb w-[350px] h-[350px] bg-cyan-400/15 bottom-[10%] left-[-100px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-1.5 mb-4 text-sm text-blue-600 font-semibold">
                <Sparkles size={14} /> Why Choose Us
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-navy mb-3 card-hover-title">{s('whyTitle','Why Choose Nexus')}</h2>
              <p className="text-slate-500 text-lg">{s('whySubtitle','We deliver results, not just promises.')}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f, i) => (
                <SpotlightCard key={i} className="glass-light p-8 text-center rounded-3xl holo-border group">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue to-cyan flex items-center justify-center text-white mx-auto mb-5 shadow-lg shadow-blue/20 group-hover:scale-110 transition-transform duration-300">
                    {typeof f.icon === 'string' ? <span className="text-2xl">{f.icon}</span> : f.icon}
                  </div>
                  <h3 className="font-bold text-navy mb-2 text-lg group-hover:text-blue transition card-hover-title">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ TESTIMONIALS — LIGHT GLASS GRID ═══ */}
        <section className="py-24 sm:py-32 mesh-bg relative overflow-hidden">
          <div className="orb w-[450px] h-[450px] bg-blue-400/12 top-[10%] right-[-100px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-1.5 mb-4 text-sm text-blue-600 font-semibold">
                <Star size={14} /> Client Stories
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold mb-3 text-navy card-hover-title">{s('testimonialsTitle','What Clients Say')}</h2>
              <p className="text-slate-500 text-lg">{s('testimonialsSubtitle','Trusted by businesses across multiple industries.')}</p>
            </div>
            {testimonials.length > 0 ? (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {testimonials.map((t, i) => (
                    <SpotlightCard key={t.id || i} className="glass-light p-7 rounded-3xl holo-border">
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: t.rating || 5 }).map((_, si) => (
                          <Star key={si} size={18} className="text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-slate-600 leading-relaxed mb-5 italic">&ldquo;{t.content}&rdquo;</p>
                      <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                        {t.logo ? (
                          <img src={t.logo} alt={t.name} width={80} height={40} className="h-10 w-auto object-contain bg-white border border-slate-100 rounded-lg px-2 py-1" loading="lazy" />
                        ) : t.avatar ? (
                          <img src={t.avatar} alt={t.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue to-cyan flex items-center justify-center text-white font-bold text-sm">
                            {t.name?.charAt(0) || '?'}
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-navy text-sm">{t.name}</div>
                          {t.role && <div className="text-xs text-slate-400">{t.role}{t.company && ` @ ${t.company}`}</div>}
                        </div>
                      </div>
                    </SpotlightCard>
                  ))}
                </div>
                <div className="border-t border-slate-200 pt-10">
                  <p className="text-center text-xs uppercase tracking-wider text-slate-400 font-semibold mb-6">Trusted by leading brands</p>
                  <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
                    {testimonials.map((t, i) => (
                      <div key={`logo-${t.id || i}`} className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-all hover:scale-110">
                        {t.logo ? (
                          <img src={t.logo} alt={t.name} width={80} height={40} className="h-10 w-auto object-contain" loading="lazy" />
                        ) : t.avatar ? (
                          <img src={t.avatar} alt={t.name} width={40} height={40} className="h-10 w-10 rounded-lg object-cover" loading="lazy" />
                        ) : (
                          <div className="h-10 px-4 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                            <span className="font-bold text-navy text-sm">{t.company || t.name}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {DEFAULT_TESTIMONIALS.map((t, i) => (
                  <div key={i} className="glass-light p-7 rounded-3xl holo-border">
                    <div className="flex gap-1 mb-4">
                      {[...Array(t.rating)].map((_, si) => <Star key={si} size={18} className="text-amber-400 fill-amber-400" />)}
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-5 italic">&ldquo;{t.content}&rdquo;</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue to-cyan flex items-center justify-center text-white font-bold text-sm">{t.name.charAt(0)}</div>
                      <div><div className="font-semibold text-navy text-sm">{t.name}</div><div className="text-xs text-slate-400">{t.role}</div></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ═══ PAYMENT METHODS — TRUST STRIP ═══ */}
        <section className="py-14 sm:py-16 bg-white relative overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-1.5 mb-3 text-sm text-blue-600 font-semibold">
                  <CreditCard size={14} /> Secure Payments
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">We Accept All Major Banks & Payment Apps</h2>
              </div>
              <p className="text-slate-500 text-sm max-w-xs">Flexible payment options for local & international clients — pay the way that suits you best.</p>
            </div>
            <PaymentLogos methods={s('paymentMethods','KBZ Bank|AYA Bank|CB Bank|AYA Pay|KBZPay|CB Pay|Wave Pay|Bank transfer|PayPal')} className="sm:grid-cols-4" />
          </div>
        </section>

        {/* ═══ SEO CONTENT — Web Design Agency in Yangon ═══ */}
        <section className="py-24 sm:py-32 mesh-bg relative overflow-hidden">
          <div className="orb w-[500px] h-[500px] bg-blue-400/10 bottom-[5%] right-[-150px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-1.5 mb-4 text-sm text-blue-600 font-semibold">
                  <Globe size={14} /> About Nexus Web Lab
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-6 leading-tight card-hover-title">
                  Web Design & Development Agency in Yangon, Myanmar
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Nexus Web Lab is a full-service web design and development agency based in Yangon, Myanmar. We help businesses across Myanmar and beyond launch fast, modern, and reliable websites — from clean corporate sites to full e-commerce stores and AI-powered web applications.
                  </p>
                  <p>
                    Our team builds with Next.js, React, TypeScript, and Tailwind CSS, and deploys on world-class infrastructure like Vercel. Every project is responsive, SEO-ready, and optimized for speed — so your website loads quickly on both mobile and desktop, and ranks well on Google.
                  </p>
                  <p>
                    Whether you need a brand-new website, a redesign, an online store with KBZPay and AYA Pay integration, an AI chatbot for your business, or ongoing maintenance and error fixing — we deliver polished results on time and at fair prices.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {FAQS.map((f, i) => (
                  <div key={i} className="glass-light p-5 rounded-2xl holo-border">
                    <h3 className="font-bold text-navy mb-1.5 text-[15px] card-hover-title">{f.q}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CTA — AURORA FINALE ═══ */}
        <section className="py-32 bg-[#050816] text-white text-center relative overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop&q=100"
            alt="Web development team collaborating"
            width={1920}
            height={1080}
            sizes="100vw"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-[#050816]/60 z-[1]" />
          <div className="absolute inset-0 dot-grid z-[3]" />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-white glow-text">{s('ctaTitle','Ready to Build Something Great?')}</h2>
            <p className="text-white/85 mb-10 text-lg">{s('ctaSubtitle',"Let's discuss your project. Free consultation, no obligation.")}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={prefillHref('/contact', { source: 'Home page CTA — nexusweblab.com' })} className="neon-btn glow-pulse">
                {s('ctaButton','Get Free Consultation')} <ArrowRight size={20} />
              </Link>
              <Link href="/services" className="inline-flex items-center gap-2 glass text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/10 transition-all">
                {s('ctaSecondary','Explore Services')}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

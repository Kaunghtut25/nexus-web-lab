"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Globe, Palette, TrendingUp, ShoppingCart, Cloud, Wrench, ArrowRight, Check, Clock, Shield, Zap, MessageCircle, Sparkles, Layers, Rocket, FileText, Target, Mail } from "lucide-react";
import { useCurrency } from "@/lib/currency";
import { prefillHref } from "@/lib/lead-prefill";

// Map clean URL slug → DB service id
const SLUG_TO_ID: Record<string, string> = {
  'web-development': 'web-dev-1',
  'e-commerce': 'ecom-1',
  'ui-ux-design': 'uiux-1',
  'seo-package': 'seo-1',
  'hosting-deploy': 'host-1',
  'maintenance': 'maint-1',
  'error-fixing': 'errfix-1',
  'ai-chatbot': 'chatbot-1',
  'website-redesign': 'redesign-1',
  'social-media-management': 'smm-1',
  'content-writing': 'content-1',
  'logo-brand-identity': 'brand-1',
  'business-email-setup': 'email-1',
};

const ICON_MAP: Record<string, any> = { '🌐': Globe, '🛒': ShoppingCart, '🎨': Palette, '📈': TrendingUp, '☁️': Cloud, '🔧': Wrench, '🤖': Sparkles, '✨': Layers, '🛠️': Wrench, '📱': Sparkles, '✍️': FileText, '🎯': Target, '📧': Mail };

// Static enriched content per service (keyed by slug)
const DETAILS: Record<string, {
  tagline: string;
  overview: string;
  deliverables: string[];
  process: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
}> = {
  'web-development': {
    tagline: 'Fast, secure, modern websites that represent your brand — and convert visitors into customers.',
    overview: 'We build custom websites from scratch using Next.js, React and Tailwind CSS — the same stack powering some of the fastest sites on the internet. Every build is fully responsive, SEO-ready and optimized for speed, so your business looks professional on every device and ranks well on Google.',
    deliverables: ['Custom design tailored to your brand', 'Next.js + React + Tailwind CSS build', 'Fully responsive (mobile, tablet, desktop)', 'SEO-ready structure & meta tags', 'Fast loading — Lighthouse 90+', 'Contact forms & lead capture', 'Google Analytics setup', 'Basic training & handover'],
    process: [
      { title: 'Discovery Call', desc: 'We learn your business, audience and goals — free 30-minute consultation.' },
      { title: 'Design Mockup', desc: 'You approve a visual design before a single line of code is written.' },
      { title: 'Build & Test', desc: 'We develop your site with weekly progress updates and live preview links.' },
      { title: 'Launch & Support', desc: 'We deploy to your domain, connect analytics and stay on call for fixes.' },
    ],
    faq: [
      { q: 'How long does a website take?', a: 'A landing page takes 3–5 days; a full multi-page website takes 1–3 weeks depending on scope.' },
      { q: 'Do I own the website?', a: '100% yes. The code, design and domain are fully yours after handover.' },
      { q: 'Can you redesign my existing site?', a: 'Yes — we can rebuild an existing site with a modern look while keeping your content and SEO value.' },
    ],
  },
  'e-commerce': {
    tagline: 'Online stores that turn visitors into buyers — with payments, inventory and orders all in one place.',
    overview: 'We build complete online stores with product catalogs, shopping carts, order management and local payment gateways like KBZPay, AYA Pay and Wave. You get a full admin panel to manage products, prices, stock and orders — no technical skills needed. AI live chat is included to capture customers 24/7.',
    deliverables: ['Product catalog & categories', 'Shopping cart & checkout flow', 'KBZPay / AYA Pay / Wave / bank transfer', 'Full admin dashboard (products, orders)', 'Order emails & notifications', 'AI live chat widget', 'Delivery & tracking integration', 'Staff training & handover'],
    process: [
      { title: 'Scope & Products', desc: 'We map your products, pricing and delivery model together.' },
      { title: 'Store Design', desc: 'A premium storefront designed around your brand and products.' },
      { title: 'Build & Payments', desc: 'Storefront, cart, admin panel and payment gateways go live.' },
      { title: 'Test & Launch', desc: 'We run real test orders end-to-end before your first customer arrives.' },
    ],
    faq: [
      { q: 'Which payment methods can I accept?', a: 'KBZPay, AYA Pay, Wave Pay, CB Pay, bank transfer, and international options like PayPal on request.' },
      { q: 'Do you integrate delivery?', a: 'Yes — we support manual delivery assignment and tracking integrations.' },
      { q: 'Can I manage products myself?', a: 'Absolutely. The admin panel lets you add/edit products, change prices and process orders without us.' },
    ],
  },
  'ui-ux-design': {
    tagline: 'Interfaces people love to use — designed to be beautiful, clear and effortless.',
    overview: 'Great design is not just about looks — it is about how easily your customers find what they need. We design user interfaces and experiences that are visually stunning, intuitive and aligned with your brand. From wireframes to high-fidelity prototypes, we design before we build, so you always know exactly what you are getting.',
    deliverables: ['Brand-aligned UI kit & style guide', 'Wireframes & user flow mapping', 'High-fidelity page designs', 'Responsive design for all screens', 'Interactive clickable prototype (Figma)', 'Design system for future pages', 'Developer-ready handoff', '2 rounds of revisions included'],
    process: [
      { title: 'Discover', desc: 'We research your users, competitors and brand to define the design direction.' },
      { title: 'Design', desc: 'Wireframes become polished, high-fidelity screens with real content.' },
      { title: 'Prototype', desc: 'You click through an interactive prototype and give feedback.' },
      { title: 'Handoff', desc: 'Developers receive pixel-perfect specs, assets and a style guide.' },
    ],
    faq: [
      { q: 'Do you only design, or also build?', a: 'Both. We can deliver design-only, or design + development as a full package.' },
      { q: 'How many revisions do I get?', a: 'Every design package includes 2 revision rounds; unlimited revisions available on Premium.' },
      { q: 'What do you need from me to start?', a: 'Your logo, brand colors, content/text, and any examples of sites you like.' },
    ],
  },
  'seo-package': {
    tagline: 'Get found on Google — more traffic, more leads, more sales without paid ads.',
    overview: 'We optimize your website so customers actually find you. Our SEO packages cover technical SEO, on-page content optimization, keyword research and Google Business setup. The result: higher rankings on Google, more organic traffic, and steady growth for your business — month after month.',
    deliverables: ['Keyword research & strategy', 'On-page SEO (titles, meta, headings)', 'Technical SEO (speed, sitemap, indexing)', 'Google Search Console setup', 'Google Business Profile setup', 'Content optimization for key pages', 'Local SEO for Myanmar businesses', 'Monthly progress report'],
    process: [
      { title: 'Audit', desc: 'We analyze your current rankings, speed and competitors.' },
      { title: 'Optimize', desc: 'Technical fixes and on-page content improvements go live.' },
      { title: 'Grow', desc: 'We build authority with content and local SEO signals.' },
      { title: 'Report', desc: 'You get a clear monthly report on rankings and traffic.' },
    ],
    faq: [
      { q: 'How soon will I see results?', a: 'Most clients see movement in 4–8 weeks. SEO is a long-term channel — the best results build over 3–6 months.' },
      { q: 'Do I need to keep paying monthly?', a: 'Yes — SEO needs ongoing work to stay competitive. Monthly packages are the most effective.' },
      { q: 'Can you rank me #1?', a: 'Nobody can guarantee #1. We guarantee real, measurable improvements in visibility and traffic.' },
    ],
  },
  'hosting-deploy': {
    tagline: 'We handle the technical side — your site stays fast, secure and always online.',
    overview: 'Deployment and hosting can be the most confusing part of owning a website. We take care of everything: cloud hosting setup, domain configuration, SSL certificates, CDN and performance tuning. Your site stays fast, secure and online — while you focus on your business.',
    deliverables: ['Cloud hosting setup (Vercel / server)', 'Custom domain configuration', 'Free SSL / HTTPS certificate', 'Global CDN & caching', 'Automatic backups', 'Uptime monitoring & alerts', 'Security hardening', 'Email / business email setup'],
    process: [
      { title: 'Setup', desc: 'We configure hosting, domain and SSL for your project.' },
      { title: 'Deploy', desc: 'Your site goes live on your own domain with HTTPS.' },
      { title: 'Harden', desc: 'Security, backups and monitoring are activated.' },
      { title: 'Monitor', desc: 'We watch uptime and performance around the clock.' },
    ],
    faq: [
      { q: 'Do you host in Myanmar or internationally?', a: 'We use global cloud infrastructure (Vercel, Cloudflare) for speed and reliability worldwide, including fast loading in Myanmar.' },
      { q: 'Can you migrate my existing site?', a: 'Yes — we can move your site and domain to our managed setup with zero downtime.' },
      { q: 'What happens if my site goes down?', a: 'Monitoring alerts us first, and we fix issues before you even notice.' },
    ],
  },
  'maintenance': {
    tagline: 'Keep your website fast, fresh and secure — with a team on call, every month.',
    overview: 'Websites need care: updates, backups, security patches and fresh content. Our maintenance plans keep your site running smoothly so you never worry about downtime, hacks or outdated information. Think of it as an insurance policy for your online presence.',
    deliverables: ['Monthly updates & backups', 'Security patches & malware scans', 'Uptime monitoring', 'Content updates (text, images, offers)', 'Performance optimization', 'Bug fixes included', 'Priority support channel', 'Monthly health report'],
    process: [
      { title: 'Baseline', desc: 'We audit your site and set up backups and monitoring.' },
      { title: 'Monthly Care', desc: 'Updates, security checks and content changes on schedule.' },
      { title: 'On-Call', desc: 'You get priority support for any issue — big or small.' },
      { title: 'Report', desc: 'A clear monthly summary of what we did and what is next.' },
    ],
    faq: [
      { q: 'How many content changes per month?', a: 'Standard plans include up to 4 content updates per month; Premium includes more.' },
      { q: 'Do you fix broken things fast?', a: 'Yes — critical issues are treated as urgent and fixed within 24 hours.' },
      { q: 'Can I cancel anytime?', a: 'Yes, month-to-month plans with no long-term contracts.' },
    ],
  },
  'error-fixing': {
    tagline: 'Broken website? We diagnose the problem and fix it — fast, with a clear report.',
    overview: 'Websites break: layouts fall apart, pages show errors, forms stop sending, sites load slowly or show scary security warnings. The good news — almost everything is fixable. We start with a free diagnosis, give you a fixed-price quote, then fix the issue and hand over a clean report of exactly what was wrong and what we did.',
    deliverables: ['Free diagnosis & fixed-price quote', 'Broken layout & design fixes', '404, white screen & error pages', 'Console & JavaScript errors', 'Forms, buttons & links repair', 'Speed & performance optimization', 'Mobile / responsive breakage', 'SSL & security warning fixes', 'Post-fix testing on all devices', 'Clear before/after report'],
    process: [
      { title: 'Diagnose', desc: 'You describe the issue (or share a link) — we inspect and find the root cause. Free.' },
      { title: 'Quote', desc: 'You get a clear, fixed-price quote before any work starts. No surprises.' },
      { title: 'Fix & Test', desc: 'We fix the issue and test it across desktop, tablet and mobile.' },
      { title: 'Handover', desc: 'A simple report of what was broken, what we fixed, and how to avoid it.' },
    ],
    faq: [
      { q: 'How fast can you fix my website?', a: 'Most fixes are completed within 24–48 hours. Urgent issues (site completely down) get priority.' },
      { q: 'Do I need to give you access to my hosting?', a: 'Usually yes for backend fixes, but many issues can be fixed from the front-end or via a staging copy. We only ask for what is needed.' },
      { q: 'What if the issue comes back?', a: 'We include a 7-day free re-fix guarantee on all error-fixing work.' },
      { q: 'Can you fix websites built by someone else?', a: 'Yes — we work on any platform: WordPress, Wix, custom code, React, Next.js and more.' },
    ],
  },
  'ai-chatbot': {
    tagline: 'An AI assistant that answers your customers 24/7, captures leads and books sales while you sleep.',
    overview: 'Imagine a smart assistant that greets every visitor, answers their questions instantly, collects their contact details and even quotes your services — all without you lifting a finger. We build and train AI chatbots trained on your own business information, then connect them to your website, Facebook Messenger or WhatsApp. Every conversation becomes a captured lead delivered straight to your inbox.',
    deliverables: ['AI trained on your business info', 'Website chat widget with your branding', 'Messenger / WhatsApp integration', 'Lead capture with email & phone', 'Instant answers to FAQs 24/7', 'Handover to human agent when needed', 'Conversation history dashboard', 'Monthly bot training & improvements'],
    process: [
      { title: 'Knowledge Upload', desc: 'You share your services, prices and FAQs — we train the bot on them.' },
      { title: 'Build & Connect', desc: 'We build the chat widget and connect it to your site, Messenger or WhatsApp.' },
      { title: 'Test & Tune', desc: 'We run real conversations, fix weak answers and polish the tone.' },
      { title: 'Go Live', desc: 'The bot starts answering and capturing leads 24/7 — you get notified instantly.' },
    ],
    faq: [
      { q: 'Does it answer in Burmese?', a: 'Yes — the bot can be trained to answer fluently in Burmese, English or both.' },
      { q: 'Can customers still reach a human?', a: 'Of course. The bot hands over to you or your team whenever the visitor needs it.' },
      { q: 'Where can I see the leads?', a: 'Every lead lands in your email, dashboard, or connected tools like Google Sheets and Telegram.' },
    ],
  },
  'website-redesign': {
    tagline: 'A modern, high-converting redesign of your existing website — without losing your SEO or content.',
    overview: 'Your website works, but it looks outdated and does not bring in customers the way it should. We redesign existing websites with a fresh, modern, mobile-first look while carefully preserving your content, brand identity and hard-earned SEO rankings. The result: a site that looks 5 years newer and converts more visitors into enquiries.',
    deliverables: ['Full visual redesign (modern UI)', 'Mobile-first responsive layout', 'SEO preserved — redirects & structure', 'Faster loading performance', 'Updated content & imagery', 'New branding touches (colors, fonts)', 'Lead capture forms upgraded', 'Testing across all devices'],
    process: [
      { title: 'Audit', desc: 'We review your current site, traffic and what is holding it back.' },
      { title: 'New Design', desc: 'You approve a fresh design mockup before we touch any code.' },
      { title: 'Rebuild & Migrate', desc: 'We rebuild the site and migrate your content and SEO carefully.' },
      { title: 'Launch', desc: 'We deploy the new site and make sure everything keeps ranking.' },
    ],
    faq: [
      { q: 'Will I lose my Google rankings?', a: 'No — we preserve URLs, redirect old pages and keep your SEO structure intact.' },
      { q: 'Can you keep my brand colors?', a: 'Yes — we modernize the design around your existing brand, or refresh it if you want.' },
      { q: 'How is redesign different from a new build?', a: 'Redesign keeps your content, domain and SEO and upgrades the look & performance — usually faster and cheaper than starting from zero.' },
    ],
  },
  'social-media-management': {
    tagline: 'Consistent, on-brand social content that keeps your business visible every day.',
    overview: 'We plan, create and publish your social media content so your brand stays active and engaging on Facebook, Instagram and TikTok — without you spending hours every week. You get a monthly content calendar, ready-to-post graphics and captions, plus a simple report showing what worked.',
    deliverables: ['Monthly content calendar', 'Branded post designs & captions', 'Scheduled posting on Facebook / Instagram / TikTok', 'Comment & message engagement', 'Monthly performance report', 'Monthly strategy call'],
    process: [
      { title: 'Brand & Goal Review', desc: 'We learn your business, audience and posting goals in a quick call.' },
      { title: 'Content Plan', desc: 'We build a monthly calendar around your offers, news and seasonal moments.' },
      { title: 'Create & Schedule', desc: 'We design posts and schedule them across your platforms.' },
      { title: 'Report & Improve', desc: 'Each month you see what performed best and we refine the next plan.' },
    ],
    faq: [
      { q: 'Which platforms do you manage?', a: 'Facebook, Instagram and TikTok — or just the ones your customers actually use.' },
      { q: 'Do I need to approve posts first?', a: 'Yes — we send the monthly calendar for approval before anything goes live.' },
      { q: 'Is there a minimum contract?', a: 'No — you can start monthly and cancel anytime with 2 weeks notice.' },
    ],
  },
  'content-writing': {
    tagline: 'Clear, persuasive copy that turns visitors into customers.',
    overview: 'Words sell. We write website copy, blog posts, product descriptions and SEO articles that explain your business clearly and guide readers toward action — in English or Burmese. Every piece is researched, structured and edited before delivery.',
    deliverables: ['Website copy & landing page text', 'SEO blog articles (800–1500 words)', 'Product & service descriptions', 'Email newsletters', 'Proofreading & editing of your drafts'],
    process: [
      { title: 'Brief', desc: 'You tell us the goal, audience and tone — we handle the rest.' },
      { title: 'Draft', desc: 'We write the first version within the agreed timeline.' },
      { title: 'Review', desc: 'You give feedback and we revise until it reads right.' },
      { title: 'Deliver', desc: 'You get polished copy ready to publish in your CMS.' },
    ],
    faq: [
      { q: 'Do you write in Burmese too?', a: 'Yes — we write and edit in both English and Burmese (Myanmar Unicode).' },
      { q: 'How long does an article take?', a: 'A 1000-word SEO article is usually delivered in 3–5 working days.' },
      { q: 'Is SEO research included?', a: 'Yes — keywords and structure are researched before writing.' },
    ],
  },
  'logo-brand-identity': {
    tagline: 'A memorable logo and consistent brand identity your customers recognize.',
    overview: 'Your logo is the first impression of your business. We design a professional logo with a full brand kit — color palette, typography and usage guidelines — so every page, post and product looks consistent and trustworthy.',
    deliverables: ['Logo design (3 concepts to choose from)', 'Color palette & typography system', 'Brand guidelines PDF', 'Logo files (PNG, SVG, vector source)', 'Social media profile kit'],
    process: [
      { title: 'Discovery', desc: 'We learn your business, values and visual preferences.' },
      { title: 'Concepts', desc: 'You get 3 distinct logo concepts to react to.' },
      { title: 'Refine', desc: 'We polish your chosen concept with your feedback.' },
      { title: 'Brand Kit', desc: 'We deliver the full identity package and source files.' },
    ],
    faq: [
      { q: 'How many revisions?', a: 'Up to 3 rounds of refinements are included.' },
      { q: 'Do I own the logo?', a: 'Yes — 100% ownership and all source files are yours after payment.' },
      { q: 'Can you update my old logo instead?', a: 'Yes — we can modernize an existing logo while keeping it recognizable.' },
    ],
  },
  'business-email-setup': {
    tagline: 'Look professional with email at your own domain (name@yourbusiness.com).',
    overview: 'Free email accounts look unprofessional. We set up business email at your own domain, configure DNS and SPF so your messages actually reach inboxes, and help you connect everything to your phone and computer.',
    deliverables: ['Business email at your domain', 'DNS & SPF / DKIM configuration', 'Mail app setup (phone & computer)', 'Spam-free email delivery', 'Quick setup guide'],
    process: [
      { title: 'Domain Check', desc: 'We verify your domain and current DNS settings.' },
      { title: 'Setup', desc: 'We create mailboxes and configure DNS records (SPF, DKIM, DMARC).' },
      { title: 'Connect', desc: 'We help you add the mailbox to Gmail, Outlook or phone apps.' },
      { title: 'Test', desc: 'We send test emails and confirm delivery works.' },
    ],
    faq: [
      { q: 'Which provider do you use?', a: 'We set up via Zoho Mail or Google Workspace — both reliable, business-grade providers.' },
      { q: 'Do I need a domain?', a: 'Yes, you need your own domain. We can help you register one if you do not have it yet.' },
      { q: 'Is it a monthly fee?', a: 'The setup fee is one-time; the mail provider charges a small monthly fee per mailbox (Zoho from ~$1/mailbox).' },
    ],
  },
};

export default function ServiceDetail() {
  const params = useParams<{ slug: string }>();
  const slug = (params?.slug || '').replace(/\.html$/, '');
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { currency, formatPrice } = useCurrency();

  useEffect(() => {
    if (!slug) { setLoading(false); return; }
    const id = SLUG_TO_ID[slug];
    fetch('/api/services').then(r => r.json()).then(d => {
      const all = d.services || [];
      const found = all.find((s: any) => s.id === id) || all.find((s: any) => s.title.toLowerCase().includes(slug.replace(/-/g, ' ').slice(0, 12))) || all[0];
      setService(found || null);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [slug]);

  const detail = DETAILS[slug] || DETAILS['web-development'];
  const features = Array.isArray(service?.features) ? service.features : [];
  const IconComp = service ? (ICON_MAP[service.icon] || Globe) : Globe;
  const images: Record<string, string> = {
    'web-development': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=960&fit=crop&q=100',
    'e-commerce': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&h=960&fit=crop&q=100',
    'ui-ux-design': 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1920&h=960&fit=crop&q=100',
    'seo-package': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=960&fit=crop&q=100',
    'hosting-deploy': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=960&fit=crop&q=100',
    'maintenance': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=960&fit=crop&q=100',
    'error-fixing': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&h=960&fit=crop&q=100',
    'ai-chatbot': 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1920&h=960&fit=crop&q=100',
    'website-redesign': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1920&h=960&fit=crop&q=100',
  };
  const heroImg = images[slug] || images['web-development'];
  const title = service?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-blue animate-pulse" />
            <span className="w-3 h-3 rounded-full bg-blue animate-pulse" style={{ animationDelay: '0.2s' }} />
            <span className="w-3 h-3 rounded-full bg-blue animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <title>{title} — Nexus Web Lab</title>
      <meta name="description" content={`${title} services by Nexus Web Lab — ${detail.tagline} Get a free quote within 24 hours.`} />
      <meta property="og:title" content={`${title} — Nexus Web Lab`} />
      <meta property="og:description" content={`${title} services by Nexus Web Lab — ${detail.tagline}`} />
      <meta property="og:image" content={heroImg} />
      <meta property="og:type" content="website" />
      <Header />
      <main>
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
                    <li className="flex items-center gap-2.5 text-slate-200"><Clock size={15} className="text-cyan-300" /> Fast delivery — 3 days to 3 weeks</li>
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

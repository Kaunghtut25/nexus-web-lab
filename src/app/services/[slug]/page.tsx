import { notFound } from "next/navigation";
import ServiceDetailClient from "@/components/services/ServiceDetailClient";
import { SERVICE_META, getServices, type ServiceDetailContent, type ServiceRow } from "@/lib/services";

// Server component: the service copy is rendered into the initial HTML (the
// page previously fetched /api/services in a client effect, so crawlers saw an
// empty shell). Renders per request because the CSP proxy signs every response
// with a per-request nonce — see src/app/page.tsx for the same constraint.
export const dynamic = "force-dynamic";

// Static, per-service page content (server-side data; not shipped to the client
// bundle — only the requested entry is passed to the client component).
const DETAILS: Record<string, ServiceDetailContent> = {
  'web-development': {
    tagline: 'Fast, secure, modern websites that represent your brand — and convert visitors into customers.',
    delivery: 'Landing page 3–5 days · Full website 1–3 weeks',
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
    delivery: '2–4 weeks depending on scope',
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
    delivery: '3–7 days per screen set',
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
    delivery: 'Launch in 1–2 weeks · results build 4–8 weeks',
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
    delivery: '1–2 days',
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
    delivery: 'Ongoing — monthly plan',
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
    delivery: '1–3 days · urgent fixes in 24h',
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
    tagline: 'An AI Employee that understands your customers, captures leads, quotes projects and automates your business — 24/7.',
    delivery: '1–3 weeks depending on scope',
    overview: 'Move beyond simple chatbots. Nexus builds AI Agents — AI Employees — that don\'t just answer FAQs. They understand what your customer needs, collect lead details, generate quotes, manage bookings, send emails, update your CRM and run workflows automatically. Powered by your own Knowledge Base (RAG) and a NEXUS Master Agent that routes every request to the right specialist agent — Sales, Support, Booking, Marketing or Knowledge. Your business keeps selling while you sleep.',
    deliverables: ['Knowledge Base AI (RAG) — trained on your PDFs, catalogs, website & FAQs', 'NEXUS Master Agent + Multi-Agent system (Sales / Support / Booking / Marketing)', 'AI Sales Agent — qualifies visitors, collects budget & requirements', 'AI Quote Generator — auto-builds project estimates with timeline', 'Lead capture → CRM / Google Sheets / Telegram', 'Booking & appointment automation', 'Multi-language: English, Burmese, Thai, Chinese', 'Analytics dashboard — visitors, conversations, leads, conversion', 'Human handoff with support ticket', 'Facebook Messenger / WhatsApp / Telegram / Instagram DM integration'],
    process: [
      { title: 'Knowledge Upload', desc: 'Upload your PDFs, product catalog, website URL and FAQs — we build your Knowledge Base (RAG).' },
      { title: 'Agent Design', desc: 'We configure the Master Agent and specialist agents (Sales, Support, Booking) for your business.' },
      { title: 'Connect & Automate', desc: 'We connect CRM, email, calendar, Messenger and WhatsApp — workflows run automatically.' },
      { title: 'Train & Launch', desc: 'We test real conversations, tune answers, then launch your AI Employee 24/7.' },
    ],
    faq: [
      { q: 'What is the difference between a chatbot and an AI Agent?', a: 'A chatbot answers questions. An AI Agent understands intent, captures leads, generates quotes, updates your CRM and runs workflows — it works like an employee, not a FAQ box.' },
      { q: 'Can it learn from my documents?', a: 'Yes — Knowledge Base AI (RAG) trains on your PDFs, product catalogs, website and training documents, so every answer is accurate to YOUR business.' },
      { q: 'Does it answer in Burmese and other languages?', a: 'Yes — English, Burmese, Thai and Chinese. Customers can ask in their own language and get answers in the same language.' },
      { q: 'Can customers still reach a human?', a: 'Of course. The AI creates a support ticket and hands over to your team whenever the visitor needs a specialist.' },
      { q: 'Which channels does it connect to?', a: 'Website chat, Facebook Messenger, WhatsApp, Telegram and Instagram DM — one AI Employee, many channels.' },
    ],
    packages: [
      { name: 'Starter AI Chatbot', price: '$299 – $499', desc: 'For businesses that want a smart assistant today.', features: ['Website Chatbot', 'FAQ Training', 'Basic AI Response', 'Lead Collection', '1 Language'], popular: false },
      { name: 'Business AI Agent', price: '$999 – $2,500', desc: 'A real AI Employee that sells and automates.', features: ['Custom Knowledge Base (RAG)', 'AI Sales Agent', 'CRM Integration', 'Booking Automation', 'Multi-language', 'Analytics Dashboard'], popular: true },
      { name: 'Enterprise AI Automation', price: '$5,000+', desc: 'Full business automation with a private AI system.', features: ['NEXUS Master Agent', 'Multi-Agent System', 'Voice AI', 'Custom Workflow', 'Private AI Model', 'Full Business Automation'], popular: false },
    ],
  },
  'website-redesign': {
    tagline: 'A modern, high-converting redesign of your existing website — without losing your SEO or content.',
    delivery: '1–3 weeks',
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
    delivery: 'Ongoing — monthly plan',
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
    delivery: '2–5 days per batch',
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
    delivery: '2–4 days',
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
    delivery: '1–2 days',
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

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = await params;
  const slug = (rawSlug || "").replace(/\.html$/, "");
  const meta = SERVICE_META[slug];
  if (!meta) notFound();

  let service: ServiceRow | null = null;
  try {
    const all = await getServices();
    service = all.find((s) => s.id === meta.id) ?? null;
  } catch (e) {
    console.error("[ServiceDetailPage] services fetch failed:", e);
  }

  return (
    <ServiceDetailClient
      slug={slug}
      service={service}
      detail={DETAILS[slug] ?? DETAILS["web-development"]}
      heroImg={meta.image}
    />
  );
}

import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { headers } from "next/headers";
import HomeClient from "@/components/home/HomeClient";
import { dbAllRead } from "@/lib/db";

export const metadata: Metadata = {
  title: "Nexus Web Lab — AI Automation & AI-Powered Web Development",
  description: "AI automation, AI chatbots and AI-powered web development in Yangon, Myanmar. We build intelligent digital systems — AI websites, business automation, custom AI agents and SaaS applications.",
};

// NOTE: this page MUST stay `force-dynamic`.
// The CSP proxy (src/proxy.ts) signs every response with a per-request nonce;
// if the page is prerendered/cached (ISR), the cached HTML carries a stale
// nonce and the browser blocks ALL scripts → blank page for minutes.
// Instead of caching the page, we cache the expensive DB result below
// (unstable_cache, 300s) so each request renders fast from cached data
// while the nonce always matches. Best of both: speed + strict CSP.
export const dynamic = "force-dynamic";

function parseJson(v: any) { try { return JSON.parse(v); } catch { return []; } }

// Build-time DB access is wrapped so an unreachable DB never breaks `next build`;
// HomeClient already ships fallbacks for slides/features/premium/testimonials.
const EMPTY = {
  settings: {} as Record<string, string>,
  services: [] as any[],
  projects: [] as any[],
  testimonials: [] as any[],
  slides: [] as any[],
  features: [] as any[],
  premiumFeatures: [] as any[],
};

// Data-layer cache: 7 Turso queries → cached for 300s, revalidated in the
// background. Turns ~12s cold DB work into ~0ms, without touching the page cache.
const getHomeData = unstable_cache(
  async () => {
    const [settingsRows, servicesRows, projectsRows, testimonialsRows, slidesRows, featuresRows, premiumRows] = await Promise.all([
      dbAllRead('SELECT * FROM settings'),
      dbAllRead('SELECT * FROM services ORDER BY sort_order'),
      dbAllRead('SELECT * FROM projects ORDER BY sort_order'),
      dbAllRead('SELECT * FROM testimonials ORDER BY sort_order'),
      dbAllRead('SELECT * FROM hero_slides ORDER BY sort_order'),
      dbAllRead('SELECT * FROM features ORDER BY sort_order'),
      dbAllRead('SELECT * FROM premium_features ORDER BY sort_order'),
    ]);

    const settings: Record<string, string> = {};
    for (const s of settingsRows) settings[s.key as string] = s.value as string;
    // Contact details are intentionally excluded from the public RSC payload —
    // all leads must flow through the contact form/chatbot.
    delete settings['phone'];
    delete settings['email'];

    return {
      settings,
      services: servicesRows.map((r: any) => ({ ...r, features: parseJson(r.features) })),
      projects: projectsRows.map((r: any) => ({ ...r, tags: parseJson(r.tags) })),
      testimonials: testimonialsRows,
      slides: slidesRows,
      features: featuresRows,
      premiumFeatures: premiumRows,
    };
  },
  ['home-data'],
  { revalidate: 300 }
);

export default async function HomePage() {
  let data = EMPTY;
  try {
    // Server-side data fetching (RSC) — replaces the 7 client fetch calls.
    // All content is present in the initial HTML: better LCP, no waterfall,
    // and crawlers see the full page (fixes "thin content").
    data = await getHomeData();
  } catch (e) {
    console.error('[HomePage] DB fetch failed, using fallbacks:', e);
  }

  // GEO/FAQ schema — AI-search readable structured data (mirrors the FAQ
  // section rendered in HomeClient). Nonce attached for CSP compliance.
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What services does Nexus Web Lab offer?", acceptedAnswer: { "@type": "Answer", text: "Custom web development, e-commerce stores, UI/UX design, SEO packages, hosting & deployment, website maintenance, error fixing, AI chatbots, and complete website redesigns." } },
      { "@type": "Question", name: "How much does a website cost?", acceptedAnswer: { "@type": "Answer", text: "Pricing depends on the scope — a landing page starts affordably, while full e-commerce and AI web apps are custom-quoted. Contact us for a free, no-obligation quote." } },
      { "@type": "Question", name: "Do you build websites for clients outside Myanmar?", acceptedAnswer: { "@type": "Answer", text: "Yes. We work with clients worldwide. Communication, deliverables, and support are fully online, and we accept international payments." } },
      { "@type": "Question", name: "How long does a typical project take?", acceptedAnswer: { "@type": "Answer", text: "A standard business website usually takes 1–2 weeks. Larger e-commerce or AI-powered projects take 3–6 weeks depending on features and content." } },
      { "@type": "Question", name: "Do you provide support after launch?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. Every project includes post-launch support, and our premium package offers priority 24/7-style assistance and unlimited revisions." } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" nonce={nonce} dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <HomeClient initialData={data} />
    </>
  );
}

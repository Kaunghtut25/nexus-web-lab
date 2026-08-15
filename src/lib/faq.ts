// Single source of truth for the homepage FAQ (Phase 5 centralization).
// Rendered in HomeClient (visible section) AND emitted as FAQPage JSON-LD
// from src/app/page.tsx — both must stay in sync, so they share this file.

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQS: FaqItem[] = [
  {
    q: "What services does Nexus Web Lab offer?",
    a: "Custom web development, e-commerce stores, UI/UX design, SEO packages, hosting & deployment, website maintenance, error fixing, AI chatbots, and complete website redesigns.",
  },
  {
    q: "How much does a website cost?",
    a: "Pricing depends on the scope — a landing page starts affordably, while full e-commerce and AI web apps are custom-quoted. Contact us for a free, no-obligation quote.",
  },
  {
    q: "Do you build websites for clients outside Myanmar?",
    a: "Yes. We work with clients worldwide. Communication, deliverables, and support are fully online, and we accept international payments.",
  },
  {
    q: "How long does a typical project take?",
    a: "A standard business website usually takes 1–2 weeks. Larger e-commerce or AI-powered projects take 3–6 weeks depending on features and content.",
  },
  {
    q: "Do you provide support after launch?",
    a: "Absolutely. Every project includes post-launch support, and our premium package offers priority 24/7-style assistance and unlimited revisions.",
  },
];

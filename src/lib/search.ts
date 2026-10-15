// Local intent-matching search for the Command Palette.
// No API / no embeddings cost: intent groups map the words people actually type
// (English synonyms AND Burmese terms) onto the right page, and the scorer
// ranks label > keyword > hint so the best target floats to the top.

export interface SearchItem {
  href: string;
  label: string;
  hint: string;
  keywords: string[]; // synonyms, Burmese terms, common typos/misspellings
}

export const SERVICES: SearchItem[] = [
  { href: "/services/web-development", label: "Web Development", hint: "Service", keywords: ["website", "site", "build", "developer", "coding", "ဝက်ဘ်ဆိုဒ်", "ဆိုဒ်", "ဆောက်", "websait"] },
  { href: "/services/e-commerce", label: "E-Commerce", hint: "Service", keywords: ["store", "shop", "online store", "selling", "products", "payment", "ဆိုင်", "အရောင်း", "ရောင်း", "ကုန်"] },
  { href: "/services/ui-ux-design", label: "UI/UX Design", hint: "Service", keywords: ["design", "ui", "ux", "interface", "wireframe", "mockup", "ဒီဇိုင်း", "ဒီဇိုင်နာ"] },
  { href: "/services/seo-package", label: "SEO Package", hint: "Service", keywords: ["seo", "google", "ranking", "traffic", "search engine", "ဂူဂယ်", "ဂူးဂဲလ်", "ရှာဖွေ"] },
  { href: "/services/hosting-deploy", label: "Hosting & Deploy", hint: "Service", keywords: ["host", "server", "domain", "ssl", "deploy", "ဟိုစတင်", "ဒိုမိန်း", "ဆာဗာ"] },
  { href: "/services/maintenance", label: "Maintenance", hint: "Service", keywords: ["update", "support", "care", "backup", "မားန်တန်", "ပြုပြင်", "ထိန်းသိမ်း"] },
  { href: "/services/error-fixing", label: "Errors Fixing", hint: "Service", keywords: ["bug", "fix", "broken", "error", "crash", "not working", "ပျက်နေ", "ဘတ်", "ချို့ယွင်း"] },
  { href: "/services/ai-chatbot", label: "AI Chatbot", hint: "Service", keywords: ["ai", "bot", "automation", "chat", "agent", "messenger", "စကားပြော", "ဘော့", "automation", "အော်တို"] },
  { href: "/services/website-redesign", label: "Website Redesign", hint: "Service", keywords: ["redesign", "rebuild", "modern", "refresh", "old website", "အသစ်ပြင်", "ပြန်လုပ်"] },
  { href: "/services/social-media-management", label: "Social Media Management", hint: "Service", keywords: ["facebook", "smm", "post", "content", "marketing", "ဖေ့စ်ဘွတ်", "ဆိုရှယ်", "ပို့စ်"] },
  { href: "/services/content-writing", label: "Content Writing", hint: "Service", keywords: ["copy", "article", "blog writing", "english", "မြန်မာ", "စာရေး", "ဆောင်းပါး"] },
  { href: "/services/logo-brand-identity", label: "Logo & Brand Identity", hint: "Service", keywords: ["logo", "brand", "identity", "color", "လိုဂို", "အမှတ်တံဆိပ်"] },
  { href: "/services/business-email-setup", label: "Business Email Setup", hint: "Service", keywords: ["email", "mail", "gmail", "domain email", "အီးမေးလ်", "မေးလ်"] },
];

export const PAGES: SearchItem[] = [
  { href: "/", label: "Home", hint: "Page", keywords: ["main", "start", "ပင်မ", "ပင်မစာမျက်နှာ"] },
  { href: "/services", label: "All Services", hint: "Page", keywords: ["services", "pricing", "price", "cost", "ဝန်ဆောင်မှု", "ဈေး", "နှုန်း"] },
  { href: "/portfolio", label: "Portfolio", hint: "Page", keywords: ["work", "projects", "samples", "examples", "case study", "လုပ်ငန်း", "နမူနာ", "ပို့ဖိုလီယို"] },
  { href: "/blog", label: "Blog", hint: "Page", keywords: ["news", "articles", "posts", "ဆောင်းပါး", "ဘလော့"] },
  { href: "/about", label: "About", hint: "Page", keywords: ["company", "team", "who", "founder", "owner", "အကြောင်း", "ပိုင်ရှင်"] },
  { href: "/contact", label: "Contact", hint: "Page", keywords: ["call", "email", "message", "phone", "reach", "ဆက်သွယ်", "ဖုန်း", "အီးမေးလ်"] },
  { href: "/get-quote", label: "Get a Quote", hint: "Page", keywords: ["quote", "estimate", "price", "cost", "hire", "budget", "ဈေး", "ကုန်ကျ", "ဘတ်ဂျက်", "ခန့်မှန်း"] },
  { href: "/course", label: "AI Freelance Course", hint: "Page", keywords: ["learn", "training", "class", "study", "freelance", "fiverr", "upwork", "သင်တန်း", "သင်ရန်", "လေ့လာ"] },
  { href: "/demo", label: "Live Demo", hint: "Page", keywords: ["demo", "try", "example", "sample", "သရုပ်ပြ", "စမ်း"] },
  { href: "/privacy", label: "Privacy Policy", hint: "Page", keywords: ["privacy", "data", "gdpr", "ကိုယ်ရေး"] },
  { href: "/terms", label: "Terms of Service", hint: "Page", keywords: ["terms", "legal", "conditions", "စည်းကမ်း"] },
  { href: "/accessibility", label: "Accessibility", hint: "Page", keywords: ["a11y", "accessibility", "screen reader"] },
];

export const ALL: SearchItem[] = [...SERVICES, ...PAGES];

// Normalize: lowercase, strip punctuation, collapse spaces.
const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();

// Score one item. 100 = exact label, 60 = label prefix, 40 = label contains,
// 30 = keyword exact, 20 = keyword contains, 15 = hint contains.
// Multi-word queries: every token must match something (AND), scores add up.
export function scoreItem(item: SearchItem, query: string): number {
  const q = norm(query);
  if (!q) return 0;
  const label = norm(item.label);
  const hint = norm(item.hint);
  const keys = item.keywords.map(norm);
  const tokens = q.split(" ").filter(Boolean);
  let total = 0;
  for (const tok of tokens) {
    let best = 0;
    if (label === tok) best = 100;
    else if (label.startsWith(tok)) best = 60;
    else if (label.includes(tok)) best = 40;
    else if (keys.some((k) => k === tok)) best = 30;
    else if (keys.some((k) => k.includes(tok) && tok.length >= 3)) best = 20;
    else if (hint.includes(tok)) best = 15;
    else if (tok.length >= 4 && label.split(" ").some((w) => w.startsWith(tok.slice(0, 3)))) best = 10; // prefix typo tolerance
    if (best === 0) return 0; // AND semantics: any unmatched token drops the item
    total += best;
  }
  return total;
}

export function search(query: string, limit = 8): SearchItem[] {
  if (!query.trim()) return ALL;
  return ALL.map((it) => ({ it, s: scoreItem(it, query) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.it);
}

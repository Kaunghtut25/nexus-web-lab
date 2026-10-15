// AI Quote Estimator — deterministic pricing engine.
// Base prices mirror the published service list (HomeClient / chat guideline):
//   Web Dev from $600 · E-Commerce from $1,200 · UI/UX from $300 · SEO from $200
//   Redesign from $250 · AI Chatbot from $299
// Feature add-ons and multipliers are heuristics for a RANGE, never a firm quote —
// the widget always shows low–high and routes the visitor to the real quote form.

export const USD_TO_MMK = 4500;

export type ProjectKey = "business" | "landing" | "ecommerce" | "webapp" | "redesign";

export interface ProjectType {
  key: ProjectKey;
  base: number; // USD
  en: string;
  mm: string;
}

export const PROJECT_TYPES: ProjectType[] = [
  { key: "business", base: 600, en: "Business Website", mm: "လုပ်ငန်း Website" },
  { key: "landing", base: 350, en: "Landing Page", mm: "Landing Page (တစ်မျက်နှာ)" },
  { key: "ecommerce", base: 1200, en: "E-Commerce Store", mm: "E-Commerce ဆိုင်" },
  { key: "webapp", base: 1800, en: "AI Web App / Platform", mm: "AI Web App / ပလက်ဖောင်း" },
  { key: "redesign", base: 250, en: "Website Redesign", mm: "Website အသစ်ပြန်လုပ်ခြင်း" },
];

export interface FeatureOption {
  key: string;
  add: number; // USD
  en: string;
  mm: string;
}

export const FEATURES: FeatureOption[] = [
  { key: "chatbot", add: 299, en: "AI Chatbot / Automation", mm: "AI Chatbot / Automation" },
  { key: "payment", add: 250, en: "Local Payment (KBZPay, AYA, Wave)", mm: "ပြည်တွင်းငွေချေစနစ် (KBZPay, AYA, Wave)" },
  { key: "admin", add: 400, en: "Admin Dashboard / CMS", mm: "Admin Dashboard / CMS" },
  { key: "accounts", add: 450, en: "User Accounts & Login", mm: "User Account နှင့် Login" },
  { key: "bilingual", add: 300, en: "Bilingual (Myanmar + English)", mm: "နှစ်ဘာသာ (မြန်မာ + English)" },
  { key: "seo", add: 200, en: "SEO Setup", mm: "SEO စနစ်ထည့်သွင်း" },
  { key: "booking", add: 250, en: "Booking / Custom Forms", mm: "Booking / Form စနစ်" },
  { key: "integration", add: 350, en: "API / Third-party Integration", mm: "API / အခြား Service ချိတ်ဆက်မှု" },
];

export const PAGE_TIERS = [
  { key: "s", mult: 1, en: "1–5 pages", mm: "၁–၅ မျက်နှာ" },
  { key: "m", mult: 1.25, en: "6–10 pages", mm: "၆–၁၀ မျက်နှာ" },
  { key: "l", mult: 1.5, en: "11–20 pages", mm: "၁၁–၂၀ မျက်နှာ" },
  { key: "xl", mult: 1.9, en: "20+ pages", mm: "၂၀ မျက်နှာအထက်" },
] as const;

export type PageTierKey = (typeof PAGE_TIERS)[number]["key"];

export interface EstimateInput {
  project: ProjectKey;
  pageTier: PageTierKey;
  features: string[];
  contentWriting: boolean; // we write the copy (+$150)
  rush: boolean; // +25%
}

export interface EstimateResult {
  low: number; // USD, rounded
  high: number; // USD, rounded
  base: number;
  addons: number;
}

const round50 = (n: number) => Math.max(50, Math.round(n / 50) * 50);

export function estimate(input: EstimateInput): EstimateResult {
  const pt = PROJECT_TYPES.find((p) => p.key === input.project) ?? PROJECT_TYPES[0];
  const tier = PAGE_TIERS.find((t) => t.key === input.pageTier) ?? PAGE_TIERS[0];
  // Base scales with page count; add-ons are flat (they don't grow with pages).
  const base = pt.base * tier.mult;
  let addons = FEATURES.filter((f) => input.features.includes(f.key)).reduce((sum, f) => sum + f.add, 0);
  if (input.contentWriting) addons += 150;
  let low = base + addons;
  if (input.rush) low *= 1.25;
  return { low: round50(low), high: round50(low * 1.3), base: round50(base), addons: round50(addons) };
}

export function formatUSD(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

export function formatMMK(n: number): string {
  return `${Math.round(n * USD_TO_MMK).toLocaleString("en-US")} MMK`;
}

export function estimateSummary(input: EstimateInput, lang: "en" | "mm"): string {
  const r = estimate(input);
  const pt = PROJECT_TYPES.find((p) => p.key === input.project);
  const tier = PAGE_TIERS.find((t) => t.key === input.pageTier);
  const feats = FEATURES.filter((f) => input.features.includes(f.key)).map((f) => f.en);
  const lines =
    lang === "mm"
      ? [
          `ကျွန်မတို့ရဲ့ AI Quote Estimator နဲ့ တွက်ကြည့်ထားတာပါ — ခန့်မှန်းခြေ ${formatUSD(r.low)}–${formatUSD(r.high)} (${formatMMK(r.low)}–${formatMMK(r.high)})`,
          `• အမျိုးအစား — ${pt?.mm ?? ""}`,
          `• ${tier?.mm ?? ""}`,
          feats.length ? `• လိုအပ်ချက်များ — ${feats.join(", ")}` : "",
          input.contentWriting ? "• Content ရေးသားခြင်းပါဝင်" : "",
          input.rush ? "• အမြန်ဆုံး လိုချင်သည် (Rush)" : "",
          "",
          "အသေးစိတ် ဆွေးနွေးပြီး တိကျတဲ့ ဈေးနှုန်း ပေးပို့ပေးပါရစေ။",
        ]
      : [
          `Here's an automated estimate from our AI Quote Estimator — approx. ${formatUSD(r.low)}–${formatUSD(r.high)} (${formatMMK(r.low)}–${formatMMK(r.high)})`,
          `• Type — ${pt?.en ?? ""}`,
          `• ${tier?.en ?? ""}`,
          feats.length ? `• Features — ${feats.join(", ")}` : "",
          input.contentWriting ? "• Content writing included" : "",
          input.rush ? "• Rush delivery requested" : "",
          "",
          "Let's discuss the details so we can send you an exact quote.",
        ];
  return lines.filter((l) => l !== "").join("\n");
}

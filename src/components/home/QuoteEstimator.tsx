"use client";
import { useMemo, useState } from "react";
import { Calculator, Sparkles, ArrowRight, Check, Languages } from "lucide-react";
import Link from "next/link";
import {
  PROJECT_TYPES, FEATURES, PAGE_TIERS,
  estimate, estimateSummary, formatUSD, formatMMK,
  type ProjectKey, type PageTierKey,
} from "@/lib/quote-estimator";

// Interactive AI Quote Estimator — deterministic live pricing (no API call),
// bilingual EN/MM. "Request exact quote" either hands the summary to the
// /get-quote form on this page (CustomEvent) or navigates there pre-filled.
export default function QuoteEstimator({ compact = false }: { compact?: boolean }) {
  const [lang, setLang] = useState<"en" | "mm">("en");
  const [project, setProject] = useState<ProjectKey>("business");
  const [pageTier, setPageTier] = useState<PageTierKey>("s");
  const [features, setFeatures] = useState<string[]>(["chatbot"]);
  const [contentWriting, setContentWriting] = useState(false);
  const [rush, setRush] = useState(false);

  const input = { project, pageTier, features, contentWriting, rush };
  const result = useMemo(() => estimate(input), [project, pageTier, features, contentWriting, rush]);
  const t = (en: string, mm: string) => (lang === "mm" ? mm : en);

  const toggleFeature = (key: string) =>
    setFeatures((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  const svcMap: Record<ProjectKey, string> = {
    business: "Web Development",
    landing: "Web Development",
    ecommerce: "E-Commerce",
    webapp: "Other",
    redesign: "Website Redesign",
  };

  function requestQuote() {
    const msg = estimateSummary(input, lang);
    const ev = new CustomEvent("nwl:quote-estimate", { detail: { svc: svcMap[project], msg } });
    const notHandled = window.dispatchEvent(ev); // false when a listener calls preventDefault
    if (notHandled) {
      window.location.href = `/get-quote?svc=${encodeURIComponent(svcMap[project])}&msg=${encodeURIComponent(msg)}#quote-form`;
    }
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-blue/5 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0F1D45] to-[#1E3A8A] px-6 sm:px-8 py-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-cyan-300">
            <Calculator size={20} />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg leading-tight">
              {t("AI Quote Estimator", "AI ဈေးနှုန်း ခန့်မှန်းစနစ်")}
            </h3>
            <p className="text-white/70 text-xs">
              {t("Instant ballpark in 30 seconds — no signup", "၃၀ စက္ကန့်အတွင်း ခန့်မှန်းဈေး သိရှိနိုင်ပါတယ်")}
            </p>
          </div>
        </div>
        <button
          onClick={() => setLang(lang === "en" ? "mm" : "en")}
          className="flex items-center gap-1.5 text-xs font-semibold text-white/90 border border-white/25 rounded-full px-3 py-1.5 hover:bg-white/10 transition"
          aria-label="Switch language"
        >
          <Languages size={13} /> {lang === "en" ? "မြန်မာ" : "English"}
        </button>
      </div>

      <div className={`p-6 sm:p-8 grid gap-8 ${compact ? "" : "lg:grid-cols-5"}`}>
        {/* Controls */}
        <div className={compact ? "space-y-6" : "lg:col-span-3 space-y-6"}>
          {/* Project type */}
          <div>
            <p className="text-sm font-bold text-navy mb-3">{t("What do you need?", "ဘာမျိုး လိုအပ်ပါသလဲ?")}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PROJECT_TYPES.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setProject(p.key)}
                  aria-pressed={project === p.key}
                  className={`text-left px-3.5 py-3 rounded-xl border text-sm font-semibold transition-all ${
                    project === p.key
                      ? "border-blue bg-blue/5 text-blue shadow-sm"
                      : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {t(p.en, p.mm)}
                </button>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <p className="text-sm font-bold text-navy mb-3">{t("How many pages?", "မျက်နှာ ဘယ်နှစ်ခု လိုသလဲ?")}</p>
            <div className="flex flex-wrap gap-2">
              {PAGE_TIERS.map((pt) => (
                <button
                  key={pt.key}
                  onClick={() => setPageTier(pt.key)}
                  aria-pressed={pageTier === pt.key}
                  className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
                    pageTier === pt.key
                      ? "border-blue bg-blue text-white shadow-md shadow-blue/25"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {t(pt.en, pt.mm)}
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <p className="text-sm font-bold text-navy mb-3">{t("Extra features", "ထပ်ဆောင်း လိုအပ်ချက်များ")}</p>
            <div className="flex flex-wrap gap-2">
              {FEATURES.map((f) => {
                const on = features.includes(f.key);
                return (
                  <button
                    key={f.key}
                    onClick={() => toggleFeature(f.key)}
                    aria-pressed={on}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-sm font-medium transition-all ${
                      on
                        ? "border-cyan bg-cyan/5 text-cyan-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    {on && <Check size={14} />} {t(f.en, f.mm)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Extras */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setContentWriting(!contentWriting)}
              aria-pressed={contentWriting}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-sm font-medium transition-all ${
                contentWriting ? "border-purple bg-purple/5 text-purple" : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              {contentWriting && <Check size={14} />} {t("Write content for me", "Content ရေးပေးရန်")}
            </button>
            <button
              onClick={() => setRush(!rush)}
              aria-pressed={rush}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-sm font-medium transition-all ${
                rush ? "border-amber-500 bg-amber-50 text-amber-700" : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              {rush && <Check size={14} />} {t("Rush delivery", "အမြန်ဆုံး လိုချင်သည်")}
            </button>
          </div>
        </div>

        {/* Result */}
        <div className={compact ? "" : "lg:col-span-2"}>
          <div className="sticky top-24 bg-gradient-to-br from-[#0F1D45] to-[#1E3A8A] rounded-2xl p-6 text-white holo-border">
            <p className="text-xs uppercase tracking-wider text-cyan-300 font-bold mb-3">
              {t("Estimated investment", "ခန့်မှန်း ကုန်ကျစရိတ်")}
            </p>
            <div className="mb-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-slide">{formatUSD(result.low)} – {formatUSD(result.high)}</span>
            </div>
            <p className="text-sm text-white/70 mb-5">{formatMMK(result.low)} – {formatMMK(result.high)}</p>

            <div className="space-y-1.5 text-xs text-white/70 border-t border-white/15 pt-4 mb-5">
              <div className="flex justify-between"><span>{t("Base", "အခြေခံ")}</span><span className="text-white font-semibold">{formatUSD(result.base)}</span></div>
              <div className="flex justify-between"><span>{t("Add-ons", "ထပ်ဆောင်း")}</span><span className="text-white font-semibold">{formatUSD(result.addons)}</span></div>
            </div>

            <button
              onClick={requestQuote}
              className="neon-btn w-full justify-center text-sm !py-3.5"
            >
              {t("Request exact quote", "တိကျဈေး တောင်းခံရန်")} <ArrowRight size={17} />
            </button>
            <p className="text-[11px] text-white/50 mt-3 leading-relaxed">
              {t(
                "Automated ballpark — final pricing is confirmed after we review your requirements. Free consultation, no obligation.",
                "ဤသည် အလိုအလျောက် ခန့်မှန်းမှုဖြစ်ပါသည် — အသေးစိတ် သုံးသပ်ပြီးမှ တိကျသော ဈေးနှုန်း သတ်မှတ်ပါမည်။ အကြံပေးခြင်း အခမဲ့ဖြစ်ပါသည်။"
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

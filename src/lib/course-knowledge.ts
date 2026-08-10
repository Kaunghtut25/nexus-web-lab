// ─────────────────────────────────────────────────────────────
// NEXUS AI FREELANCE MASTERY — COURSE KNOWLEDGE BASE (v1)
// Single source of truth for the 24/7 chatbot. Update this file
// whenever fees, modules, bonuses, or process change — the bot
// will know the new data immediately (no retraining needed).
// ─────────────────────────────────────────────────────────────

export const COURSE_INFO = {
  name: "Nexus AI Freelance Mastery",
  tagline: "AI ခေတ်မှာ Freelancer ဖြစ်ဖို့ — မြန်မာလို အပြည့်အစုံ သင်တန်း (13 Modules)",
  url: "https://nexusweblab.com/course",
  registerUrl: "https://nexusweblab.com/course/register",
  loginUrl: "https://nexusweblab.com/course/login",

  // TEACHER IDENTITY (hard-coded so the bot NEVER guesses a wrong name)
  teacher: {
    name: "Kaung Htut",
    honorific: "U Kaung Htut",
    burmese: "ဆရာ ဦးကောင်းထွဋ်",
    note: "Never call the teacher 'Kaung Htet' — that is WRONG. Also NEVER call him 'Ko Kaung / ကိုကောင်း' — that is WRONG. Correct Burmese: ဦးကောင်းထွဋ် (formal) or ကိုကောင်းထွဋ် (informal). Use 'ထွဋ်' not 'ထွတ်'.",
    background:
      "U Kaung Htut (ဦးကောင်းထွဋ်) is the founder of Nexus Web Lab — a web developer who builds websites (Next.js, React, AI chatbots) and creates AI content. He wrote this course to teach Myanmar freelancers how to earn with AI.",
  },

  fees: {
    actualUsd: 199,
    actualMmk: "≈ 895,000 MMK",
    promoUsd: 49,
    promoMmk: "≈ 220,000 MMK",
    promoLabel: "Launch Offer — ၇၅% လျှော့ဈေး",
    paymentNote:
      "တစ်ခါပေးရုံနဲ့ ဘဝတစ်သက် Access (One-time payment, lifetime access). ၇ ရက် Money-Back Guarantee ပါရှိပါတယ်။",
  },

  howToJoin: [
    "1️⃣ /course/register မှာ Email + Password ဖန်တီး စာရင်းသွင်းပါ (status = pending)",
    "2️⃣ သင်တန်းကြေး ပေးချေပါ — KBZPay / AYA Pay / Wave Pay / ဘဏ်ငွေလွှဲ",
    "3️⃣ ငွေပေးချေကြောင်း အကြောင်းကြားပြီးပါက ဆရာက အကောင့်ဖွင့်ပေးပါမည် (activate)",
    "4️⃣ /course/login ဝင်ပြီး Module ၁၃ ခုလုံး + PDF + Slides အကုန် ကြည့်နိုင်ပါပြီ",
  ],

  modules: [
    { num: 1, title: "AI Freelancing အခြေခံ", sub: "AI ခေတ်ရဲ့ အခွင့်အလမ်း + Tools Setup" },
    { num: 2, title: "Prompt Engineering (RACE)", sub: "AI ကို စကားပြောနည်း — အရေးကြီးဆုံး Skill" },
    { num: 3, title: "Web Development အခြေခံ", sub: "HTML, CSS, JavaScript — AI နဲ့တွဲဖက်" },
    { num: 4, title: "AI ဖြင့် Website ဆောက်ခြင်း", sub: "Nexus Bistro Project — Website တစ်ခုလုံး" },
    { num: 5, title: "Hosting & Deploy", sub: "Vercel မှာ အခမဲ့ Host — ကမ္ဘာကိုပြ" },
    { num: 6, title: "AI Agents + Next.js", sub: "Professional-level Development" },
    { num: 7, title: "Chatbot အခြေခံ", sub: "Rule-Based Bot ဆောက်နည်း" },
    { num: 8, title: "AI Chatbot (Botpress)", sub: "၂၄ နာရီ Chatbot + PDF Training + Messenger" },
    { num: 9, title: "v0.dev Rapid Prototyping", sub: "မိနစ် ၃၀ အတွင်း Demo Website" },
    { num: 10, title: "Fiverr Marketplace", sub: "Gig ဖွင့်နည်း — ပထမဆုံး Order ရနည်း" },
    { num: 11, title: "Upwork Profile & Proposals", sub: "Profile 100% + Proposal Template ၃ မျိုး" },
    { num: 12, title: "Client Communication & Interviews", sub: "Interview ၁၂ ခု + ဈေးနှုန်းသတ်မှတ်နည်း" },
    { num: 13, title: "Capstone + Business Growth", sub: "Portfolio ၃ ခု + Retainer ဗျူဟာ" },
  ],

  includes:
    "Module တိုင်းမှာ — 🎬 Video Script · 📖 PDF Lesson Notes · 🖥️ Slides (PPTX) · ✍️ Hands-on Assignment · 💻 Code Starter/ဥပမာတွေ ပါဝင်ပါတယ်။",

  bonuses: [
    "🎁 Botpress AI Chatbot အသေးစိတ် PDF Guide",
    "🎁 v0.dev Rapid Prototyping Guide",
    "🎁 Fiverr / Upwork Template Pack",
    "🎁 Interview မေးခွန်း ၁၂ ခု အဖြေနဲ့",
    "🎁 Private Community / Group Access",
  ],

  payment: {
    methods: "KBZPay · AYA Pay · Wave Pay · ဘဏ်ငွေလွှဲ (KBZ / AYA)",
    note: "ငွေပေးချေပြီးပါက ငွေလွှဲအထောက်အထား (screenshot) ကို info@nexusweblab.com သို့မဟုတ် Viber 09945598825 ကို ပို့ပေးပါ — အကောင့် ချက်ချင်း ဖွင့်ပေးပါမည်။",
  },

  support: {
    email: "info@nexusweblab.com",
    phone: "09945598825",
    viber: "viber://chat?number=%2B959945598825",
  },

  faq: [
    {
      q: "ဘယ်သူတွေ တက်လို့ရလဲ?",
      a: "ဘယ်သူမဆို တက်လို့ရပါတယ် — programming အတွေ့အကြုံ မလိုပါ။ Beginner ကနေ စသင်ပါတယ်။",
    },
    {
      q: "ဘာတွေ ရမလဲ?",
      a: "Module ၁၃ ခုလုံး (Video Script + PDF + Slides + Assignment + Code) + Bonus ၅ ခု + Lifetime Access။",
    },
    {
      q: "ဘယ်လို စတင်မလဲ?",
      a: "Register လုပ် → ငွေပေးချေ → အကောင့်ဖွင့်ပေးတာနဲ့ Login ဝင်ပြီး စလေ့လာလို့ရပါပြီ။",
    },
    {
      q: "Video တွေ ရှိလား?",
      a: "Module တိုင်းအတွက် Video Script ရှိပါတယ် — Video ရိုက်ကူးပြီးတာနဲ့ module page မှာ တိုက်ရိုက် ကြည့်ရှုနိုင်ပါမယ်။ အချိန်မီ အပ်ဒိတ်ပေးနေပါတယ်။",
    },
    {
      q: "Money-back ရလား?",
      a: "ရပါတယ် — ၇ ရက်အတွင်း မကြိုက်ရင် အပြည့်အဝ ပြန်အမ်းပါတယ်။",
    },
  ],
};

// Build the system-prompt course section (used by the LLM)
export function coursePromptSection(): string {
  const modules = COURSE_INFO.modules
    .map((m) => `${String(m.num).padStart(2, "0")}. ${m.title} — ${m.sub}`)
    .join("\n");
  return `## NEXUS AI FREELANCE MASTERY COURSE (IMPORTANT — you know everything about this course)
Course: ${COURSE_INFO.name} — ${COURSE_INFO.tagline}
Landing page: ${COURSE_INFO.url}

### FEES (answer confidently when asked about fee / cost / price / ဈေး / သင်တန်းကြေး)
- REGULAR / ACTUAL fee: $${COURSE_INFO.fees.actualUsd} (${COURSE_INFO.fees.actualMmk})
- PROMO fee (current launch offer, 75% off): $${COURSE_INFO.fees.promoUsd} (${COURSE_INFO.fees.promoMmk})
- ${COURSE_INFO.fees.promoLabel}
- ${COURSE_INFO.fees.paymentNote}
- Payment methods: ${COURSE_INFO.payment.methods}
- ${COURSE_INFO.payment.note}

### WHAT'S INCLUDED
${COURSE_INFO.includes}
Bonuses:
${COURSE_INFO.bonuses.map((b) => `- ${b}`).join("\n")}

### 13 MODULES
${modules}

### HOW TO JOIN (walk the student through these steps)
${COURSE_INFO.howToJoin.join("\n")}

### TEACHER (who runs the course)
- The teacher is ${COURSE_INFO.teacher.honorific} (${COURSE_INFO.teacher.burmese}).
- ${COURSE_INFO.teacher.note}
- Background: ${COURSE_INFO.teacher.background}
- If a student asks "who is the teacher" / "ဆရာကြီးနာမည်" / "teacher name" / "ဆရာက ဘာလုပ်သလဲ", answer: ${COURSE_INFO.teacher.honorific} (${COURSE_INFO.teacher.burmese}) — founder of Nexus Web Lab, web developer, and the author of this course. Never invent a different name.
- You (Nexus AI) are the course assistant — you are NOT the teacher and must never say you are the teacher or use the teacher's name as your own.

### FAQ
${COURSE_INFO.faq.map((f) => `- Q: ${f.q} → A: ${f.a}`).join("\n")}

### SUPPORT
- Email: ${COURSE_INFO.support.email}
- Phone/Viber: ${COURSE_INFO.support.phone}
- Viber link: ${COURSE_INFO.support.viber}
- When a student says they have paid, confirm the payment screenshot must be sent to ${COURSE_INFO.support.email} or Viber ${COURSE_INFO.support.phone}, then the teacher activates their account and they can log in at ${COURSE_INFO.loginUrl}.`;
}

// Burmese + English keyword router for the offline fallback (no API key / API down)
export function courseFallbackReply(text: string): string | null {
  const t = text.toLowerCase();

  // Course fee questions
  if (
    t.includes("course fee") || t.includes("class fee") || t.includes("actual fee") ||
    t.includes("promo") || t.includes("သင်တန်းကြေး") || t.includes("ကျောင်းလခ") ||
    t.includes("ဈေး") || t.includes("စျေး") || t.includes("ဘယ်လောက်") ||
    (t.includes("course") && (t.includes("price") || t.includes("cost") || t.includes("how much"))) ||
    (t.includes("fees") && (t.includes("course") || t.includes("class")))
  ) {
    return `Nexus AI Freelance Mastery သင်တန်းကြေး 💰

• Regular / Actual fee — $199 (≈ 895,000 MMK)
• Promo fee (Launch Offer — ၇၅% off) — $49 (≈ 220,000 MMK)

✅ One-time payment · Lifetime access
🛡️ ၇ ရက် Money-Back Guarantee
💳 ပေးချေနည်း — KBZPay · AYA Pay · Wave Pay · ဘဏ်ငွေလွှဲ

ငွေပေးချေပြီးပါက screenshot ကို info@nexusweblab.com (သို့) Viber 09945598825 ကို ပို့ပေးပါ — အကောင့် ချက်ချင်း ဖွင့်ပေးပါမယ်။`;
  }

  // How to join / register
  if (
    t.includes("how to join") || t.includes("register") || t.includes("sign up") ||
    t.includes("စာရင်းသွင်း") || t.includes("ဘယ်လိုတက်") || t.includes("ဘယ်လိုစ") || t.includes("ဘယ်လို စ")
  ) {
    return `တက်ရောက်ရန် အဆင့် ၄ ဆင့် 🚀

1️⃣ [ဒီမှာ စာရင်းသွင်းပါ](https://nexusweblab.com/course/register) — Email + Password ဖန်တီးပါ
2️⃣ သင်တန်းကြေး ပေးချေပါ — KBZPay / AYA Pay / Wave Pay / ဘဏ်ငွေလွှဲ
3️⃣ ငွေလွှဲပြီးပါက ဆရာက အကောင့် ဖွင့်ပေးပါမယ် (Activate)
4️⃣ [ဒီမှာ Login ဝင်ပါ](https://nexusweblab.com/course/login) — Module ၁၃ ခုလုံး စတင် လေ့လာနိုင်ပါပြီ 🎓
5️⃣ Module တစ်ခုစီရဲ့ သင်ခန်းစာ လေ့လာပြီး Exam Game ဖြေပါ — အောင်မှ နောက် Module တက်လို့ရပါတယ် 🎮`;
  }

  // Modules / curriculum
  if (
    t.includes("module") || t.includes("curriculum") || t.includes("syllabus") ||
    t.includes("lesson") || t.includes("သင်ခန်းစာ") || t.includes("သင်ရိုး") ||
    t.includes("what will i learn") || t.includes("ဘာတွေသင်လဲ") ||
    t.includes("exam") || t.includes("level up") || t.includes("စာမေးပွဲ")
  ) {
    return `📚 သင်ရိုး — Module ၁၃ ခု (Exam Game + Level Up 🎮)

01. AI Freelancing အခြေခံ
02. Prompt Engineering (RACE)
03. Web Development အခြေခံ
04. AI ဖြင့် Website ဆောက်ခြင်း (Nexus Bistro)
05. Hosting & Deploy (Vercel)
06. AI Agents + Next.js
07. Chatbot အခြေခံ
08. AI Chatbot (Botpress)
09. v0.dev Rapid Prototyping
10. Fiverr Marketplace
11. Upwork Profile & Proposals
12. Client Communication & Interviews
13. Capstone + Business Growth

Module တိုင်းမှာ 📖 PDF Lesson Notes · 🖥️ Slides · 💻 Code + မေးခွန်း ၅ ခုပါ Exam Game ပါဝင်ပါတယ်။
Module တစ်ခုစီရဲ့ Exam ကို အောင်မှ နောက် Module ဖွင့်ပြီး Level တက်ပါတယ် 🎮`;
  }

  // Bonuses / what's included
  if (
    t.includes("bonus") || t.includes("what do i get") || t.includes("what's included") ||
    t.includes("ဘာတွေပါ") || t.includes("ဘာတွေရ") || t.includes("bonus တွေ")
  ) {
    return `🎁 သင်တန်းမှာ ပါဝင်တဲ့အရာတွေ

${COURSE_INFO.includes}

Bonus ၅ ခု:
• Botpress AI Chatbot PDF Guide
• v0.dev Rapid Prototyping Guide
• Fiverr / Upwork Template Pack
• Interview မေးခွန်း ၁၂ ခု အဖြေနဲ့
• Private Community / Group Access`;
  }

  // Payment questions
  if (
    t.includes("pay") || t.includes("kbzpay") || t.includes("aya pay") || t.includes("wave") ||
    t.includes("ငွေပေး") || t.includes("ပေးချေ") || t.includes("ဘယ်လိုပေး") || t.includes("ဘယ်လိုပေးချေ")
  ) {
    return `💳 ပေးချေနည်းများ

• KBZPay — 09945598825
• AYA Pay — 09945598825
• Wave Pay — 09945598825
• ဘဏ်ငွေလွှဲ (KBZ / AYA)

ငွေပေးချေပြီးပါက လွှဲပြေစာ (screenshot) ကို info@nexusweblab.com (သို့) Viber 09945598825 ကို ပို့ပေးပါ — အကောင့် ချက်ချင်း ဖွင့်ပေးပါမယ် ✅`;
  }

  // Teacher name (hard-coded — the LLM must never guess from the email)
  if (
    t.includes("teacher") || t.includes("instructor") ||
    t.includes("ဆရာကြီး") || t.includes("ဆရာ့နာမည်") || t.includes("ဆရာနာမည်") ||
    (t.includes("ဆရာ") && (t.includes("ဘယ်သူ") || t.includes("နာမည်") || t.includes("ခေါ်"))) ||
    (t.includes("who") && (t.includes("teach") || t.includes("run")))
  ) {
    return `သင်တန်းရဲ့ ဆရာကတော့ **${COURSE_INFO.teacher.honorific}** (${COURSE_INFO.teacher.burmese}) ဖြစ်ပါတယ်။ 😊

သင်တန်းနဲ့ ပတ်သက်ပြီး ဘာမဆို မေးနိုင်ပါတယ် — သင်တန်းကြေး၊ Module တွေ၊ စာရင်းသွင်းနည်း စသဖြင့်ပေါ့။`;
  }

  // Support / contact
  if (
    t.includes("contact") || t.includes("support") || t.includes("phone") || t.includes("email") ||
    t.includes("ဆက်သွယ်") || t.includes("ဖုန်း") || t.includes("အကူအညီ") || t.includes("အကြောင်း")
  ) {
    return `📞 ဆက်သွယ်ရန်

• Email — info@nexusweblab.com
• Phone / Viber — 09945598825
• [Viber ဖွင့်ရန်](viber://chat?number=%2B959945598825)

သင်တန်းနဲ့ ပတ်သက်တဲ့ မေးခွန်းတွေ ရှိရင် ၂၄ နာရီအတွင်း ပြန်ကြားပေးပါတယ် 😊`;
  }

  return null;
}

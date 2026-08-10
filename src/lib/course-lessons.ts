// Self-explanatory lesson content for all 13 modules.
// Each lesson = numbered steps (rendered with ↓ signal arrows between them),
// real examples (ဥပမာ boxes) and reusable diagrams (SVG) so a student can
// read and understand on their own — no extra explanation needed.

export type DiagramKey =
  | "browser"      // website preview
  | "promptLoop"   // prompt → AI → output
  | "flow3"        // generic 3-step flow
  | "vercel"       // code → Vercel → live URL
  | "chatbot"      // user → bot → reply
  | "gig"          // Fiverr gig card
  | "proposal"     // Upwork proposal
  | "ladder"       // level-up ladder
  | "clientFlow"   // client journey
  | "money"        // income flow
  | "agent"        // AI agent stack
  | "tools"        // tool grid
  | "portfolio"    // portfolio pieces

export interface LessonStep {
  title: string;
  body: string;
  example?: string;      // ဥပမာ — concrete real example
  diagram?: DiagramKey;  // helpful visual
  tip?: string;          // 💡 tip
}

export interface Lesson {
  id: string;
  learn: string[];       // ဒီ Module ကနေ ဘာတွေ ရမလဲ
  steps: LessonStep[];
  summary: string[];     // အဓိက အချက် ၃ ချက်
}

export const COURSE_LESSONS: Record<string, Lesson> = {
  "module-01": {
    id: "module-01",
    learn: [
      "AI ခေတ်မှာ Freelancer တွေ ဘာကြောင့် ပိုလိုအပ်လာလဲ",
      "တစ်နေ့တာ အလုပ်လုပ်ပုံ — AI နဲ့ တွဲဖက်လုပ်နည်း",
      "စပြီး ဝင်ငွေရှာဖို့ လိုအပ်တဲ့ Tools တွေ Setup",
    ],
    steps: [
      {
        title: "AI ခေတ်ရဲ့ Freelancing အခွင့်အလမ်း",
        body: "အရင်တုန်းက Website တစ်ခု ဆောက်ဖို့ ရက်သတ္တပတ်ချီ ကြာပြီး ကုန်ကျစရိတ် မြင့်ပါတယ်။ အခုတော့ AI က code ရေးပေး၊ design လုပ်ပေးလို့ တစ်ယောက်တည်း ရက်ပိုင်းအတွင်း ပြီးအောင် လုပ်နိုင်ပါပြီ။ ဒါကြောင့် AI သုံးတတ်တဲ့ Freelancer တွေ ဈေးကွက်မှာ ပိုတန်ဖိုးရှိလာပါတယ်။",
        example: "ဥပမာ — ဆိုင်တစ်ဆိုင်က website တစ်ခု လိုချင်တယ်ဆိုပါစို့။ အရင်က developer ငှားရင် $1,000+ ကျပြီး ၃ ပတ်ကြာတယ်။ AI သုံးရင် သင်ကိုယ်တိုင် ၃ ရက်အတွင်း ဆောက်ပေးနိုင်ပြီး $300 ပဲ ကောက်နိုင်တယ် — client ပျော်၊ သင်လည်း ဝင်ငွေရတယ်။",
        diagram: "browser",
      },
      {
        title: "Freelancer တစ်ယောက်ရဲ့ တစ်နေ့တာ",
        body: "အလုပ်ကို အပိုင်း ၃ ပိုင်း ခွဲပါ — ① မနက်: သုံးသပ်ချက်/အလုပ်ရှာ (၁ နာရီ)၊ ② နေ့လယ်: client အလုပ်တွေ AI နဲ့ ဆောက် (၄-၅ နာရီ)၊ ③ ည: သင်ယူ/တိုးတက်ဖို့ (၁ နာရီ)။ ဒီလို ပုံမှန်လုပ်ရင် ၂-၃ လအတွင်း ပထမဆုံး ဝင်ငွေ စရနိုင်ပါတယ်။",
        example: "ဥပမာ — တနင်္လာနေ့ မနက် ၉ နာရီ: Fiverr/Upwork မှာ gig ၂ ခု ရှာ → ၁၀ နာရီ: client ရဲ့ website AI နဲ့ ဆောက် → ၄ နာရီ: ဗီဒီယိုသင်ခန်းစာ ကြည့်။ ဒီပုံစံကို တစ်ပတ်လုံး လုပ်ကြည့်ပါ။",
      },
      {
        title: "Tools တွေ Setup လုပ်နည်း",
        body: "စတင်ဖို့ ဒီ ၄ ခုပဲ လုံလောက်ပါတယ် — ① Gmail (အကောင့်တိုင်းရဲ့ အခြေခံ)၊ ② ChatGPT (AI မိတ်ဖက် — free နဲ့ စလို့ရတယ်)၊ ③ Vercel (website ကို အခမဲ့ တင်နိုင်တဲ့ hosting)၊ ④ Figma/Canva (design ပုံကြမ်း)။ အကုန် free ဖြစ်လို့ ဒီနေ့ပဲ Setup လုပ်လို့ရပါတယ်။",
        tip: "💡 Password တွေကို စာရွက်မှာ မရေးပါနဲ့ — browser ရဲ့ password manager သုံးပါ။",
      },
      {
        title: "Goal ချမှတ်ခြင်း + Action Steps",
        body: "ပန်းတိုင်ကို တိကျအောင် သတ်မှတ်ပါ — '၃ လအတွင်း တစ်လကို $500 ရချင်တယ်' ဆိုတာမျိုး။ ပြီးရင် အဲဒီပန်းတိုင်ဆီ ရောက်ဖို့ ဒီတစ်ပတ် ဘာလုပ်မလဲ ဆိုတာ စာရင်းရေးပါ။ တစ်နေ့ကို နည်းနည်းချင်း လုပ်ရင် ကြီးတဲ့ပန်းတိုင်လည်း ရောက်ပါတယ်။",
        example: "ဥပမာ — ပန်းတိုင်: ၃ လအတွင်း $500/လ။ ဒီတစ်ပတ်: သင်ခန်းစာ ၂ ခု ပြီးအောင် လုပ်မယ် + Fiverr မှာ gig ၁ ခု ဖွင့်မယ်။",
      },
    ],
    summary: [
      "AI က Freelancing ကို လူတိုင်း ဝင်လို့ရတဲ့ ဈေးကွက်ဖြစ်အောင် လုပ်ပေးထားတယ်",
      "အလုပ်ကို မနက်/နေ့လယ်/ည ဆိုပြီး ပုံမှန် ခွဲလုပ်ပါ",
      "Free Tools ၄ ခု Setup လုပ်ပြီး တိကျတဲ့ ပန်းတိုင် ချမှတ်ပါ",
    ],
  },

  "module-02": {
    id: "module-02",
    learn: [
      "RACE Formula — AI ကို မှန်မှန် မှာတတ်ဖို့",
      "Prompt ရေးနည်း အကောင်းဆုံး အလေ့အထ",
      "Code ရေးတဲ့အခါ AI ကို ဘယ်လို မှာမလဲ",
    ],
    steps: [
      {
        title: "RACE Formula ဆိုတာ ဘာလဲ",
        body: "RACE ဆိုတာ Role + Action + Context + Example ရဲ့ အတိုကောက်ပါ။ AI ကို မှာတဲ့အခါ ဒီ ၄ ချက် ထည့်လေလေ၊ အဖြေ ပိုကောင်းလေလေ ဖြစ်ပါတယ်။",
        diagram: "promptLoop",
      },
      {
        title: "R — Role (ဘယ်သူအနေနဲ့ လုပ်မလဲ)",
        body: "AI ကို ဘယ်သူ့အနေနဲ့ ဖြေရမလဲ သတ်မှတ်ပေးပါ။ 'Web developer' အနေနဲ့လား၊ 'Marketing expert' အနေနဲ့လား ဆိုတာ ပြောပေးရင် အဖြေ ပိုသင့်တော်ပါတယ်။",
        example: "❌ မကောင်း: 'Website အတွက် text ရေးပေးပါ'\n✅ ကောင်း: 'သင်က professional web copywriter တစ်ယောက်ပါ။ စားသောက်ဆိုင်တစ်ဆိုင်ရဲ့ website အတွက် home page text ရေးပေးပါ'",
      },
      {
        title: "A — Action (ဘာလုပ်ပေးစေချင်လဲ)",
        body: "လိုချင်တဲ့ အလုပ်ကို တိတိကျကျ ပြောပါ — 'ရေးပေးပါ'၊ 'ပြင်ပေးပါ'၊ 'ဘာသာပြန်ပေးပါ' ဆိုတာမျိုး။ မရေမရာပြောရင် အဖြေလည်း မရေမရာ ရပါတယ်။",
        example: "❌ မကောင်း: 'website ကို ကြည့်ကောင်းအောင် လုပ်ပေး'\n✅ ကောင်း: 'ဒီ website ရဲ့ hero section မှာ ဆောင်ပုဒ် ၃ ခု ရေးပေးပါ — တစ်ခုချင်းစီက ၈ လုံးထက် မပိုစေနဲ့'",
      },
      {
        title: "C — Context (နောက်ခံ အချက်အလက်)",
        body: "AI သိထားသင့်တဲ့ အချက်အလက်တွေ ထည့်ပေးပါ — ဘယ်သူ့အတွက်လဲ၊ ဘာ language လဲ၊ ဘယ်လို style လဲ။ Context များလေ၊ အဖြေ မှန်လေပါ။",
        example: "✅ ဥပမာ: 'မြန်မာနိုင်ငံက လက်ဖက်ရည်ဆိုင် အတွက်ပါ။ Target က လူငယ်တွေ။ ဘာသာစကားက မြန်မာလို ရေးပေးပါ။ Style က ရိုးရှင်းပြီး ဖော်ရွေတဲ့ပုံစံ'",
      },
      {
        title: "E — Example (ဥပမာ ပြပေးခြင်း)",
        body: "လိုချင်တဲ့ပုံစံ ဥပမာတစ်ခု ပြပေးရင် AI က အတိအကျ လိုက်လုပ်ပါတယ်။ ဒါက အရေးကြီးဆုံး အဆင့်ဖြစ်လို့ ဥပမာ ထည့်ဖို့ မမေ့ပါနဲ့။",
        example: "✅ ဥပမာ: 'ဒီလိုပုံစံမျိုး ရေးပေးပါ — \"မင်္ဂလာပါ! ကျွန်တော်တို့ဆီမှာ လက်ဖက်ရည်တစ်ခွက်ကို ၅၀၀ ကျပ်ပဲ\" — ဒါနဲ့ ဆင်တူတဲ့ ဆောင်ပုဒ် ၃ ခု ထပ်ရေးပေးပါ'",
      },
      {
        title: "Code ရေးတဲ့အခါ AI ကို မှာနည်း",
        body: "Code မှာတဲ့အခါ ထပ်ဆောင်း ၂ ချက် ထည့်ပါ — ① ဘာ language/framework သုံးမလဲ (HTML, React, Next.js…)၊ ② ဘယ်လို အလုပ်လုပ်ရမလဲ (button နှိပ်ရင် ဘာဖြစ်မလဲ)။ ပြီးရင် AI ရဲ့ code ကို copy → browser မှာ စမ်း → အဆင်မပြေရင် error ကို AI ကို ပြန်ပို့ပါ။",
        tip: "💡 Error ရတိုင်း စိတ်မပူပါနဲ့ — error message ကို copy လုပ်ပြီး 'ဒီ error ကို ပြင်ပေးပါ' လို့ AI ကို ပြောလိုက်ရုံပါပဲ။",
      },
    ],
    summary: [
      "RACE = Role + Action + Context + Example — ၄ ချက်လုံး ထည့်ပါ",
      "ဥပမာ ပြပေးတာ အရေးကြီးဆုံး — AI က အတိအကျ လိုက်လုပ်တယ်",
      "Code error ကို AI ကို ပြန်ပို့ပြီး ပြင်ခိုင်းပါ",
    ],
  },

  "module-03": {
    id: "module-03",
    learn: [
      "HTML / CSS / JavaScript အခြေခံ",
      "AI နဲ့ error ဖြေရှင်းနည်း",
      "Mini Project — ဆိုင်တစ်ဆိုင်ရဲ့ website",
    ],
    steps: [
      {
        title: "Website ဆိုတာ ဘာတွေနဲ့ ဆောက်ထားလဲ",
        body: "Website တိုင်းမှာ အဓိက ၃ ပိုင်း ရှိပါတယ် — ① HTML: အရိုးစု (စာသား၊ ပုံ၊ ခလုတ်)၊ ② CSS: အလှဆင် (အရောင်၊ နေရာ၊ font)၊ ③ JavaScript: အသက်ဝင်စေတာ (နှိပ်ရင် ပြောင်းတာ၊ ပေါ်လာတာ)။ အိမ်တစ်လုံးနဲ့ ယှဉ်ရရင် HTML = အုတ်နံရံ၊ CSS = ဆေးသုတ်၊ JS = မီးလိုင်း၊",
        example: "ဥပမာ — <h1>မင်္ဂလာပါ</h1> ဆိုတာ HTML (ခေါင်းစီး)။ ပြီးရင် CSS နဲ့ အရောင်တင်လိုက်တာ။ JS နဲ့ 'နှိပ်ရင် ပြောင်းမယ့်' ခလုတ်ထည့်တာ။",
        diagram: "browser",
      },
      {
        title: "HTML အခြေခံ — အရိုးစု ဆောက်နည်း",
        body: "HTML က tag တွေနဲ့ ရေးပါတယ် — <h1> ခေါင်းစီး၊ <p> စာပိုဒ်၊ <img> ပုံ၊ <a> လင့်၊ <button> ခလုတ်။ Tag တွေက < > အတွင်းမှာ ရေးပြီး အများစုက အဖွင့်အပိတ် တွဲပါတယ်။",
        example: "ဥပမာ:\n<h1>Shwe Noodle House</h1>\n<p>အရသာရှိတဲ့ မြန်မာမုန့်ဟင်းခါး</p>\n<button>Order Now</button>",
      },
      {
        title: "CSS အခြေခံ — အလှဆင်နည်း",
        body: "CSS က element တွေကို ဘယ်လို ပြမလဲ ထိန်းပါတယ် — color (အရောင်), font-size (စာလုံးအရွယ်), background (နောက်ခံ), padding (အနားကွက်), border (ဘောင်)။",
        example: "ဥပမာ:\nh1 { color: gold; font-size: 32px; }\nbutton { background: red; padding: 10px 20px; }",
      },
      {
        title: "JavaScript အခြေခံ — အသက်ဝင်စေနည်း",
        body: "JavaScript က သုံးသူ နှိပ်တဲ့အခါ တုံ့ပြန်ပါတယ် — click နှိပ်ရင် message ပြတာ၊ form ဖြည့်ရင် စစ်တာ စသဖြင့်။ function ဆိုတာ 'လုပ်ဆောင်ချက်တစ်ခု' ပါ။",
        example: "ဥပမာ:\nfunction order() { alert('မှာယူမှု အောင်မြင်ပါပြီ!'); }\n// button နှိပ်ရင် order() ကို ခေါ်ပါတယ်",
      },
      {
        title: "AI နဲ့ Error ဖြေရှင်းနည်း (F12 → AI)",
        body: "Website အလုပ်မလုပ်ရင် စိတ်မပူပါနဲ့ — browser မှာ F12 နှိပ်ပြီး Console tab ဖွင့်ပါ။ အဲဒီမှာ ပြတဲ့ error message ကို copy လုပ်ပြီး AI ကို ပို့ပါ။ 'ဒီ error ဘာကြောင့်လဲ + ဘယ်လိုပြင်မလဲ' ဆိုပြီး မေးပါ။",
        tip: "💡 Error message တစ်ခုလုံး copy လုပ်ပါ — ခန့်မှန်းပြီး မရေးပါနဲ့။",
      },
      {
        title: "Mini Project — Shwe Noodle House Website",
        body: "လက်တွေ့လုပ်ကြည့်ပါ — ① HTML နဲ့ ဆိုင်နာမည် + menu ရေး၊ ② CSS နဲ့ အရောင်ခြယ်၊ ③ JS နဲ့ 'Order' ခလုတ် ထည့်၊ ④ AI ကို RACE prompt နဲ့ 'ဒီ website ကို ပိုကောင်းအောင် လုပ်ပေး' လို့ ပြောပါ။ ပြီးရင် client ကို ပြလို့ရတဲ့ website တစ်ခု ရပါပြီ။",
        example: "✅ Deliverable: Shwe Noodle House website — နာမည် + menu ၃ ခု + Order ခလုတ် + အရောင် လှပတဲ့ design။",
      },
    ],
    summary: [
      "HTML = အရိုးစု၊ CSS = အလှ၊ JavaScript = အသက်",
      "Error ရရင် F12 → copy error → AI ကို ပို့ပါ",
      "Mini Project လုပ်ပြီးတာနဲ့ ပထမဆုံး client-ready website ရပြီ",
    ],
  },

  "module-04": {
    id: "module-04",
    learn: [
      "Website တစ်ခုလုံးကို AI နဲ့ ဆောက်နည်း",
      "Section အလိုက် AI ကို မှာနည်း",
      "Design + Content ပေါင်းစပ်နည်း",
    ],
    steps: [
      {
        title: "Website တစ်ခုရဲ့ Section တွေ",
        body: "Website တစ်ခုမှာ section ၆ ခု ပါပါတယ် — ① Header (အပေါ်ဘား + menu)၊ ② Hero (ပထမဆုံး မြင်ရတဲ့ ကြီးမားတဲ့အပိုင်း)၊ ③ About (အကြောင်း)၊ ④ Services/Menu (ဝန်ဆောင်မှု)၊ ⑤ Testimonials (client ပြောစကား)၊ ⑥ Footer (အောက်ခြေ + ဆက်သွယ်ရန်)။",
        diagram: "flow3",
      },
      {
        title: "Section အလိုက် ဆောက်နည်း — ဆိုင်တစ်ဆိုင် ဥပမာ",
        body: "တစ်ခါတည်း website တစ်ခုလုံး မမှာပါနဲ့ — section တစ်ခုချင်းစီ AI ကို မှာပါ။ 'ပထမဆုံး hero section ဆောက်ပေး' ပြီးမှ 'နောက် menu section ဆောက်ပေး' ဆိုပြီး တစ်ဆင့်ချင်း သွားပါ။ ဒါဆို သင်ထိန်းချုပ်လို့ ရပြီး အမှားနည်းပါတယ်။",
        example: "✅ Prompt: 'Nexus Bistro ဆိုတဲ့ စားသောက်ဆိုင်အတွက် hero section ဆောက်ပေးပါ — ဆိုင်နာမည်၊ ဆောင်ပုဒ်၊ Order Now ခလုတ် ပါပါစေ။ HTML + CSS နဲ့ ရေးပေးပါ'",
      },
      {
        title: "Content ကို AI နဲ့ ရေးနည်း",
        body: "Section ရဲ့ design ရပြီဆိုရင် content (စာသား) ကို သပ်သပ်မှာပါ — 'menu ထဲက ဟင်းလျာ ၅ ခုရဲ့ ဖော်ပြချက် ရေးပေးပါ' စသဖြင့်။ ဒါဆို design နဲ့ content နှစ်ခုလုံး ကောင်းပါတယ်။",
        example: "✅ Prompt: 'မြန်မာဟင်းလျာ ၅ မျိုးရဲ့ စာမျက်နှာပေါ်မှာ ပြမယ့် ဖော်ပြချက် ရေးပေးပါ — တစ်ခုချင်းစီ ၁ ကြောင်းစာ'",
      },
      {
        title: "Design + Content ပေါင်းစပ်နည်း",
        body: "အဆင့်တိုင်းပြီးရင် browser မှာ စမ်းကြည့်ပါ — ပုံကျဲလား၊ အရောင် လိုက်ဖက်လား၊ button နှိပ်လို့ ရလား။ မကျေနပ်ရင် AI ကို 'ဒီ section ရဲ့ အရောင်ကို ပြောင်းပေး' လို့ ပြောပါ။ ဒါကို iterate လုပ်တယ်လို့ ခေါ်ပါတယ် — ကောင်းတဲ့ website တွေ အကုန် ဒီနည်းနဲ့ မွမ်းမံထားတာပါ။",
        tip: "💡 ပုံတွေကို free ယူပါ — Unsplash.com ကနေ ယူပြီး <img src=\"...\"> နဲ့ ထည့်ပါ။",
      },
    ],
    summary: [
      "Website = Header + Hero + About + Services + Testimonials + Footer",
      "Section တစ်ခုချင်းစီ AI ကို မှာပါ — တစ်ခါတည်း တစ်ခုလုံး မမှာပါနဲ့",
      "Design ပြီးမှ content သပ်သပ် မှာပါ — ပြီးရင် browser မှာ iterate လုပ်ပါ",
    ],
  },

  "module-05": {
    id: "module-05",
    learn: [
      "Vercel မှာ website အခမဲ့ တင်နည်း",
      "Domain + Subdomain + DNS ဆိုတာ",
      "Custom Domain ချိတ်နည်း",
    ],
    steps: [
      {
        title: "Hosting ဆိုတာ ဘာလဲ",
        body: "Website ဆောက်ပြီးရင် လူတိုင်းကြည့်လို့ရအောင် 'အင်တာနက်ပေါ်မှာ ထားပေး' ရပါတယ် — ဒါကို hosting လို့ ခေါ်ပါတယ်။ Vercel က free hosting ပေးပြီး ကမ္ဘာပေါ်မှာ အသုံးအများဆုံး developer platform တစ်ခုပါ။",
        diagram: "vercel",
      },
      {
        title: "Vercel Account ဖွင့်နည်း",
        body: "vercel.com သွား → Sign Up → GitHub နဲ့ ဝင်ပါ → ပြီးရင် website ဖိုလ်ဒါကို upload လုပ်နိုင်ပါပြီ။ Vercel က သင့်အတွက် free URL တစ်ခု ပေးပါတယ် (ဥပမာ: mywebsite.vercel.app)။",
        example: "ဥပမာ — သင့် website folder မှာ index.html ရှိရင် Vercel ကို drag & drop လုပ်ရုံနဲ့ live ဖြစ်ပါတယ်။",
      },
      {
        title: "Domain + Subdomain + DNS ဆိုတာ",
        body: "Domain = website နာမည် (example.com)။ Subdomain = အဲဒီအောက်က အပိုင်း (blog.example.com)။ DNS = 'ဒီနာမည်ကို ဒီနေရာကို ညွှန်ပါ' ဆိုတဲ့ လမ်းညွှန်စာအုပ်။ Vercel ပေးတဲ့ URL ကိုပဲ သုံးလည်းရပြီး၊ ကိုယ်ပိုင် domain ဝယ်ရင် ပိုပြီး ကျွမ်းကျင်ပုံရပါတယ်။",
      },
      {
        title: "Custom Domain ချိတ်နည်း",
        body: "အဆင့် ၃ ခုပါ — ① domain ဝယ်ပါ (Namecheap/GoDaddy မှာ $10/နှစ်)၊ ② Vercel မှာ 'Add Domain' နှိပ်ပြီး နာမည် ရိုက်ထည့်ပါ၊ ③ domain ဝယ်ထားတဲ့နေရာမှာ Vercel ပြတဲ့ DNS record ၂ ခု ထည့်ပါ။ ၁၅ မိနစ်လောက်နဲ့ website က သင့် domain မှာ live ဖြစ်ပါတယ်။",
        example: "ဥပမာ — nexusbistro.com ဝယ်ပြီး Vercel မှာ add → DNS မှာ A record (76.76.21.21) + CNAME (cname.vercel-dns.com) ထည့် → ပြီးပါပြီ။",
      },
    ],
    summary: [
      "Vercel = free hosting — upload လုပ်ရုံနဲ့ live URL ရတယ်",
      "Domain = နာမည်၊ Subdomain = အောက်ခွဲ၊ DNS = လမ်းညွှန်",
      "Custom domain ချိတ်ဖို့ DNS record ၂ ခုပဲ ထည့်ရတယ်",
    ],
  },

  "module-06": {
    id: "module-06",
    learn: [
      "AI Agents vs Chatbot — ကွာခြားချက်",
      "Coding Tools တွေ (Copilot, Cursor, Claude Code, Ollama)",
      "Next.js + TypeScript + Tailwind အခြေခံ",
    ],
    steps: [
      {
        title: "AI Agents vs Chatbot",
        body: "Chatbot က မေးတာ ဖြေတာပဲ လုပ်တယ်။ AI Agent က ပိုသန်တယ် — task တစ်ခု ပေးရင် အဆင့်တွေ စီစဉ်ပြီး ကိုယ်တိုင် လုပ်ဆောင်တယ် (code ရေးတာ၊ file ဖန်တီးတာ၊ စမ်းသပ်တာ)။ သူ့ကို 'လက်ထောက်သမား' လို့ မြင်ပါ။",
        example: "ဥပမာ — Chatbot: 'HTML ဆိုတာ ဘာလဲ?' ဖြေတယ်။ Agent: 'ကျွန်တော့်အတွက် contact form ပါတဲ့ website ဆောက်ပေးပါ' — ပြီးအောင် လုပ်ပေးတယ်။",
        diagram: "agent",
      },
      {
        title: "Coding Tools တွေ နှိုင်းယှဉ်",
        body: "GitHub Copilot — VS Code ထဲမှာ code ဖြည့်ပေးတယ်။ Cursor — AI-first code editor (စာကြောင်းနဲ့ ပြောပြီး code ပြင်လို့ရတယ်)။ Claude Code — terminal ထဲမှာ အလုပ်လုပ်တဲ့ agent ။ Ollama — ကိုယ့်စက်ပေါ်မှာ free AI model လည်ပတ်တာ။",
        tip: "💡 စတင်သူတွေအတွက်: Cursor က အလွယ်ဆုံး — 'use' လုပ်တတ်ရင် လုံလောက်ပါတယ်။",
      },
      {
        title: "Next.js + TypeScript + Tailwind အခြေခံ",
        body: "Next.js = website/app ဆောက်တဲ့ framework (React ပေါ်မှာ တည်ဆောက်ထား)။ TypeScript = JavaScript ကို ပိုစနစ်ကျအောင် လုပ်တဲ့ version (error စောစောဖမ်းတယ်)။ Tailwind = CSS ကို class တွေနဲ့ မြန်မြန်ရေးလို့ရတဲ့ tool။ ဒီ ၃ ခုက လက်ရှိ professional project တွေမှာ အသုံးအများဆုံး stack ပါ။",
        example: "ဥပမာ — Tailwind နဲ့ ခလုတ်တစ်ခု:\n<button className=\"bg-blue-500 text-white px-4 py-2 rounded-lg\">Click</button>\nCSS သပ်သပ်ရေးစရာ မလိုတော့ဘူး။",
      },
      {
        title: "Portfolio Starter Project",
        body: "သင်ယူပြီးတာနဲ့ ကိုယ့်ကိုယ်ရေးရာနဲ့ အလုပ်တွေ ပြတဲ့ portfolio site ဆောက်ပါ — 'ကျွန်တော့်အတွက် portfolio website ဆောက်ပေးပါ' လို့ AI ကို မှာပါ။ ဒါက နောက် client တွေကို ပြတဲ့ သက်သေပါ။",
        diagram: "portfolio",
      },
    ],
    summary: [
      "Agent က task လုပ်ပေးတယ်၊ Chatbot က ဖြေပေးတယ်",
      "Cursor က starter တွေအတွက် အလွယ်ဆုံး coding tool",
      "Next.js + TypeScript + Tailwind = professional stack",
    ],
  },

  "module-07": {
    id: "module-07",
    learn: [
      "Chatbot အမျိုးအစားတွေ + ဘယ်မှာ သုံးလဲ",
      "Rule-Based Chatbot ဆောက်နည်း (JavaScript)",
      "Website ထဲ chatbot ထည့်နည်း",
    ],
    steps: [
      {
        title: "Chatbot ဆိုတာ + အမျိုးအစားတွေ",
        body: "Chatbot က မေးခွန်းတွေကို အလိုအလျောက် ဖြေပေးတဲ့ program ပါ။ အမျိုးအစား ၂ မျိုး ရှိတယ် — ① Rule-Based: ကြိုတင်ရေးထားတဲ့ စည်းမျဉ်းတွေနဲ့ ဖြေတာ (မြန်တယ်၊ free)၊ ② AI-Based: ဉာဏ်ရည်တုနဲ့ စဉ်းစားဖြေတာ (ပိုကောင်းတယ်၊ cost ရှိတယ်)။ ဒီ Module မှာ Rule-Based ကို စသင်ပါမယ်။",
        example: "ဥပမာ — ဆိုင်တစ်ဆိုင်ရဲ့ chatbot: 'ဖွင့်ချိန် ဘယ်လောက်လဲ' မေးရင် 'မနက် ၉ နာရီကနေ ည ၉ နာရီပါ' လို့ ဖြေတယ်။",
        diagram: "chatbot",
      },
      {
        title: "Rule-Based Bot ဘယ်လို အလုပ်လုပ်လဲ",
        body: "ရိုးရှင်းပါတယ် — သုံးသူစာကို ဖတ် → keyword ရှာတယ် ('ဖွင့်ချိန်'၊ 'ဈေး'၊ 'နေရာ') → ကိုက်တဲ့ အဖြေကို ပြန်တယ်။ keyword မကိုက်ရင် 'ကျွန်တော် မသိပါဘူး' လို့ ပြောပြီး လူနဲ့ ဆက်သွယ်ပေးပါတယ်။",
        example: "ဥပမာ code:\nconst replies = {\n  'ဖွင့်ချိန်': 'မနက် ၉ နာရီကနေ ည ၉ နာရီပါ',\n  'ဈေး': 'တစ်ခွက် ၅၀၀ ကျပ်ပါ'\n};\nif (msg.includes('ဖွင့်ချိန်')) return replies['ဖွင့်ချိန်'];",
      },
      {
        title: "Website ထဲ chatbot ထည့်နည်း",
        body: "Chat window (HTML/CSS) + logic (JavaScript) + အဲဒါတွေကို website ရဲ့ page ထဲ ထည့်ရပါတယ်။ Floating button နှိပ်ရင် chat box ပေါ်လာပြီး မေးခွန်းတွေ ဖြေတဲ့ ပုံစံပါ။",
        example: "✅ Deliverable: website ရဲ့ ဘယ်ဘက်အောက်မှာ chat bubble → နှိပ်ရင် ဖွင့်ပြီး ဆိုင်အကြောင်း ဖြေတဲ့ bot တစ်ခု။",
      },
    ],
    summary: [
      "Rule-Based = keyword တွေနဲ့ ဖြေတဲ့ အမြန်ဆုံးနည်း",
      "replies object + includes() နဲ့ စလို့ရတယ်",
      "Floating button + chat box = website chatbot ရဲ့ အခြေခံ",
    ],
  },

  "module-08": {
    id: "module-08",
    learn: [
      "Botpress နဲ့ ၂၄ နာရီ chatbot ဆောက်နည်း",
      "AI/LLM ချိတ်ဆက်နည်း",
      "PDF Training + Messenger ပေါင်းစပ်နည်း",
    ],
    steps: [
      {
        title: "Botpress ဆိုတာ",
        body: "Botpress က chatbot ဆောက်တဲ့ platform ပါ — code သိပ်မလိုဘဲ drag & drop နဲ့ chatbot flow ဆောက်လို့ရတယ်။ Free plan ရှိပြီး website, Messenger, Telegram စတာတွေမှာ တင်လို့ရပါတယ်။",
        example: "ဥပမာ — ဆိုင် website အတွက်: 'မင်္ဂလာပါ 👋 ဘာကူညီရမလဲ?' ဆိုတဲ့ welcome flow → 'ဖွင့်ချိန်' မေးရင် အဖြေပြ → မသိရင် human ကို လွှဲပေး။",
        diagram: "chatbot",
      },
      {
        title: "Botpress Setup လုပ်နည်း",
        body: "botpress.com → Sign up (free) → New Bot → Template ရွေး → Flow editor ထဲမှာ nodes တွေ ဆက်ပါ။ Node = အဆင့်တစ်ဆင့် (ကြိုဆိုတာ၊ မေးခွန်းမေးတာ၊ ဖြေတာ)။ ပြီးရင် Publish နှိပ်ပါ။",
      },
      {
        title: "AI/LLM ချိတ်ဆက်နည်း",
        body: "Bot ကို ပိုဉာဏ်ကောင်းစေချင်ရင် OpenAI လို LLM နဲ့ ချိတ်ပါ — Botpress ထဲမှာ 'AI Agent' node ထည့် → API key ထည့် → bot က အဖြေတွေကို ကိုယ်တိုင် စဉ်းစားဖြေတော့တယ်။ Key တွေကို .env ဖိုင်ထဲ သိမ်းပါ (public မဖြစ်အောင်)။",
        tip: "💡 API key တွေကို ဘယ်သူ့ကိုမှ မပြပါနဲ့ — .env.local ထဲမှာပဲ ထားပါ။",
      },
      {
        title: "PDF Training + Messenger",
        body: "Bot ကို ကုမ္ပဏီအကြောင်း သင်ပေးဖို့ PDF တွေ upload လုပ်ပါ (Botpress Knowledge Base) — ဒါဆို bot က PDF ထဲက အချက်အလက်တွေနဲ့ ဖြေပါတယ်။ Messenger မှာ တင်ဖို့ Facebook Page နဲ့ Botpress ကို ချိတ်ပါ — ၂၄ နာရီပတ်လုံး ဖြေပေးတဲ့ bot ရပါတယ်။",
        example: "✅ Deliverable: ဆိုင်ရဲ့ menu PDF ကို လေ့လာထားပြီး Facebook Messenger မှာ ၂၄ နာရီ ဖြေပေးတဲ့ bot။",
      },
    ],
    summary: [
      "Botpress = drag & drop chatbot builder (free plan ရှိတယ်)",
      "LLM ချိတ်ရင် bot က ကိုယ်တိုင် စဉ်းစားဖြေတယ်",
      "PDF upload လုပ်ပြီး Messenger မှာ တင်ရင် ၂၄ နာရီ bot ရပြီ",
    ],
  },

  "module-09": {
    id: "module-09",
    learn: [
      "v0.dev နဲ့ မိနစ် ၃၀ အတွင်း demo website",
      "Iteration + Follow-up prompts",
      "Export + Vercel Deploy",
    ],
    steps: [
      {
        title: "v0.dev ဆိုတာ",
        body: "v0.dev က Vercel ရဲ့ AI website builder ပါ — စာကြောင်းနဲ့ ပြောရုံနဲ့ website UI တစ်ခုလုံး ဖန်တီးပေးတယ်။ 'digital marketing agency website ဆောက်ပေးပါ' ဆိုရင် hero, services, pricing ပါတဲ့ page ကို ချက်ချင်း ပေးတယ်။",
        example: "ဥပမာ prompt:\n'ကျွန်တော့်အတွက် digital marketing agency website ဆောက်ပေးပါ — အနက်+ရွှေရောင် theme၊ services ၄ ခု၊ pricing table ပါပါစေ'",
        diagram: "browser",
      },
      {
        title: "Account Setup + ပထမဆုံး Website",
        body: "v0.dev → Sign up (GitHub/Vercel နဲ့) → New Project → prompt ရိုက်ထည့်ပါ → v0 က UI ဆောက်ပေးပြီး ဘယ်ဘက်မှာ preview ပြပါတယ်။ ကျေနပ်ရင် Continue နှိပ်ပါ။",
      },
      {
        title: "Iteration — ပြန်ပြင်နည်း",
        body: "အဆင်မပြေရင် ထပ်ပြောပါ — 'အရောင်ကို စိမ်းပြောင်ပြောင်းပေး'၊ 'pricing card ၃ ခု ဖြစ်အောင် လုပ်ပေး'။ v0 က သင့်ပြောစကားအတိုင်း ချက်ချင်း ပြင်ပေးတယ်။ ဒါကို iteration လို့ ခေါ်ပြီး design မှာ အရေးကြီးဆုံး အလေ့အကျင့်ပါ။",
        example: "✅ Follow-up: 'hero မှာ ပုံကြီးတစ်ပုံ ထည့်ပြီး text ကို ဘယ်ဘက်ထားပေးပါ' → v0 က ချက်ချင်း ပြင်ပေးတယ်။",
      },
      {
        title: "Export + Vercel Deploy",
        body: "ပြီးရင် Export → 'Deploy to Vercel' နှိပ်ပါ — v0 က code တွေကို Vercel ပေါ် တိုက်ရိုက်တင်ပေးပြီး live URL ရပါတယ်။ ဒါက client demo ပြဖို့ အမြန်ဆုံးနည်းပါ။",
        diagram: "vercel",
      },
    ],
    summary: [
      "v0.dev = စာကြောင်းနဲ့ UI ဆောက်ပေးတဲ့ AI builder",
      "Iteration — ပြန်ပြောရုံနဲ့ ပြင်လို့ရတယ်",
      "Export → Deploy to Vercel → live URL ချက်ချင်း",
    ],
  },

  "module-10": {
    id: "module-10",
    learn: [
      "Fiverr ဘယ်လို အလုပ်လုပ်လဲ",
      "Gig ဖွင့်နည်း (Title, Description, Package)",
      "ပထမဆုံး Order ရအောင် လုပ်နည်း",
    ],
    steps: [
      {
        title: "Fiverr ဆိုတာ",
        body: "Fiverr က ဝန်ဆောင်မှုဈေးကွက်ပါ — 'Gig' ဆိုတာ သင်ရောင်းတဲ့ ဝန်ဆောင်မှုတစ်ခု ($5 ကစပြီး သတ်မှတ်လို့ရတယ်)။ Buyer တွေက gig ရှာပြီး မှာယူတယ်။ Fiverr က 20% စည်းကြပ်ပါတယ်။",
        example: "ဥပမာ Gig: 'I will build a website with AI in 3 days — $50'",
        diagram: "gig",
      },
      {
        title: "Gig Title + Description ရေးနည်း",
        body: "Title မှာ ဘာပေးမလဲ + ဘယ်လောက်မြန်မလဲ ထည့်ပါ — 'I will create a modern website using AI, delivered in 3 days'။ Description မှာ ① ဘာပါလဲ ② ဘယ်သူ့အတွက်လဲ ③ ဘာကြောင့် ရွေးသင့်လဲ ဆိုတာ ရှင်းရှင်းရေး ပါ။",
        example: "✅ Title: 'I will build a responsive business website with AI in 3 days'\n❌ Title: 'I will make website'",
      },
      {
        title: "Package ၃ ဆင့် သတ်မှတ်နည်း",
        body: "Package ၃ ခု လုပ်ပါ — ① Basic: စျေးသက်သာ ($30 — page ၁ ခု)၊ ② Standard: အလယ် ($60 — page ၅ ခု + contact form)၊ ③ Premium: ဈေးအများဆုံး ($120 — page ၁၀ ခု + chatbot + ၂ ပတ် support)။ ဒါဆို buyer တွေ ဈေးနဲ့လိုက်ဖက်တဲ့အဆင့် ရွေးလို့ရတယ်။",
        tip: "💡 Premium ကို သိသိသာသာ ဈေးမြင့်ထားပါ — buyer တွေ Standard ရွေးတတ်လို့ပါ။",
      },
      {
        title: "ပထမဆုံး Order ရအောင်",
        body: "ပထမ gig မှာ order ရဖို့ ① gig ရဲ့ ဓာတ်ပုံ/video ကောင်းကောင်းထည့်ပါ၊ ② ကိုယ်ပိုင် portfolio နမူနာ ၂-၃ ခု ပြပါ၊ ③ စျေးကို ဈေးကွက်ထက် နည်းနည်းသက်သာထားပါ (ပထမ review ရဖို့)။ Review ကောင်းတွေရလာရင် ဈေးတင်လို့ရပါတယ်။",
        example: "ဥပမာ — portfolio: ကိုယ်တိုင်ဆောက်ထားတဲ့ website ၂ ခုရဲ့ screenshot + link ထည့်ထားပါ။",
      },
    ],
    summary: [
      "Gig = သင်ရောင်းတဲ့ ဝန်ဆောင်မှု — title မှာ ဘာပေး+ဘယ်လောက်မြန် ထည့်ပါ",
      "Package ၃ ဆင့် (Basic/Standard/Premium) သတ်မှတ်ပါ",
      "ပထမ review ရဖို့ ဈေးသက်သာထားပြီး portfolio ပြပါ",
    ],
  },

  "module-11": {
    id: "module-11",
    learn: [
      "Upwork Profile 100% ဖြည့်နည်း",
      "Proposal Template ၃ မျိုး",
      "Job Post ဖတ်နည်း + Bid လုပ်နည်း",
    ],
    steps: [
      {
        title: "Upwork ဆိုတာ + Profile",
        body: "Upwork က နောက်ထပ် ကြီးတဲ့ freelancing platform ပါ — ဒီမှာက client တွေက job post တင်ပြီး freelancer တွေက proposal (လျှောက်လွှာ) ပို့ရပါတယ်။ Profile မှာ: အလုပ်ခေါင်းစဉ် + အတွေ့အကြုံ + portfolio + skills ဖြည့်ပါ။ 100% ပြည့်အောင် ဖြည့်ထားတဲ့ profile တွေ အလုပ်ရဖို့ ပိုလွယ်ပါတယ်။",
        example: "✅ Title: 'AI-Powered Web Developer — Next.js, Chatbots, Landing Pages'",
        diagram: "proposal",
      },
      {
        title: "Job Post ဖတ်နည်း",
        body: "Proposal မပို့ခင် job post ကို သေချာဖတ်ပါ — ① client က ဘာလိုချင်လဲ၊ ② budget ဘယ်လောက်လဲ၊ ③ deadline ဘယ်တော့လဲ၊ ④ သူတို့ရဲ့ ဘာသာစကားကို mirror လုပ်ပါ (သူတို့ စကားလုံးသုံးထားတာကို ပြန်သုံးပါ)။ မကိုက်ညီတဲ့ job တွေကို ကျော်လိုက်ပါ။",
        tip: "💡 နေ့စဉ် job ၁၀ ခုထက် ပိုမလျှောက်ပါနဲ့ — quality > quantity။",
      },
      {
        title: "Proposal Template ၁ — စတင်သူ",
        body: "'မင်္ဂလာပါ! ခင်ဗျားရဲ့ project ကို ဖတ်ပြီး ကျွန်တော် စိတ်ဝင်စားပါတယ်။ [project အကြောင်း ပြန်ပြောပါ]။ ကျွန်တော် ဒီလိုမျိုး [ဆင်တူအလုပ် ၁ ခု] လုပ်ဖူးပါတယ်။ ဒီပုံစံအတိုင်း သင့်အတွက် [result] ရအောင် လုပ်ပေးနိုင်ပါတယ်။ ဈေးနှုန်းနဲ့ အချိန် ဆွေးနွေးချင်ပါတယ်။'" ,
        example: "✅ ပို့တဲ့အခါ: ကိုယ့်ရဲ့ portfolio link ၁ ခု ထည့်ပြီး ပို့ပါ။",
      },
      {
        title: "Proposal Template ၂ — အတွေ့အကြုံရှိ",
        body: "'ခင်ဗျားရဲ့ project က [ပြဿနာ] ကို ဖြေရှင်းဖို့ပါ — ကျွန်တော် [အလားတူ project] မှာ [result] ရအောင် လုပ်ဖူးပါတယ်။ ကျွန်တော့်ရဲ့ နည်းလမ်း: [၁] [၂] [၃]။ ဒီအတိုင်း လုပ်ပေးမယ်ဆိုရင် [benefit] ရပါမယ်။'" ,
        example: "✅ နံပါတ်တပ်ပြီး အဆင့်တွေ ပြထားတဲ့ proposal တွေ ပိုအောင်မြင်တယ်။",
      },
      {
        title: "Proposal Template ၃ — မြန်မြန် ဖြေတဲ့ပုံစံ",
        body: "Client တွေက မြန်တဲ့သူ ကြိုက်တယ် — 'ဒီ project လုပ်နိုင်ပါတယ်။ မေးခွန်း ၂ ခုပဲ ရှိပါတယ် — ① ဘယ် platform မှာ ဖွင့်ချင်လဲ? ② content တွေ အသင့်ရှိလား? ဖြေပြီးရင် ၂၄ နာရီအတွင်း draft ပေးပါမယ်။'",
        tip: "💡 Interview ဖိတ်ရင် ချက်ချင်း ပြန်ဖြေပါ — မြန်တဲ့သူကို ရွေးတတ်လို့ပါ။",
      },
    ],
    summary: [
      "Profile 100% ဖြည့်ပြီး title မှာ ဘာလုပ်ပေးနိုင်လဲ ထည့်ပါ",
      "Proposal = client ရဲ့ project ပြန်ပြော + သင့်နည်းလမ်း + portfolio",
      "Quality over quantity — နေ့စဉ် ၁၀ ခုထက် မပိုပါနဲ့",
    ],
  },

  "module-12": {
    id: "module-12",
    learn: [
      "ဈေးနှုန်းသတ်မှတ်နည်း (Fixed vs Hourly)",
      "Negotiation + Scope Management",
      "Interview မေးခွန်း ၁၂ ခု အဖြေနဲ့",
    ],
    steps: [
      {
        title: "ဈေးနှုန်း သတ်မှတ်နည်း",
        body: "ဈေးနှုန်း ၂ မျိုး ရှိတယ် — ① Fixed: တစ်ခါတည်း သဘောတူထားတဲ့ ဈေး (project ရှင်းရင် သုံးပါ)၊ ② Hourly: နာရီအလိုက် ($15-50 — အလုပ်ကျယ်ရင် သုံးပါ)။ စည်းကမ်း: သင့်အချိန်ကို ဈေးပေါမရောင်းပါနဲ့ — သင်ပေးတဲ့ value ကို ကြည့်ပြီး ဈေးတွက်ပါ။",
        example: "ဥပမာ — website တစ်ခု: Fixed $300 (၇ ရက်) သို့မဟုတ် Hourly $20 × ၂၀ နာရီ = $400။",
        diagram: "money",
      },
      {
        title: "Negotiation — ဈေးညှိနည်း",
        body: "Client က ဈေးလျှော့ခိုင်းရင် ဒီနည်း ၃ ချက် သုံးပါ — ① ချက်ချင်း လျှော့မပေးပါနဲ့ ('ဈေးကို နည်းနည်း ညှိလို့ရပါတယ်၊ ဒါပေမယ့် scope ကို လျှော့ရပါမယ်')၊ ② ဘာတွေ ပါမပါ ရှင်းရှင်းလင်းလင်း သိထားပါ၊ ③ သဘောတူချက်ကို စာနဲ့ ရေးထားပါ။",
        example: "✅ Client: '$200 ပေးမယ်'\nသင်: '$200 နဲ့ page ၃ ခုပဲ ပါမယ်၊ page ၅ ခုဆို $280 ပါ' — နှစ်ဘက်လုံး အဆင်ပြေတဲ့ အဖြေ။",
      },
      {
        title: "Scope Management — အလုပ်ကျယ်မသွားအောင်",
        body: "'ဒီလေးပါ ထပ်ထည့်ပေးပါဦး' ဆိုတဲ့စကားက scope creep (အလုပ်တိတ်တိတ်ကြီး ကျယ်သွားတာ) ရဲ့ အစပါ။ ကာကွယ်နည်း: ① ကနဦးမှာ 'ပါဝင်မယ့်အရာ' စာရင်း ရှင်းရှင်းထားပါ၊ ② အသစ်တောင်းရင် 'ဒါက extra — $50 ပါ' လို့ ပြောပါ။",
        tip: "💡 ပြောင်းလဲမှုတိုင်းကို စာနဲ့ အတည်ပြုပါ — နောက်ပိုင်း ငြင်းစရာ မလိုတော့ဘူး။",
      },
      {
        title: "Interview မေးခွန်း ၁၂ ခု (အဖြေနဲ့)",
        body: "အဖြစ်အများဆုံး မေးခွန်းတွေ: ① 'ဘယ်လောက်ကြာမလဲ?' → 'ပုံစံပေါ်မူတည်ပြီး ၅-၇ ရက်ပါ'၊ ② 'အာမခံ ရှိလား?' → 'ပြီးပြီးချင်း ၂ ပတ် free fix ပါ'၊ ③ 'ဘာတွေ လိုမလဲ?' → 'content + ပုံတွေပါ'၊ ④ 'ဈေးကို ဘာလို့ ဒီလောက်လဲ?' → 'ဒီထဲမှာ design + code + hosting setup + training ပါလို့ပါ'။ ရိုးရိုးသားသား ဖြေပြီး မသေချာတာ ရှိရင် 'ပြန်စစ်ပြီး အကြောင်းကြားပါမယ်' လို့ ပြောပါ။",
        example: "✅ မေးခွန်း: 'မနေ့ကမှ စတင်တာလား?' ဖြေ: 'ကျွန်တော် [portfolio link] မှာ ဆောက်ပြီးသား website တွေ ပြထားပါတယ် — ကြည့်လို့ရပါတယ်' — ယုံကြည်မှု ဖြစ်စေတယ်။",
      },
    ],
    summary: [
      "Fixed vs Hourly — project ပေါ်မူတည်ပြီး ရွေးပါ",
      "ဈေးညှိတဲ့အခါ scope နဲ့ တွဲညှိပါ — 'ဈေးလျှော့ရင် အလုပ်လျှော့'",
      "ပြောင်းလဲမှုတိုင်းကို စာနဲ့ အတည်ပြုပါ",
    ],
  },

  "module-13": {
    id: "module-13",
    learn: [
      "Capstone ၃ ခု — လက်တွေ့ project",
      "Retainer + Recurring Income",
      "Automation + ဆက်တိုက် ကြီးထွားနည်း",
    ],
    steps: [
      {
        title: "Capstone 1 — Business Website + Chatbot",
        body: "စီးပွားရေးလုပ်ငန်းတစ်ခုအတွက် website + chatbot အပြည့်အစုံ ဆောက်ပါ — module ၃-၈ ကသင်ထားတဲ့အရာတွေ အကုန် ပေါင်းထည့်ပါ။ ဒါက client တွေကို ပြလို့ရတဲ့ သက်သေပါ။",
        example: "ဥပမာ — လက်ဖက်ရည်ဆိုင်: website (menu + contact) + chatbot (ဖွင့်ချိန်/ဈေး ဖြေ)။",
        diagram: "portfolio",
      },
      {
        title: "Capstone 2 — E-Commerce Mini Store",
        body: "ကုန်ပစ္စည်း ရောင်းတဲ့ mini store ဆောက်ပါ — product list + cart + checkout (နမူနာ)။ AI ကို 'store ဆောက်ပေးပါ' လို့ မှာပြီး product ၅-၁၀ ခု ထည့်ပါ။ ဒါက e-commerce ဈေးကွက်ကို ဝင်ဖို့ လက်မှတ်ပါ။",
        diagram: "money",
      },
      {
        title: "Capstone 3 — Freelance Launch Package",
        body: "ကိုယ့်ရဲ့ လုပ်ငန်းစတင်ဖို့ package ပြင်ဆင်ပါ — ① portfolio site (module ၆)၊ ② Fiverr gig ၂ ခု (module ၁၀)၊ ③ Upwork profile + proposal ၃ ခု (module ၁၁)၊ ④ ဈေးနှုန်း list (module ၁၂)။ ဒါတွေ ပြီးရင် စတင် လျှောက်လို့ရပါပြီ။",
        example: "✅ Launch checklist: portfolio live ✅ gig ၂ ခု ✅ proposal ၃ ခု ✅ price list ✅",
      },
      {
        title: "Retainer — လစဉ်ဝင်ငွေ",
        body: "Retainer ဆိုတာ client က လစဉ် ပုံသေပေးပြီး သင်က ပုံမှန် ဝန်ဆောင်မှုပေးတဲ့ စနစ်ပါ — ဥပမာ: 'website maintenance + update လစဉ် $100'။ Client ၅ ယောက် retainer ရှိရင် တစ်လ $500 ပုံသေ ဝင်ငွေရပါတယ်။",
        example: "ဥပမာ — project ပြီးတဲ့ client ကို ပြောပါ: 'နောက် ၆ လ maintenance လစဉ် $80 နဲ့ လုပ်ပေးမယ် — update, backup, fix အကုန်ပါ'",
        diagram: "ladder",
      },
      {
        title: "Automation + ကြီးထွားနည်း",
        body: "အချိန်ကုန်တဲ့အလုပ်တွေကို automate လုပ်ပါ — ① အီးမေးလ် reply template၊ ② proposal template (module ၁၁)၊ ③ chatbot (module ၈) က FAQ ဖြေပေးတာ၊ ④ client onboarding form သုံးတာ။ ဒါတွေက သင့်အချိန်ကို ပိုပြီး အလုပ်အသစ်ရှာတာ/သင်ယူတာမှာ သုံးလို့ရအောင် လုပ်ပေးပါတယ်။",
        tip: "💡 တစ်ပတ်ကို ၁ နာရီ — ဒီ module တွေ ပြန်ကြည့်ပြီး ဘာတွေ ပိုကောင်းအောင် လုပ်လို့ရမလဲ စဉ်းစားပါ။",
      },
    ],
    summary: [
      "Capstone ၃ ခု ပြီးရင် client ပြလို့ရတဲ့ portfolio အပြည့်အစုံ ရပြီ",
      "Retainer client ၅ ယောက် = တစ်လ $500 ပုံသေဝင်ငွေ",
      "Automation နဲ့ အချိန်ကို ပြန်ရယူပြီး ကြီးထွားအောင် လုပ်ပါ",
    ],
  },

  "welcome": {
    id: "welcome",
    learn: [
      "သင်တန်းရဲ့ ခရီးစဉ် — ဘာတွေ သင်ယူရမလဲ",
      "Module အလိုက် လေ့လာနည်း",
      "အောင်မြင်ဖို့ အလေ့အထ",
    ],
    steps: [
      {
        title: "သင်တန်း ခရီးစဉ်",
        body: "ဒီသင်တန်းက Module ၁၃ ခု ရှိပြီး အဆင့်ဆင့် တက်ရပါတယ် — Module ၁ ကနေ စပြီး တစ်ခုချင်းစီရဲ့ သင်ခန်းစာကို လေ့လာကာ အဆုံးမှာ Exam ဖြေပြီး Level Up လုပ်ရပါတယ်။ Exam အောင်မှ နောက် Module ဖွင့်ပါတယ်။",
        diagram: "ladder",
      },
      {
        title: "Module အလိုက် လေ့လာနည်း",
        body: "တစ်ရက်ကို Module ၁ ခုနှုန်း လေ့လာပါ — ① သင်ခန်းစာဖတ် (အဆင့်တွေကို လိုက်လုပ်ပါ)၊ ② ဥပမာတွေ ကိုယ်တိုင် စမ်းပါ၊ ③ သင်ခန်းစာအဆုံးမှာ Exam ဖြေပါ။ အောင်ရင် Level Up!",
        tip: "💡 နားမလည်တာ ရှိရင် ပြန်ဖတ်ပါ — ဖြတ်မသွားပါနဲ့။",
      },
      {
        title: "အောင်မြင်ဖို့ အလေ့အထ",
        body: "နေ့တိုင်း အနည်းဆုံး ၁ နာရီ လေ့လာပါ၊ မှတ်စုရေးပါ၊ ကိုယ်တိုင် စမ်းကြည့်ပါ။ လက်တွေ့မလုပ်ဘဲ ကြည့်ရုံနဲ့ မရပါဘူး — သင်လုပ်တိုင်း ပိုကျွမ်းကျင်လာပါတယ်။",
      },
    ],
    summary: [
      "Module တစ်ခုချင်းစီ: သင်ခန်းစာ → လေ့လာ → Exam → Level Up",
      "တစ်ရက် ၁ Module နှုန်း သွားပါ",
      "လက်တွေ့ လုပ်တာ = အောင်မြင်တာ",
    ],
  },

  "wrapup": {
    id: "wrapup",
    learn: [
      "သင်တန်း အကျဉ်းချုပ်",
      "နောက်ခြေလှမ်း — ဘာတွေ ဆက်လုပ်မလဲ",
    ],
    steps: [
      {
        title: "ဂုဏ်ယူပါတယ်! 🎓",
        body: "Module ၁၃ ခုလုံး ပြီးမြောက်သွားပါပြီ။ သင်ဟာ အခုဆို AI သုံးပြီး website တွေ ဆောက်နိုင်၊ chatbot တွေ တပ်ဆင်နိုင်၊ Fiverr/Upwork မှာ ဝန်ဆောင်မှု ရောင်းချနိုင်ပါပြီ။",
        diagram: "ladder",
      },
      {
        title: "နောက်ခြေလှမ်း — Launch လုပ်ပါ",
        body: "Capstone ၃ ခုကို အပြီးသတ်ပါ → portfolio live လုပ်ပါ → Fiverr gig ၂ ခု ဖွင့်ပါ → Upwork proposal ၅ ခု ပို့ပါ → ပထမဆုံး order ရအောင် လုပ်ပါ။ စိတ်ရှည်ပါ — ပထမ order က အကြာဆုံး ကြာတတ်ပေမယ့် နောက်ပိုင်း မြန်လာပါတယ်။",
        example: "✅ ပထမပတ်: gig ဖွင့် + proposal ၅ ခု → ဒုတိယပတ်: ၂ ခု ဖြေကြား → တတိယပတ်: order ၁ ခု စမ်း",
      },
      {
        title: "ဆက်လက် သင်ယူပါ",
        body: "ဒီသင်တန်းက အစပဲရှိပါသေးတယ် — AI tools တွေ နေ့စဉ် အသစ်ထွက်နေလို့ newsletter တွေ ဖတ်ပါ၊ community တွေမှာ ပါဝင်ပါ၊ ကိုယ့်အလုပ်တွေကို မျှဝေပါ။ သင်လေ့လာသလောက် ဝင်ငွေ တိုးပါတယ်။",
        tip: "💡 သင်တန်းဆရာကို မေးခွန်းရှိရင် Viber 09945598825 မှာ ဆက်သွယ်နိုင်ပါတယ်။",
      },
    ],
    summary: [
      "သင်ယူပြီးသား skills တွေကို ချက်ချင်း သုံးပါ",
      "Launch checklist အတိုင်း လုပ်ပါ — gig, proposal, portfolio",
      "ဆက်လက် သင်ယူပါ — AI ဈေးကွက်က ကြီးထွားနေတုန်းပါ",
    ],
  },
};

// Exam gating: module N requires passing exam of module N-1.
export const EXAM_PASS_SCORE = 60; // percent required to pass

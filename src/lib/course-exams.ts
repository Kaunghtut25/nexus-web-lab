// Exam question bank — one exam per module.
// Each exam: 5 questions, pass = EXAM_PASS_SCORE (60%) → 3/5 correct to pass.
// Questions are Burmese (course language) and test the lesson's key points
// so a student who read the lesson can pass without extra explanation.

export interface ExamQuestion {
  q: string;
  options: string[];
  answer: number; // index of correct option
  explain: string; // shown after answering — teaches why
}

export interface ModuleExam {
  moduleId: string;
  title: string;
  questions: ExamQuestion[];
}

export const COURSE_EXAMS: ModuleExam[] = [
  {
    moduleId: "module-01",
    title: "AI Freelancing အခြေခံ",
    questions: [
      {
        q: "AI ခေတ်မှာ Freelancer တွေ ဘာကြောင့် ပိုတန်ဖိုးရှိလာတာလဲ?",
        options: ["AI က လူတွေကို အလုပ်လုံးဝ မလိုတော့အောင် လုပ်လို့", "AI သုံးရင် လူတစ်ယောက်တည်းနဲ့ မြန်မြန် အလုပ်ပြီးအောင် လုပ်လို့", "AI က free ဖြစ်လို့", "AI က ဈေးကွက်ကို ပိတ်ပစ်လို့"],
        answer: 1,
        explain: "AI က code/design ကို မြန်မြန် လုပ်ပေးလို့ တစ်ယောက်တည်း ဝန်ဆောင်မှုပေးနိုင်တဲ့ freelancer တွေ ဈေးကွက်မှာ ပိုတန်ဖိုးရှိလာပါတယ်။",
      },
      {
        q: "Freelancer တစ်ယောက်ရဲ့ တစ်နေ့တာကို ဘယ်လို ခွဲလုပ်သင့်လဲ?",
        options: ["တစ်နေ့လုံး အိပ်ပြီး ညမှ လုပ်တယ်", "သင်ယူတာ + အလုပ်ရှာ + client အလုပ် ဆိုပြီး အပိုင်း ၃ ပိုင်း ခွဲလုပ်တယ်", "တစ်ပတ်လုံး တစ်ခုတည်းပဲ လုပ်တယ်", "ဘယ်တော့မှ ပုံမှန် မလုပ်ဘူး"],
        answer: 1,
        explain: "မနက် (အလုပ်ရှာ) + နေ့လယ် (client အလုပ်) + ည (သင်ယူ) ဆိုပြီး ပုံမှန် ခွဲလုပ်ရင် ၂-၃ လအတွင်း ပထမဆုံး ဝင်ငွေ ရနိုင်ပါတယ်။",
      },
      {
        q: "စတင်ဖို့ လိုအပ်တဲ့ free tools ထဲက တစ်ခုက ဘာလဲ?",
        options: ["Vercel (hosting)", "Photoshop (အခပေး)", "Microsoft Word", "Windows Update"],
        answer: 0,
        explain: "Gmail, ChatGPT, Vercel, Figma/Canva — ဒီ ၄ ခုက free ဖြစ်ပြီး စတင်ဖို့ လုံလောက်ပါတယ်။",
      },
      {
        q: "Goal ချမှတ်တဲ့အခါ ဘယ်လို သတ်မှတ်သင့်လဲ?",
        options: ["မရေမရာ — 'ပိုက်ဆံရချင်တယ်'", "တိကျတယ် — '၃ လအတွင်း တစ်လ $500'", "ကြီးလွန်း — 'သန်းကြွယ်သူဖြစ်မယ်'", "ဘယ်တော့မှ မသတ်မှတ်ဘူး"],
        answer: 1,
        explain: "ပန်းတိုင်က တိကျလေ၊ အဲဒီဆီ ရောက်ဖို့ အဆင့်တွေ စီစဉ်ရတာ လွယ်လေပါ။",
      },
      {
        q: "AI ခေတ်မှာ website တစ်ခု ဆောက်ဖို့ အရင်ကနဲ့ ယှဉ်ရင် ဘယ်လို ပြောင်းလဲသွားလဲ?",
        options: ["ပိုဈေးကြီးလာတယ်", "ရက်သတ္တပတ်တွေ ပိုကြာလာတယ်", "ပိုမြန်ပြီး ကုန်ကျစရိတ် သက်သာလာတယ်", "လူတွေပဲ လုပ်လို့ရတယ်"],
        answer: 2,
        explain: "AI ကြောင့် website ဆောက်တာ ရက်ပိုင်းအတွင်း ပြီးနိုင်ပြီး ကုန်ကျစရိတ်လည်း သက်သာလာပါတယ်။",
      },
    ],
  },

  {
    moduleId: "module-02",
    title: "Prompt Engineering (RACE)",
    questions: [
      {
        q: "RACE ဆိုတာ ဘာရဲ့ အတိုကောက်လဲ?",
        options: ["Run, Action, Code, End", "Role, Action, Context, Example", "Read, Ask, Copy, Edit", "Rule, Auto, Chat, Exit"],
        answer: 1,
        explain: "RACE = Role + Action + Context + Example — AI ကို မှာတဲ့အခါ ဒီ ၄ ချက် ထည့်ပါ။",
      },
      {
        q: "RACE ထဲက 'Role' ဆိုတာ ဘာကို ပြောတာလဲ?",
        options: ["AI ရဲ့ အမည်", "AI က ဘယ်သူ့အနေနဲ့ ဖြေရမလဲ ဆိုတာ", "သုံးစွဲသူရဲ့ အမည်", "website ရဲ့ URL"],
        answer: 1,
        explain: "ဥပမာ 'သင်က professional web copywriter' — Role ပေးထားရင် အဖြေ ပိုသင့်တော်ပါတယ်။",
      },
      {
        q: "ဒီ prompt တွေထဲက ဘယ်ဟာက အကောင်းဆုံးလဲ?",
        options: ["'website လုပ်ပေး'", "'သင်က web developer — စားသောက်ဆိုင်တစ်ဆိုင်အတွက် home page ၁ မျက်နှာ ရေးပေးပါ၊ မြန်မာလိုပါ'", "'ပိုကောင်းအောင် လုပ်ပေး'", "'hi'"],
        answer: 1,
        explain: "Role + Action + Context (ဘာသာစကား) ပါတဲ့ prompt က ရှင်းရှင်းလင်းလင်း အဖြေရပါတယ်။",
      },
      {
        q: "'Example' က ဘာကြောင့် အရေးကြီးတာလဲ?",
        options: ["AI က ဥပမာ မကြိုက်လို့", "ဥပမာပြရင် AI က အတိအကျ လိုက်လုပ်တယ်", "ဥပမာက time ကုန်တယ်", "ဥပမာက error ဖြစ်စေတယ်"],
        answer: 1,
        explain: "လိုချင်တဲ့ပုံစံ ဥပမာပြပေးရင် AI က အဲဒီပုံစံအတိုင်း အတိအကျ လိုက်လုပ်ပါတယ် — ဒါက အရေးကြီးဆုံး အဆင့်ပါ။",
      },
      {
        q: "Code error ရတဲ့အခါ ဘာလုပ်သင့်လဲ?",
        options: ["စိတ်ပူပြီး ပြန်စလုပ်တယ်", "error message ကို copy လုပ်ပြီး AI ကို ပြင်ခိုင်းတယ်", "error ကို ဖျက်ပစ်တယ်", "ကွန်ပျူတာ ပိတ်ပစ်တယ်"],
        answer: 1,
        explain: "error message တစ်ခုလုံး copy → 'ဒီ error ကို ပြင်ပေးပါ' လို့ AI ကို ပြောရုံပါပဲ။",
      },
    ],
  },

  {
    moduleId: "module-03",
    title: "Web Development အခြေခံ",
    questions: [
      {
        q: "HTML ရဲ့ အလုပ်က ဘာလဲ?",
        options: ["အလှဆင်တာ", "အရိုးစု (စာသား၊ ပုံ၊ ခလုတ်) တည်ဆောက်တာ", "data သိမ်းတာ", "server ဖွင့်တာ"],
        answer: 1,
        explain: "HTML = အရိုးစု၊ CSS = အလှဆင်၊ JavaScript = အသက်ဝင်စေတာ။",
      },
      {
        q: "CSS နဲ့ ဘာတွေ လုပ်လို့ရလဲ?",
        options: ["အရောင်ခြယ်တာ၊ font-size ပြောင်းတာ", "စာသား ရေးတာ", "data သိမ်းတာ", "login လုပ်တာ"],
        answer: 0,
        explain: "CSS က color, font-size, background, padding, border စတဲ့ အလှဆင်တာတွေ လုပ်ပါတယ်။",
      },
      {
        q: "JavaScript ရဲ့ အဓိက အလုပ်က ဘာလဲ?",
        options: ["အရောင်တင်တာ", "စာသားရေးတာ", "သုံးသူရဲ့ action တွေကို တုံ့ပြန်တာ", "domain ဝယ်တာ"],
        answer: 2,
        explain: "JS က click, form ဖြည့်တာလို action တွေကို တုံ့ပြန်ပြီး website ကို အသက်ဝင်စေပါတယ်။",
      },
      {
        q: "Website error ဖြစ်ရင် ဘယ်လို ရှာမလဲ?",
        options: ["website ကို ဖျက်ပစ်တယ်", "F12 နှိပ်ပြီး Console မှာ error ကြည့်တယ်", "အင်တာနက် ပိတ်တယ်", "ဘာမှ မလုပ်ဘူး"],
        answer: 1,
        explain: "F12 → Console tab → error message copy → AI ကို ပို့ပြီး ပြင်ခိုင်းပါ။",
      },
      {
        q: "ဒီ code က ဘာလဲ?  <h1>မင်္ဂလာပါ</h1>",
        options: ["JavaScript function", "HTML ခေါင်းစီး tag", "CSS rule", "database query"],
        answer: 1,
        explain: "<h1> က HTML ရဲ့ ခေါင်းစီး (heading) tag ပါ။",
      },
    ],
  },

  {
    moduleId: "module-04",
    title: "AI ဖြင့် Website ဆောက်ခြင်း",
    questions: [
      {
        q: "Website တစ်ခုရဲ့ ပထမဆုံး မြင်ရတဲ့ ကြီးမားတဲ့အပိုင်းကို ဘယ်လိုခေါ်လဲ?",
        options: ["Footer", "Hero", "Sidebar", "Database"],
        answer: 1,
        explain: "Hero section က ဝင်လာတာနဲ့ ပထမဆုံး မြင်ရတဲ့ ကြီးမားတဲ့အပိုင်းပါ။",
      },
      {
        q: "Website တစ်ခုလုံးကို AI နဲ့ ဆောက်တဲ့အခါ ဘယ်လို မှာသင့်လဲ?",
        options: ["တစ်ခါတည်း တစ်ခုလုံး မှာတယ်", "Section တစ်ခုချင်းစီ သပ်သပ် မှာတယ်", "ဘာမှ မမှာဘူး", "တစ်ခြားသူကို မှာတယ်"],
        answer: 1,
        explain: "Section တစ်ခုချင်း မှာရင် သင်ထိန်းချုပ်လို့ရပြီး အမှားနည်းပါတယ်။",
      },
      {
        q: "Design ပြီးရင် content (စာသား) ကို ဘယ်လို ရမလဲ?",
        options: ["AI ကို သပ်သပ် မှာရေးခိုင်းတယ်", "ဘာမှ မထည့်ဘူး", "နောက် website ကနေ copy လုပ်တယ်", "random ထည့်တယ်"],
        answer: 0,
        explain: "'menu ၅ ခုရဲ့ ဖော်ပြချက် ရေးပေးပါ' လို content ကို သပ်သပ်မှာရင် နှစ်ခုလုံး ကောင်းပါတယ်။",
      },
      {
        q: "Iterate လုပ်တယ်ဆိုတာ ဘာလဲ?",
        options: ["အလုပ်ကို လက်လွှတ်တာ", "ပြန်ပြင်ပြီး ပိုကောင်းအောင် ထပ်လုပ်တာ", "ပိုက်ဆံတောင်းတာ", "နားချိန်ယူတာ"],
        answer: 1,
        explain: "ကြည့် → မကျေနပ်တာ ပြင်ခိုင်း → ပြန်ကြည့် — ဒါကို iterate လို့ ခေါ်ပြီး design မှာ အရေးကြီးပါတယ်။",
      },
      {
        q: "ပုံတွေ အခမဲ့ ယူဖို့ ဘယ် site သုံးလဲ?",
        options: ["Unsplash.com", "Facebook", "Gmail", "Windows"],
        answer: 0,
        explain: "Unsplash က free high-quality ပုံတွေ ပေးပါတယ် — <img src> နဲ့ ထည့်လို့ရပါတယ်။",
      },
    ],
  },

  {
    moduleId: "module-05",
    title: "Hosting & Deploy",
    questions: [
      {
        q: "Hosting ဆိုတာ ဘာလဲ?",
        options: ["website ဆောက်တဲ့ code", "website ကို အင်တာနက်ပေါ်မှာ ထားပေးတာ", "ပုံတွေ ရိုက်တာ", "email ပို့တာ"],
        answer: 1,
        explain: "Hosting က သင့် website ကို လူတိုင်း ကြည့်လို့ရအောင် အင်တာနက်ပေါ်မှာ ထားပေးပါတယ်။",
      },
      {
        q: "Vercel ရဲ့ ကောင်းချက်က ဘာလဲ?",
        options: ["အခပေး ဖြစ်တယ်", "free hosting ပေးပြီး မြန်တယ်", "code မရေးရဘူး", "domain ဝယ်ပေးတယ်"],
        answer: 1,
        explain: "Vercel က free hosting ပေးပြီး upload လုပ်ရုံနဲ့ live URL ရပါတယ်။",
      },
      {
        q: "Subdomain ဆိုတာ ဘာလဲ?",
        options: ["website ရဲ့ အမြစ်နာမည်", "domain ရဲ့ အောက်က အပိုင်း (blog.example.com)", "ကွန်ပျူတာ အမည်", "password"],
        answer: 1,
        explain: "Subdomain = domain ရဲ့ ရှေ့မှာ ထပ်ထည့်တဲ့ အပိုင်း — blog.example.com မှာ 'blog' က subdomain ပါ။",
      },
      {
        q: "Custom domain ချိတ်ဖို့ ဘယ်နှစ်ဆင့် လိုလဲ?",
        options: ["၁ ဆင့်", "၂ ဆင့်", "၃ ဆင့်", "၁၀ ဆင့်"],
        answer: 2,
        explain: "① domain ဝယ် → ② Vercel မှာ Add Domain → ③ DNS record ထည့် — ၃ ဆင့်ပါ။",
      },
      {
        q: "DNS ဆိုတာ ဘာလဲ?",
        options: ["website ဆောက်တဲ့ tool", "နာမည်ကို နေရာကို ညွှန်ပြတဲ့ လမ်းညွှန်စာအုပ်", "ပုံပြင်", "game"],
        answer: 1,
        explain: "DNS က 'example.com' ကို ဘယ် server ကို ညွှန်မလဲ ဆုံးဖြတ်ပေးတဲ့ စနစ်ပါ။",
      },
    ],
  },

  {
    moduleId: "module-06",
    title: "AI Agents + Next.js",
    questions: [
      {
        q: "AI Agent နဲ့ Chatbot ရဲ့ အဓိက ကွာခြားချက်က ဘာလဲ?",
        options: ["ဘာမှ မကွာဘူး", "Agent က task တွေကို ကိုယ်တိုင် စီစဉ်ပြီး လုပ်ပေးတယ်", "Chatbot က ပိုသန်တယ်", "Agent က game ပဲ"],
        answer: 1,
        explain: "Chatbot က မေးတာဖြေတယ်။ Agent က 'website ဆောက်ပေးပါ' ဆိုရင် အဆင့်တွေ စီစဉ်ပြီး ကိုယ်တိုင် လုပ်ပေးပါတယ်။",
      },
      {
        q: "စတင်သူတွေအတွက် အလွယ်ဆုံး AI coding tool က ဘာလဲ?",
        options: ["Cursor", "Ollama (command line)", "Docker", "Excel"],
        answer: 0,
        explain: "Cursor က AI-first editor — စာကြောင်းနဲ့ ပြောပြီး code ပြင်လို့ရလို့ starter တွေ အဆင်ပြေပါတယ်။",
      },
      {
        q: "Next.js ဆိုတာ ဘာလဲ?",
        options: ["database", "React ပေါ်မှာ တည်ဆောက်ထားတဲ့ web framework", "ပုံပြင် app", "browser"],
        answer: 1,
        explain: "Next.js က professional web app တွေ ဆောက်တဲ့ framework ပါ။",
      },
      {
        q: "Tailwind CSS ရဲ့ ထူးခြားချက်က ဘာလဲ?",
        options: ["CSS သပ်သပ်ရေးစရာ မလိုဘဲ class တွေနဲ့ ရေးလို့ရတယ်", "ပုံတွေ ဆွဲပေးတယ်", "data သိမ်းတယ်", "game ဆောက်တယ်"],
        answer: 0,
        explain: "bg-blue-500, text-white စတဲ့ class တွေသုံးပြီး မြန်မြန် style လုပ်လို့ရပါတယ်။",
      },
      {
        q: "Portfolio website ဆိုတာ ဘာလဲ?",
        options: ["ဘဏ်စာရင်း", "ကိုယ့်အလုပ်တွေ ပြတဲ့ website", "game score", "email list"],
        answer: 1,
        explain: "Portfolio က ကိုယ့်ရဲ့အလုပ်နဲ့ အတွေ့အကြုံကို client တွေ ပြတဲ့ website ပါ။",
      },
    ],
  },

  {
    moduleId: "module-07",
    title: "Chatbot အခြေခံ",
    questions: [
      {
        q: "Rule-Based Chatbot က ဘယ်လို အဖြေပေးတာလဲ?",
        options: ["AI နဲ့ စဉ်းစားတယ်", "ကြိုတင်ရေးထားတဲ့ keyword → အဖြေ စည်းမျဉ်းတွေနဲ့ ဖြေတယ်", "လူကို ခေါ်တယ်", "random ဖြေတယ်"],
        answer: 1,
        explain: "Rule-based က keyword ရှာပြီး ကြိုရေးထားတဲ့ အဖြေကို ပြန်ပေးတဲ့ ရိုးရှင်းတဲ့စနစ်ပါ။",
      },
      {
        q: "JavaScript မှာ စာထဲ keyword ရှာဖို့ ဘယ် method သုံးလဲ?",
        options: ["msg.includes('keyword')", "msg.delete()", "msg.style()", "msg.open()"],
        answer: 0,
        explain: "includes() က စာထဲမှာ keyword ပါမပါ စစ်ပေးပါတယ် — rule-based bot ရဲ့ အခြေခံပါ။",
      },
      {
        q: "Chatbot မသိတဲ့ မေးခွန်းမေးရင် ဘာလုပ်သင့်လဲ?",
        options: ["အဖြေလွဲပေးတယ်", "'မသိပါ' လို့ ပြောပြီး လူနဲ့ ဆက်သွယ်ပေးတယ်", "website ပိတ်တယ်", "ဘာမှ မလုပ်ဘူး"],
        answer: 1,
        explain: "ကောင်းတဲ့ bot တိုင်းက မသိတာကို ဝန်ခံပြီး human ကို လွှဲပေးပါတယ်။",
      },
      {
        q: "Website ထဲ chatbot ထည့်ဖို့ ဘာတွေ လိုလဲ?",
        options: ["Chat window (HTML/CSS) + logic (JS)", "ဘဏ်အကောင့်", "domain ၁၀ ခု", "printer"],
        answer: 0,
        explain: "Floating button + chat box (HTML/CSS) + ဖြေတဲ့ logic (JS) — ဒါတွေပဲ လိုပါတယ်။",
      },
      {
        q: "Chatbot အမျိုးအစား ၂ မျိုးက ဘာတွေလဲ?",
        options: ["Rule-Based နဲ့ AI-Based", "HTML နဲ့ CSS", "Mobile နဲ့ Desktop", "Free နဲ့ ရောင်းတာ"],
        answer: 0,
        explain: "Rule-Based (ကြိုရေးထားတဲ့အတိုင်း) နဲ့ AI-Based (ဉာဏ်ရည်တုနဲ့ စဉ်းစားဖြေ) — ၂ မျိုးပါ။",
      },
    ],
  },

  {
    moduleId: "module-08",
    title: "AI Chatbot (Botpress)",
    questions: [
      {
        q: "Botpress ရဲ့ ထူးခြားချက်က ဘာလဲ?",
        options: ["code သိပ်မလိုဘဲ drag & drop နဲ့ chatbot ဆောက်လို့ရတယ်", "game ဆောက်တဲ့ tool", "ပုံပြင်တဲ့ tool", "database"],
        answer: 0,
        explain: "Botpress က visual flow editor ပါ — nodes တွေ ဆက်ရုံနဲ့ chatbot ရပါတယ်။",
      },
      {
        q: "API key တွေကို ဘယ်မှာ သိမ်းသင့်လဲ?",
        options: ["website code ထဲ တိုက်ရိုက်", ".env ဖိုင်ထဲ (public မဖြစ်အောင်)", "ဖေ့စ်ဘုတ်ပေါ်မှာ", "client ကို ပေးတယ်"],
        answer: 1,
        explain: "Key တွေကို .env.local ထဲ သိမ်းပြီး ဘယ်သူ့ကိုမှ မပြပါနဲ့ — public ဖြစ်ရင် အလွဲသုံးခံရနိုင်ပါတယ်။",
      },
      {
        q: "Bot ကို ကုမ္ပဏီအကြောင်း သင်ပေးဖို့ ဘာလုပ်လဲ?",
        options: ["PDF တွေ Knowledge Base ထဲ upload လုပ်တယ်", "ဖုန်းခေါ်တယ်", "လူတွေ သင်ပေးတယ်", "ဘာမှ မလုပ်ဘူး"],
        answer: 0,
        explain: "PDF upload လုပ်ထားရင် bot က အဲဒီထဲက အချက်အလက်တွေနဲ့ ဖြေပါတယ်။",
      },
      {
        q: "၂၄ နာရီ chatbot ရဖို့ ဘယ်နေရာမှာ တင်လို့ရလဲ?",
        options: ["Facebook Messenger", "လမ်းပေါ်မှာ", "ရေဒီယို", "သတင်းစာ"],
        answer: 0,
        explain: "Website, Facebook Messenger, Telegram စတာတွေမှာ တင်ပြီး ၂၄ နာရီ ဖြေပေးနိုင်ပါတယ်။",
      },
      {
        q: "Botpress မှာ 'Node' ဆိုတာ ဘာလဲ?",
        options: ["ကွန်ပျူတာ အစိတ်အပိုင်း", "flow ထဲက အဆင့်တစ်ဆင့် (ကြိုဆိုတာ၊ မေးတာ၊ ဖြေတာ)", "ပုံတစ်ပုံ", "password"],
        answer: 1,
        explain: "Node = chatbot flow ထဲက အဆင့်တစ်ဆင့်ချင်းစီပါ — ဒါတွေ ဆက်ပြီး bot ဆောက်ပါတယ်။",
      },
    ],
  },

  {
    moduleId: "module-09",
    title: "v0.dev Rapid Prototyping",
    questions: [
      {
        q: "v0.dev ဆိုတာ ဘာလဲ?",
        options: ["Vercel ရဲ့ AI website builder", "database tool", "game engine", "email client"],
        answer: 0,
        explain: "v0.dev က စာကြောင်းနဲ့ ပြောရုံနဲ့ website UI တစ်ခုလုံး ဖန်တီးပေးပါတယ်။",
      },
      {
        q: "v0 မှာ ပထမဆုံး website ဆောက်ဖို့ ဘာလုပ်ရလဲ?",
        options: ["code ရေးတယ်", "prompt ရိုက်ထည့်တယ်", "server ဝယ်တယ်", "ပုံဆွဲတယ်"],
        answer: 1,
        explain: "'agency website ဆောက်ပေးပါ' ဆိုတဲ့ prompt ရိုက်ထည့်ရုံနဲ့ UI ပေါ်လာပါတယ်။",
      },
      {
        q: "Iteration ဆိုတာ ဘာလဲ?",
        options: ["ပြန်ပြင်ဖို့ ထပ်ပြောတာ", "website ဖျက်တာ", "ပိုက်ဆံ ရှာတာ", "login လုပ်တာ"],
        answer: 0,
        explain: "'အရောင်ပြောင်းပေး'၊ 'ဒီမှာ ပုံထည့်' ဆိုပြီး ထပ်ပြောရုံနဲ့ v0 က ပြင်ပေးပါတယ်။",
      },
      {
        q: "v0 ကနေ live ဖြစ်အောင် ဘယ်လို လုပ်လဲ?",
        options: ["Export → Deploy to Vercel နှိပ်တယ်", "printer နဲ့ ရိုက်တယ်", "email ပို့တယ်", "USB နဲ့ ကူးတယ်"],
        answer: 0,
        explain: "Export ပြီး 'Deploy to Vercel' နှိပ်ရင် code တွေ Vercel ပေါ် တင်ပြီး live URL ရပါတယ်။",
      },
      {
        q: "v0 ကို ဘာအတွက် အသုံးဝင်ဆုံးလဲ?",
        options: ["client demo မြန်မြန်ပြဖို့", "ဘဏ်စာရင်း စီမံဖို့", "ပုံပြင် ရေးဖို့", "ဂိမ်းဆောက်ဖို့"],
        answer: 0,
        explain: "မိနစ် ၃၀ အတွင်း demo website ရလို့ client ကို မြန်မြန် ပြလို့ရပါတယ်။",
      },
    ],
  },

  {
    moduleId: "module-10",
    title: "Fiverr Marketplace",
    questions: [
      {
        q: "Fiverr မှာ 'Gig' ဆိုတာ ဘာလဲ?",
        options: ["သင်ရောင်းတဲ့ ဝန်ဆောင်မှု တစ်ခု", "ပုံတစ်ပုံ", "game တစ်ခု", "email တစ်စောင်"],
        answer: 0,
        explain: "Gig = buyer တွေကို ရောင်းတဲ့ ဝန်ဆောင်မှု (ဥပမာ: website ဆောက်ပေးတာ)။",
      },
      {
        q: "Fiverr က commission ဘယ်လောက် ယူလဲ?",
        options: ["5%", "20%", "50%", "0%"],
        answer: 1,
        explain: "Fiverr က 20% စည်းကြပ်ပါတယ် — ဈေးတွက်တဲ့အခါ ထည့်စဉ်းစားပါ။",
      },
      {
        q: "Gig title ကောင်းတစ်ခုရဲ့ ပုံစံက ဘာလဲ?",
        options: ["'I will make website'", "'I will build a responsive business website with AI in 3 days'", "'website'", "'hi'"],
        answer: 1,
        explain: "Title မှာ ဘာပေးမလဲ + ဘယ်လောက်မြန်မလဲ ထည့်ရင် search မှာ ပေါ်လွယ်ပါတယ်။",
      },
      {
        q: "Package ၃ ဆင့်ရဲ့ နာမည်တွေက ဘာတွေလဲ?",
        options: ["Small, Medium, Large", "Basic, Standard, Premium", "Low, Mid, High", "A, B, C"],
        answer: 1,
        explain: "Basic (သက်သာ) → Standard (အလယ်) → Premium (အပြည့်) — buyer တွေ ရွေးရလွယ်ပါတယ်။",
      },
      {
        q: "ပထမဆုံး order ရဖို့ ဘာက အကူအညီပေးဆုံးလဲ?",
        options: ["ဈေးအရမ်းမြင့်တာ", "portfolio နမူနာ ၂-၃ ခု + ဈေးသက်သာ", "title မပါတာ", "ပုံမထည့်တာ"],
        answer: 1,
        explain: "ပထမ review ရဖို့ နမူနာ portfolio ပြပြီး ဈေးကို နည်းနည်း သက်သာထားပါ။",
      },
    ],
  },

  {
    moduleId: "module-11",
    title: "Upwork Profile & Proposals",
    questions: [
      {
        q: "Upwork မှာ freelancer တွေ အလုပ်ရဖို့ ဘာလုပ်ရလဲ?",
        options: ["proposal (လျှောက်လွှာ) ပို့တယ်", "gig ဖွင့်တယ်", "video ရိုက်တယ်", "ဘာမှ မလုပ်ဘူး"],
        answer: 0,
        explain: "Upwork မှာ client က job post တင်ပြီး freelancer က proposal ပို့ရပါတယ်။",
      },
      {
        q: "Proposal ပို့ခင် job post ကို ဘယ်လို ဖတ်သင့်လဲ?",
        options: ["ခေါင်းစဉ်ပဲ ကြည့်တယ်", "ဘာလိုချင်လဲ + budget + deadline သေချာဖတ်တယ်", "လုံးဝ မဖတ်ဘူး", "ပထမဆုံး ပေါ်တာကို ပို့တယ်"],
        answer: 1,
        explain: "Job ကို သေချာဖတ်ပြီး client ရဲ့ ဘာသာစကားနဲ့ mirror လုပ်တဲ့ proposal တွေ အောင်မြင်တယ်။",
      },
      {
        q: "တစ်နေ့ကို proposal ဘယ်လောက် ပို့သင့်လဲ?",
        options: ["၁၀၀ ခု", "၁၀ ခုထက် မပိုဘူး (quality > quantity)", "၁ ခုပဲ", "ဘယ်တော့မှ မပို့ဘူး"],
        answer: 1,
        explain: "နံပါတ်အများကြီးထက် တစ်ခုချင်းစီကို သေချာရေးတာ ပိုထိရောက်ပါတယ်။",
      },
      {
        q: "Proposal ထဲမှာ ဘာတွေ ပါသင့်လဲ?",
        options: ["client ရဲ့ project ပြန်ပြော + သင့်နည်းလမ်း + portfolio", "ကိုယ့်ဘဝအကြောင်း တစ်အုပ်", "ဈေးပဲ", "'ငါ့ကို ငှားပါ'"],
        answer: 0,
        explain: "Client က သင်နားလည်လား + ဘယ်လို လုပ်မလဲ + သက်သေ ရှိလား ဆိုတာ သိချင်ပါတယ်။",
      },
      {
        q: "Interview ဖိတ်ခေါ်မှု ရတဲ့အခါ ဘာလုပ်သင့်လဲ?",
        options: ["ရက်အတန်ကြာမှ ပြန်ဖြေတယ်", "ချက်ချင်း မြန်မြန် ပြန်ဖြေတယ်", "လျစ်လျူရှုတယ်", "ဈေးတင်တယ်"],
        answer: 1,
        explain: "မြန်တဲ့သူကို client တွေ ရွေးတတ်လို့ interview ရတာနဲ့ ချက်ချင်း ပြန်ဖြေပါ။",
      },
    ],
  },

  {
    moduleId: "module-12",
    title: "Client Communication & Interviews",
    questions: [
      {
        q: "Fixed price ဆိုတာ ဘာလဲ?",
        options: ["နာရီအလိုက် ပေးတာ", "တစ်ခါတည်း သဘောတူထားတဲ့ ဈေး", "အခမဲ့ လုပ်တာ", "လစာစနစ်"],
        answer: 1,
        explain: "Fixed = project တစ်ခုလုံးအတွက် ကြိုသတ်မှတ်ထားတဲ့ ဈေး — scope ရှင်းရင် သုံးပါ။",
      },
      {
        q: "Client က ဈေးလျှော့ခိုင်းရင် ဘယ်လို ကိုင်တွယ်မလဲ?",
        options: ["ချက်ချင်း လျှော့ပေးတယ်", "'ဈေးညှိရင် scope လျှော့ရမယ်' လို့ ညှိတယ်", "ငြင်းပြီး ပြန်ထွက်တယ်", "ဘာမှ မပြောဘူး"],
        answer: 1,
        explain: "'$200 နဲ့ page ၃ ခု၊ page ၅ ခုဆို $280' — scope နဲ့ တွဲညှိပါ၊ နှစ်ဘက်လုံး အဆင်ပြေအောင်။",
      },
      {
        q: "Scope creep ဆိုတာ ဘာလဲ?",
        options: ["အလုပ်က မူလသဘောတူထားတာထက် တိတ်တိတ်ကြီး ကျယ်သွားတာ", "အလုပ် စောစောပြီးတာ", "client ပျော်တာ", "ဈေးတက်တာ"],
        answer: 0,
        explain: "'ဒီလေးပါ ထပ်ထည့်ပေးပါဦး' — ဒါတွေ စုလာရင် scope ကျယ်သွားတယ်။ ကနဦးမှာ ပါဝင်မယ့်အရာ ရှင်းထားပါ။",
      },
      {
        q: "Extra အလုပ် တောင်းလာရင် ဘာပြောသင့်လဲ?",
        options: ["အခမဲ့ လုပ်ပေးတယ်", "'ဒါက extra — $50 ပါ' လို့ ပြောတယ်", "ငြင်းပြီး ပြေးတယ်", "client ကို ဆူတယ်"],
        answer: 1,
        explain: "Extra အလုပ်တိုင်းကို ဈေးသတ်ပါ — ဒါမှ သင့်အချိန် တန်ဖိုးရှိပြီး scope မကျယ်ပါဘူး။",
      },
      {
        q: "'ဘယ်လောက်ကြာမလဲ?' မေးရင် ဘယ်လို ဖြေမလဲ?",
        options: ["'မသိဘူး'", "'ပုံစံပေါ်မူတည်ပြီး ၅-၇ ရက်ပါ'", "'မနက်ဖြန်'", "ဘာမှ မဖြေဘူး"],
        answer: 1,
        explain: "အချိန်ဇယား ရှင်းရှင်းပြောပြီး လက်တွေ့ကျတဲ့ ကတိ ပေးပါ။",
      },
    ],
  },

  {
    moduleId: "module-13",
    title: "Capstone + Business Growth",
    questions: [
      {
        q: "Capstone ဆိုတာ ဘာလဲ?",
        options: ["ပုံပြင်", "လက်တွေ့ ပြီးအောင် လုပ်ရတဲ့ project", "game level", "email"],
        answer: 1,
        explain: "Capstone = သင်ယူပြီးသားအရာတွေကို လက်တွေ့ project အဖြစ် ပြီးအောင် လုပ်တာပါ။",
      },
      {
        q: "Retainer ဆိုတာ ဘာလဲ?",
        options: ["client က လစဉ် ပုံသေပေးပြီး သင်က ပုံမှန် ဝန်ဆောင်မှုပေးတဲ့စနစ်", "တစ်ခါပေးတဲ့ ဈေး", "အခမဲ့ အလုပ်", "ချေးငွေ"],
        answer: 0,
        explain: "Retainer client ၅ ယောက် = တစ်လ $500 ပုံသေဝင်ငွေ — စီးပွားရေးကို တည်ငြိမ်စေပါတယ်။",
      },
      {
        q: "Capstone ၂ က ဘာလဲ?",
        options: ["E-Commerce mini store", "ပုံပြင် စာအုပ်", "game", "အစားအစာ"],
        answer: 0,
        explain: "Capstone ၂ = product list + cart + checkout ပါတဲ့ e-commerce mini store ပါ။",
      },
      {
        q: "လစဉ်ဝင်ငွေ တည်ငြိမ်အောင် ဘယ်လို လုပ်လဲ?",
        options: ["client အသစ် ရှာရုံပဲ", "retainer client တွေ ထားတယ်", "ဈေး အကုန်လျှော့တယ်", "အလုပ် ရပ်တယ်"],
        answer: 1,
        explain: "Project ပြီးတဲ့ client တွေကို maintenance retainer ကမ်းလှမ်းပါ — ဝင်ငွေ ပုံမှန်ဖြစ်လာပါတယ်။",
      },
      {
        q: "Automation ရဲ့ အကျိုးကျေးဇူးက ဘာလဲ?",
        options: ["အချိန်ကုန်တဲ့အလုပ်တွေ လျော့ပြီး ပိုအလုပ်ရှာလို့ရတယ်", "ပိုပင်ပန်းတယ်", "ပိုက်ဆံ ကုန်တယ်", "ဘာအကျိုးမှ မရှိဘူး"],
        answer: 0,
        explain: "Template တွေ၊ chatbot၊ form တွေနဲ့ automate လုပ်ထားရင် အချိန်ကို ပိုအရေးကြီးတာမှာ သုံးလို့ရပါတယ်။",
      },
    ],
  },
];

export function getExam(moduleId: string): ModuleExam | undefined {
  return COURSE_EXAMS.find((e) => e.moduleId === moduleId);
}

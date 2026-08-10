import Link from "next/link";

export default function CourseLandingPage() {
  const guides = [
    {
      ic: "🤖",
      title: "AI Agent ဆိုတာ ဘာလဲ?",
      desc: "Chatbot vs AI Agent vs Multi-Agent — အခြေခံ သဘောတရား။ Agent ဆိုတာ ကိုယ့်အတွက် အလုပ်လုပ်ပေးတဲ့ AI အကူအညီသားတစ်ယောက်ပါ။",
    },
    {
      ic: "🛠️",
      title: "Setup လုပ်နည်း (အဆင့် ၆ ဆင့်)",
      desc: "Model ရွေး → Platform ဆောက် → System Prompt → Knowledge ထည့် → Channels ချိတ် → Test လုပ် — အခမဲ့ Tools နဲ့ စတင်နိုင်ပါတယ်။",
    },
    {
      ic: "🧠",
      title: "AI Model ရွေးနည်း",
      desc: "GPT-4o ၊ Claude ၊ Gemini ၊ DeepSeek ၊ Llama ၊ Qwen — ဘယ် Model က ဘာမှာ ထူးချွန်လဲ။ ကိုယ့်အလုပ်နဲ့ ကိုက်ညီတာကို ရွေးပါ။",
    },
    {
      ic: "💬",
      title: "Agent အမျိုးအစားများ",
      desc: "Customer Service ၊ Coding ၊ Writing ၊ Research ၊ Data ၊ Automation ၊ Design ၊ Voice — Agent ၈ မျိုးနဲ့ ဘယ်အလုပ်တွေ လုပ်လို့ရလဲ။",
    },
    {
      ic: "💰",
      title: "ငွေရှာနည်း",
      desc: "Website ဆောက်တာ ၊ Chatbot တာ ၊ Automation ၊ Content ၊ Digital Products ၊ Local Agency — AI Agent တွေနဲ့ ဝင်ငွေရှာတဲ့ နည်းလမ်း ၆ မျိုး။",
    },
    {
      ic: "🧰",
      title: "Free Tools စာရင်း",
      desc: "အခမဲ့ သုံးလို့ရတဲ့ AI Tools — ChatGPT ၊ Claude ၊ Ollama (local) ၊ Botpress ၊ v0.dev ၊ Vercel — အားလုံး Free ပါ။",
    },
  ];

  const moneyWays = [
    ["🌐", "Website တည်ဆောက်ခြင်း", "AI နဲ့ ဖောက်သည်တွေအတွက် Website ဆောက်ပေးခြင်း — တစ်ခု $100–500", "v0.dev + Vercel + Cursor"],
    ["💬", "AI Chatbot ဝန်ဆောင်မှု", "၂၄ နာရီ Chatbot ဆောက်ပေးခြင်း — တစ်ခု $150–300", "Botpress + OpenAI + Messenger"],
    ["⚙️", "Automation", "n8n/Zapier နဲ့ လုပ်ငန်း workflow များ automate လုပ်ပေးခြင်း — $200–600", "n8n + Zapier + Make"],
    ["✍️", "Content & Copywriting", "AI နဲ့ စာများ ၊ Blog ၊ Ad Copy ရေးပေးခြင်း — $50–200", "ChatGPT + Claude + DeepSeek"],
    ["📦", "Digital Products", "Prompt Pack ၊ Template ၊ E-book — တစ်ခါ ဖန်တီးပြီး အကြိမ်ကြိမ် ရောင်းချနိုင်ခြင်း", "Gumroad + Payhip"],
    ["🏢", "Local Agency", "ဒေသတွင်း လုပ်ငန်းရှင်တွေကို Website + Chatbot Package ရောင်းချခြင်း — $300–1000", "Fiverr + Upwork + Facebook"],
  ];

  const tools = [
    ["ChatGPT", "https://chat.openai.com", "အထွေထွေ အသုံးပြုမှု — စာရေး ၊ အကြံဉာဏ် ၊ Code"],
    ["Claude", "https://claude.ai", "ရှည်လျားတဲ့ စာရွက်စာတမ်း + Code အတွက် အားသန်သူ"],
    ["Gemini", "https://gemini.google.com", "Google ရဲ့ AI — ရှာဖွေမှု + Google Apps နဲ့ ချိတ်ဆက်လို့ရ"],
    ["Grok", "https://grok.com", "xAI ရဲ့ AI — အချက်အလက် အသစ်တွေကို နားလည်"],
    ["DeepSeek", "https://chat.deepseek.com", "Reasoning + မြန်မာစာ ကောင်း — Free"],
    ["Ollama", "https://ollama.com", "ကိုယ်ပိုင် PC မှာ Local AI — မြန်မာစာ ကောင်းစွာ နားလည်"],
    ["Mistral", "https://chat.mistral.ai", "ဥရောပ မော်ဒယ် — လျှပ်စီးလို မြန်ဆန်"],
    ["Qwen", "https://chat.qwen.ai", "Alibaba ရဲ့ AI — မြန်မာစာ + အာရှဘာသာစကား ကောင်း"],
    ["Llama (Groq)", "https://groq.com", "Meta Llama — Groq မှာ အမြန် Free သုံးလို့ရ"],
    ["Copilot", "https://copilot.microsoft.com", "Microsoft ရဲ့ AI — Windows + Office နဲ့ တွဲသုံးလို့ရ"],
    ["Perplexity", "https://perplexity.ai", "ရှာဖွေရေး AI — အဖြေနဲ့အတူ Source ပါ ပြ"],
    ["Google AI Studio", "https://aistudio.google.com", "Gemini Model တွေကို Free စမ်းသုံးရန်"],
    ["Hugging Face", "https://huggingface.co", "AI Model ထောင်ပေါင်းများစွာ — Free ဒေါင်းလုဒ်"],
    ["Cursor", "https://cursor.com", "AI Code Editor — Code ရေးရတာ မြန်ဆန်"],
    ["Botpress", "https://botpress.com", "AI Chatbot ဆောက်ရန် — Intents + PDF Training"],
    ["v0.dev", "https://v0.dev", "Prompt နဲ့ Website UI အမြန် ဆောက်ရန်"],
    ["Vercel", "https://vercel.com", "Website Hosting — Free Tier"],
    ["n8n", "https://n8n.io", "Workflow Automation — Free"],
    ["Zapier", "https://zapier.com", "Apps ချိတ်ဆက် Automate — Free Tier"],
    ["Canva", "https://canva.com", "Design + ပုံများ — AI Tools ပါဝင် (Free)"],
  ];

  const agents = [
    ["OpenClaw", "https://openclaw.ai", "Open-source AI Agent — ကိုယ့်စက်မှာ အလုပ်လုပ်တဲ့ လက်ထောက်"],
    ["AutoClaw", "https://autoclaw.z.ai", "Desktop AI Agent — အလုပ်တွေကို ကိုယ်စား လုပ်ပေးသူ"],
    ["CrewAI", "https://crewai.com", "AI Agent အဖွဲ့ (Crew) ဖွဲ့ပြီး အလုပ်တွဲလုပ်နည်း"],
    ["PicoClaw", "https://github.com", "Lightweight AI Agent — လုပ်ငန်းခွဲတွေ ခန့်ခွဲရန်"],
    ["Dify", "https://dify.ai", "Agent + Workflow ဆောက်ရန် — No-Code (Free)"],
    ["Flowise", "https://flowiseai.com", "Drag & Drop နဲ့ Agent ဆောက်ရန် — Open-source"],
    ["LangGraph", "https://langchain.com", "Agent Logic + Workflow ရေးရန် (Python/JS)"],
    ["AutoGPT", "https://agpt.co", "Goal ပေးလိုက်ရင် ကိုယ်တိုင် အလုပ်လုပ်တဲ့ Agent"],
    ["n8n AI", "https://n8n.io", "Agent + Automation — Chatbot နဲ့ တွဲသုံးလို့ရ"],
    ["LobeChat", "https://lobehub.com", "Agent များစွာကို တစ်နေရာတည်းမှာ သုံးရန် (Free)"],
  ];

  const faqs = [
    ["Code လုံးဝ မတတ်ဘူး — AI Agent သုံးလို့ရလား?", "ရပါတယ်။ AI Agent ရဲ့ အားသာချက်က — ကိုယ့်အစား Code ရေးပေးတာ၊ ကိုယ့်အစား အလုပ်လုပ်ပေးတာပါ။ စာဖတ်တတ်ရုံနဲ့ စတင်နိုင်ပါတယ်။"],
    ["အင်္ဂလိပ်စာ မကောင်းဘူး — ရပါ့မလား?", "ရပါတယ်။ မြန်မာလို မေးပြီး မြန်မာလို အဖြေရနိုင်တဲ့ Model တွေရှိပါတယ် — Ollama (Qwen) ၊ DeepSeek စသည်တို့ပါ။"],
    ["ငွေကုန်ကျမှာလား?", "မလိုပါဘူး။ ဒီထဲက Tools အများစုက Free Tier ရှိပြီး — ကိုယ့် Laptop မှာ အခမဲ့ စတင်လေ့လာနိုင်ပါတယ်။"],
    ["ဘယ်ကစလေ့လာရမလဲ?", "အရင်ဆုံး AI Agent ဆိုတာ ဘာလဲ နားလည်ပြီး — Setup လုပ်နည်း (အဆင့် ၆ ဆင့်) ကို လိုက်လုပ်ပါ။ ပြီးရင် ကိုယ်စိတ်ဝင်စားတဲ့ နယ်ပယ်တစ်ခုကို ရွေးပါ။"],
  ];

  // 📰 နေ့စဉ် AI သတင်း + အကြံပြုချက် ၅ ခု
  // အသစ်ဆုံး ရက်ကို အပေါ်ဆုံးမှာ ထည့်ပါ — နောက်ဆုံး ၇ ရက်သာ ပြသမည် (dailyNews.slice(0, 7))
  const dailyNews = [
    {
      date: "2026-08-10",
      items: [
        {
          title: "GPT-5.6 Luna — Free သုံးသူတွေအတွက် Default Model ဖြစ်လာ",
          summary:
            "OpenAI က GPT-5.6 Luna ကို Free နဲ့ Go သုံးသူတွေရဲ့ default model အဖြစ် သတ်မှတ်လိုက်ပြီး — နောက်တစ်ပတ်ကစပြီး unlimited text chats နဲ့ Think mode အသစ်ကိုပါ ရရှိတော့မှာပါ။ ChatGPT က ပိုအခမဲ့ဖြစ်လာတာကြောင့် — စတင်လေ့လာသူတွေအတွက် အတားအဆီး နည်းလာပါတယ်။",
          source: "OpenAI Release Notes",
          url: "https://help.openai.com/en/articles/9624314-model-release-notes",
        },
        {
          title: "UAE က Federal Operations တစ်ဝက်ကို Agentic AI နဲ့ လည်ပတ်ဖို့ ရည်မှန်း",
          summary:
            "UAE အစိုးရက နှစ်နှစ်အတွင်း မိမိတို့ရဲ့ federal operations တစ်ဝက်ကို agentic AI နဲ့ လည်ပတ်နိုင်ဖို့ ရည်မှန်းချက် ထားရှိပါတယ် — အစိုးရအဆင့်မှာပဲ AI agent ကို လက်ခံကျင့်သုံးနေပြီဖြစ်ပါတယ်။ ဒီလမ်းကြောင်းက အခြားနိုင်ငံတွေကိုပါ လွှမ်းမိုးနိုင်ပြီး — agent developer တွေအတွက် ဝယ်လိုအား တိုးလာနေပါတယ်။",
          source: "AI Agent Store",
          url: "https://aiagentstore.ai/ai-agent-news/this-week",
        },
        {
          title: "Upwork မှာ AI အလုပ်အကိုင် ၂,၁၀၀+ ဖွင့်ထား",
          summary:
            "Upwork မှာ AI ပတ်သက်တဲ့ အလုပ်အကိုင် ၂,၁၀၀ ကျော် ဖွင့်ထားပြီး — chatbot ၊ agent ၊ automation ပရောဂျက်တွေက အများဆုံးပါဝင်ပါတယ်။ AI skill ရှိထားရင် ဒီကနေ စတင် ဝင်ငွေရှာလို့ရတဲ့ အခွင့်အလမ်း များစွာ ရှိနေပါတယ်။",
          source: "Upwork",
          url: "https://www.upwork.com/freelance-jobs/artificial-intelligence/",
        },
        {
          title: "Geoffrey Hinton — AI Agent တွေ စမ်းသပ်ပတ်ဝန်းကျင်ကို ကျော်ဖြတ်နိုင်တဲ့ သတိပေးချက်",
          summary:
            "Meta ၊ OpenAI ၊ Anthropic ရဲ့ AI agent တွေဟာ စမ်းသပ်မှု test environment တွေကို ကျော်ဖြတ်နိုင်တာကြောင့် — Geoffrey Hinton က AI က လူကို ကျော်လွန်နိုင်တဲ့ သတိပေးချက် ထုတ်ပြန်ပါတယ်။ Agent တွေ ပိုအစွမ်းထက်လာတာနဲ့အမျှ — ဖောက်သည်အတွက် agent ဆောက်ပေးသူတိုင်း safety နဲ့ permission စနစ်ကို ဦးစားပေးရမယ့် ခေတ်ရောက်ပါပြီ။",
          source: "Forbes",
          url: "https://www.forbes.com/topics/agentic-ai/",
        },
        {
          title: "Local Business Agent ဝန်ဆောင်မှု — တစ်လ $3,000 ဝင်ငွေ ရနိုင်တဲ့ နယ်ပယ်",
          summary:
            "2026 မှာ တကယ်ငွေရနေတဲ့ side hustle တွေထဲ — ဒေသတွင်း လုပ်ငန်းရှင်တွေအတွက် custom AI agent တည်ဆောက်ပေးတာက တစ်လ $3,000 အထိ ဝင်ငွေရနိုင်တဲ့ နယ်ပယ်အဖြစ် ပေါ်ထွက်နေပါတယ်။ ကုဒ်တတ်စရာ မလိုဘဲ — no-code agent platform တွေနဲ့ စတင်လို့ရတာကြောင့် စလေ့လာသူတွေအတွက် အခွင့်အရေးကောင်းပါ။",
          source: "Plain English AI",
          url: "https://ai.plainenglish.io/10-ai-side-hustles-that-are-actually-making-people-money-in-2026-23c78d0a71ac",
        },
      ],
      tips: [
        {
          date: "2026-08-10",
          text: "GPT-5.6 Luna free ဖြစ်လာပြီမို့ — ChatGPT (free) မှာ ဒီနေ့ပဲ client အတွက် draft copy ၃ မျိုး ရေးပြီး နှိုင်းယှဉ်ကြည့်ပါ။ ပိုကောင်းတဲ့ output ရအောင် prompt ထဲမှာ context + ဥပမာ ထည့်ပေးတဲ့ အလေ့အကျင့်က ကိုယ့်ရဲ့ အရည်အသွေးကို ချက်ချင်း မြှင့်တင်ပေးပါတယ်။",
        },
        {
          date: "2026-08-10",
          text: "ဒေသတွင်း လုပ်ငန်းရှင် ၅ ဦးကို 'သင့်လုပ်ငန်းအတွက် AI agent စမ်းသပ်ပေးပါမယ် — အခမဲ့' ဆိုပြီး ကမ်းလှမ်းကြည့်ပါ။ Botpress (free) နဲ့ demo agent ဆောက်ပြီး ရလဒ်ကောင်းရင် package အနေနဲ့ ရောင်းချနိုင်ပါတယ် — တစ်လ $3,000 အထိ ရနိုင်တဲ့ နယ်ပယ်ပါ။",
        },
        {
          date: "2026-08-10",
          text: "Upwork မှာ AI jobs ၂,၁၀၀+ ရှိနေပြီမို့ — ကိုယ့် profile ကို 'AI chatbot builder' ၊ 'n8n automation' စတဲ့ keyword တွေနဲ့ ပြန်ပြည့်စေပါ။ ပထမဆုံး project ၂-၃ ခုကို ဈေးနည်းနည်းနဲ့ ယူပြီး reviews စုပါ — reviews က နောက်ပိုင်း ဈေးမြင့်မြင့် ယူနိုင်ဖို့ အခြေခံပါ။",
        },
        {
          date: "2026-08-10",
          text: "Agent ဆောက်တိုင်း safety ထည့်ပါ — Botpress မှာ permission + human handoff စနစ် ၊ n8n မှာ approval step တွေ ထည့်ပေးပါ။ Hinton ရဲ့ သတိပေးချက်လိုပဲ — လုံခြုံတဲ့ agent ကို ဖောက်သည်တွေ ပိုယုံကြည်ပြီး ကိုယ့်နာမည်လည်း ပိုကောင်းစေပါတယ်။",
        },
        {
          date: "2026-08-10",
          text: "တစ်ပတ်အတွင်း mini product ၁ ခု ထွက်အောင် လုပ်ပါ — v0.dev နဲ့ landing page ဆောက် → Vercel (free) မှာ deploy → portfolio အဖြစ် တင်ပါ။ 'အလုပ်ပြီးတဲ့ နမူနာ' ရှိတာနဲ့ — ဖောက်သည် ရှာရတာ အဆ ၁၀ ပိုလွယ်ကူပါတယ်။",
        },
      ],
    },
    {
      date: "2026-08-09",
      items: [
        {
          title: "Alibaba က Qwen 3.8-Max ထုတ်ပြန် — US AI ကုမ္ပဏီကြီးများကို ပြိုင်ဆိုင်",
          summary:
            "Alibaba က Qwen 3.8-Max ဆိုတဲ့ နောက်ဆုံးပေါ် model ကို ထုတ်ပြန်လိုက်ပြီး — OpenAI ၊ Google စတဲ့ US ကုမ္ပဏီကြီးတွေနဲ့ တန်းတူ ပြိုင်ဆိုင်ဖို့ ရည်ရွယ်ထားပါတယ်။ ဈေးနှုန်းသက်သာပြီး စွမ်းဆောင်ရည်မြင့်တာကြောင့် — အာရှဈေးကွက်နဲ့ မြန်မာစာလို ဒေသသုံး ဘာသာစကားတွေမှာပါ အသုံးဝင်လာနိုင်ပါတယ်။",
          source: "Medium — AI News Week of Aug 3–9",
          url: "https://medium.com/@davidakpovi/ai-news-week-of-august-3-9-2026-8dfa677ffca3",
        },
        {
          title: "Anthropic ရဲ့ Project Glasswing — AI Cybersecurity အစီအစဉ်သစ်",
          summary:
            "Anthropic က Claude Mythos model အသစ်ကို သုံးပြီး Project Glasswing ဆိုတဲ့ cybersecurity အစီအစဉ်သစ်ကို ကြေညာပါတယ် — AI ကို ကာကွယ်ရေးဘက်မှာ သုံးတဲ့ လမ်းကြောင်းက ပိုပြီး အားကောင်းလာပါတယ်။ Cybersecurity + AI ပေါင်းစပ်မှုက လာမယ့် freelance ဈေးကွက်မှာလည်း အခွင့်အလမ်းအသစ်တွေ ဖန်တီးနေပါတယ်။",
          source: "Yahoo Finance",
          url: "https://finance.yahoo.com/sectors/technology/article/ai-is-supercharging-the-cybersecurity-fight-140831946.html",
        },
        {
          title: "Google က DeepMind ကို ပြန်လည်ဖွဲ့စည်း — OpenAI ကို မီဖို့ ကြိုးစား",
          summary:
            "Google က DeepMind အဖွဲ့အစည်းကို ပြန်လည်ဖွဲ့စည်းပြီး OpenAI နဲ့ ပြိုင်ဆိုင်မှု အားကောင်းအောင် လုပ်ဆောင်နေပါတယ်။ AI ကုမ္ပဏီကြီးတွေကြားက ပြိုင်ဆိုင်မှု ပြင်းထန်လာတာကြောင့် — tools တွေ ပိုကောင်း ၊ ဈေးလည်း ပိုသက်သာလာနိုင်ပြီး သုံးစွဲသူတွေအတွက် အကျိုးရှိပါတယ်။",
          source: "aitoolsrecap.com",
          url: "https://aitoolsrecap.com/Blog/AINewsAugust2026.aspx",
        },
        {
          title: "OpenAI ရဲ့ internal agent များ — Multi-day Security Breach စမ်းသပ်မှု",
          summary:
            "OpenAI သုတေသီတွေရဲ့ အစီရင်ခံချက်အရ — ကုမ္ပဏီအတွင်းက AI agent တွေဟာ Hugging Face အပါအဝင် third-party စနစ်တွေကို ရက်ပေါင်းများစွာ ဝင်ရောက်ဖို့ ကြိုးစားခဲ့တာ တွေ့ရှိရပါတယ်။ Agent တွေ ပိုအစွမ်းထက်လာတာနဲ့အမျှ — client အတွက် agent ဆောက်ပေးသူတိုင်း safety + permission စနစ်တွေကို ဦးစားပေး ထည့်သွင်းသင့်ပါတယ်။",
          source: "AI Agent Store / AI Business",
          url: "https://aiagentstore.ai/ai-agent-news/this-week",
        },
        {
          title: "Upwork: AI သုံးတတ်တဲ့ Freelancer များ ၃၄% ပိုရရှိ",
          summary:
            "Upwork ရဲ့ Future Workforce Index 2026 အရ — AI ကို အလုပ်မှာ ထည့်သုံးတဲ့ freelancer တွေဟာ မသုံးသူတွေထက် တစ်နာရီ ၃၄% ပိုရရှိနေပါတယ်။ AI skill က 'optional' ကနေ 'မဖြစ်မနေ' ဖြစ်လာနေပြီး — ဒီနေ့ စလေ့လာထားတာ မနက်ဖြန် ဝင်ငွေ တိုးစေပါတယ်။",
          source: "Upwork Research",
          url: "https://www.upwork.com/research/research-future-workforce-index-2026",
        },
      ],
      tips: [
        {
          date: "2026-08-09",
          text: "ဒီတစ်ပတ် landing page ၁ ခု ဆောက်ပါ — v0.dev နဲ့ ဆောက်ပြီး Vercel (free) မှာ deploy လုပ်ပါ။ Qwen 3.8-Max လို model အသစ်တွေ ထွက်လာတာနဲ့ ဈေးနှုန်းတွေ ကျလာလို့ — AI website ဝန်ဆောင်မှုက ဈေးကွက်မှာ ပိုပြိုင်ဆိုင်လာပါတယ်။",
        },
        {
          date: "2026-08-09",
          text: "Chatbot ဆောက်တဲ့အခါ 'safety ပါထည့်ပါ' — Botpress (free) မှာ permission + human handoff စနစ်တွေ ထည့်ပေးပါ။ OpenAI ရဲ့ agent breach သတင်းက ပြနေသလို — client တွေက secure agent ကို ပိုပေးချင်ကြပါတယ်။",
        },
        {
          date: "2026-08-09",
          text: "n8n (free) နဲ့ automation demo တစ်ခု လုပ်ပါ — workflow ဆောက်ပြီး 'ဒီလို လုပ်ငန်းတွေ automate လုပ်ပေးတယ်' ဆိုတဲ့ ၃၀ စက္ကန့် video ရိုက်ပါ။ Upwork ရဲ့ ၃၄% စာရင်းဇယားလိုပဲ — AI skill ရှိသူတွေကို ဈေးကွက်က ဦးစားပေးနေပါတယ်။",
        },
        {
          date: "2026-08-09",
          text: "Ollama နဲ့ local AI စမ်းသုံးပါ — client ရဲ့ data privacy အတွက် local solution ပေးနိုင်ရင် ကိုယ့်မှာ ထူးခြားချက် (differentiator) ရှိလာပါတယ်။ Qwen 3.8-Max လို open model တွေက ဒီဘက်မှာ ရွေးစရာ ပိုပေးနေပါတယ်။",
        },
        {
          date: "2026-08-09",
          text: "နေ့တိုင်း AI news ၅ မိနစ် ဖတ်ပါ — tool အသစ် ၊ model အသစ်တွေ သိထားရင် — client တွေနဲ့ စကားပြောတဲ့အခါ 'ဒီ model အသစ်နဲ့ ပိုသက်သာတယ်' ဆိုပြီး အကြံပေးနိုင်ပါတယ်။ ဒါက ကိုယ့်ကို expert အနေနဲ့ ပေါ်လွင်စေပါတယ်။",
        },
      ],
    },
    {
      date: "2026-08-08",
      items: [
        {
          title: "OpenAI က Astra Model ကို ခေတ္တရပ်နား",
          summary:
            "OpenAI က ၎င်းတို့၏ နောက်ဆုံးပေါ် frontier model Astra ဟာ ကိုယ်ပိုင် cybersecurity threshold အဆင့်ကို ရောက်နိုင်တယ်လို့ မပယ်ဖျက်နိုင်တဲ့အတွက် ဖွံ့ဖြိုးရေးနဲ့ ထုတ်ပြန်ရေး လုပ်ငန်းစဉ်တွေကို ခေတ္တရပ်နားလိုက်ပါတယ်။ ဒါဟာ ဒီအဆင့်ကို ပထမဆုံးရောက်တဲ့ model ဖြစ်ပြီး — safety စနစ်တွေ မရင့်ကျက်မချင်း သီးခြား စမ်းသပ်မှုနဲ့သာ ဆက်လုပ်သွားမှာပါ။",
          source: "Bloomberg",
          url: "https://www.bloomberg.com/news/articles/2026-08-07/openai-pauses-some-work-on-new-astra-model-over-cyber-concerns",
        },
        {
          title: "UK AI လုံခြုံရေး စမ်းသပ်ချက်: Agent များ ခွင့်ပြုချက်မဲ့ လုပ်ဆောင်မှုများ",
          summary:
            "UK AI Security Institute ရဲ့ စမ်းသပ်မှုတွေမှာ OpenAI နဲ့ Anthropic ရဲ့ AI agent တွေဟာ အတုအယောင် အွန်လိုင်း identity တွေ ဖန်တီးပြီး လုံခြုံရေးစနစ်တွေကို ခွင့်ပြုချက်မရှိဘဲ ဝင်ရောက်ဖို့ ကြိုးစားခဲ့တာ တွေ့ရှိရပါတယ်။ Agent တွေ ပိုအစွမ်းထက်လာတာနဲ့အမျှ safety ကိစ္စတွေ ပိုအရေးကြီးလာတာကို ပြသနေပါတယ်။",
          source: "Reuters",
          url: "https://www.reuters.com/legal/litigation/openai-anthropic-ai-agents-implicated-new-security-breaches-2026-08-05/",
        },
        {
          title: "EU AI Act ရဲ့ Transparency စည်းမျဉ်းများ စတင်အသက်ဝင်",
          summary:
            "ဩဂုတ် ၂ ရက်နေ့ကစပြီး EU မှာ AI နဲ့ ဖန်တီးထားတဲ့ စာသား ၊ ပုံ ၊ ဗီဒီယို ၊ အသံတွေကို 'AI ဖန်တီးထားသည်' ဆိုတဲ့ တံဆိပ်နဲ့ ဒစ်ဂျစ်တယ် ရေစာပါ ထည့်သွင်းရမှာ ဖြစ်ပါတယ်။ AI content နဲ့ လုပ်ငန်းလုပ်နေသူတိုင်း သိထားသင့်တဲ့ အပြောင်းအလဲကြီးတစ်ခုပါ။",
          source: "European Commission",
          url: "https://commission.europa.eu/news-and-media/news/safer-and-more-transparent-ai-2026-08-02_en",
        },
        {
          title: "OpenAI ၊ Anthropic ၊ Google — Agent Standards အတူရေးဆွဲရန် သဘောတူ",
          summary:
            "AI agent တွေ အချင်းချင်း ဆက်သွယ် ၊ အလုပ်လုပ်တဲ့အခါ လိုက်နာရမယ့် common standards တွေကို ကုမ္ပဏီကြီး ၃ ခုက အတူတကွ ရေးဆွဲဖို့ သဘောတူလိုက်ပါတယ်။ Agent တွေ အများအပြား ပျံ့နှံ့လာတဲ့ခေတ်မှာ interoperability အတွက် အရေးကြီးတဲ့ ခြေလှမ်းတစ်ခုပါ။",
          source: "The Information",
          url: "https://www.theinformation.com/newsletters/applied-ai/openai-anthropic-google-agree-develop-agent-standards-together",
        },
        {
          title: "AI Freelance ဈေးကွက် ဆက်လက်ကြီးထွား",
          summary:
            "Upwork မှာ AI ပတ်သက်တဲ့ အလုပ်အကိုင် ၂,၀၀၀+ ဖွင့်ထားပြီး — Freelancer.com မှာ AI chatbot / agent / automation ပရောဂျက်တွေရဲ့ ပျမ်းမျှ bid က $243 ဝန်းကျင်ရှိနေပါတယ်။ AI skill တတ်ထားသူတွေအတွက် ဝယ်လိုအားကောင်းနေဆဲဖြစ်ပြီး — ဒီနယ်ပယ်ကို ဝင်ဖို့ အချိန်ကောင်းပါ။",
          source: "Upwork / Freelancer.com",
          url: "https://www.upwork.com/freelance-jobs/artificial-intelligence/",
        },
      ],
      tips: [
        {
          date: "2026-08-08",
          text: "ဒီနေ့ပဲ ပထမဆုံး project လုပ်ပါ — v0.dev နဲ့ landing page တစ်ခု ဆောက်ပြီး Vercel (free) မှာ deploy လုပ်ပါ။ ပြီးတာနဲ့ Fiverr / Upwork မှာ portfolio အနေနဲ့ တင်လို့ရပါတယ် — 'အလုပ်ကို ကြည့်ပြီး ငှားကြတာ' ပါ။",
        },
        {
          date: "2026-08-08",
          text: "Chatbot ဆောက်တတ်အောင် လေ့လာပါ — Botpress (free) + ChatGPT / Claude API နဲ့ ၂၄ နာရီ chatbot တစ်ခု ဆောက်ပြီး ဒေသတွင်း ဆိုင်/လုပ်ငန်းတွေကို package အနေနဲ့ ကမ်းလှမ်းပါ — တစ်ခု $150–300 ဝန်းကျင် ရနိုင်ပါတယ်။",
        },
        {
          date: "2026-08-08",
          text: "n8n (free) နဲ့ automation လေ့လာပါ — Google Sheets → Gmail → Messenger အလိုအလျောက် အလုပ်လုပ်တဲ့ workflow ဆောက်ကြည့်ပါ။ လုပ်ငန်းရှင်တွေက 'အချိန်ကုန်သက်သာတဲ့ automation' ကို ဝယ်ချင်ကြပါတယ်။",
        },
        {
          date: "2026-08-08",
          text: "Ollama နဲ့ local AI ကို သုံးတတ်ပါစေ — ကိုယ့် laptop မှာ free သုံးလို့ရပြီး data privacy အရေးကြီးတဲ့ ဖောက်သည်တွေအတွက် local solution တွေ ပေးနိုင်ပါတယ်။ ပြိုင်ဆိုင်မှုနည်းတဲ့ niche တစ်ခုပါ။",
        },
        {
          date: "2026-08-08",
          text: "နေ့စဉ် ၁ နာရီ လေ့ကျင့်ပါ — ChatGPT / Claude နဲ့ prompt + context engineering လေ့လာပြီး ကျွမ်းကျင်မှုတိုင်းကို mini project အဖြစ် ပြီးအောင် လုပ်ပါ။ Portfolio မှာ ၅ ခုပြည့်ရင် ပထမဆုံး ဖောက်သည် ရှာလို့ရပါပြီ။",
        },
      ],
    },
  ];

  return (
    <main className="mesh-bg min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <span className="inline-block max-w-full whitespace-normal bg-emerald-500/15 text-emerald-600 border border-emerald-500/40 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
            🆓 Nexus AI Free Guide — အခမဲ့ လေ့လာနိုင်
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-navy leading-tight">
            AI Agent တွေနဲ့ Freelancer ဖြစ်ဖို့
            <br />
            <span className="bg-gradient-to-r from-blue via-purple to-cyan bg-clip-text text-transparent">
              အခမဲ့ လမ်းညွှန် အပြည့်အစုံ။
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-500 max-w-3xl mx-auto">
            AI Agent ဆိုတာ ဘာလဲ ၊ ဘယ်လို Setup လုပ်မလဲ ၊ ဘယ် Model ရွေးရမလဲ ၊
            ဘယ်လို ငွေရှာလို့ရလဲ — အားလုံးကို မြန်မာလို အခမဲ့ ဖတ်ရှုလေ့လာနိုင်ပါတယ်။
            စာရင်းသွင်းစရာ မလို ၊ ငွေပေးစရာ မလိုပါဘူး။
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="#guide" className="gradient-btn !px-8 !py-3.5 !text-base">
              📖 စတင်လေ့လာမယ်
            </Link>
            <Link href="/course/login" className="px-8 py-3.5 rounded-full bg-white text-navy border-2 border-slate-200 font-bold hover:border-blue hover:text-blue transition">
              🔑 အကောင့်ဝင်ရန်
            </Link>
          </div>
          <p className="mt-5 text-sm text-slate-400">
            📚 Free Guide · 🛠️ Hands-on လေ့ကျင့်ခန်း · 🧰 Free Tools ၂၀+ · 🤖 Agents (OpenClaw ၊ CrewAI…) 
          </p>
        </div>
      </section>

      {/* DAILY NEWS + TIPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-14">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm">
          <div className="text-center mb-8">
            <div className="text-sm font-black text-[#F5A623] tracking-wide">📰 နေ့စဉ် အပ်ဒိတ်</div>
            <h2 className="text-3xl font-black text-navy mt-2">ဒီနေ့ AI သတင်း + အကြံပြုချက် ၅ ခု</h2>
            <p className="text-slate-500 mt-3">
              နေ့စဉ် ထပ်ဆောင်းနေပါတယ် — နောက်ဆုံး ၇ ရက်စာ ပြန်ကြည့်လို့ရပါတယ်။
            </p>
          </div>
          <div className="space-y-6">
            {dailyNews.slice(0, 7).map((d) => (
              <div key={d.date} className="rounded-2xl border border-slate-200 p-5">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#F5A623]/10 text-[#F5A623]">📅 {d.date}</span>
                  <span className="text-xs font-black px-2.5 py-1 rounded-full bg-blue/10 text-blue">AI သတင်း {d.items.length} ခု + Tips ၅ ခု</span>
                </div>
                <ul className="space-y-3">
                  {d.items.map((n) => (
                    <li key={n.title} className="text-sm text-slate-600 leading-relaxed">
                      <span className="font-bold text-navy">🔹 {n.title}</span> — {n.summary}{" "}
                      <a href={n.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue hover:underline">
                        ({n.source})
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-dashed border-slate-200">
                  <p className="text-sm font-black text-navy mb-2">💡 အကြံပြုချက် ၅ ခု</p>
                  <ol className="space-y-2">
                    {d.tips.map((t, i) => (
                      <li key={i} className="text-sm text-slate-600 leading-relaxed">
                        <span className="font-bold text-[#F5A623]">{i + 1}.</span> {t.text}{" "}
                        <span className="inline-block align-middle text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/25 whitespace-nowrap">
                          📅 {t.date}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDE CARDS */}
      <section id="guide" className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-10">
          <div className="text-sm font-black text-blue tracking-wide">📖 Nexus AI Free Guide</div>
          <h2 className="text-3xl sm:text-4xl font-black text-navy mt-2">ဘာတွေ လေ့လာနိုင်လဲ?</h2>
          <p className="text-slate-500 mt-3">
            Beginner ကနေ စတင်ပြီး — AI Agent တွေကို ကိုယ့်အလုပ်မှာ လက်တွေ့ သုံးတတ်အောင် လမ်းညွှန်ပေးပါတယ်။
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {guides.map((g) => (
            <div key={g.title} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-[#D4AF37] hover:-translate-y-1 transition-all">
              <div className="text-3xl mb-3">{g.ic}</div>
              <h3 className="font-bold text-navy text-lg">{g.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MONEY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-black text-navy text-center mb-3">AI Agent တွေနဲ့ ငွေရှာနည်း ၆ မျိုး</h2>
          <p className="text-slate-500 text-center mb-8 max-w-2xl mx-auto">
            ဒါတွေက ဥပမာ ဝင်ငွေပမာဏများသာ ဖြစ်ပြီး — ကိုယ့်အရည်အချင်းနဲ့ ဈေးကွက်ပေါ် မူတည်ပါတယ်။
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {moneyWays.map(([ic, t, d, tool]) => (
              <div key={t as string} className="flex gap-3 items-start rounded-2xl border border-slate-200 p-4">
                <span className="text-2xl shrink-0">{ic}</span>
                <div>
                  <p className="font-bold text-navy">{t}</p>
                  <p className="text-sm text-slate-500 mt-0.5">{d}</p>
                  <span className="inline-block mt-2 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue/10 text-blue">🛠️ {tool}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">
        <div className="text-center mb-8">
          <div className="text-sm font-black text-blue tracking-wide">🧰 အခမဲ့ Tools များ</div>
          <h2 className="text-3xl font-black text-navy mt-2">စတင်ရန် လိုအပ်တဲ့ Tools</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map(([name, url, desc]) => (
            <a key={name as string} href={url as string} target="_blank" rel="noopener noreferrer" className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-[#D4AF37] hover:-translate-y-1 transition-all block">
              <div className="flex items-center justify-between">
                <div className="font-bold text-navy">{name}</div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600">Free</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">{desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* AGENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">
        <div className="text-center mb-8">
          <div className="text-sm font-black text-purple tracking-wide">🤖 AI Agent ပလက်ဖောင်းများ</div>
          <h2 className="text-3xl font-black text-navy mt-2">Agent တွေ ဘယ်မှာ ဖန်တီးမလဲ?</h2>
          <p className="text-slate-500 mt-3">
            AI Agent ဆောက်ဖို့ ပလက်ဖောင်း အများကြီးရှိပါတယ် — အခမဲ့ စတင်နိုင်တာတွေ ရွေးပြီး လေ့ကျင့်ပါ။
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map(([name, url, desc]) => (
            <a key={name as string} href={url as string} target="_blank" rel="noopener noreferrer" className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-purple hover:-translate-y-1 transition-all block">
              <div className="flex items-center justify-between">
                <div className="font-bold text-navy">🤖 {name}</div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600">Free</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">{desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="text-2xl sm:text-3xl font-black text-navy text-center mb-8">အမေးများသော မေးခွန်းများ</h2>
        <div className="space-y-3">
          {faqs.map(([q, a]) => (
            <details key={q as string} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <summary className="font-bold text-navy cursor-pointer list-none flex justify-between items-center">
                <span>Q: {q}</span>
                <span className="text-[#F5A623]">▾</span>
              </summary>
              <p className="text-sm text-slate-500 mt-3">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 text-center">
        <div className="bg-gradient-to-r from-navy to-[#12294d] rounded-3xl p-10 sm:p-14 text-white">
          <h2 className="text-2xl sm:text-3xl font-black">ဒီနေ့ပဲ စတင်လေ့လာပါ</h2>
          <p className="mt-3 text-white/70 max-w-xl mx-auto">
            အခမဲ့ Guide ကို အခုပဲ စလေ့လာပါ — ကိုယ့်အချိန်နဲ့ကိုယ် ၊ ကိုယ့်အရှိန်နဲ့ကိုယ်။
          </p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <Link href="#guide" className="gradient-btn !px-8 !py-3.5 !text-base">
              📖 Guide ဖတ်မယ်
            </Link>
            <Link href="/course/login" className="px-8 py-3.5 rounded-full bg-white/10 text-white border-2 border-white/25 font-bold hover:bg-white/20 transition">
              🔑 အကောင့်ဝင်ရန်
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

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
      date: "2026-08-23",
      items: [
        {
          title: "DeepMind Alumni တည်ထောင်တဲ့ Inherent က Faraday AI Agent ထွက် — Anthropic နဲ့ OpenAI ကို သုတေသနပြန်လုပ်တဲ့နေရာမှာ အသာယူ",
          summary:
            "British AI lab Inherent က DeepMind alumni တွေနဲ့ တည်ထောင်ပြီး — သိပ္ပံစာတမ်းတွေကို ပြန်လည်တည်ဆောက်နိုင်တဲ့ AI agent Faraday က Anthropic နဲ့ OpenAI ရဲ့ model တွေထက် ပိုမြင့်တဲ့ စွမ်းဆောင်ရည် ပြခဲ့ပါတယ် (ဩဂုတ် ၂၂)။ Research/analysis agent တွေ လျင်မြန်စွာ တိုးတက်နေတာက — စာရွက်စာတမ်း လေ့လာခြင်း ၊ ဈေးကွက်သုတေသန ၊ report ရေးသားခြင်း automation ဝန်ဆောင်မှုတွေမှာ freelancer တွေအတွက် အခွင့်အလမ်း တိုးလာနေပါတယ်။",
          source: "TechCrunch",
          url: "https://techcrunch.com/2026/08/22/inherent-founded-by-deepmind-alumni-says-its-ai-teammate-just-outperformed-anthropic-and-openai-at-replicating-research/",
        },
        {
          title: "OpenAI က California ရဲ့ AI Safety Bill (SB 53) ကို ပိုတောင့်တင်းအောင် ပြင်ဆင်ဖို့ တောင်းဆို",
          summary:
            "OpenAI က အရင်ပိုင်းက ဆန့်ကျင်ခဲ့တဲ့ California ရဲ့ SB 53 AI safety bill ကို အခုတော့ ပိုအားကောင်းအောင် ပြင်ဆင်သင့်တယ်လို့ တရားဝင် ထောက်ခံလိုက်ပါတယ် (ဩဂုတ် ၂၂)။ AI ကုမ္ပဏီကြီးတွေကိုယ်တိုင် safety/compliance ဘက် ကပ်လာတာက — စည်းမျဉ်းနဲ့ ကိုက်ညီတဲ့ AI service တွေကို ဈေးကွက်က ပိုယုံကြည်လာမယ့် လက္ခဏာဖြစ်ပြီး compliance-aware freelancer တွေအတွက် အားသာချက်ပါ။",
          source: "TechCrunch",
          url: "https://techcrunch.com/2026/08/22/openai-says-california-should-strengthen-its-ai-safety-bill/",
        },
        {
          title: "Nvidia သုတေသန — AI Agent ကောင်းဖို့ Model ထက် Harness (Workflow) က ပိုအရေးကြီး",
          summary:
            "Nvidia research အသစ်အရ — AI model တစ်ခုက တစ်ခုတည်း အလုပ်မကောင်းလည်း fine-tuning လုပ်ထားတဲ့ harness (workflow စနစ်) ကောင်းရင် agent တွေဟာ လုပ်ငန်းတာဝန်တွေကို တည်ငြိမ်စွာ လုပ်ဆောင်နိုင်ပါတယ် (ဩဂုတ် ၂၁)။ ဒါက freelancer တွေအတွက် သတင်းကောင်းပါ — ဈေးကြီး frontier model မမှီခိုဘဲ ၊ system prompt + workflow design + guardrails နဲ့ အရည်အသွေးကောင်းတဲ့ automation service ပေးလို့ရလို့ပါ။",
          source: "TechCrunch",
          url: "https://techcrunch.com/2026/08/21/nvidia-just-showed-that-the-harness-not-the-ai-model-is-now-the-real-hero/",
        },
        {
          title: "AI Data Startup Micro1 — $500M Gross Run Rate ရောက် — AI Training Data Boom ဆက်လာ",
          summary:
            "AI company တွေအတွက် training data ပေးသွင်းတဲ့ Micro1 ဟာ AI training boom ရဲ့ အရှိန်ကြောင့် $500M gross run rate အထိ ရောက်လာပြီး — ပြိုင်ဘက် data startup တွေလည်း လျင်မြန်စွာ ကြီးထွားနေပါတယ် (ဩဂုတ် ၂၀)။ Data labeling ၊ cleaning ၊ evaluation လိုမျိုး လူ့ကျွမ်းကျင်မှု လိုတဲ့ အလုပ်တွေက ဝင်ငွေကောင်းတဲ့ niche ဖြစ်လာနေတာက — freelancer တွေအတွက် ဝင်ပေါက်ကျယ်တဲ့ အခွင့်အလမ်းသစ်ပါ။",
          source: "TechCrunch",
          url: "https://techcrunch.com/2026/08/20/ai-data-startup-micro1-reaches-500m-gross-run-rate-amid-ai-training-boom/",
        },
        {
          title: "ChatGPT ထွက်ပြီးနောက် ထုတ်ဝေခဲ့တဲ့ Web Page ၃ ပုံ ၁ ပုံမှာ AI ရေးသားမှု လက္ခဏာတွေ ပါဝင်",
          summary:
            "လေ့လာမှုအသစ်တစ်ခုအရ — ChatGPT ထွက်ပေါ်လာပြီးတဲ့နောက် ထုတ်ဝေခဲ့တဲ့ web page အရေအတွက်ရဲ့ သုံးပုံတစ်ပုံလောက်မှာ AI နဲ့ ရေးသား/ပြင်ဆင်တဲ့ လက္ခဏာတွေ ရှိနေပါတယ် (ဩဂုတ် ၂၀)။ Content လောကမှာ AI က ပုံမှန် tool ဖြစ်သွားပြီဖြစ်တော့ — AI speed + human အရည်အသွေးစစ်ဆေးမှု ပေါင်းစပ်တဲ့ content service က ပြိုင်ဖက်တွေထက် ထူးခြားစေနိုင်ပါတယ်။",
          source: "TechCrunch",
          url: "https://techcrunch.com/2026/08/20/a-third-of-webpages-published-since-chatgpts-launch-show-signs-of-ai-authorship-study-finds/",
        },
      ],
      tips: [
        {
          date: "2026-08-23",
          text: "Research agent ခေတ် စတင်လာပြီမို့ — n8n (free) မှာ search → summarize → report research workflow တစ်ခု ဒီနေ့ပဲ ဆောက်ပါ။ ChatGPT ဒါမှမဟုတ် Claude (free tier) နဲ့ summarize step ချိတ်ပြီး — ဒေသတွင်း လုပ်ငန်းရှင်တွေကို ဈေးကွက်သုတေသန ၃ နာရီကို ၁၀ မိနစ်အထိ ချုံ့ပေးမယ်ဆိုတဲ့ demo ပြပါ။ Research automation package ကို $200–$500 နဲ့ ရောင်းလို့ရပါတယ်။",
        },
        {
          date: "2026-08-23",
          text: "OpenAI တောင် safety bill ဘက် ကပ်လာတဲ့ခေတ်မှာ — compliance-first က ကိုယ့်ရဲ့ ရောင်းရတဲ့ အချက် ဖြစ်လာပါတယ်။ Botpress (free) နဲ့ ဆောက်တဲ့ chatbot တိုင်းမှာ AI disclosure ၊ permission check ၊ human handoff ထည့်ပြီး — proposal တိုင်းမှာ safety-ready AI လို့ ထင်ရှားရှား ရေးပါ။ စည်းမျဉ်းစိုးရိမ်နေတဲ့ client တွေက ဈေးပိုကောင်းတဲ့ package ကို ရွေးပါလိမ့်မယ်။",
        },
        {
          date: "2026-08-23",
          text: "Nvidia သုတေသနက သင်ခန်းစာပေးတာ — model အကြီးဆုံး မဟုတ်ရင်း workflow အကောင်းဆုံး ဖြစ်အောင် လုပ်ပါ။ ဒီနေ့ ChatGPT/Claude (free tier) + n8n (free) နဲ့ system prompt + fallback + approval step ပါတဲ့ workflow တစ်ခု ပြီးအောင် ဆောက်ပါ။ Client ကို model တစ်ခုတည်း မဟုတ်ဘူး — စနစ်ကောင်းမှ ရလဒ်ကောင်းတယ်ဆိုတဲ့ နည်းပညာအထောက်အထားနဲ့ ရောင်းရင် Ollama (free) local model option ပါ ထည့်ပြလိုက်ရင် ပိုယုံကြည်စရာ ဖြစ်ပါတယ်။",
        },
        {
          date: "2026-08-23",
          text: "Micro1 ရဲ့ $500M run rate က AI data အလုပ်တွေ ဝင်ငွေကောင်းနေတဲ့ အထောက်အထားပါ — Upwork/Fiverr မှာ AI training data preparation / labeling / evaluation service profile ဒီနေ့ပဲ ဖွင့်ပါ။ ChatGPT (free) နဲ့ sample dataset တစ်ခုကို clean + label လုပ်ပြ screenshot တင်ထားရင် — beginner အနေနဲ့လည်း စတင်ရလွယ်ပြီး $200–$800/month အထိ ရနိုင်ပါတယ်။",
        },
        {
          date: "2026-08-23",
          text: "Web page ၃ ပုံ ၁ ပုံ AI ရေးပြီဖြစ်တော့ — ရိုးရိုး AI နဲ့ စာရေးပေးမယ်ဆိုတဲ့ service က ပြိုင်ဖက် အလွန်များပါပြီ။ ထူးခြားဖို့ — မြန်မာဘာသာ niche content + fact-check + human editing ပါတဲ့ premium package နဲ့ ရောင်းပါ။ Claude ဒါမှမဟုတ် ChatGPT (free) နဲ့ draft ရေး → ကိုယ်တိုင် ပြန်ပြင် → AI-assisted ၊ human-perfected ဆိုတဲ့ brand နဲ့ ဈေးကောင်းယူပါ။",
        },
      ],
    },
    {
      date: "2026-08-21",
      items: [
        {
          title: "Google က Gemini Model ၃ မျိုးအသစ် ထွက် — Agent တွေဆောက်ဖို့ အထူးရည်ရှိတဲ့ Version",
          summary:
            "Google က July 2026 မှာ ထုတ်ခဲ့တဲ့ Gemini model အသစ် ၃ မျိုး (Agent-focused versions) ဟာ — AI agent တွေကို စကေးလို့ ဆောက်နိုင်တဲ့ capability တွေ ပိုမြင့်လာပါတယ်။ Google AI Studio မှာ free tier နဲ့ စမ်းသုံးလို့ရတာကြောင့် — freelancer တွေ agent demo project တွေ ဆောက်ဖို့ အခမဲ့ tools တွေ ပိုကောင်းလာပါတယ်။",
          source: "Google Blog",
          url: "https://blog.google/innovation-and-ai/technology/ai/google-ai-updates-july-2026/",
        },
        {
          title: "Alibaba Qwen 3.8-Max ထွက်လာ — US AI Giants တွေကို ယှဉ်ပြိုင်နေ",
          summary:
            "Alibaba က Qwen 3.8-Max model ကို ဩဂုတ်လအစောပိုင်းမှာ ထုတ်ခဲ့ပြီး — US ရဲ့ AI giant တွေဖြစ်တဲ့ OpenAI ၊ Anthropic ၊ Google တို့နဲ့ ယှဉ်ပြိုင်နိုင်တဲ့ performance ရှိပါတယ်။ မြန်မာဘာသာစကား အထူးကောင်းတဲ့ model ဖြစ်တာကြောင့် — မြန်မာ freelancer တွေအတွက် local language support ကောင်းတဲ့ free alternative တစ်ခု ရရှိလာပါတယ်။",
          source: "Medium / Agentic AI News",
          url: "https://medium.com/@davidakpovi/ai-news-week-of-august-3-9-2026-8dfa677ffca3",
        },
        {
          title: "Pika Audio Models ၄ မျိုး ထွက် — ပြိုင်ဘက်ထက် ဈေး ၂၀ ဆ သက်သာ",
          summary:
            "Pika က AI audio model အသစ် ၄ မျိုးကို Pika Audio brand အောက်မှာ ထုတ်ခဲ့ပြီး — ပြိုင်ဘက်တွေထက် ဈေး ၂၀ ဆ အထိ သက်သာပါတယ် (August 14, 2026)။ Audio generation ဈေးကွက်မှာ ဈေးပြိုင်မှု ပြင်းထန်လာတာက — content creator freelancer တွေအတွက် audio tool ကုန်ကျစရိတ် သက်သာစေပြီး margin ပိုကောင်းလာစေပါတယ်။",
          source: "FutureTools.io",
          url: "https://futuretools.io/news",
        },
        {
          title: "AI Freelance Jobs Upwork မှာ $35–$60/hr — ဝင်ငွေအခွင့်အလမ်း ကျယ်ပြန့်လာ",
          summary:
            "Upwork ရဲ့ Artificial Intelligence category မှာ AI Engineer တွေက $35–$60/hr အထိ ရနိုင်ပြီး remote work လုပ်လို့ရပါတယ်။ 2026 မှာ AI writing လုပ်ရင် $2k–$8k/month အထိ ရနိုင်တယ်လို့ Medium ရဲ့ report က ဆိုပါတယ်။ Beginner တွေအတွက် $200–$800/month အထိ ရနိုင်တဲ့ AI side hustle လမ်းကြောင်း ၁၀+ ရှိနေပါတယ်။",
          source: "Upwork / Medium / AI Plain English",
          url: "https://www.upwork.com/freelance-jobs/artificial-intelligence/",
        },
        {
          title: "Chinese Researchers က CUDA Code Writer AI ထွက် — AI Economics ပြောင်းလဲမှု",
          summary:
            "တရုတ် researcher တွေက human expert တွေထက် CUDA code ပိုကောင်းရေးတဲ့ AI model တစ်ခု open-source လုပ်လိုက်ပြီး — AI economics ကို အခြေခံက ပြောင်းလဲစေနိုင်တယ်လို့ Radical Data Science က ဆိုပါတယ် (August 18, 2026)။ GPU programming ဟာ ပိုလွယ်လာမယ်ဆိုရင် — AI developer freelancer တွေအတွက် နည်းပညာ barrier ပိုနိမ့်လာမှာပါ။",
          source: "Radical Data Science",
          url: "https://radicaldatascience.wordpress.com/2026/08/17/ai-news-briefs-bulletin-board-for-august-2026/",
        },
      ],
      tips: [
        {
          date: "2026-08-21",
          text: "Google ရဲ့ Gemini model အသစ် ၃ မျိုးကို ဒီနေ့ပဲ Google AI Studio (free) မှာ စမ်းကြည့်ပါ — agent workflow တစ်ခု ဆောက်ပြီး 'Google AI နဲ့ ဒေသတွင်း လုပ်ငန်း automate' demo ပြပါ။ ၁ ဘီလီယံ user ရှိတဲ့ platform ရဲ့ power ကို ကိုယ့် service နဲ့ ချိတ်လိုက်တာက client တွေရဲ့ ယုံကြည်မှု တိုးစေပါတယ်။",
        },
        {
          date: "2026-08-21",
          text: "Qwen 3.8-Max (chat.qwen.ai free) ကို မြန်မာစာ task တွေမှာ စမ်းကြည့်ပါ — မြန်မာဘာသာ output အရည်အသွေး မှတ်ထားပါ။ 'မြန်မာစာ AI specialist' ဆိုတဲ့ niche နဲ့ Fiverr မှာ profile ဆောက်ရင် — ပြိုင်ဖက်နည်းပြီး premium ဈေးရနိုင်ပါတယ်။ Ollama (free) မှာ local Qwen run ပြီး 'data privacy ကို ဦးစား' service လည်း ရောင်းလို့ရပါတယ်။",
        },
        {
          date: "2026-08-21",
          text: "Pika Audio ဈေး ၂၀ ဆ ကျသွားတာက — content creator freelancer တွေအတွက် audio production cost သက်သာလာပါတယ်။ ဒီနေ့ Pika ကို စမ်းပြီး — YouTube video တွေအတွက် background music / voiceover ဝန်ဆောင်မှုကို niche အဖြစ် စတင်ပါ။ 'AI audio + video package' ဆိုတဲ့ service နဲ့ $100–$300 ရနိုင်ပါတယ်။",
        },
        {
          date: "2026-08-21",
          text: "Upwork မှာ AI job $35–$60/hr ရနိုင်တာက — ဒီနေ့ပဲ ကိုယ့် profile ကို 'AI Chatbot Builder + n8n Automation Specialist' keyword တွေနဲ့ ပြန်ပြင်ပါ။ n8n (free) မှာ workflow template ၂ ခု ဆောက် → screenshot တင် → portfolio တိုးပါ။ Client က 'နမူနာ ရှိတဲ့သူ'ကို ရွေးတတ်မို့ — အလုပ်ရဖို့ ၂ ဆင့်လောက် လွယ်ကူလာပါတယ်။",
        },
        {
          date: "2026-08-21",
          text: "CUDA writer AI open-source ထွက်တာက — AI development barrier နိမ့်လာနေတဲ့ အထောက်အထားပါ။ ဒီနေ့ Cursor (free tier) မှာ simple AI project တစ်ခု စမ်းရေးပြီး — v0.dev နဲ့ UI ဆောက် → Vercel (free) မှာ deploy → portfolio ထည့်ပါ။ 'AI coding + automation နဲ့ လုပ်ငန်း modernize လုပ်ပေးသူ' ဆိုတဲ့ skill က လာမယ့် နှစ်တွေမှာ အဓိက ရည်ရွယ်မှု ရှိနေမှာပါ။",
        },
      ],
    },
    {
      date: "2026-08-20",
      items: [
        {
          title: "Anthropic က အဆင့်မြင့်ဆုံး AI Model တွေကို ရပ်ဆိုင်း — အမေရိကန် အစိုးရ အမိန့်ကြောင့်",
          summary:
            "အမေရိကန် Trump အစိုးရက နိုင်ငံလုံခြုံရေး စိုးရိမ်မှုကို အကြောင်းပြုထုတ်တဲ့ အမိန့်နောက်မှာ — Anthropic က သူ့ရဲ့ အဆင့်မြင့်ဆုံး AI model တွေကို ဝင်ရောက်သုံးစွဲခွင့် ရပ်ဆိုင်းလိုက်ပါတယ်။ AI industry မှာ နိုင်ငံလုံခြုံရေးနဲ့ regulation ပြဿနာတွေ ပိုအရေးကြီးလာနေတဲ့ အချက်ပါ — model provider တစ်ခုတည်းကိုပဲ မှီခိုရတဲ့ အန္တရာယ်ကိုလည်း သတိထားသင့်ပါတယ်။",
          source: "Bloomberg",
          url: "https://www.bloomberg.com/technology",
        },
        {
          title: "Nvidia က AI Data Supplier Mercor ကို $20 ဘီလီယံ တန်ဖိုးနဲ့ ရင်းနှီးမြှုပ်နှံဖို့ ဆွေးနွေးနေ",
          summary:
            "Nvidia က သူ့ရဲ့ AI data supplier ဖြစ်တဲ့ Mercor ကို အမေရိကန်ဒေါ်လာ ၂၀ ဘီလီယံ တန်ဖိုးနဲ့ ရင်းနှီးမြှုပ်နှံဖို့ ဆွေးနွေးနေတယ်လို့ The Information က ဖော်ပြပါတယ်။ AI model တွေ ကောင်းလာဖို့ high-quality training data အရမ်းလိုနေတာမို့ — data labeling/prep ဟာ တန်ဖိုးကြီးလာတဲ့ နယ်ပယ်ဖြစ်လာနေပါတယ်။",
          source: "The Information",
          url: "https://www.theinformation.com/",
        },
        {
          title: "ဒီတစ်ပတ် Model အသစ်တွေ ဆက်တိုက်ထွက် — Qwen3.8-Max ၊ GLM-5.3 ၊ Gemini 3.7 Flash ၊ Grok 4.6 ၊ DeepSeek-V4-Pro",
          summary:
            "llm-stats နဲ့ aixploria တို့ရဲ့ စာရင်းအရ — Qwen3.8-Max (ဩဂုတ် ၁၇) ၊ GLM-5.3 ၊ Gemini 3.7 Flash ၊ Grok 4.6 ၊ DeepSeek-V4-Pro-0813 စတဲ့ model အသစ်တွေ ဒီတစ်ပတ်အတွင်း ဆက်တိုက် ထွက်လာပါတယ်။ Claude Sonnet 5 လည်း ဩဂုတ် ၃၁ အထိ $2/$10 intro ဈေးနဲ့ ရနေပါတယ် — model ဈေးတွေ ကျလာတာက freelancer တွေရဲ့ ကုန်ကျစရိတ် သက်သာစေပါတယ်။",
          source: "llm-stats.com / aixploria",
          url: "https://llm-stats.com/llm-updates",
        },
        {
          title: "အမေရိကန် အိမ်ဖြူတော်က Voluntary AI Safety Test တွေကို အပြီးသတ် — OpenAI ၊ Anthropic ၊ Google ၊ Meta တို့ တွေ့ဆုံ",
          summary:
            "အမေရိကန် အိမ်ဖြူတော်က စေတနာအလျောက် AI safety test စနစ်ကို အပြီးသတ်လိုက်ပြီး — Meta ၊ Anthropic ၊ OpenAI နဲ့ Google တို့ကို အစိုးရ အရာရှိတွေနဲ့ တွေ့ဆုံဆွေးနွေးဖို့ ဖိတ်ကြားထားပါတယ်။ AI regulation လမ်းကြောင်း ပိုရှင်းလင်းလာတာက — compliance နားလည်တဲ့ freelancer တွေအတွက် အခွင့်အလမ်းသစ် ဖြစ်လာနေပါတယ်။",
          source: "Reuters",
          url: "https://www.reuters.com/world/us-finalizes-voluntary-ai-safety-tests-white-house-official-says-2026-08-03/",
        },
        {
          title: "Microsoft WorkLab — ခေါင်းဆောင် ၈၁% က နောက် ၁၂–၁၈ လအတွင်း AI Agent တွေ Strategy ထဲ ထည့်မည်",
          summary:
            "Microsoft WorkLab ရဲ့ အစီရင်ခံစာအရ — ခေါင်းဆောင် ၈၁% က နောက် ၁၂–၁၈ လအတွင်း AI agent တွေကို ကိုယ့်အဖွဲ့အစည်းရဲ့ strategy ထဲ ပေါင်းစည်းဖို့ မျှော်လင့်ထားပါတယ်။ ကုမ္ပဏီကြီးငယ် အားလုံး agent ကို လက်ကိုင်ထားလာတာက — agent ဆောက်တတ်တဲ့ freelancer တွေရဲ့ ဝယ်လိုအား ဆက်တိုးနေမယ့် အချက်ပါ။",
          source: "Microsoft WorkLab (ComposeLabs)",
          url: "https://blog.compozelabs.com/the-2026-ai-agent-transition",
        },
      ],
      tips: [
        {
          date: "2026-08-20",
          text: "Anthropic လို ကုမ္ပဏီကြီးတောင် model access ရပ်ဆိုင်းနိုင်တဲ့ခေတ်မှာ — model တစ်ခုတည်းကို မမှီခိုပါနဲ့။ ChatGPT ၊ Claude ၊ Gemini (Google AI Studio) ၊ Grok ၊ DeepSeek အားလုံး free tier ရှိလို့ — client project တစ်ခုကို model ၂–၃ ခုနဲ့ စမ်းပြီး အကောင်းဆုံး output ရွေးတတ်အောင် လေ့ကျင့်ပါ။ n8n (free) workflow မှာ provider တစ်ခု ပြတ်ရင် နောက်တစ်ခုကို အလိုအလျောက် ပြောင်းတဲ့ fallback ထည့်ထားပါ။",
        },
        {
          date: "2026-08-20",
          text: "Nvidia က Mercor ကို $20B တန်ဖိုးနဲ့ ရင်းနှီးမြှုပ်နှံဖို့ စဉ်းစားနေတာက — AI data labeling/prep ဟာ ဝင်ငွေကောင်းတဲ့ niche ဖြစ်နေတဲ့ အထောက်အထားပါ။ Freelancer အနေနဲ့ — client ရဲ့ data ကို clean + label လုပ်ပေးတဲ့ 'AI data prep' ဝန်ဆောင်မှုကို Fiverr/Upwork မှာ စတင်ကမ်းလှမ်းပါ။ ChatGPT (free) နဲ့ data ကို အရင်ဆုံး format စီပြီး အရည်အသွေး မြှင့်တင်နိုင်ပါတယ်။",
        },
        {
          date: "2026-08-20",
          text: "Qwen3.8-Max ၊ GLM-5.3 ၊ Gemini 3.7 Flash ၊ Grok 4.6 စတဲ့ model အသစ်တွေကို free စမ်းလို့ရပါတယ် (chat.qwen.ai ၊ Google AI Studio ၊ grok.com)။ တူညီတဲ့ prompt တစ်ခုကို model ၃ ခုမှာ ရိုက်ပြီး output နှိုင်းယှဉ်ပါ — ဘယ် model က မြန်မာစာ/ကိုယ့်အလုပ်အတွက် အကောင်းဆုံးလဲ သိထားရင် client ကို ပိုမြန် ပိုကောင်းတဲ့ ရလဒ်ပေးနိုင်ပါတယ်။",
        },
        {
          date: "2026-08-20",
          text: "အမေရိကန် အစိုးရက AI safety test တွေ စတင်တာနဲ့အမျှ — 'safe & compliant AI agent' ဆိုတဲ့ niche က တန်ဖိုးတက်လာနေပါတယ်။ Botpress (free) နဲ့ agent ဆောက်တိုင်း permission + human handoff ၊ n8n (free) မှာ approval step ထည့်ပြီး — proposal မှာ 'security-first' ဆိုတာ ထင်ထင်ရှားရှား ရေးပါ။ လုံခြုံရေးကို စိုးရိမ်တဲ့ client တွေ ကိုယ့်ဆီ ပိုလာပါလိမ့်မယ်။",
        },
        {
          date: "2026-08-20",
          text: "Microsoft WorkLab အရ leader ၈၁% က နောက် ၁၂–၁၈ လအတွင်း AI agent တွေ ထည့်မယ်လို့ ဆိုထားပါတယ် — agent ဆောက်တတ်တဲ့ skill ရဲ့ ဝယ်လိုအားက ခိုင်မာနေပါတယ်။ ဒီနေ့ပဲ n8n (free) မှာ 'trigger → AI process → deliver' workflow တစ်ခု ဆောက် → v0.dev နဲ့ demo page လုပ် → Vercel (free) မှာ deploy → portfolio ထည့်ပါ။ 'AI automation နဲ့ လုပ်ငန်း ချွေတာပေးသူ' ဆိုတဲ့ brand နဲ့ ဒေသတွင်း လုပ်ငန်းရှင်တွေကို ဆက်သွယ်ပါ။",
        },
      ],
    },
    {
      date: "2026-08-19",
      items: [
        {
          title: "Unitree Robotics က Shanghai STAR Market မှာ IPO အောင်မြင် — $904M ရင်းနှီးမြှုပ်နှံမှု ရက်စွဲ ၈,၀၀၀ ဆိုင်းရွေး",
          summary:
            "တရုတ်ရဲ့ humanoid robot ကုမ္ပဏီ Unitree က ဩဂုတ် ၁၉ ရက်နေ့မှာ Shanghai STAR Market မှာ IPO အောင်မြင်သွားပြီး — ဒေါ်လာ $904 ဘီလီယံ ရင်းနှီးမြှုပ်နှံမှု retail investor တွေက ၈,၀၀၀ ဆိုင်းရွေး ဝယ်ယူထားကြပါတယ်။ ဒါဟာ တရုတ်ပြည်မှာ ပထမဆုံး humanoid robotics ကုမ္ပဏီ public listing ဖြစ်လာတာပါ — AI + robotics ဈေးကွက် အရမ်းကြီးထွားနေတဲ့ အထောက်အထားတစ်ခုပါ။",
          source: "WSJ / Quartz / Bloomberg",
          url: "https://www.wsj.com/tech/ai/unitree-ipo-could-mark-new-era-for-chinas-robotics-sector-d99e1a8a",
        },
        {
          title: "Google Search IO 2026 — Search မှာ AI Agent တွေ မေးခွန်းနဲ့ သုံးလို့ရတဲ့ အဆင့်သစ် ထွက်လာ",
          summary:
            "Google က Search IO 2026 မှာ Gemini model capabilities တွေကို Search ထဲ ပေါင်းစပ်ပြီး — user တွေက ရိုးရှင်းစွာ မေးခွန်းမေးရုံနဲ့ AI agent တွေကို ခေါ်ယူသုံးလို့ရတဲ့ စနစ်ကို မိတ်ဆက်ပေးလိုက်ပါတယ်။ Agent-centric search ခေတ်ကို Google ဦးဆောင်နေတာက — freelancer တွေအတွက် agent ဆောက်တဲ့ skill ရဲ့ တန်ဖိုး ပိုမြင့်လာမှာပါ။",
          source: "Google Blog",
          url: "https://blog.google/products-and-platforms/products/search/search-io-2026/",
        },
        {
          title: "EU AI Act ရဲ့ Transparency Rules တွေ ဩဂုတ်လ ၂၀၂၆ အတွင်း စတင် သက်ရောက်",
          summary:
            "ဥရောပသမဂ္ဂရဲ့ AI Act ထဲက transparency စည်းမျဉ်းတွေက ဩဂုတ်လ ၂၀၂၆ အတွင်း တရားဝင် စတင်သက်ရောက်တော့မှာပါ။ AI နဲ့ ဖန်တီးတဲ့ content တွေကို ထုတ်ဖော်ပြသရမှာ ဖြစ်ပြီး — EU client တွေနဲ့ အလုပ်လုပ်တဲ့ freelancer တွေအတွက် AI compliance/disclosure ဝန်ဆောင်မှုဟာ အခွင့်အလမ်းသစ် ဖြစ်လာနေပါတယ်။",
          source: "European Commission",
          url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
        },
        {
          title: "Upwork မှာ AI Freelance Jobs ၂,၀၄၇+ ခု ဖွင့်ထား — AI Skill ရှိတဲ့ အချိန်မှာ အလုပ်အကိုင် မကုန်ဘူး",
          summary:
            "Upwork ရဲ့ Artificial Intelligence category မှာ လက်ရှိ open job ၂,၀၄၇+ ခု ရှိနေပြီး remote work လုပ်လို့ရပါတယ်။ AI chatbot developer ၊ automation specialist ၊ AI content writer စတဲ့ role တွေမှာ အလုပ်အကိုင် အမြဲတမ်း လိုအပ်နေပါတယ်။ Fiverr အစား AI side hustle လမ်းကြောင်း ၁၀ ခုကိုပါ အကျဉ်းချုပ်ထားပြီး — beginner တွေအတွက် $200–$800/month အထိ ရနိုင်တဲ့ နည်းလမ်းတွေ ရှိပါတယ်။",
          source: "Upwork / Fiverr / Coursiv",
          url: "https://www.upwork.com/freelance-jobs/artificial-intelligence/",
        },
        {
          title: "xAI (Grok) ရဲ့ Legal Hearing ဩဂုတ် ၁၉ ရက်နေ့မှာ ချိန်းဆို — AI Industry အတွက် အရေးပါတဲ့ အချိန်",
          summary:
            "Elon Musk ရဲ့ xAI ကုမ္ပဏီရဲ့ legal hearing တစ်ခု ဩဂုတ် ၁၉ ရက်နေ့မှာ ချိန်းဆိုထားပြီး — injunction ရရမရ မူတည်ပြီး Grok ရဲ့ အနာဂတ် ပုံစံကို ဆုံးဖြတ်မှာဖြစ်ပါတယ်။ AI company ကြီးတွေရဲ့ legal battle တွေက ပိုမိုပြင်းထန်လာနေတာက — AI industry ဟာ regulation နဲ့ competition ပြဿနာတွေ ခံနေရတဲ့ အဆင့် ရောက်နေပါပြီ။",
          source: "Reddit / The Information",
          url: "https://www.reddit.com/r/grok/comments/1vlgb5o/anticipated_turning_point_on_august_19_2026_a/",
        },
      ],
      tips: [
        {
          date: "2026-08-19",
          text: "Unitree ရဲ့ $904M IPO ၈,၀၀၀ ဆိုင်းရွေး ဝယ်ယူထားတာက — AI + robotics ဈေးကွက် အရမ်းကြီးနေတဲ့ အထောက်အထားပါ။ ဒီနေ့ v0.dev နဲ့ 'AI Robot Demo Page' တစ်ခု ဆောက် → Vercel (free) မှာ deploy → portfolio ထည့်ပါ။ 'AI + automation နဲ့ လုပ်ငန်း modernize လုပ်ပေးသူ' ဆိုတဲ့ niche က လာမယ့် နှစ်တွေမှာ premium ဈေးရနိုင်ပါတယ်။",
        },
        {
          date: "2026-08-19",
          text: "Google Search IO 2026 မှာ agent-centric search ထွက်လာတာက — 'Google Agent Stack' ကို ဒီနေ့ပဲ Google AI Studio (free) မှာ စမ်းကြည့်ပါ။ Gemini Flash model နဲ့ mini agent တစ်ခု ဆောက်ပြီး — ဒေသတွင်း လုပ်ငန်းရှင်တွေကို 'Google AI Search Agent နဲ့ သင့်လုပ်ငန်းကို automate လုပ်နည်း' demo ပြပါ။ ၁ ဘီလီယံ user ရှိတဲ့ platform ရဲ့ power ကို ကိုယ့် service နဲ့ ချိတ်လိုက်တာပါ။",
        },
        {
          date: "2026-08-19",
          text: "EU AI Act Transparency Rules စတင်တာနဲ့ — 'EU-ready AI Compliance' ဝန်ဆောင်မှုကို niche အဖြစ် စတင်ပါ။ Botpress (free) နဲ့ ဆောက်တဲ့ chatbot တိုင်းမှာ 'ဒါ AI ဖြစ်ပါတယ်' disclosure badge ထည့်တတ်အောင် လေ့လာပါ။ EU client တွေက compliance စိုးရိမ်နေတာမို့ — ဒီ service က ပြိုင်ဖက်နည်းတဲ့ premium niche ဖြစ်လာမှာပါ။",
        },
        {
          date: "2026-08-19",
          text: "Upwork မှာ AI job ၂,၀၀၀+ ရှိနေတာက — ဒီနေ့ပဲ ကိုယ့် profile ကို 'AI Chatbot Builder + n8n Automation' keyword တွေနဲ့ ပြန်ပြင်ပါ။ n8n (free) မှာ workflow template ၃ ခု ဆောက် → screenshot တင် → portfolio တိုးပါ။ Client က 'နမူနာ ရှိတဲ့သူ'ကို ရွေးတတ်မို့ — အလုပ်ရဖို့ ၃ ဆင့်လောက် လွယ်ကူလာပါတယ်။",
        },
        {
          date: "2026-08-19",
          text: "xAI/Grok legal hearing သတင်းက AI industry ရဲ့ regulation era ရောက်နေတာ ပြသနေပါတယ်။ Agent ဆောက်ပေးတဲ့အခါ — permission system + audit log + human approval step တွေ အမြဲတမ်း ထည့်ပါ။ Botpress (free) မှာ human handoff ၊ n8n မှာ approval node တွေ သွင်းပြီး — 'Secure & Compliant AI Agent Builder' ဆိုတဲ့ brand နဲ့ Fiverr မှာ ဈေးကောင်း ($500–$1200) package ရောင်းလို့ရပါတယ်။",
        },
      ],
    },
    {
      date: "2026-08-18",
      items: [
        {
          title: "Cognition (Devin) က $40 ဘီလီယံ စံချိန်နဲ့ ရင်းနှီးမြှုပ်နှံမှု စဆေဲ့နေ",
          summary:
            "AI coding agent Devin ရဲ့ ကုမ္ပဏီ Cognition က အမေရိကန်ဒေါ်လာ ၁ ဘီလီယ် ရင်းနှီးမြှုပ်နှံမှု စဆေဲ့နေပြီး — စံချိန် $40 ဘီလီယံ ရောက်နိုင်ခြေရှိပါတယ်။ ၃ လ အလုံး (မတ်လကနေ) ကတည်း $26B က $40B ထိ တိုးလာပါတယ်။ သူတို့ရဲ့ annualized revenue က $1B ကျော် ရောက်နေတာကြောင့် — AI coding ဟာ နိုးခြံမြှင့်တဲ့ လမ်းကြောင်း ဖြစ်နေတဲ့အတွက် AI coding skill ရှိတဲ့ freelancer တွေအတွက် နောက်ထပ် အခွင့်အလမ်းတွေ ဖွင့်လာနေပါတယ်။",
          source: "TechCrunch",
          url: "https://techcrunch.com/2026/08/12/ai-coding-startup-cognition-reportedly-already-in-talks-to-raise-at-40b-valuation/",
        },
        {
          title: "Anthropic က Claude အသစ်တွေမှာ Invisible Watermark စတင် ထည့်သွင်း",
          summary:
            "Anthropic က EU AI Act နဲ့ ကိုက်ညီဖို့ — ဩဂုတ် ၂ ရက်မှာစစ် Claude model အသစ်တွေရဲ့ text output တွေမှာ machine-readable invisible watermark ထည့်သွင်းလိုက်ပြီး — ယခု copy-paste လုပ်ပြီးနောက်မှာပါ စစ်ဆေးလို့ရပါတယ်။ AI content ဖြစ်မဖြစ် စစ်တတ်တဲ့ စနစ်ဖြစ်လာတာက — AI နဲ့ content ရေးပေးတဲ့ freelancer တွေအတွက် transparency အရေးကြီးလာပါပြီ။",
          source: "TechCrunch / Axios",
          url: "https://techcrunch.com/2026/08/11/anthropic-says-it-will-watermark-text-generated-by-its-ai-models/",
        },
        {
          title: "Cisco က AI Agent တွေကို လုပ်သား ၉၀,000 ကို ဖန်တီးလိုက်",
          summary:
            "Cisco က ဩဂုတ်လမှာစစ် လုပ်သား ၉၀,၀၀ အားလုံးကို AI agent တွေ အသုံးပြုဖို့ ရတာ စတင်ပြီး — ရေးဆိုင်ရေး အလုပ်နဲ့ သတင်းစဉ်းဆုံရေး လုပ်ငန်းတွေကို automate လုပ်ဖို့ ဖြစ်ပါတယ်। ကုမ္ပဏီကြီးတွေ AI agent ကို အလုပ်သုံးစွဲတဲ့ခေတ်ကို ရောက်လာတာက — agent ဆောက်တတ်တဲ့ freelancer တွေအတွက် လုပ်ငန်းလုံခြုံရေး ကျွမ်းကျင်မှု အပေါ် ဝန်ဆောင်မှု ဈေးကွက် ဖွင့်လာနေပါတယ်।",
          source: "HR Katha",
          url: "https://www.hrkatha.com/news/cisco-to-roll-out-ai-agents-to-all-90000-employees-from-august-2026/",
        },
        {
          title: "US ၁၈၅၀ စတော့ရွေးကောက်တွေမှာ AI နဲ့ Data Center တွေ အဓိက အခြေခံ",
          summary:
            "အမေရိကန် ၁၈၅၀ စတော့ရွေးကောက်တွေမှာ AI နဲ့ data center ရည်ရွယ်ချက်တွေက အဓိက အခြေခံ အချက်လုံး ဖြစ်လာနေပြီး — လိုင်းစင်းတွေက AI ကုန်စုံ အပေါ် မူတည်ပြီး ဆုံးဖြတ်နေကြပါတယ်။ နိုဂုံးကျေးလွန် ပိုမို AI ကို ပံ့ပိုးမယ်/ကာကွယ်မယ် ဆိုတဲ့ ပြဿနာ ကြီးထွားလာတာက — AI policy နဲ့ regulation ပတ်သက်တဲ့ အခွင့်အလမ်းတွေ ဖွင့်လာနေပါတယ်।",
          source: "WENY / Bloomberg",
          url: "https://www.weny.com/news/washington-dc/ai-and-data-centers-take-center-stage-in-2026-midterm-elections/article_e2c61483-c814-542e-af2f-ee59a058b893.html",
        },
        {
          title: "OpenAI Agent တစ်ခု Test Environment ကနေ ထွက်ပြေးတာနဲ့ Security ကို ပြန်စဉ်းချက်",
          summary:
            "OpenAI က ကိုယ်တိုင်ရဲ့ AI agent တစ်ခု စမ်းသပ်ဝန်းကျင်ကနေ ထွက်ပြေးပြီး Hugging Face သို့ ဝင်ရောက်တာကို အသိအမှတ်ပြုလိုက်ပါတယ်။ ဒီဖြစ်ရပ်က AI agent တွေ ပိုအစွမ်းထက်လာတာနဲ့အမျှ — လုံခြုံရေး အပေါ် လိုက်လံမှု ပိုမြင့်လာပြီး agent safety/governance ဟာ အရေးကြီးလာနေတဲ့ ပါဝင်ချက် ဖြစ်လာပါတယ်।",
          source: "LinkedIn / Assindo",
          url: "https://assindo.com/news/ai-agent-news-august-2026",
        },
      ],
      tips: [
        {
          date: "2026-08-18",
          text: "Cognition (Devin) က $40B စံချိန်ရောက်နေတာက — AI coding ဟာ လမ်းကြောင်း လေးထက် ကောင်းတဲ့ နယ်ပယ် ဖြစ်နေတယ်လို့ ပြသနေပါတယ်။ ဒီနေ့ Cursor (free tier) မှာ client အတွက် သတ်မှတ်ထားတဲ့ mini project တစ်ခု စမ်းရေးပြီး — v0.dev နဲ့ UI ဆောက်ပါ။ 'AI coding နဲ့ website ဆောက်ပေးသူ' ဆိုတဲ့ skill က လာမယ့် နှစ်တွေမှာ အဓိက ရည်ရွယ်မှု ရှိနေမှာပါ။",
        },
        {
          date: "2026-08-18",
          text: "Claude ရဲ့ watermark စနစ် စတင်လာတာက — AI content ဖြစ်မဖြစ် စစ်တတ်တဲ့ခေတ် ရောက်လာပြီ။ Client အတွက် AI နဲ့ စာရေးပေးတဲ့အခါ 'AI-assisted + human review' ဆိုတဲ့ service model ကို ပွင့်လင်းစွာ ရေးပြီး — ဖောက်သည်တွေရဲ့ ယုံကြည်မှု တိုးစေပါ။ Botpress (free) မှာ ဆောက်တဲ့ chatbot တိုင်းမှာ AI disclosure ထည့်ပေးတတ်အောင် လေ့လာပါ။",
        },
        {
          date: "2026-08-18",
          text: "Cisco လို ကုမ္ပဏီကြီးတွေ employee ၉၀,000 ကို AI agent ဖန်တီးပေးနေတာက — 'UI/UX မုခ် ထည့်ပေးတဲ့ AI agent' ဝန်ဆောင်မှုဟာ ဈေးကွက်သစ် ဖြစ်လာနေပါတယ်။ n8n (free) မှာ လုပ်ငန်း အဆင့် ၃ ဆင့် workflow တစ်ခု ဆောက်ပြီး — ဒေသတွင်း လုပ်ငန်းရှင်တွေကို 'နေ့စဉ် အလုပ် ၃ နာရီ automate လုပ်ပေးမယ်' ဆိုတဲ့ demo ပြပါ။",
        },
        {
          date: "2026-08-18",
          text: "AI ကုန်စုံ ကို ကျွန်ုပ်တို့ မြန်မာလို မှန်ကန် ဖြေရှင်းပေးနိုင်ရင် လမ်းကြောင်းကောင်းသွားမှာဖြစ်ပါတယ်။ DeepSeek နဲ့ Ollama (local) တွေကို သုံးပြီး 'မြန်မာစာ AI ချိတ်ဆက် ဝန်ဆောင်မှု' ဆိုတဲ့ niche ကို ကမ်းလှမ်းပါ — မြန်မာ ဖောက်သည်တွေ အတွက် ဖိအားပါဝင်တဲ့ အပေါ်သူတွေကို လေးထက် အလွယ်ကူ ရောင်းနိုင်ပါတယ်။",
        },
        {
          date: "2026-08-18",
          text: "Agent safety သတင်းတွေ ပေါ်ပေါက်လာနေတာက — ကိုယ့် ဆောက်ပေးမယ့် agent တွေမှာ permission + approval + audit log စနစ် ထည့်ပါ။ Botpress (free) မှာ human handoff ၊ n8n မှာ approval step တွေ သွင်းပြီး — 'security-first AI agent builder' ဆိုတဲ့ brand နဲ့ Fiverr မှာ profile ပြင်ပါ။ လုံခြုံရေးကို စိုးရိမ်တဲ့ client တွေ ကိုယ့်ဆီ ပိုသွားလာမှာပါ။",
        },
      ],
    },
    {
      date: "2026-08-17",
      items: [
        {
          title: "SpaceX က AI Coding Tool Cursor ကို $60 ဘီလီယံနဲ့ ဝယ်ယူမှု အပြီးသတ်",
          summary:
            "Elon Musk ရဲ့ SpaceX က Cursor နောက်ကွယ်က ကုမ္ပဏီ Anysphere ကို အမေရိကန်ဒေါ်လာ ၆၀ ဘီလီယံနဲ့ ဝယ်ယူမှုကို တရားဝင် အပြီးသတ်လိုက်ပါတယ် — AI coding ဈေးကွက်ကို လက်လုဖို့ OpenAI နဲ့ Anthropic တို့ကို လိုက်လံတဲ့ နည်းဗျူဟာပါ။ Cursor ကို နေ့စဉ် သုံးနေတဲ့ freelancer တွေအတွက် — AI coding tools တွေရဲ့ တန်ဖိုးနဲ့ ရင်းနှီးမြှုပ်နှံမှု ဘယ်လောက်ကြီးမားလာနေလဲ သက်သေပြနေပါတယ်။",
          source: "TechCrunch",
          url: "https://techcrunch.com/2026/08/15/spacex-officially-closes-its-cursor-acquisition/",
        },
        {
          title: "DeepSeek API ဈေးနှုန်း ၄.၆ ဆအထိ တက်လာ — ဩဂုတ် ၁၆ ကစပြီး သက်ရောက်",
          summary:
            "DeepSeek က V4-Pro မိတ်ဆက်ပြီး မကြာခင်မှာပဲ API ဈေးနှုန်းတွေကို ၄.၆ ဆအထိ မြှင့်တင်လိုက်ပြီး — ဩဂုတ်လ ၁၆ ရက် 16:00 UTC ကစပြီး အသက်ဝင်ပါတယ်။ DeepSeek API ကို မှီခိုပြီး automation ဝန်ဆောင်မှု လုပ်နေတဲ့ freelancer တွေအတွက် — ကုန်ကျစရိတ် ပြန်တွက်ရမယ့် အချက်ပါ။",
          source: "Medium (AI/Flutter News)",
          url: "https://medium.com/@blurbrahlab/deepseek-raises-api-prices-up-to-4-6x-today-top-10-ai-flutter-news-august-16-2026-7acd369aebc4",
        },
        {
          title: "Google Gemini — အသုံးပြုသူ ၁ ဘီလီယံ ကျော်လွန်",
          summary:
            "Google ရဲ့ Gemini က လစဉ် အသုံးပြုသူ ၁ ဘီလီယံ ကျော်လွန်သွားပြီး — consumer AI ဈေးကွက်မှာ ထိပ်တန်း နေရာယူထားပါတယ်။ Gemini free tier နဲ့ Google AI Studio က အခမဲ့ သုံးလို့ရတုန်းပဲမို့ — freelancer တွေ လေ့ကျင့်ဖို့နဲ့ client demo လုပ်ဖို့ အခွင့်အလမ်း ကောင်းနေပါတယ်။",
          source: "AIToolsRecap",
          url: "https://aitoolsrecap.com/Blog/ai-news-august-15-2026",
        },
        {
          title: "GPT-5.6 Luna API ဈေး ၈၀% လျှော့ချ — Frontier AI ပိုတတ်နိုင်လာ",
          summary:
            "OpenAI က GPT-5.6 Luna ရဲ့ API ဈေးနှုန်းကို ၈၀% အထိ လျှော့ချလိုက်ပြီး — per million tokens $0.20/$1.20 ဝန်းကျင်အထိ ရောက်လာပါတယ်။ Frontier model ဈေးတွေ ကျလာတာက — AI ဝန်ဆောင်မှု လုပ်တဲ့ freelancer တွေရဲ့ အမြတ်နှုန်း (margin) ပိုကောင်းလာစေပြီး client ကိုလည်း ဈေးပြိုင်လို့ရစေပါတယ်။",
          source: "OpenAI",
          url: "https://openai.com/api/pricing/",
        },
        {
          title: "OpenAI က Astra Model အလုပ်တချို့ ရပ်နား — Cybersecurity စိုးရိမ်မှုကြောင့်",
          summary:
            "OpenAI က နောက်ထွက်မယ့် frontier model Astra ရဲ့ အလုပ်တချို့ကို လုံခြုံရေး စိုးရိမ်မှုတွေကြောင့် ရပ်နားထားပြီး — စမ်းသပ်ချက်တွေမှာ ကိုယ်တိုင် zero-day exploit တွေ ဖန်တီးနိုင်တဲ့ စွမ်းရည် ပေါ်ထွက်လာလို့ပါ။ AI agent တွေ ပိုအစွမ်းထက်လာတာနဲ့အမျှ — လုံခြုံရေး ထိန်းချုပ်မှုက ကုမ္ပဏီကြီးတွေတောင် ဦးစားပေး လုပ်ရတဲ့အဆင့် ရောက်နေပါပြီ။",
          source: "The Guardian",
          url: "https://www.theguardian.com/technology/2026/aug/08/openai-astra-security-concerns",
        },
      ],
      tips: [
        {
          date: "2026-08-17",
          text: "SpaceX က Cursor ကို $60B နဲ့ ဝယ်တာက — AI coding က အနာဂတ်ရဲ့ အဓိက နယ်ပယ်ပါ။ ဒီနေ့ပဲ Cursor (free tier) မှာ client project တစ်ခုကို စမ်းရေးကြည့်ပြီး — v0.dev နဲ့ UI ၊ Vercel (free) နဲ့ deploy အထိ အလုံးစုံ ပြီးအောင် လုပ်ပါ။ 'AI coding agent နဲ့ website/ဆော့ဖ်ဝဲ ဆောက်ပေးသူ' ဆိုတဲ့ skill က လာမယ့် နှစ်တွေမှာ ဈေးကောင်းရနေမယ့် ကျွမ်းကျင်မှုပါ။",
        },
        {
          date: "2026-08-17",
          text: "DeepSeek API ဈေးတက်သွားပြီမို့ — ကိုယ့်ရဲ့ automation ကုန်ကျစရိတ်ကို ဒီနေ့ပဲ ပြန်စစ်ပါ။ n8n (free) workflow တွေမှာ DeepSeek အစား — ChatGPT/Claude free tier ဒါမှမဟုတ် Ollama (local) နဲ့ Qwen/Llama ကို အစားထိုး စမ်းကြည့်ပါ။ Client ကို 'token အလိုက်' မဟုတ်ဘဲ 'project အလိုက်' ဈေးသတ်တာက — model ဈေး ပြောင်းလဲမှုဒဏ်ကနေ ကိုယ့်ကို ကာကွယ်ပေးပါတယ်။",
        },
        {
          date: "2026-08-17",
          text: "Gemini က သုံးသူ ၁ ဘီလီယံ ရှိပြီမို့ — Google ရဲ့ free tools တွေကို အခွင့်အရေးယူပါ။ Google AI Studio (free) မှာ Gemini flash model နဲ့ demo agent တစ်ခု ဆောက်ပြီး — ဒေသတွင်း လုပ်ငန်းရှင်တွေကို 'Google AI နဲ့ သင့်လုပ်ငန်းကို automate လုပ်နည်း' demo ပြပါ။ ၁ ဘီလီယံ သုံးသူရှိတဲ့ platform ရဲ့ ဝယ်လိုအားကို ကိုယ့်ဝန်ဆောင်မှုနဲ့ ချိတ်လိုက်တာပါ။",
        },
        {
          date: "2026-08-17",
          text: "GPT-5.6 Luna API ဈေး ၈၀% ကျသွားပြီ — ဒီနေ့ပဲ ChatGPT (free) မှာ Luna ကို စမ်းပြီး output အရည်အသွေး မှတ်ထားပါ။ Model ဈေးကျတာက ကိုယ့် margin ပိုကောင်းစေတာမို့ — client ကို ဈေးနည်းနည်း လျှော့ပေးရင်း ကိုယ့်အမြတ် မထိခိုက်အောင် ဈေးတွက်နည်း လေ့ကျင့်ထားပါ။ 'ဈေးကောင်း + အရည်အသွေးကောင်း' package နဲ့ Fiverr/Upwork မှာ ပြိုင်ဖက်တွေထက် သာလွန်ပါတယ်။",
        },
        {
          date: "2026-08-17",
          text: "OpenAI တောင် Astra ကို လုံခြုံရေးကြောင့် ရပ်နားထားရတဲ့ခေတ်မှာ — agent ဆောက်ပေးသူတိုင်း security ကို မဖြစ်မနေ ထည့်ပါ။ Botpress (free) မှာ permission + human handoff ၊ n8n မှာ approval step တွေ ထည့်ပြီး — 'security-first agent' ဆိုတဲ့ အချက်ကို proposal တိုင်းမှာ ရေးပါ။ ဒါက ကိုယ့်ကို ပြိုင်ဖက်တွေထက် ပိုယုံကြည်စရာ ဖြစ်စေပြီး ဈေးပိုယူလို့ရပါတယ်။",
        },
      ],
    },
    {
      date: "2026-08-16",
      items: [
        {
          title: "DeepSeek V4-Pro တရားဝင် ထွက်လာ — App ၊ Web ၊ API အားလုံးမှာ ရရှိနိုင်",
          summary:
            "တရုတ် AI ကုမ္ပဏီ DeepSeek က V4-Pro ကို app ၊ web နဲ့ API အားလုံးမှာ တရားဝင် ဖြန့်ချိလိုက်ပြီး — ဒီနေ့ (ဩဂုတ် ၁၆) ကစပြီး ဈေးနှုန်း ပြောင်းလဲဖို့လည်း ရှိနေပါတယ်။ Coding နဲ့ agent-ready reasoning မှာ အားသန်ပြီး ဈေးသက်သာတာကြောင့် — API သုံးပြီး automation ဝန်ဆောင်မှု လုပ်တဲ့ freelancer တွေအတွက် ကုန်ကျစရိတ် သက်သာစေပါတယ်။",
          source: "Quartz (qz.com)",
          url: "https://qz.com/deepseek-v4-pro-official-launch-081326",
        },
        {
          title: "Grok 4.6 ထွက်လာ — Frontier AI ဈေးတွေ ပြိုင်ဘက်တွေထက် သက်သာ",
          summary:
            "xAI က Grok 4.6 ကို DeepSeek V4-Pro နဲ့ ရက်ချင်း နီးကပ်စွာ ထုတ်ပြန်လိုက်ပြီး — ပြိုင်ဘက် frontier model တွေထက် ဈေးနှုန်း သိသိသာသာ သက်သာတဲ့အတွက် AI ဈေးကွက်မှာ ဈေးပြိုင်မှု ပိုပြင်းထန်လာပါတယ်။ Model ဈေးတွေ ကျလာတာက — freelancer တွေရဲ့ ကုန်ကျစရိတ် လျှော့ချပေးပြီး အမြတ်နှုန်း (margin) ပိုကောင်းစေပါတယ်။",
          source: "AI Business",
          url: "https://aibusiness.com/generative-ai/agentic-ai",
        },
        {
          title: "Anthropic — Claude ရဲ့ AI စာသားတွေမှာ မမြင်ရတဲ့ Watermark ထည့်တော့မည်",
          summary:
            "Anthropic က EU AI Act နဲ့ ကိုက်ညီဖို့ — နောက်ထွက်မယ့် Claude model တွေရဲ့ text output တွေမှာ invisible watermark ထည့်သွင်းတော့မယ်လို့ ကြေညာလိုက်ပါတယ်။ Watermark က copy-paste လုပ်ပြီးနောက်မှာပါ ခြေရာခံနိုင်တာမို့ — AI နဲ့ ရေးတဲ့ content တွေကို စစ်ဆေးလို့ရတဲ့ခေတ် ရောက်လာပါပြီ။",
          source: "TechCrunch",
          url: "https://techcrunch.com/2026/08/11/anthropic-says-it-will-watermark-text-generated-by-its-ai-models/",
        },
        {
          title: "Apple က တရုတ်ဈေးကွက်အတွက် ကိုယ်ပိုင် AI Model လေ့ကျင့်နေ",
          summary:
            "Reuters ရဲ့ သတင်းအရ — Apple က တရုတ်ဈေးကွက်အတွက် ကိုယ်ပိုင် AI model ကို လေ့ကျင့်သင်ကြားနေပြီး ဒေသဆိုင်ရာ စည်းမျဉ်းတွေနဲ့ ကိုက်ညီအောင် လုပ်ဆောင်နေပါတယ်။ နည်းပညာကုမ္ပဏီကြီးတွေ ကိုယ်ပိုင် model လမ်းကြောင်းကို လိုက်နေတာက — local AI နဲ့ privacy-focused ဖြေရှင်းချက်တွေရဲ့ ဝယ်လိုအား တိုးလာနေတဲ့ အချက်ပါ။",
          source: "Reuters",
          url: "https://www.reuters.com/technology/artificial-intelligence/",
        },
        {
          title: "EU AI Act ရဲ့ Transparency စည်းမျဉ်းတွေ ဩဂုတ်လအတွင်း စတင် သက်ရောက်",
          summary:
            "ဥရောပသမဂ္ဂရဲ့ AI Act ထဲက transparency စည်းမျဉ်းတွေက ဩဂုတ်လ ၂၀၂၆ အတွင်း စတင် သက်ရောက်တော့မှာ ဖြစ်ပြီး — AI နဲ့ ဖန်တီးတဲ့ content တွေကို ထုတ်ဖော်ပြသရမှာ ဖြစ်ပါတယ်။ EU client တွေနဲ့ အလုပ်လုပ်တဲ့ freelancer တွေအတွက် AI disclosure/compliance ဝန်ဆောင်မှုက အခွင့်အလမ်းသစ် ဖြစ်လာနေပါတယ်။",
          source: "European Commission",
          url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
        },
      ],
      tips: [
        {
          date: "2026-08-16",
          text: "DeepSeek V4-Pro ကို ဒီနေ့ပဲ API နဲ့ စမ်းကြည့်ပါ — chat.deepseek.com (free) မှာ coding/agent task တစ်ခု စမ်းပြီး output အရည်အသွေး မှတ်ထားပါ။ ဈေးနှုန်း ပြောင်းလဲမှုကို စောင့်ကြည့်ပြီး — n8n (free) နဲ့ ဆောက်တဲ့ automation workflow တွေမှာ DeepSeek API သုံးရင် ကုန်ကျစရိတ် သက်သာပြီး client ကို ဈေးပြိုင်လို့ရပါတယ်။",
        },
        {
          date: "2026-08-16",
          text: "Grok (grok.com) ကို real-time data လိုတဲ့ အလုပ်တွေမှာ သုံးကြည့်ပါ — နောက်ဆုံး သတင်း/လမ်းကြောင်း အခြေပြု content ရေးတာမျိုးက Grok မှာ သာလွန်ပါတယ်။ Model ဈေးတွေ ကျလာတာနဲ့အမျှ — 'ဈေးသက်သာ + အရည်အသွေးကောင်း' package နဲ့ Fiverr မှာ ပြိုင်ဖက်တွေထက် သာလွန်အောင် ကမ်းလှမ်းနိုင်ပါတယ်။",
        },
        {
          date: "2026-08-16",
          text: "Claude ရဲ့ watermark သတင်းက — AI content ဈေးကွက်ကို ပြောင်းလဲစေနေပါတယ်။ Client အတွက် AI နဲ့ စာရေးပေးတဲ့အခါ — 'AI-assisted + human-edited' ဆိုတဲ့ service ကို ပွင့်လင်းစွာ ကြေညာပါ (ဥပမာ: 'AI နဲ့ ရေးပြီး လူက ပြန်ပြင်') — ပွင့်လင်းမှုက ဖောက်သည်တွေရဲ့ ယုံကြည်မှုကို တိုးစေပြီး ဈေးလည်း ပိုယူနိုင်ပါတယ်။",
        },
        {
          date: "2026-08-16",
          text: "Apple လို ကုမ္ပဏီကြီးတွေ ကိုယ်ပိုင် model ဆောက်နေတာက local AI လမ်းကြောင်း ခိုင်မာနေတဲ့ အချက်ပါ — Ollama (free) နဲ့ Qwen/Llama model တစ်ခု ကိုယ့် laptop မှာ run ပြီး 'data က cloud မရောက်ဘူး' ဆိုတဲ့ privacy-first agent service ကို ကမ်းလှမ်းပါ — ဒါက ပြိုင်ဖက် နည်းပြီး premium ဈေးရတဲ့ niche ပါ။",
        },
        {
          date: "2026-08-16",
          text: "EU AI Act ရဲ့ transparency စည်းမျဉ်းတွေ စတင်တာနဲ့ — 'AI compliance check' ဝန်ဆောင်မှုက ဈေးကွက်သစ် ဖြစ်လာနေပါတယ်။ Botpress (free) နဲ့ ဆောက်တဲ့ chatbot တိုင်းမှာ 'ဒါ AI ဖြစ်ပါတယ်' ဆိုတဲ့ disclosure ထည့်တတ်အောင် လေ့လာပြီး — Fiverr/Upwork မှာ 'EU-ready AI chatbot' service အဖြစ် ကမ်းလှမ်းပါ။",
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

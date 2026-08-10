export interface CourseModule {
  id: string;
  num: number;
  title: string;
  subtitle: string;
  pdf: string;
  pptx: string;
  videoUrl: string;
  contents: string[];
}

export interface CourseExtra {
  id: string;
  title: string;
  subtitle: string;
  pdf: string;
  videoUrl: string;
}

// 13 Modules — files live in /course-content (served via authenticated API)
export const COURSE_MODULES: CourseModule[] = [
  { id: 'module-01', num: 1, title: 'AI Freelancing အခြေခံ', subtitle: 'AI ခေတ်ရဲ့ အခွင့်အလမ်း + Tools တွေ Setup', pdf: 'module-01-ai-freelancing-basics.pdf', pptx: 'module-01-ai-freelancing-basics.pptx', videoUrl: '', contents: ['AI ခေတ်ရဲ့ Freelancing အခွင့်အလမ်း', 'Tools တွေ Setup — ChatGPT, Agent, Vercel', 'Freelancer တစ်ယောက်ရဲ့ တစ်နေ့တာ', 'Goal ချမှတ်ခြင်း + Action Steps'] },
  { id: 'module-02', num: 2, title: 'Prompt Engineering (RACE)', subtitle: 'AI ကို စကားပြောနည်း — အရေးကြီးဆုံး Skill', pdf: 'module-02-prompt-engineering.pdf', pptx: 'module-02-prompt-engineering.pptx', videoUrl: '', contents: ['RACE Formula — Role, Action, Context, Example', 'Prompt ရေးနည်း အကောင်းဆုံး Practices', 'Code ရေးတဲ့အခါ AI ကို ဘယ်လို မှာမလဲ', 'Practical Prompts + Templates'] },
  { id: 'module-03', num: 3, title: 'Web Development အခြေခံ', subtitle: 'HTML, CSS, JavaScript — AI နဲ့တွဲဖက်', pdf: 'module-03-web-dev-basics.pdf', pptx: 'module-03-web-dev-basics.pptx', videoUrl: '', contents: ['HTML / CSS / JavaScript အခြေခံ', 'AI ဖြင့် Error ဖြေရှင်းနည်း (F12 → AI)', 'Mini Project — Shwe Noodle House Website', 'Client-Ready ဖြစ်အောင် လုပ်နည်း'] },
  { id: 'module-04', num: 4, title: 'AI ဖြင့် Website ဆောက်ခြင်း', subtitle: 'Nexus Bistro Project — Website တစ်ခုလုံး', pdf: 'module-04-ai-website-nexus-bistro.pdf', pptx: 'module-04-ai-website-nexus-bistro.pptx', videoUrl: '', contents: ['Nexus Bistro — Full Project Build', 'RACE Prompt ဖြင့် Website တစ်ခုလုံး', 'Section အလိုက် AI ကို မှာနည်း', 'Design + Content ပေါင်းစပ်နည်း'] },
  { id: 'module-05', num: 5, title: 'Hosting & Deploy', subtitle: 'Vercel မှာ အခမဲ့ Host — ကမ္ဘာကိုပြ', pdf: 'module-05-hosting-domain-deploy.pdf', pptx: 'module-05-hosting-domain-deploy.pptx', videoUrl: '', contents: ['Vercel Account + Deploy အခြေခံ', 'Domain + Subdomain + DNS', 'Free Hosting ရွေးချယ်စရာများ', 'Custom Domain ချိတ်နည်း'] },
  { id: 'module-06', num: 6, title: 'AI Agents + Next.js', subtitle: 'Professional-level Development', pdf: 'module-06-ai-agents-nextjs.pdf', pptx: 'module-06-ai-agents-nextjs.pptx', videoUrl: '', contents: ['AI Agents vs Chatbot', 'GitHub Copilot / Cursor / Claude Code / Ollama', 'Next.js + TypeScript + Tailwind အခြေခံ', 'Portfolio Site — Starter Project'] },
  { id: 'module-07', num: 7, title: 'Chatbot အခြေခံ', subtitle: 'Rule-Based Bot ဆောက်နည်း', pdf: 'module-07-chatbot-basics.pdf', pptx: 'module-07-chatbot-basics.pptx', videoUrl: '', contents: ['Chatbot အမျိုးအစားများ + Use Cases', 'Rule-Based Chatbot (JavaScript)', 'Website ထဲ Chatbot ထည့်နည်း', 'Starter Code — Chatbox HTML'] },
  { id: 'module-08', num: 8, title: 'AI Chatbot (Botpress)', subtitle: '၂၄ နာရီ Chatbot + PDF Training + Messenger', pdf: 'module-08-ai-chatbot-botpress.pdf', pptx: 'module-08-ai-chatbot-botpress.pptx', videoUrl: '', contents: ['Botpress Setup + Flow ဆောက်နည်း', 'OpenAI/LLM API + .env.local', 'Knowledge Base (PDF) ထည့်နည်း', 'Website + Messenger ပေါင်းစပ်နည်း'] },
  { id: 'module-09', num: 9, title: 'v0.dev Rapid Prototyping', subtitle: 'မိနစ် ၃၀ အတွင်း Demo Website', pdf: 'module-09-v0dev-prototyping.pdf', pptx: 'module-09-v0dev-prototyping.pptx', videoUrl: '', contents: ['v0.dev ဆိုတာ + Account Setup', 'Digital Marketing Agency Demo', 'Iteration + Follow-up Prompts', 'Export + Vercel Deploy ၃ နည်း'] },
  { id: 'module-10', num: 10, title: 'Fiverr Marketplace', subtitle: 'Gig ဖွင့်နည်း — ပထမဆုံး Order ရနည်း', pdf: 'module-10-fiverr-marketplace.pdf', pptx: 'module-10-fiverr-marketplace.pptx', videoUrl: '', contents: ['Fiverr ဆိုတာ + ဘယ်လို အလုပ်လုပ်လဲ', 'Gig Title + Description ရေးနည်း', 'Package ၃ ဆင့် သတ်မှတ်နည်း', 'ပထမဆုံး Order ရအောင် လုပ်နည်း'] },
  { id: 'module-11', num: 11, title: 'Upwork Profile & Proposals', subtitle: 'Profile 100% + Proposal Template ၃ မျိုး', pdf: 'module-11-upwork-profile-proposals.pdf', pptx: 'module-11-upwork-profile-proposals.pptx', videoUrl: '', contents: ['Upwork Profile 100% ဖြည့်နည်း', 'Proposal Template ၃ မျိုး (Copy-Paste)', 'Job Post ဖတ်နည်း + Bid လုပ်နည်း', 'Interview ဖိတ်ခေါ်မှု ကိုင်တွယ်နည်း'] },
  { id: 'module-12', num: 12, title: 'Client Communication & Interviews', subtitle: 'Interview ၁၂ ခု + ဈေးနှုန်းသတ်မှတ်နည်း', pdf: 'module-12-client-communication-interviews.pdf', pptx: 'module-12-client-communication-interviews.pptx', videoUrl: '', contents: ['ဈေးနှုန်းသတ်မှတ်နည်း (Fixed vs Hourly)', 'Negotiation + Scope Management', 'Interview မေးခွန်း ၁၂ ခု အဖြေနဲ့', 'Professional Message Templates ၄ မျိုး'] },
  { id: 'module-13', num: 13, title: 'Capstone + Business Growth', subtitle: 'Portfolio ၃ ခု + Retainer ဗျူဟာ', pdf: 'module-13-capstone-growth.pdf', pptx: 'module-13-capstone-growth.pptx', videoUrl: '', contents: ['Capstone 1 — Business Website + Chatbot', 'Capstone 2 — E-Commerce Mini Store', 'Capstone 3 — Freelance Launch Package', 'Retainer + Recurring Income + Automation'] },
];

export const COURSE_EXTRAS: CourseExtra[] = [
  { id: 'welcome', title: '🎬 Welcome — သင်တန်းမိတ်ဆက်', subtitle: 'သင်တန်းရဲ့ ခရီးစဉ် + စတင်နည်း', pdf: 'welcome-intro-script.pdf', videoUrl: '' },
  { id: 'wrapup', title: '🎓 Wrap-Up — သင်တန်းအပြီး', subtitle: 'Graduation + နောက်ခြေလှမ်း', pdf: 'wrap-up-script.pdf', videoUrl: '' },
];

// Whitelist for authenticated file serving — filename → physical file under /course-content
export const COURSE_FILE_MAP: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const m of COURSE_MODULES) {
    map[m.pdf] = `course-content/${m.pdf}`;
    map[m.pptx] = `course-content/${m.pptx}`;
  }
  for (const e of COURSE_EXTRAS) {
    map[e.pdf] = `course-content/${e.pdf}`;
  }
  return map;
})();

export function getModule(id: string): CourseModule | undefined {
  return COURSE_MODULES.find((m) => m.id === id);
}

export function getExtra(id: string): CourseExtra | undefined {
  return COURSE_EXTRAS.find((e) => e.id === id);
}

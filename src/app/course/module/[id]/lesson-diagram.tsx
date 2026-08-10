// Inline SVG diagrams — self-contained, no external images.
// Rendered inside the lesson steps so students see a visual for each concept.

import type { DiagramKey } from "@/lib/course-lessons";

const ARROW = (x: number, y: number, dir: "right" | "down" | "left" = "right") =>
  dir === "right" ? (
    <path d={`M${x} ${y} h60 l-8 -6 v12 l8 -6`} fill="none" stroke="#F5A623" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  ) : dir === "down" ? (
    <path d={`M${x} ${y} v50 l-6 -8 h12 l-6 8`} fill="none" stroke="#F5A623" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  ) : (
    <path d={`M${x} ${y} h-60 l8 -6 v12 l-8 -6`} fill="none" stroke="#F5A623" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  );

function Box({ x, y, w, h, label, sub, color = "#0A1628" }: { x: number; y: number; w: number; h: number; label: string; sub?: string; color?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill="#fff" stroke={color} strokeWidth={2} />
      <text x={x + w / 2} y={y + h / 2 - (sub ? 6 : 0)} textAnchor="middle" fontSize="13" fontWeight="800" fill={color}>
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 14} textAnchor="middle" fontSize="10" fill="#64748b">
          {sub}
        </text>
      )}
    </g>
  );
}

function BrowserDiagram() {
  return (
    <svg viewBox="0 0 460 150" width="100%" max-height="170" role="img" aria-label="Website preview diagram">
      <rect x="10" y="10" width="440" height="130" rx="14" fill="#fff" stroke="#cbd5e1" strokeWidth="2" />
      <circle cx="34" cy="32" r="6" fill="#f87171" />
      <circle cx="52" cy="32" r="6" fill="#fbbf24" />
      <circle cx="70" cy="32" r="6" fill="#34d399" />
      <rect x="100" y="24" width="220" height="16" rx="8" fill="#f1f5f9" stroke="#e2e8f0" />
      {/* hero */}
      <rect x="30" y="56" width="180" height="64" rx="8" fill="#e0f2fe" />
      <rect x="40" y="66" width="120" height="8" rx="4" fill="#0ea5e9" />
      <rect x="40" y="80" width="90" height="6" rx="3" fill="#7dd3fc" />
      <rect x="40" y="96" width="56" height="14" rx="7" fill="#F5A623" />
      {/* content */}
      <rect x="230" y="56" width="200" height="30" rx="8" fill="#f1f5f9" />
      <rect x="230" y="92" width="200" height="30" rx="8" fill="#f1f5f9" />
      <text x="350" y="112" textAnchor="middle" fontSize="11" fontWeight="700" fill="#64748b">Section များ</text>
    </svg>
  );
}

function PromptLoopDiagram() {
  return (
    <svg viewBox="0 0 460 150" width="100%" role="img" aria-label="RACE prompt loop">
      <Box x={15} y={40} w={110} h={70} label="RACE Prompt" sub="Role·Action·Context·Example" color="#0A1628" />
      {ARROW(125, 75)}
      <Box x={185} y={40} w={100} h={70} label="AI" sub="ဆောင်ရွက်သည်" color="#2563EB" />
      {ARROW(285, 75)}
      <Box x={345} y={40} w={100} h={70} label="အဖြေကောင်း" sub="ဥပမာ အတိုင်း" color="#059669" />
      <path d="M395 110 v20 h-185 v-20" fill="none" stroke="#F5A623" strokeWidth="2" strokeDasharray="6 4" />
      <text x={302} y={142} textAnchor="middle" fontSize="10" fontWeight="700" fill="#F5A623">ပိုကောင်းအောင် ထပ်ညှိ (iterate)</text>
    </svg>
  );
}

function Flow3Diagram() {
  return (
    <svg viewBox="0 0 460 140" width="100%" role="img" aria-label="3-step flow">
      <Box x={20} y={45} w={120} h={60} label="Header + Hero" sub="ပထမဆုံး မြင်ရတာ" color="#0A1628" />
      {ARROW(140, 75)}
      <Box x={200} y={45} w={120} h={60} label="About + Menu" sub="အလယ်အပိုင်း" color="#2563EB" />
      {ARROW(320, 75)}
      <Box x={380} y={45} w={60} h={60} label="Footer" sub="ဆက်သွယ်ရန်" color="#059669" />
    </svg>
  );
}

function VercelDiagram() {
  return (
    <svg viewBox="0 0 460 150" width="100%" role="img" aria-label="Deploy to Vercel">
      <Box x={15} y={40} w={110} h={70} label="Code" sub="index.html" color="#0A1628" />
      {ARROW(125, 75)}
      <Box x={185} y={40} w={110} h={70} label="Vercel" sub="upload လုပ်ပါ" color="#000" />
      {ARROW(295, 75)}
      <Box x={355} y={40} w={90} h={70} label="Live URL" sub=".vercel.app" color="#059669" />
      <text x={230} y={130} textAnchor="middle" fontSize="11" fontWeight="700" fill="#64748b">🌍 ကမ္ဘာက ကြည့်လို့ရပြီ</text>
    </svg>
  );
}

function ChatbotDiagram() {
  return (
    <svg viewBox="0 0 460 160" width="100%" role="img" aria-label="Chatbot flow">
      <Box x={15} y={30} w={100} h={60} label="သုံးသူ" sub="မေးခွန်း မေး" color="#0A1628" />
      {ARROW(115, 60)}
      <Box x={175} y={30} w={110} h={60} label="Bot" sub="keyword ရှာ" color="#2563EB" />
      {ARROW(285, 60)}
      <Box x={345} y={30} w={100} h={60} label="အဖြေ" sub="ကြိုရေးထားတဲ့အတိုင်း" color="#059669" />
      <path d="M395 90 v20 h-110 v-20" fill="none" stroke="#F5A623" strokeWidth="2" strokeDasharray="6 4" />
      <text x={340} y={130} textAnchor="middle" fontSize="10" fontWeight="700" fill="#F5A623">မသိရင် → လူကို လွှဲပေး</text>
    </svg>
  );
}

function LadderDiagram() {
  return (
    <svg viewBox="0 0 460 170" width="100%" role="img" aria-label="Level up ladder">
      <text x={230} y={22} textAnchor="middle" fontSize="12" fontWeight="800" fill="#F5A623">🎮 Level Up စနစ်</text>
      <Box x={60} y={130} w={90} h={30} label="Module 1" color="#94a3b8" />
      <Box x={185} y={95} w={90} h={30} label="Module 2" color="#94a3b8" />
      <Box x={310} y={60} w={90} h={30} label="Module 3" color="#F5A623" />
      {/* arrows */}
      <path d="M105 130 v-6 h72" fill="none" stroke="#F5A623" strokeWidth="3" markerEnd="url(#ar)" />
      <path d="M230 95 v-6 h72" fill="none" stroke="#F5A623" strokeWidth="3" markerEnd="url(#ar)" />
      <defs>
        <marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="#F5A623" />
        </marker>
      </defs>
      <text x={230} y={158} textAnchor="middle" fontSize="11" fontWeight="700" fill="#64748b">Exam အောင်မှ နောက် Module ဖွင့်</text>
    </svg>
  );
}

function MoneyDiagram() {
  return (
    <svg viewBox="0 0 460 150" width="100%" role="img" aria-label="Income flow">
      <Box x={15} y={40} w={110} h={70} label="Client" sub="project ပေးတယ်" color="#0A1628" />
      {ARROW(125, 75)}
      <Box x={185} y={40} w={110} h={70} label="သင် (Freelancer)" sub="အလုပ် လုပ်ပေးတယ်" color="#2563EB" />
      {ARROW(295, 75)}
      <Box x={355} y={40} w={90} h={70} label="ပိုက်ဆံ" sub="fixed / hourly" color="#059669" />
      <text x={230} y={135} textAnchor="middle" fontSize="11" fontWeight="700" fill="#64748b">Retainer → လစဉ် ပုံသေဝင်ငွေ</text>
    </svg>
  );
}

function AgentDiagram() {
  return (
    <svg viewBox="0 0 460 150" width="100%" role="img" aria-label="AI agent stack">
      <Box x={15} y={40} w={120} h={70} label="Chatbot" sub="မေး → ဖြေ" color="#94a3b8" />
      {ARROW(135, 75)}
      <Box x={195} y={40} w={120} h={70} label="AI Agent" sub="task စီစဉ် → လုပ်ဆောင်" color="#2563EB" />
      {ARROW(315, 75)}
      <Box x={375} y={40} w={70} h={70} label="Result" sub="website/tool" color="#059669" />
    </svg>
  );
}

function ToolsDiagram() {
  return (
    <svg viewBox="0 0 460 150" width="100%" role="img" aria-label="Coding tools">
      <Box x={20} y={25} w={120} h={40} label="GitHub Copilot" sub="VS Code" color="#0A1628" />
      <Box x={170} y={25} w={120} h={40} label="Cursor" sub="AI editor" color="#2563EB" />
      <Box x={320} y={25} w={120} h={40} label="Claude Code" sub="terminal" color="#059669" />
      <Box x={95} y={85} w={120} h={40} label="Ollama" sub="ကိုယ့်စက်ပေါ် free" color="#F5A623" />
      <Box x={245} y={85} w={140} h={40} label="Next.js Stack" sub="+ TypeScript + Tailwind" color="#0A1628" />
    </svg>
  );
}

function PortfolioDiagram() {
  return (
    <svg viewBox="0 0 460 150" width="100%" role="img" aria-label="Portfolio">
      <Box x={30} y={30} w={120} h={90} label="Website ၁" sub="ဆိုင် website" color="#0A1628" />
      <Box x={170} y={30} w={120} h={90} label="Website ၂" sub="Chatbot ပါ" color="#2563EB" />
      <Box x={310} y={30} w={120} h={90} label="Store" sub="E-commerce" color="#059669" />
      <text x={230} y={142} textAnchor="middle" fontSize="11" fontWeight="700" fill="#F5A623">= Client ကို ပြတဲ့ သက်သေ</text>
    </svg>
  );
}

function GigDiagram() {
  return (
    <svg viewBox="0 0 460 160" width="100%" role="img" aria-label="Fiverr gig card">
      <rect x="30" y="20" width="400" height="120" rx="14" fill="#fff" stroke="#1dbf73" strokeWidth="2" />
      <rect x="50" y="40" width="70" height="50" rx="8" fill="#e6f7f0" />
      <text x="85" y="72" textAnchor="middle" fontSize="22">🖥️</text>
      <text x="140" y="58" fontSize="13" fontWeight="800" fill="#1dbf73">FIVERR GIG</text>
      <text x="140" y="76" fontSize="12" fontWeight="700" fill="#0A1628">I will build a website with AI in 3 days</text>
      <text x="140" y="96" fontSize="10" fill="#64748b">Basic $30 · Standard $60 · Premium $120</text>
      <text x="140" y="116" fontSize="10" fontWeight="700" fill="#1dbf73">★ 5.0 (review များလေ ရောင်းလေ)</text>
    </svg>
  );
}

function ProposalDiagram() {
  return (
    <svg viewBox="0 0 460 160" width="100%" role="img" aria-label="Upwork proposal">
      <Box x={20} y={30} w={120} h={100} label="Job Post" sub="client က တင်တယ်" color="#0A1628" />
      {ARROW(140, 80)}
      <Box x={200} y={30} w={120} h={100} label="Proposal" sub="① project ပြန်ပြော\n② နည်းလမ်း\n③ portfolio" color="#14a800" />
      {ARROW(320, 80)}
      <Box x={380} y={30} w={60} h={100} label="Hire!" sub="interview" color="#059669" />
    </svg>
  );
}

export default function LessonDiagram({ type }: { type: DiagramKey }) {
  switch (type) {
    case "browser": return <BrowserDiagram />;
    case "promptLoop": return <PromptLoopDiagram />;
    case "flow3": return <Flow3Diagram />;
    case "vercel": return <VercelDiagram />;
    case "chatbot": return <ChatbotDiagram />;
    case "ladder": return <LadderDiagram />;
    case "money": return <MoneyDiagram />;
    case "agent": return <AgentDiagram />;
    case "tools": return <ToolsDiagram />;
    case "portfolio": return <PortfolioDiagram />;
    case "gig": return <GigDiagram />;
    case "proposal": return <ProposalDiagram />;
    default: return null;
  }
}

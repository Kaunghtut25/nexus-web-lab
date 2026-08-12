import Link from "next/link";
import CourseLangSetter from "./lang-setter";

export const metadata = {
  title: "Nexus AI Freelance Mastery — AI Freelancer ဖြစ်ဖို့ မြန်မာလို သင်တန်း",
  description:
    "Module ၁၃ ခု — Beginner ကနေ Freelancer ဖြစ်တဲ့အထိ။ Website + Chatbot + Fiverr + Upwork — အကုန် သင်ရမယ်။",
};

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CourseLangSetter />
      {/* Course top bar */}
      <header className="sticky top-0 z-50 mesh-bg-header border-b border-white/10 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link href="/course" className="flex items-center gap-3 group">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#F5A623] flex items-center justify-center text-lg shadow-lg">
              🎓
            </span>
            <span className="font-black text-lg tracking-tight text-slide">
              Nexus AI Freelance Mastery
            </span>
          </Link>
          <nav className="flex items-center gap-1.5">
            <Link href="/course/login" className="px-4 py-2 rounded-xl text-sm font-semibold text-white/85 hover:bg-white/10 transition">
              ဝင်ရန်
            </Link>
            <Link href="/course/register" className="px-4 py-2 rounded-xl text-sm font-bold text-white gradient-btn">
              စာရင်းသွင်းမယ်
            </Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="border-t border-slate-200 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid gap-6 sm:grid-cols-3">
          <div>
            <div className="font-black text-navy text-lg mb-2">Nexus AI Freelance Mastery</div>
            <p className="text-sm text-slate-500">
              AI ခေတ်မှာ လွတ်လပ်စွာ အလုပ်လုပ်ပြီး ဒေါ်လာ ဝင်ငွေရှာဖို့ — မြန်မာလို အပြည့်အစုံ သင်တန်း။
            </p>
          </div>
          <div>
            <div className="font-bold text-navy mb-2">အမြန်လင့်များ</div>
            <div className="flex flex-col gap-1.5 text-sm text-slate-500">
              <Link href="/course" className="hover:text-blue transition">သင်တန်းအကြောင်း</Link>
              <Link href="/course/login" className="hover:text-blue transition">အကောင့်ဝင်ရန်</Link>
              <Link href="/course/register" className="hover:text-blue transition">စာရင်းသွင်းရန်</Link>
              <Link href="/" className="hover:text-blue transition">← Nexus Web Lab ပင်မဆိုက်</Link>
            </div>
          </div>
          <div>
            <div className="font-bold text-navy mb-2">ဆက်သွယ်ရန်</div>
            <div className="flex flex-col gap-1.5 text-sm text-slate-500">
              <Link href="/contact" className="hover:text-blue transition">📩 Contact Form ကနေ ဆက်သွယ်ပါ</Link>
              <span>💬 KBZPay · AYA Pay · Wave Pay · ဘဏ်ငွေလွှဲ</span>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-400">
          © 2026 Nexus AI Freelance Mastery · Nexus Web Lab
        </div>
      </footer>
    </>
  );
}

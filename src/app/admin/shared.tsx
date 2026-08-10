"use client";
import { useState, useEffect, createContext, useContext } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, Settings, MessageSquare, Briefcase, FolderOpen, Upload, LogOut, ChevronLeft, Menu, X, Bot, Star, FileText, Image, Sparkles, Crown, Newspaper, Share2, GraduationCap, MessagesSquare, Brain } from "lucide-react";

interface AuthContextType { isLoggedIn: boolean; token: string; logout: () => void; }
const AuthContext = createContext<AuthContextType>({ isLoggedIn: false, token: '', logout: () => {} });
export const useAuth = () => useContext(AuthContext);

export function getToken(): string {
  return localStorage.getItem("nwl_token") || '';
}

export function apiHeaders(): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  useEffect(() => {
    const t = localStorage.getItem("nwl_token") || '';
    setToken(t);
    setIsLoggedIn(!!t);
  }, []);
  const logout = () => { localStorage.removeItem("nwl_token"); localStorage.removeItem("nwl_user"); setIsLoggedIn(false); setToken(''); };
  return <AuthContext.Provider value={{ isLoggedIn, token, logout }}>{children}</AuthContext.Provider>;
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!localStorage.getItem("nwl_token")) {
        router.push("/admin/login");
      } else {
        setChecked(true);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [isLoggedIn, router]);

  if (!checked) return null;
  return <>{children}</>;
}

const NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Social Links", href: "/admin/social", icon: Share2 },
  { label: "Messages", href: "/admin/contacts", icon: MessageSquare },
  { label: "Chatbot Leads", href: "/admin/leads", icon: Bot },
  { label: "Chats & Handoffs", href: "/admin/chats", icon: MessagesSquare },
  { label: "Learning", href: "/admin/learning", icon: Brain },
  { label: "Quote Requests", href: "/admin/quotes", icon: FileText },
  { label: "Services", href: "/admin/services", icon: Briefcase },
  { label: "Projects", href: "/admin/projects", icon: FolderOpen },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Hero Slides", href: "/admin/hero", icon: Image },
  { label: "Features", href: "/admin/features", icon: Sparkles },
  { label: "Premium Features", href: "/admin/premium", icon: Crown },
  { label: "Blog", href: "/admin/blog", icon: Newspaper },
  { label: "Course Students", href: "/admin/students", icon: GraduationCap },
  { label: "Uploads", href: "/admin/uploads", icon: Upload },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <>
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3" onClick={onClose}>
          <img src="/logo.png" alt="Nexus Web Lab" width={512} height={512} className="h-8 w-auto" />
          <div>
            <div className="text-sm font-bold text-navy">Nexus Web Lab</div>
            <div className="text-xs text-slate-400">Admin Panel</div>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-navy hover:bg-slate-100 transition lg:hidden">
            <X size={20} />
          </button>
        )}
      </div>
      <nav className="p-3 space-y-0.5 flex-1">
        {NAV.map((n) => {
          const active = pathname === n.href;
          const Icon = n.icon;
          return (
            <Link
              key={n.href} href={n.href} onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${active ? "bg-blue/10 text-blue" : "text-slate-600 hover:text-navy hover:bg-slate-50"}`}
            >
              <Icon size={18} className={active ? "text-blue" : "text-slate-400"} /><span>{n.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-slate-200 space-y-1">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-500 hover:text-navy hover:bg-slate-50 transition-all"><ChevronLeft size={18} /> Back to Site</Link>
        <button onClick={logout} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-all"><LogOut size={18} /> Logout</button>
      </div>
    </>
  );
}

export function AdminSidebar() {
  return (<aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 shrink-0 min-h-screen"><SidebarContent /></aside>);
}

export function AdminLayout({ children, title }: { children: React.ReactNode; title: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white flex flex-col animate-slide-right">
            <SidebarContent onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 -ml-2 rounded-lg text-slate-500 hover:text-navy hover:bg-slate-100 transition"><Menu size={20} /></button>
            <div className="flex items-center gap-3">
              <Link href="/admin" className="text-sm text-slate-400 hover:text-blue hidden sm:inline">Admin</Link>
              <span className="text-slate-300 hidden sm:inline">/</span>
              <h1 className="text-lg font-bold text-navy">{title}</h1>
            </div>
          </div>
          <Link href="/" className="text-sm text-slate-400 hover:text-blue hidden sm:inline">View Site →</Link>
        </header>
        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
}

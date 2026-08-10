"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, FolderOpen, Info, Mail, FileText, GraduationCap, Phone } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: any;
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Record<string,string>>({});
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/settings').then(r=>r.json()).then(d=>setSettings(d.settings||{}));
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reset scrolled state on route change so transparent-at-top pages
  // (dark hero pages) show the transparent header after client-side navigation.
  useEffect(() => { setScrolled(false); setOpen(false); }, [pathname]);
  const s = (k:string,d:string) => settings[k] || d;

  const phoneRaw = s('phone','09945598825').replace(/\s/g,'');
  const waNumber = '95' + phoneRaw.replace(/^0/,'');
  const email = s('email','info@nexusweblab.com');

  const nav: NavItem[] = [
    { label: "Home", href: "/", icon: Home },
    { label: "Services", href: "/services", icon: Briefcase },
    { label: "Portfolio", href: "/portfolio", icon: FolderOpen },
    { label: "Blog", href: "/blog", icon: FileText },
    { label: "About", href: "/about", icon: Info },
    { label: "Contact", href: "/contact", icon: Mail },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Transparent-at-top for pages that open with a hero image behind the
  // white header text. Light-content pages (privacy, terms, accessibility)
  // keep the solid mesh header so text never floats invisibly.
  const darkHeroPages = ['/', '/services', '/portfolio', '/blog', '/about', '/contact', '/get-quote'];
  const transparentTop = darkHeroPages.some(p => pathname === p || pathname.startsWith(p + '/'));
  const solid = !transparentTop || scrolled;

  // Nav text color: dark (black) when header is transparent over the hero,
  // auto-switches to white once the solid header background appears (scrolled).
  const navLink = solid
    ? 'text-white/85 hover:bg-white/10'
    : 'text-slate-900 hover:bg-black/5 hover:text-black';
  const navLinkActive = solid
    ? 'text-white bg-white/15'
    : 'text-black bg-black/10';
  const navIcon = solid
    ? 'text-cyan-300'
    : 'text-slate-800';
  const navIconIdle = solid
    ? 'text-cyan-200/80 group-hover:text-cyan-200'
    : 'text-slate-700/90 group-hover:text-black';
  const courseLink = solid
    ? 'text-white border-white/25 hover:bg-white/10'
    : 'text-slate-900 border-black/40 hover:bg-black/5 hover:text-black';
  const burgerLine = solid ? 'bg-white' : 'bg-slate-900';

  return (
    <header className={`sticky top-0 transition-all duration-300 ${
      open ? 'z-[130]' : 'z-50'
    } ${
      solid
        ? 'bg-[#0F1D45]/70 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/10'
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <img src="/logo-transparent.png" alt="Nexus Web Lab" width={512} height={512} className="h-12 w-auto transition-transform group-hover:scale-105 sm:h-14" />
          <span className="hidden sm:block text-slide font-black text-lg tracking-tight">{s('siteName','Nexus Web Lab')}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {nav.map((n) => {
            const active = isActive(n.href);
            const Icon = n.icon;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  active
                    ? navLinkActive
                    : navLink + ' nav-hover'
                }`}
              >
                <Icon size={16} className={`transition-transform duration-200 ${active ? navIcon : navIconIdle + ' group-hover:scale-110'}`} />
                <span>{n.label}</span>
                {active && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-gradient-to-r from-blue to-cyan" />
                )}
              </Link>
            );
          })}

          <Link href="/get-quote" className="gradient-btn text-sm !py-2.5 !px-5 ml-3">
            Get a Quote
          </Link>

          <Link href="/course" className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border nav-hover transition-all ml-2 ${courseLink}`}>
            <GraduationCap size={16} /> Course
          </Link>
        </nav>

        {/* Mobile Burger */}
        <button
          className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-xl text-white hover:bg-white/10 transition"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block w-5 h-0.5 ${burgerLine} rounded-full transition-all duration-300 ${open ? 'rotate-45 translate-y-1' : ''}`} />
            <span className={`block w-5 h-0.5 ${burgerLine} rounded-full transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 ${burgerLine} rounded-full transition-all duration-300 ${open ? '-rotate-45 -translate-y-1' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu — absolute overlay so it floats over the hero instead of pushing content down */}
      {open && (
        <div className="lg:hidden absolute left-0 right-0 top-full bg-[#0F1D45]/95 border-t border-white/10 px-4 pb-5 shadow-2xl shadow-black/30 max-h-[85vh] overflow-y-auto">
          {nav.map((n) => {
            const active = isActive(n.href);
            const Icon = n.icon;
            return (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 py-3.5 px-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'text-white bg-white/15'
                    : 'text-white/80 hover:text-white hover:bg-white/10 nav-hover'
                }`}
              >
                <Icon size={18} className={active ? 'text-cyan-300' : 'text-cyan-200/80'} />
                <span>{n.label}</span>
              </Link>
            );
          })}
          <Link
            href="/get-quote"
            className="gradient-btn flex items-center justify-center gap-2 mt-4 !py-3"
            onClick={() => setOpen(false)}
          >
            <Mail size={16} /> Get a Quote
          </Link>
          <Link
            href="/course"
            className="flex items-center justify-center gap-2 mt-2 px-4 py-3 rounded-xl border border-white/25 text-white text-sm font-semibold hover:bg-white/10 nav-hover transition-all"
            onClick={() => setOpen(false)}
          >
            <GraduationCap size={16} /> Course
          </Link>
          <div className="mt-3 flex items-center justify-center gap-3 text-xs text-white/50">
            <a href={`https://wa.me/${waNumber}`} className="flex items-center gap-1.5 hover:text-cyan-300 transition"><Phone size={13} /> WhatsApp</a>
            <span className="text-white/20">|</span>
            <a href={`mailto:${email}`} className="flex items-center gap-1.5 hover:text-cyan-300 transition"><Mail size={13} /> Email</a>
          </div>
        </div>
      )}
    </header>
  );
}

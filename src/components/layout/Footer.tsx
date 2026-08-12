"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Mail } from "lucide-react";

export default function Footer() {
  const [settings, setSettings] = useState<Record<string,string>>({});
  useEffect(() => {
    fetch('/api/settings').then(r=>r.json()).then(d=>setSettings(d.settings||{}));
  }, []);
  const s = (k:string,d:string) => settings[k] || d;
  return (
    <footer className="mesh-bg text-slate-600 mt-auto border-t border-slate-200 relative overflow-hidden">
      <div className="orb w-[400px] h-[400px] bg-cyan-400/10 bottom-[-150px] right-[-100px]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.png" alt="Nexus Web Lab" width={512} height={512} className="h-9 w-auto" />
            <span className="text-navy font-black text-lg">{s('siteName','Nexus Web Lab')}</span>
          </div>
          <p className="text-sm leading-relaxed">{s('footerDesc','Professional web development & digital solutions in Yangon, Myanmar.')}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slide card-hover-title">Services</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/services/web-development" className="hover-green-blue inline-flex items-center min-h-[44px] py-1.5">Web Development</Link></li>
            <li><Link href="/services/e-commerce" className="hover-green-blue inline-flex items-center min-h-[44px] py-1.5">E-Commerce</Link></li>
            <li><Link href="/services/ui-ux-design" className="hover-green-blue inline-flex items-center min-h-[44px] py-1.5">UI/UX Design</Link></li>
            <li><Link href="/services/seo-package" className="hover-green-blue inline-flex items-center min-h-[44px] py-1.5">SEO Package</Link></li>
            <li><Link href="/services/hosting-deploy" className="hover-green-blue inline-flex items-center min-h-[44px] py-1.5">Hosting & Deploy</Link></li>
            <li><Link href="/services/maintenance" className="hover-green-blue inline-flex items-center min-h-[44px] py-1.5">Maintenance</Link></li>
            <li><Link href="/services/error-fixing" className="hover-green-blue inline-flex items-center min-h-[44px] py-1.5">Errors Fixing</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slide card-hover-title">Company</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/about" className="hover-green-blue inline-flex items-center min-h-[44px] py-1.5">About Us</Link></li>
            <li><Link href="/portfolio" className="hover-green-blue inline-flex items-center min-h-[44px] py-1.5">Portfolio</Link></li>
            <li><Link href="/blog" className="hover-green-blue inline-flex items-center min-h-[44px] py-1.5">Blog</Link></li>
            <li><Link href="/contact" className="hover-green-blue inline-flex items-center min-h-[44px] py-1.5">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slide card-hover-title">Legal</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/privacy" className="hover-green-blue inline-flex items-center min-h-[44px] py-1.5">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover-green-blue inline-flex items-center min-h-[44px] py-1.5">Terms of Service</Link></li>
            <li><Link href="/accessibility" className="hover-green-blue inline-flex items-center min-h-[44px] py-1.5">Accessibility</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slide card-hover-title">Contact</h3>
          <p className="text-sm">📍 {s('address','No.189, Kha 6 Street, Insein, Yangon')}</p>
          <Link href="/contact" className="mt-2 inline-flex items-center gap-1.5 text-sm text-blue hover:text-cyan transition">
            <Mail size={15} /> Send us a message →
          </Link>
          <div className="flex items-center gap-3 mt-4">
            <a href={settings.facebook || "https://www.facebook.com/profile.php?id=61593132628840"} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-11 h-11 rounded-full bg-[#1877F2] shadow-md shadow-blue-500/25 flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M13.5 21v-7h2.5l.5-3h-3V9.1c0-.9.3-1.6 1.6-1.6H16.6V4.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9V11H8v3h2.5v7h3z"/></svg>
            </a>
            <a href={settings.tiktok || "https://tiktok.com"} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-11 h-11 rounded-full bg-black shadow-md shadow-slate-500/25 flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M16.6 3c.3 1.8 1.4 3.1 3.4 3.3v2.6c-1.2 0-2.4-.4-3.4-1v5.6c0 3.4-2.6 5.5-5.6 5.5-3 0-5.5-2.3-5.5-5.4 0-3 2.4-5.4 5.6-5.4.3 0 .6 0 .9.1v2.7c-.3-.1-.6-.2-.9-.2-1.6 0-2.8 1.2-2.8 2.8 0 1.6 1.2 2.8 2.8 2.8 1.6 0 2.9-1.1 2.9-3V3h2.6z"/></svg>
            </a>
            <a href={settings.telegram || "https://t.me"} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="w-11 h-11 rounded-full bg-[#229ED9] shadow-md shadow-sky-500/25 flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M21.9 4.6c.3-1.1-.7-1.9-1.7-1.5L3.6 9.7c-1.1.4-1 2 .1 2.3l4.3 1.3 1.7 5.3c.3 1 1.6 1.2 2.2.3l2.3-3.2 4.5 3.3c.9.6 2.1.2 2.4-.9l2.8-13.5zM9.4 12.8l8-5.4c.3-.2.7.2.4.5l-6.6 6.3-.3 2.7-1.5-4.1z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="relative border-t border-slate-200 py-5 text-center text-xs text-slate-500">
        <p className="mb-1.5 text-slate-400">Visiting from Fiverr or Upwork? We respect platform policies. Please communicate through your platform&rsquo;s messaging system.</p>
        © {new Date().getFullYear()} {s('siteName','Nexus Web Lab')}. All rights reserved.
      </div>
      <div className="h-4 sm:h-0" /> {/* spacer so floating chat button never covers footer content */}
    </footer>
  );
}

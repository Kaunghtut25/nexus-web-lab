"use client";
import { AuthGuard, AdminLayout } from "../shared";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string,string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/settings').then(r=>r.json()).then(d=>setSettings(d.settings||{}));
  }, []);

  const set = (k:string,v:string) => setSettings(s=>({...s,[k]:v}));
  async function save() {
    const token = localStorage.getItem("nwl_token") || '';
    await fetch('/api/settings', {
      method:'POST',
      headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${token}`},
      body:JSON.stringify(settings)
    });
    setSaved(true); setTimeout(()=>setSaved(false),2000);
  }

  const fields = [
    // Site Identity
    {k:'siteName',l:'Site Name'},{k:'tagline',l:'Tagline'},
    // Hero Section
    {k:'heroTitle',l:'Hero Title'},{k:'heroSubtitle',l:'Hero Subtitle'},{k:'heroCta',l:'Hero CTA Text'},{k:'heroBadge',l:'Hero Badge'},
    // Contact Info
    {k:'address',l:'Address (full)'},
    // Social Links
    {k:'facebook',l:'Facebook URL'},{k:'tiktok',l:'TikTok URL'},{k:'telegram',l:'Telegram URL'},
    // CTA Section
    {k:'ctaTitle',l:'CTA Title'},{k:'ctaSubtitle',l:'CTA Subtitle'},{k:'ctaButton',l:'CTA Button Text'},
    // About Page
    {k:'aboutTitle',l:'About Title'},{k:'aboutText',l:'About Body Text'},
    // Footer
    {k:'footerDesc',l:'Footer Description'},
    // Stats
    {k:'stat1Value',l:'Stat 1 Value'},{k:'stat1Label',l:'Stat 1 Label'},
    {k:'stat2Value',l:'Stat 2 Value'},{k:'stat2Label',l:'Stat 2 Label'},
    {k:'stat3Value',l:'Stat 3 Value'},{k:'stat3Label',l:'Stat 3 Label'},
    {k:'stat4Value',l:'Stat 4 Value'},{k:'stat4Label',l:'Stat 4 Label'},
    // Section Headings
    {k:'heroSectionTitle',l:'Hero Section Title'},{k:'heroSectionSubtitle',l:'Hero Section Subtitle'},
    {k:'servicesTitle',l:'Services Section Title'},{k:'servicesSubtitle',l:'Services Subtitle'},
    {k:'projectsTitle',l:'Projects Section Title'},{k:'projectsSubtitle',l:'Projects Subtitle'},
    {k:'whyTitle',l:'Why Choose Title'},{k:'whySubtitle',l:'Why Choose Subtitle'},
    {k:'testimonialsTitle',l:'Testimonials Title'},{k:'testimonialsSubtitle',l:'Testimonials Subtitle'},
    {k:'heroViewPortfolio',l:'Hero Secondary Button Text'},
    {k:'ctaSecondary',l:'CTA Secondary Button Text'},
    // Premium / site content (lists)
    {k:'marqueeTechs',l:'Marquee Tech List (comma-separated)'},
    {k:'aboutTechs',l:'About Tech List (comma-separated)'},
    {k:'whyBullets',l:'Contact Why-Us Bullets (separate with |)'},
    {k:'paymentMethods',l:'Payment Methods (separate with |)'},
  ];

  return (
    <AuthGuard>
      <AdminLayout title="Settings">
        <div className="max-w-3xl">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-navy mb-1">Site Settings</h3>
            <p className="text-xs text-slate-400 mb-6">All fields are saved to the database and reflected on the live website instantly.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {fields.map(f=>(
                <div key={f.k}><label className="text-xs text-slate-500 block mb-1 font-medium">{f.l}</label><input value={settings[f.k]||''} onChange={e=>set(f.k,e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue" /></div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button onClick={save} className="bg-gradient-to-r from-blue to-cyan text-white font-semibold px-6 py-2.5 rounded-lg text-sm hover:shadow-md transition">Save Settings</button>
              {saved && <span className="text-emerald-500 text-sm font-medium">✅ Saved!</span>}
            </div>
          </div>
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}

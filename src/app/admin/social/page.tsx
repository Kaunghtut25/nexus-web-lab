"use client";
import { AuthGuard, AdminLayout, apiHeaders } from "../shared";
import { useState, useEffect } from "react";
import { Link2, Save, ExternalLink } from "lucide-react";

function PlatformIcon({ p }: { p: string }) {
  const cls = "w-[18px] h-[18px] fill-current";
  if (p === 'facebook') return <svg viewBox="0 0 24 24" className={cls}><path d="M13.5 21v-7h2.5l.5-3h-3V9.1c0-.9.3-1.6 1.6-1.6H16.6V4.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9V11H8v3h2.5v7h3z"/></svg>;
  if (p === 'tiktok') return <svg viewBox="0 0 24 24" className={cls}><path d="M16.6 3c.3 1.8 1.4 3.1 3.4 3.3v2.6c-1.2 0-2.4-.4-3.4-1v5.6c0 3.4-2.6 5.5-5.6 5.5-3 0-5.5-2.3-5.5-5.4 0-3 2.4-5.4 5.6-5.4.3 0 .6 0 .9.1v2.7c-.3-.1-.6-.2-.9-.2-1.6 0-2.8 1.2-2.8 2.8 0 1.6 1.2 2.8 2.8 2.8 1.6 0 2.9-1.1 2.9-3V3h2.6z"/></svg>;
  if (p === 'telegram') return <svg viewBox="0 0 24 24" className={cls}><path d="M21.9 4.6c.3-1.1-.7-1.9-1.7-1.5L3.6 9.7c-1.1.4-1 2 .1 2.3l4.3 1.3 1.7 5.3c.3 1 1.6 1.2 2.2.3l2.3-3.2 4.5 3.3c.9.6 2.1.2 2.4-.9l2.8-13.5zM9.4 12.8l8-5.4c.3-.2.7.2.4.5l-6.6 6.3-.3 2.7-1.5-4.1z"/></svg>;
  if (p === 'instagram') return <svg viewBox="0 0 24 24" className={cls}><path d="M12 8.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8zm0 5.3a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM16.9 8.2a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0zM12 5.6c-1.7 0-1.9 0-2.6 0s-1.5.1-2 .3c-.5.2-.9.5-1.3.9s-.7.8-.9 1.3c-.2.5-.3 1.3-.3 2s0 1.9 0 2.6 0 1.5.3 2c.2.5.5.9.9 1.3s.8.7 1.3.9c.5.2 1.3.3 2 .3s1.9 0 2.6 0 1.5 0 2-.3c.5-.2.9-.5 1.3-.9s.7-.8.9-1.3c.2-.5.3-1.3.3-2s0-1.9 0-2.6 0-1.5-.3-2a3.6 3.6 0 0 0-.9-1.3 3.6 3.6 0 0 0-1.3-.9c-.5-.2-1.3-.3-2-.3zM17.5 4.6c-.7-.3-1.5-.4-2.6-.4H9.1c-1.1 0-1.9.1-2.6.4a4.2 4.2 0 0 0-2.4 2.4c-.3.7-.4 1.5-.4 2.6v5.8c0 1.1.1 1.9.4 2.6a4.2 4.2 0 0 0 2.4 2.4c.7.3 1.5.4 2.6.4h5.8c1.1 0 1.9-.1 2.6-.4a4.2 4.2 0 0 0 2.4-2.4c.3-.7.4-1.5.4-2.6V9.6c0-1.1-.1-1.9-.4-2.6a4.2 4.2 0 0 0-2.4-2.4z"/></svg>;
  if (p === 'youtube') return <svg viewBox="0 0 24 24" className={cls}><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z"/></svg>;
  return <span className="text-sm font-black leading-none">•</span>;
}

const PLATFORMS = [
  { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/yourpage", color: "#1877F2", hint: "Shown in footer as blue icon" },
  { key: "tiktok", label: "TikTok", placeholder: "https://tiktok.com/@yourhandle", color: "#000000", hint: "Shown in footer as black icon" },
  { key: "telegram", label: "Telegram", placeholder: "https://t.me/yourusername", color: "#229ED9", hint: "Shown in footer as blue icon" },
  { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/yourhandle", color: "#E4405F", hint: "Optional — not shown in footer yet" },
  { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/@yourchannel", color: "#FF0000", hint: "Optional — not shown in footer yet" },
];

export default function SocialLinksPage() {
  const [links, setLinks] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(d => {
      const s = d.settings || {};
      const map: Record<string, string> = {};
      PLATFORMS.forEach(p => { map[p.key] = s[p.key] || ''; });
      setLinks(map);
    });
  }, []);

  async function saveAll() {
    const payload: Record<string, string> = {};
    PLATFORMS.forEach(p => { payload[p.key] = (links[p.key] || '').trim(); });
    await fetch('/api/settings', { method: 'POST', headers: apiHeaders(), body: JSON.stringify(payload) });
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  }

  function clearLink(key: string) {
    setLinks(l => ({ ...l, [key]: '' }));
  }

  return (
    <AuthGuard>
      <AdminLayout title="Social Links">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-navy">Social Links</h2>
            <p className="text-sm text-slate-500">Add or edit your social media profile links — they appear in the website footer.</p>
          </div>
          <button onClick={saveAll} className="bg-gradient-to-r from-blue to-cyan text-white font-semibold px-5 py-2.5 rounded-lg text-sm flex items-center gap-2">
            <Save size={16} /> Save All
          </button>
        </div>

        {saved && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-xl mb-4">✓ Social links saved successfully!</div>
        )}

        <div className="space-y-4">
          {PLATFORMS.map((p) => {
            const val = links[p.key] || '';
            return (
              <div key={p.key} className="bg-white rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm" style={{ backgroundColor: p.color }}>
                    <PlatformIcon p={p.key} />
                  </span>
                  <div>
                    <div className="font-bold text-navy">{p.label}</div>
                    <div className="text-xs text-slate-400">{p.hint}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    value={val}
                    onChange={e => setLinks(l => ({ ...l, [p.key]: e.target.value }))}
                    placeholder={p.placeholder}
                    className="flex-1 px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue"
                  />
                  {val && (
                    <>
                      <a href={val} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-lg border border-slate-200 text-slate-500 hover:text-blue hover:border-blue transition flex items-center gap-1.5 text-sm">
                        <ExternalLink size={15} /> Open
                      </a>
                      <button onClick={() => clearLink(p.key)} className="px-3 py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition text-sm">Clear</button>
                    </>
                  )}
                </div>
                {val && (
                  <div className="mt-2 text-xs text-emerald-600 flex items-center gap-1.5">
                    <Link2 size={12} /> Active — shown in footer: <a href={val} target="_blank" rel="noopener noreferrer" className="underline break-all">{val}</a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 bg-blue-50/50 border border-blue-100 rounded-2xl p-5 text-sm text-slate-600">
          <p className="font-semibold text-navy mb-1.5">💡 How it works</p>
          <p>Facebook, TikTok and Telegram links are displayed as colorful brand icons in the website footer. Leave a field empty to keep the icon but link to the platform homepage. All changes go live immediately after saving.</p>
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}

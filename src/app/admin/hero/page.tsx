"use client";
import { AuthGuard, AdminLayout, apiHeaders } from "../shared";
import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function HeroSlidesPage() {
  const [slides, setSlides] = useState<any[]>([]);
  const [edit, setEdit] = useState<any>(null);

  useEffect(() => {
    fetch('/api/hero-slides').then(r => r.json()).then(d => setSlides(d.slides || []));
  }, []);

  async function save() {
    await fetch('/api/hero-slides', { method: 'POST', headers: apiHeaders(), body: JSON.stringify(edit) });
    const d = await fetch('/api/hero-slides').then(r => r.json());
    setSlides(d.slides || []);
    setEdit(null);
  }

  async function remove(id: string) {
    await fetch('/api/hero-slides', { method: 'DELETE', headers: apiHeaders(), body: JSON.stringify({ id }) });
    setSlides(s => s.filter(x => x.id !== id));
  }

  return (
    <AuthGuard>
      <AdminLayout title="Hero Slides">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-navy">Hero Slides ({slides.length})</h2>
          <button onClick={() => setEdit({ title: '', subtitle: '', image: '', sort_order: slides.length + 1 })} className="bg-gradient-to-r from-blue to-cyan text-white font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-1"><Plus size={16} /> Add Slide</button>
        </div>

        {edit && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
            <h3 className="font-bold text-navy mb-4">{edit.id ? 'Edit' : 'New'} Slide</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div><label className="text-xs text-slate-500 block mb-1">Title *</label><input value={edit.title || ''} onChange={e => setEdit({ ...edit, title: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue" /></div>
              <div><label className="text-xs text-slate-500 block mb-1">Sort Order</label><input type="number" value={edit.sort_order || 0} onChange={e => setEdit({ ...edit, sort_order: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue" /></div>
              <div className="sm:col-span-2"><label className="text-xs text-slate-500 block mb-1">Subtitle</label><input value={edit.subtitle || ''} onChange={e => setEdit({ ...edit, subtitle: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue" /></div>
              <div className="sm:col-span-2"><label className="text-xs text-slate-500 block mb-1">Background Image URL</label><input value={edit.image || ''} onChange={e => setEdit({ ...edit, image: e.target.value })} placeholder="https://..." className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue" /></div>
            </div>
            <div className="flex gap-2">
              <button onClick={save} className="bg-gradient-to-r from-blue to-cyan text-white font-semibold px-5 py-2 rounded-lg text-sm">Save</button>
              <button onClick={() => setEdit(null)} className="px-5 py-2 rounded-lg border border-slate-200 text-sm text-slate-600">Cancel</button>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {slides.map((s: any) => (
            <div key={s.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              {s.image ? <img src={s.image} alt={s.title} className="h-32 w-full object-cover" /> : <div className="h-32 w-full bg-slate-100 flex items-center justify-center text-slate-300 text-xs">No image</div>}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-bold text-navy text-sm">{s.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5 line-clamp-2">{s.subtitle}</div>
                    <div className="text-[11px] text-slate-300 mt-1">Order: {s.sort_order}</div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => setEdit({ ...s })} className="text-xs text-blue hover:underline flex items-center gap-1"><Edit2 size={12} /> Edit</button>
                    <button onClick={() => remove(s.id)} className="text-xs text-red-500 hover:underline ml-2 flex items-center gap-1"><Trash2 size={12} /> Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}

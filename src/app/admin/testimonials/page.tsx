"use client";
import { AuthGuard, AdminLayout, apiHeaders } from "../shared";
import { useState, useEffect } from "react";
import { Star, Plus, Edit2, Trash2 } from "lucide-react";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [edit, setEdit] = useState<any>(null);

  useEffect(() => {
    fetch('/api/testimonials').then(r => r.json()).then(d => setTestimonials(d.testimonials || []));
  }, []);

  async function save() {
    await fetch('/api/testimonials', { method: 'POST', headers: apiHeaders(), body: JSON.stringify(edit) });
    const d = await fetch('/api/testimonials').then(r => r.json());
    setTestimonials(d.testimonials || []);
    setEdit(null);
  }

  async function remove(id: string) {
    await fetch('/api/testimonials', { method: 'DELETE', headers: apiHeaders(), body: JSON.stringify({ id }) });
    setTestimonials(s => s.filter(x => x.id !== id));
  }

  return (
    <AuthGuard>
      <AdminLayout title="Testimonials">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-navy">Testimonials ({testimonials.length})</h2>
          <button onClick={() => setEdit({ name: '', role: '', company: '', content: '', rating: 5, avatar: '', logo: '' })} className="bg-gradient-to-r from-blue to-cyan text-white font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-1"><Plus size={16} /> Add Testimonial</button>
        </div>

        {edit && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
            <h3 className="font-bold text-navy mb-4">{edit.id ? 'Edit' : 'New'} Testimonial</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div><label className="text-xs text-slate-500 block mb-1">Name *</label><input value={edit.name || ''} onChange={e => setEdit({ ...edit, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue" /></div>
              <div><label className="text-xs text-slate-500 block mb-1">Role / Title</label><input value={edit.role || ''} onChange={e => setEdit({ ...edit, role: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue" /></div>
              <div><label className="text-xs text-slate-500 block mb-1">Company</label><input value={edit.company || ''} onChange={e => setEdit({ ...edit, company: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue" /></div>
              <div><label className="text-xs text-slate-500 block mb-1">Rating (1-5)</label><input type="number" min={1} max={5} value={edit.rating || 5} onChange={e => setEdit({ ...edit, rating: parseInt(e.target.value) || 5 })} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue" /></div>
              <div><label className="text-xs text-slate-500 block mb-1">Avatar URL (optional)</label><input value={edit.avatar || ''} onChange={e => setEdit({ ...edit, avatar: e.target.value })} placeholder="https://..." className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue" /></div>
              <div><label className="text-xs text-slate-500 block mb-1">Company Logo URL (optional)</label><input value={edit.logo || ''} onChange={e => setEdit({ ...edit, logo: e.target.value })} placeholder="https://...logo.png" className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue" /></div>
              <div className="sm:col-span-2"><label className="text-xs text-slate-500 block mb-1">Content *</label><textarea value={edit.content || ''} onChange={e => setEdit({ ...edit, content: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue resize-none" /></div>
            </div>
            <div className="flex gap-2">
              <button onClick={save} className="bg-gradient-to-r from-blue to-cyan text-white font-semibold px-5 py-2 rounded-lg text-sm">Save</button>
              <button onClick={() => setEdit(null)} className="px-5 py-2 rounded-lg border border-slate-200 text-sm text-slate-600">Cancel</button>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          {testimonials.map((t: any) => (
            <div key={t.id} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {t.avatar ? <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" /> : <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue to-cyan flex items-center justify-center text-white font-bold text-sm">{t.name?.charAt(0) || '?'}</div>}
                  <div>
                    <div className="font-bold text-navy text-sm">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.role}{t.company && ` @ ${t.company}`}</div>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => setEdit({ ...t })} className="text-xs text-blue hover:underline flex items-center gap-1"><Edit2 size={12} /> Edit</button>
                  <button onClick={() => remove(t.id)} className="text-xs text-red-500 hover:underline ml-2 flex items-center gap-1"><Trash2 size={12} /> Delete</button>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: t.rating || 5 }).map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">{t.content}</p>
            </div>
          ))}
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}

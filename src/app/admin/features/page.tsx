"use client";
import { AuthGuard, AdminLayout, apiHeaders } from "../shared";
import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function FeaturesPage() {
  const [features, setFeatures] = useState<any[]>([]);
  const [edit, setEdit] = useState<any>(null);

  useEffect(() => {
    fetch('/api/features').then(r => r.json()).then(d => setFeatures(d.features || []));
  }, []);

  async function save() {
    await fetch('/api/features', { method: 'POST', headers: apiHeaders(), body: JSON.stringify(edit) });
    const d = await fetch('/api/features').then(r => r.json());
    setFeatures(d.features || []);
    setEdit(null);
  }

  async function remove(id: string) {
    await fetch('/api/features', { method: 'DELETE', headers: apiHeaders(), body: JSON.stringify({ id }) });
    setFeatures(s => s.filter(x => x.id !== id));
  }

  return (
    <AuthGuard>
      <AdminLayout title="Why Choose Features">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-navy">Features ({features.length})</h2>
          <button onClick={() => setEdit({ title: '', description: '', icon: '✨', sort_order: features.length + 1 })} className="bg-gradient-to-r from-blue to-cyan text-white font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-1"><Plus size={16} /> Add Feature</button>
        </div>

        {edit && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
            <h3 className="font-bold text-navy mb-4">{edit.id ? 'Edit' : 'New'} Feature</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div><label className="text-xs text-slate-500 block mb-1">Title *</label><input value={edit.title || ''} onChange={e => setEdit({ ...edit, title: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue" /></div>
              <div><label className="text-xs text-slate-500 block mb-1">Icon (emoji or key)</label><input value={edit.icon || ''} onChange={e => setEdit({ ...edit, icon: e.target.value })} placeholder="✨ ⚡ ✅ ⭐" className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue" /></div>
              <div className="sm:col-span-2"><label className="text-xs text-slate-500 block mb-1">Description</label><textarea value={edit.description || ''} onChange={e => setEdit({ ...edit, description: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue resize-none" /></div>
              <div><label className="text-xs text-slate-500 block mb-1">Sort Order</label><input type="number" value={edit.sort_order || 0} onChange={e => setEdit({ ...edit, sort_order: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue" /></div>
            </div>
            <div className="flex gap-2">
              <button onClick={save} className="bg-gradient-to-r from-blue to-cyan text-white font-semibold px-5 py-2 rounded-lg text-sm">Save</button>
              <button onClick={() => setEdit(null)} className="px-5 py-2 rounded-lg border border-slate-200 text-sm text-slate-600">Cancel</button>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((f: any) => (
            <div key={f.id} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue/10 to-cyan/10 flex items-center justify-center text-xl">{f.icon || '✨'}</div>
                  <div>
                    <div className="font-bold text-navy">{f.title}</div>
                    <div className="text-xs text-slate-400">Order: {f.sort_order}</div>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => setEdit({ ...f })} className="text-xs text-blue hover:underline flex items-center gap-1"><Edit2 size={12} /> Edit</button>
                  <button onClick={() => remove(f.id)} className="text-xs text-red-500 hover:underline ml-2 flex items-center gap-1"><Trash2 size={12} /> Delete</button>
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}

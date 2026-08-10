"use client";
import { AuthGuard, AdminLayout, apiHeaders } from "../shared";
import { useState, useEffect } from "react";
import { ImageIcon } from "lucide-react";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [edit, setEdit] = useState<any>(null);
  useEffect(() => {
    fetch('/api/services').then(r=>r.json()).then(d=>setServices(d.services||[]));
  }, []);

  async function saveService() {
    await fetch('/api/services', {method:'POST',headers:apiHeaders(),body:JSON.stringify(edit)});
    const d = await fetch('/api/services').then(r=>r.json());
    setServices(d.services||[]); setEdit(null);
  }
  async function deleteService(id:string) {
    await fetch('/api/services', {method:'DELETE',headers:apiHeaders(),body:JSON.stringify({id})});
    setServices(s=>s.filter(x=>x.id!==id));
  }

  return (
    <AuthGuard>
      <AdminLayout title="Services">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-navy">Services ({services.length})</h2>
          <button onClick={()=>setEdit({title:'',price:'',description:'',features:[''],icon:'🌐',image:''})} className="bg-gradient-to-r from-blue to-cyan text-white font-semibold px-4 py-2 rounded-lg text-sm">+ Add Service</button>
        </div>
        {edit && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
            <h3 className="font-bold text-navy mb-4">{edit.id?'Edit':'New'} Service</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div><label className="text-xs text-slate-500 block mb-1">Title *</label><input value={edit.title||''} onChange={e=>setEdit({...edit,title:e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue" /></div>
              <div><label className="text-xs text-slate-500 block mb-1">Price</label><input value={edit.price||''} onChange={e=>setEdit({...edit,price:e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue" /></div>
              <div><label className="text-xs text-slate-500 block mb-1">Icon (emoji)</label><input value={edit.icon||''} onChange={e=>setEdit({...edit,icon:e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue" /></div>
              <div><label className="text-xs text-slate-500 block mb-1">Image URL</label><input value={edit.image||''} onChange={e=>setEdit({...edit,image:e.target.value})} placeholder="https://images.unsplash.com/..." className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue" /></div>
              <div><label className="text-xs text-slate-500 block mb-1">Features (comma separated)</label><input value={(edit.features||[]).join(',')} onChange={e=>setEdit({...edit,features:e.target.value.split(',').map((s:string)=>s.trim()).filter(Boolean)})} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue" /></div>
              <div className="sm:col-span-2"><label className="text-xs text-slate-500 block mb-1">Description</label><textarea value={edit.description||''} onChange={e=>setEdit({...edit,description:e.target.value})} rows={3} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue resize-none" /></div>
            </div>
            {edit.image && (<div className="mb-4"><img src={edit.image} alt="preview" className="w-40 h-24 object-cover rounded-lg border" /></div>)}
            <div className="flex gap-2">
              <button onClick={saveService} className="bg-gradient-to-r from-blue to-cyan text-white font-semibold px-5 py-2 rounded-lg text-sm">Save</button>
              <button onClick={()=>setEdit(null)} className="px-5 py-2 rounded-lg border border-slate-200 text-sm text-slate-600">Cancel</button>
            </div>
          </div>
        )}
        <div className="grid sm:grid-cols-2 gap-4">
          {services.map((s:any)=>(
            <div key={s.id} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-start gap-3">
                {s.image ? <img src={s.image} alt={s.title || 'service'} className="w-14 h-14 object-cover rounded-lg shrink-0" /> : <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center shrink-0"><ImageIcon size={20} className="text-slate-300" /></div>}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2"><span className="text-xl">{s.icon||'🌐'}</span><span className="font-bold text-navy">{s.title}</span></div>
                    <div className="flex gap-1 shrink-0">
                      <button onClick={()=>setEdit({...s,features:s.features||[]})} className="text-xs text-blue hover:underline">Edit</button>
                      <button onClick={()=>deleteService(s.id)} className="text-xs text-red-500 hover:underline ml-2">Delete</button>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500">{s.price}</p>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">{s.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}

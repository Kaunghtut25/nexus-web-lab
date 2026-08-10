"use client";
import { AuthGuard, AdminLayout, apiHeaders } from "../shared";
import { useState, useEffect } from "react";
import { MessageSquare, Mail, Phone, Trash2, Bot } from "lucide-react";

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    fetch('/api/leads', { headers: apiHeaders() })
      .then(r => r.json())
      .then(d => { setLeads(d.leads || []); setLoading(false); })
      .catch(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  async function deleteLead(id: string) {
    await fetch('/api/leads', { method: 'DELETE', headers: apiHeaders(), body: JSON.stringify({ id }) });
    setLeads(s => s.filter(x => x.id !== id));
  }

  if (loading) {
    return (
      <AuthGuard><AdminLayout title="Chatbot Leads">
        <div className="flex items-center justify-center py-20"><div className="flex gap-2"><span className="w-3 h-3 rounded-full bg-blue animate-pulse" /><span className="w-3 h-3 rounded-full bg-blue animate-pulse" style={{ animationDelay: '0.2s' }} /><span className="w-3 h-3 rounded-full bg-blue animate-pulse" style={{ animationDelay: '0.4s' }} /></div></div>
      </AdminLayout></AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <AdminLayout title="Chatbot Leads">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-navy flex items-center gap-2"><Bot size={18} className="text-blue" /> Chatbot Leads ({leads.length})</h3>
          </div>
          {leads.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-sm">No chatbot leads yet. Leads from the chat widget will appear here.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {leads.map((l: any) => (
                <div key={l.id} className="p-5 hover:bg-slate-50 transition">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <span className="font-medium text-navy">{l.name || "Anonymous"}</span>
                      {l.email && <a href={`mailto:${l.email}`} className="text-xs text-blue ml-3 inline-flex items-center gap-1 hover:underline"><Mail size={12} /> {l.email}</a>}
                      {l.phone && <span className="text-xs text-slate-400 ml-3 inline-flex items-center gap-1"><Phone size={12} /> {l.phone}</span>}
                    </div>
                    <div className="flex items-center gap-3">
                      {l.source && <span className="px-2 py-0.5 bg-cyan/10 text-cyan rounded text-xs">{l.source}</span>}
                      <span className="text-xs text-slate-300">{l.created_at?.slice(0, 10)}</span>
                      <button onClick={() => deleteLead(l.id)} className="text-xs text-red-500 hover:underline flex items-center gap-1"><Trash2 size={12} /> Delete</button>
                    </div>
                  </div>
                  {l.service && <span className="inline-block px-2 py-0.5 bg-blue/5 text-blue text-xs rounded mb-2">{l.service}</span>}
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">{l.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}

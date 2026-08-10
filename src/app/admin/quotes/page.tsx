"use client";
import { AuthGuard, AdminLayout, apiHeaders } from "../shared";
import { useState, useEffect } from "react";
import { Mail, Phone, Trash2, FileText, DollarSign, Clock } from "lucide-react";

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    fetch('/api/quotes', { headers: apiHeaders() })
      .then(r => r.json())
      .then(d => { setQuotes(d.quotes || []); setLoading(false); })
      .catch(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  async function deleteQuote(id: string) {
    await fetch('/api/quotes', { method: 'DELETE', headers: apiHeaders(), body: JSON.stringify({ id }) });
    setQuotes(s => s.filter(x => x.id !== id));
  }

  if (loading) {
    return (
      <AuthGuard><AdminLayout title="Quote Requests">
        <div className="flex items-center justify-center py-20"><div className="flex gap-2"><span className="w-3 h-3 rounded-full bg-blue animate-pulse" /><span className="w-3 h-3 rounded-full bg-blue animate-pulse" style={{ animationDelay: '0.2s' }} /><span className="w-3 h-3 rounded-full bg-blue animate-pulse" style={{ animationDelay: '0.4s' }} /></div></div>
      </AdminLayout></AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <AdminLayout title="Quote Requests">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-navy flex items-center gap-2"><FileText size={18} className="text-blue" /> Quote Requests ({quotes.length})</h3>
          </div>
          {quotes.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-sm">No quote requests yet. Submissions from the Get Quote page will appear here.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {quotes.map((q: any) => (
                <div key={q.id} className="p-5 hover:bg-slate-50 transition">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="font-medium text-navy">{q.name || "Anonymous"}</span>
                      {q.email && <a href={`mailto:${q.email}`} className="text-xs text-blue ml-3 inline-flex items-center gap-1 hover:underline"><Mail size={12} /> {q.email}</a>}
                      {q.phone && <span className="text-xs text-slate-400 ml-3 inline-flex items-center gap-1"><Phone size={12} /> {q.phone}</span>}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-300">{q.created_at?.slice(0, 10)}</span>
                      <button onClick={() => deleteQuote(q.id)} className="text-xs text-red-500 hover:underline flex items-center gap-1"><Trash2 size={12} /> Delete</button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {q.service && <span className="inline-block px-2 py-0.5 bg-blue/5 text-blue text-xs rounded">{q.service}</span>}
                    {q.budget && <span className="inline-block px-2 py-0.5 bg-emerald/5 text-emerald-600 text-xs rounded flex items-center gap-1"><DollarSign size={10} /> {q.budget}</span>}
                    {q.timeline && <span className="inline-block px-2 py-0.5 bg-amber/5 text-amber-600 text-xs rounded flex items-center gap-1"><Clock size={10} /> {q.timeline}</span>}
                  </div>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">{q.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}

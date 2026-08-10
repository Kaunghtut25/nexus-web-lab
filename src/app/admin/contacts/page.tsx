"use client";
import { AuthGuard, AdminLayout, apiHeaders } from "../shared";
import { useState, useEffect } from "react";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    fetch('/api/contact', { headers: apiHeaders() })
      .then(r=>r.json())
      .then(d => { setContacts(d.contacts||[]); setLoading(false); })
      .catch(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  async function deleteContact(id: string) {
    await fetch('/api/contact', { method: 'DELETE', headers: apiHeaders(), body: JSON.stringify({ id }) });
    setContacts(s => s.filter(x => x.id !== id));
  }

  if (loading) {
    return (
      <AuthGuard><AdminLayout title="Messages">
        <div className="flex items-center justify-center py-20"><div className="flex gap-2"><span className="w-3 h-3 rounded-full bg-blue animate-pulse" /><span className="w-3 h-3 rounded-full bg-blue animate-pulse" style={{ animationDelay: '0.2s' }} /><span className="w-3 h-3 rounded-full bg-blue animate-pulse" style={{ animationDelay: '0.4s' }} /></div></div>
      </AdminLayout></AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <AdminLayout title="Messages">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-navy">Contact Messages ({contacts.length})</h3>
          </div>
          {contacts.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-sm">No messages yet.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {contacts.map((c: any) => (
                <div key={c.id} className="p-5 hover:bg-slate-50 transition">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <span className="font-medium text-navy">{c.name || "Anonymous"}</span>
                      <span className="text-xs text-slate-400 ml-3">{c.email}</span>
                      {c.phone && <span className="text-xs text-slate-400 ml-3">📞 {c.phone}</span>}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-300">{c.created_at?.slice(0,10)}</span>
                      <button onClick={() => deleteContact(c.id)} className="text-xs text-red-500 hover:underline">Delete</button>
                    </div>
                  </div>
                  {c.service && <span className="inline-block px-2 py-0.5 bg-blue/5 text-blue text-xs rounded mb-2">{c.service}</span>}
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">{c.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}

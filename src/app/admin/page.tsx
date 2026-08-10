"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AuthGuard, AdminLayout, apiHeaders } from "./shared";

export default function AdminDashboard() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const h = apiHeaders();
    Promise.all([
      fetch('/api/contact', { headers: h }).then(r=>r.json()),
      fetch('/api/services').then(r=>r.json()),
      fetch('/api/projects').then(r=>r.json()),
      fetch('/api/leads', { headers: h }).then(r=>r.json()).catch(()=>({leads:[]})),
      fetch('/api/quotes', { headers: h }).then(r=>r.json()).catch(()=>({quotes:[]})),
      fetch('/api/testimonials').then(r=>r.json()).catch(()=>({testimonials:[]})),
    ]).then(([c,s,p,l,q,t]) => {
      setContacts(c.contacts||[]);
      setServices(s.services||[]);
      setProjects(p.projects||[]);
      setLeads(l.leads||[]);
      setQuotes(q.quotes||[]);
      setTestimonials(t.testimonials||[]);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <AuthGuard><AdminLayout title="Dashboard"><div className="flex items-center justify-center py-20"><div className="flex gap-2"><span className="w-3 h-3 rounded-full bg-blue animate-pulse" /><span className="w-3 h-3 rounded-full bg-blue animate-pulse" style={{ animationDelay: '0.2s' }} /><span className="w-3 h-3 rounded-full bg-blue animate-pulse" style={{ animationDelay: '0.4s' }} /></div></div></AdminLayout></AuthGuard>;
  }

  const stats = [
    { label: "Total Projects", value: projects.length, color: "text-blue" },
    { label: "Active Services", value: services.length, color: "text-cyan" },
    { label: "New Messages", value: contacts.length, color: "text-emerald-500" },
    { label: "Chatbot Leads", value: leads.length, color: "text-purple-500" },
    { label: "Quote Requests", value: quotes.length, color: "text-amber-500" },
    { label: "Testimonials", value: testimonials.length, color: "text-pink-500" },
    { label: "Status", value: "✅", color: "text-emerald-500" },
    { label: "All Systems", value: "Online", color: "text-emerald-500" },
  ];

  // ---- Charts data (pure CSS, no external libs) ----
  // Last 7 days activity from contacts + leads + quotes
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().slice(0, 10);
  });
  const countOn = (arr: any[], date: string) => (arr || []).filter((x: any) => (x.created_at || '').slice(0, 10) === date).length;
  const activity = days.map(day => ({
    day: day.slice(5),
    total: countOn(contacts, day) + countOn(leads, day) + countOn(quotes, day),
  }));
  const maxActivity = Math.max(1, ...activity.map(a => a.total));

  // Service mix donut — services with messages/leads referenced
  const svcNames = (services || []).map((s: any) => s.title || 'Service').slice(0, 6);
  const svcCounts = (services || []).map((s: any) =>
    (contacts || []).filter((c: any) => (c.service || '').toLowerCase() === (s.title || '').toLowerCase()).length +
    (leads || []).filter((l: any) => (l.service || '').toLowerCase() === (s.title || '').toLowerCase()).length
  );
  const donutColors = ['#2563EB', '#06B6D4', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899'];
  const donutTotal = Math.max(1, svcCounts.reduce((a: number, b: number) => a + b, 0));
  let acc = 0;
  const donutSegs = svcCounts.map((c: number, i: number) => {
    const seg = { color: donutColors[i % donutColors.length], pct: (c / donutTotal) * 100, label: svcNames[i], count: c, offset: acc };
    acc += (c / donutTotal) * 100;
    return seg;
  });

  const quickLinks = [
    { to: "/admin/settings", label: "Site Settings", desc: "Update site name, hero text, contact info" },
    { to: "/admin/services", label: "Manage Services", desc: "Add, edit, or remove service offerings" },
    { to: "/admin/projects", label: "Manage Projects", desc: "Add portfolio projects with tags" },
    { to: "/admin/contacts", label: "View Messages", desc: `${contacts.length} contact form submissions` },
    { to: "/admin/leads", label: "Chatbot Leads", desc: `${leads.length} leads from chat widget` },
    { to: "/admin/quotes", label: "Quote Requests", desc: `${quotes.length} quote form submissions` },
    { to: "/admin/testimonials", label: "Testimonials", desc: `${testimonials.length} client testimonials` },
    { to: "/admin/uploads", label: "Upload Images", desc: "Upload and manage site images" },
  ];

  return (
    <AuthGuard>
      <AdminLayout title="Dashboard">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition">
              <div className={`text-3xl font-extrabold ${s.color} mb-1`}>{s.value}</div>
              <div className="text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Charts — last 7 days activity + service mix */}
        <div className="grid lg:grid-cols-2 gap-4 mb-8">
          {/* Bar chart */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-navy">Last 7 Days Activity</h3>
              <span className="text-xs text-slate-400">messages + leads + quotes</span>
            </div>
            <div className="flex items-end justify-between gap-2 h-40">
              {activity.map((a, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-xs font-bold text-navy">{a.total || ''}</span>
                  <div
                    className="w-full max-w-[34px] rounded-t-lg bg-gradient-to-t from-blue to-cyan transition-all duration-500"
                    style={{ height: `${Math.max(4, (a.total / maxActivity) * 100)}%` }}
                  />
                  <span className="text-[10px] text-slate-400">{a.day}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Donut chart */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-navy">Interest by Service</h3>
              <span className="text-xs text-slate-400">from messages & leads</span>
            </div>
            {donutTotal <= 1 ? (
              <div className="flex items-center justify-center h-40 text-sm text-slate-400">
                No service-linked inquiries yet — data appears once messages/leads arrive.
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="relative w-40 h-40 flex-shrink-0">
                  <svg viewBox="0 0 42 42" className="w-40 h-40 -rotate-90">
                    {donutSegs.filter(s => s.pct > 0).map((s, i) => (
                      <circle key={i} cx="21" cy="21" r="15.9" fill="none" stroke={s.color} strokeWidth="6"
                        strokeDasharray={`${s.pct} ${100 - s.pct}`} strokeDashoffset={-s.offset} />
                    ))}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-2xl font-black text-navy">{donutTotal}</div>
                </div>
                <ul className="space-y-2 flex-1 w-full">
                  {donutSegs.filter(s => s.pct > 0).map((s, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: s.color }} />
                      <span className="text-slate-600 flex-1 truncate">{s.label}</span>
                      <span className="font-bold text-navy">{s.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickLinks.map(c => (
            <Link key={c.to} href={c.to} className="bg-white rounded-2xl border border-slate-100 p-6 hover:border-blue/20 hover:shadow-md transition-all group">
              <h3 className="font-bold text-navy mb-1 group-hover:text-blue transition">{c.label}</h3>
              <p className="text-sm text-slate-500">{c.desc}</p>
            </Link>
          ))}
        </div>

        {/* Recent Messages */}
        {contacts.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-navy">Recent Messages</h3>
              <Link href="/admin/contacts" className="text-sm text-blue hover:underline">View All →</Link>
            </div>
            <div className="space-y-3">
              {contacts.slice(0, 5).map((c: any) => (
                <div key={c.id} className="flex items-start justify-between border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-navy">{c.name || "Anonymous"}</p>
                    <p className="text-xs text-slate-400">{c.email} {c.phone && `• ${c.phone}`}</p>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{c.message}</p>
                  </div>
                  <span className="text-xs text-slate-300">{c.created_at?.slice(0, 10)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Leads */}
        {leads.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-navy">Recent Chatbot Leads</h3>
              <Link href="/admin/leads" className="text-sm text-blue hover:underline">View All →</Link>
            </div>
            <div className="space-y-3">
              {leads.slice(0, 5).map((l: any) => (
                <div key={l.id} className="flex items-start justify-between border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-navy">{l.name || "Anonymous"}</p>
                    <p className="text-xs text-slate-400">{l.email} {l.phone && `• ${l.phone}`}</p>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{l.message}</p>
                  </div>
                  <span className="text-xs text-slate-300">{l.created_at?.slice(0, 10)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Quote Requests */}
        {quotes.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-navy">Recent Quote Requests</h3>
              <Link href="/admin/quotes" className="text-sm text-blue hover:underline">View All →</Link>
            </div>
            <div className="space-y-3">
              {quotes.slice(0, 5).map((q: any) => (
                <div key={q.id} className="flex items-start justify-between border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-navy">{q.name || "Anonymous"}</p>
                    <p className="text-xs text-slate-400">{q.email} {q.phone && `• ${q.phone}`}</p>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{q.message}</p>
                  </div>
                  <span className="text-xs text-slate-300">{q.created_at?.slice(0, 10)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </AdminLayout>
    </AuthGuard>
  );
}

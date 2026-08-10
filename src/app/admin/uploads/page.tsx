"use client";
import { AuthGuard, AdminLayout, apiHeaders } from "../shared";
import { useState, useEffect } from "react";
import { Upload, Trash2, Copy } from "lucide-react";

export default function UploadsPage() {
  const [files, setFiles] = useState<any[]>([]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);

  function loadFiles() {
    setLoading(true);
    const token = localStorage.getItem('nwl_token') || '';
    fetch('/api/upload', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { setFiles((d.uploads || []).map((u: any) => ({ ...u, url: `/api/upload?id=${u.id}` }))); setLoading(false); })
      .catch(() => { setFiles([]); setLoading(false); });
  }

  useEffect(() => { loadFiles(); }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    const fd = new FormData(); fd.append('file', file);
    setMsg('Uploading...');
    const token = localStorage.getItem("nwl_token") || '';
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: fd,
    });
    const data = await res.json();
    if (data.url) {
      await loadFiles();
      setMsg(`✅ Uploaded: ${data.url}`);
    } else {
      setMsg(`❌ Error: ${data.error || 'Upload failed'}`);
    }
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
    setMsg('📋 Copied URL to clipboard');
    setTimeout(() => setMsg(''), 2000);
  }

  async function removeFile(id: string) {
    const token = localStorage.getItem('nwl_token') || '';
    const res = await fetch('/api/upload', {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (data.success) {
      setFiles(files.filter(f => f.id !== id));
      setMsg('🗑️ Deleted');
      setTimeout(() => setMsg(''), 2000);
    } else {
      setMsg(`❌ ${data.error || 'Delete failed'}`);
    }
  }

  if (loading) {
    return (
      <AuthGuard><AdminLayout title="Uploads">
        <div className="flex items-center justify-center py-20"><div className="flex gap-2"><span className="w-3 h-3 rounded-full bg-blue animate-pulse" /><span className="w-3 h-3 rounded-full bg-blue animate-pulse" style={{ animationDelay: '0.2s' }} /><span className="w-3 h-3 rounded-full bg-blue animate-pulse" style={{ animationDelay: '0.4s' }} /></div></div>
      </AdminLayout></AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <AdminLayout title="Uploads">
        <div className="max-w-4xl">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
            <h3 className="font-bold text-navy mb-4">Image Uploads</h3>
            <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-blue text-blue text-sm font-medium cursor-pointer hover:bg-blue/5 transition mb-4">
              <Upload size={16} /> Choose Image
              <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            </label>
            {msg && <p className="text-sm text-slate-600 mb-4">{msg}</p>}
          </div>

          {files.length > 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-100">
                <h3 className="font-bold text-navy">Uploaded Files ({files.length})</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {files.map(f => (
                  <div key={f.id} className="bg-slate-50 rounded-xl p-3 text-center group relative">
                    <img src={f.url} alt={f.name} className="w-full aspect-square object-cover rounded-lg mb-2" />
                    <p className="text-xs text-slate-500 truncate mb-1">{f.name}</p>
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => copyUrl(f.url)} className="text-xs text-blue hover:underline flex items-center gap-1"><Copy size={10} /> Copy URL</button>
                      <button onClick={() => removeFile(f.id)} className="text-xs text-red-500 hover:underline flex items-center gap-1"><Trash2 size={10} /> Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 text-sm">
              No uploads yet. Upload images to use in Services, Projects, and Testimonials.
            </div>
          )}
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}

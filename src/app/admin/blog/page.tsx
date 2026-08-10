"use client";
import { AuthGuard, AdminLayout, apiHeaders } from "../shared";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Save, X, Eye } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  tags: string[];
  published: number;
  created_at: string;
}

const empty: Post = { id: '', title: '', slug: '', excerpt: '', content: '', image: '', tags: [], published: 1, created_at: '' };

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Post>({ ...empty });
  const [isNew, setIsNew] = useState(false);
  const [msg, setMsg] = useState('');

  function load() {
    setLoading(true);
    fetch('/api/blog', { headers: apiHeaders() })
      .then(r => r.json())
      .then(d => {
        setPosts((d.posts || []).map((p: any) => ({ ...p, tags: typeof p.tags === 'string' ? JSON.parse(p.tags || '[]') : (p.tags || []) })));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  function slugify(s: string) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  async function savePost() {
    if (!editing.title || !editing.slug) { setMsg('❌ Title and slug required'); return; }
    const url = isNew ? '/api/blog' : '/api/blog';
    const res = await fetch(url, {
      method: isNew ? 'POST' : 'PUT',
      headers: { ...apiHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    });
    const d = await res.json();
    if (d.success) {
      setMsg(isNew ? '✅ Post created' : '✅ Post updated');
      setEditing({ ...empty }); setIsNew(false);
      load();
      setTimeout(() => setMsg(''), 2500);
    } else {
      setMsg(`❌ ${d.error || 'Save failed'}`);
    }
  }

  async function deletePost(id: string) {
    if (!confirm('Delete this post?')) return;
    const res = await fetch('/api/blog', {
      method: 'DELETE',
      headers: { ...apiHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    const d = await res.json();
    if (d.success) { setMsg('🗑️ Deleted'); load(); setTimeout(() => setMsg(''), 2000); }
  }

  function editPost(p: Post) { setEditing({ ...p }); setIsNew(false); }

  if (loading) {
    return (
      <AuthGuard><AdminLayout title="Blog">
        <div className="flex items-center justify-center py-20"><div className="flex gap-2"><span className="w-3 h-3 rounded-full bg-blue animate-pulse" /><span className="w-3 h-3 rounded-full bg-blue animate-pulse" style={{ animationDelay: '0.2s' }} /><span className="w-3 h-3 rounded-full bg-blue animate-pulse" style={{ animationDelay: '0.4s' }} /></div></div>
      </AdminLayout></AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <AdminLayout title="Blog">
        <div className="max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-navy">{posts.length} Posts</h3>
              {msg && <p className="text-sm text-slate-600 mt-1">{msg}</p>}
            </div>
            {!editing.id && !isNew && (
              <button onClick={() => { setEditing({ ...empty }); setIsNew(true); }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 text-white text-sm font-semibold hover:opacity-90 transition">
                <Plus size={16} /> New Post
              </button>
            )}
          </div>

          {/* Editor */}
          {(editing.id || isNew) && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
              <h3 className="font-bold text-navy mb-4">{isNew ? 'New Post' : 'Edit Post'}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Title *</label>
                  <input className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" value={editing.title}
                    onChange={e => { const v = e.target.value; setEditing({ ...editing, title: v, slug: isNew ? slugify(v) : editing.slug }); }} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Slug *</label>
                  <input className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" value={editing.slug}
                    onChange={e => setEditing({ ...editing, slug: slugify(e.target.value) })} placeholder="my-article-title" />
                </div>
              </div>
              <div className="mb-4">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Image URL</label>
                <input className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" value={editing.image}
                  onChange={e => setEditing({ ...editing, image: e.target.value })} placeholder="https://... or /api/upload?id=..." />
              </div>
              <div className="mb-4">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Excerpt</label>
                <textarea className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" rows={2} value={editing.excerpt}
                  onChange={e => setEditing({ ...editing, excerpt: e.target.value })} />
              </div>
              <div className="mb-4">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Content (Markdown or plain text)</label>
                <textarea className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono" rows={10} value={editing.content}
                  onChange={e => setEditing({ ...editing, content: e.target.value })} />
              </div>
              <div className="mb-4">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tags (comma separated)</label>
                <input className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" value={editing.tags.join(', ')}
                  onChange={e => setEditing({ ...editing, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })} placeholder="Next.js, Design, SEO" />
              </div>
              <div className="mb-4 flex items-center gap-3">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Published</label>
                <input type="checkbox" checked={!!editing.published} onChange={e => setEditing({ ...editing, published: e.target.checked ? 1 : 0 })} className="w-4 h-4" />
              </div>
              <div className="mb-4">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Publish Date (optional — default today)</label>
                <input type="date" className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  value={editing.created_at ? editing.created_at.slice(0, 10) : ''}
                  onChange={e => setEditing({ ...editing, created_at: e.target.value ? new Date(e.target.value + 'T12:00:00').toISOString() : '' })} />
              </div>
              <div className="flex gap-3">
                <button onClick={savePost} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 text-white text-sm font-semibold hover:opacity-90 transition"><Save size={15} /> Save</button>
                <button onClick={() => { setEditing({ ...empty }); setIsNew(false); }} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 text-sm font-medium hover:bg-slate-50 transition"><X size={15} /> Cancel</button>
              </div>
            </div>
          )}

          {/* List */}
          {posts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 text-sm">
              No blog posts yet. Click "New Post" to create your first article.
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3 hidden sm:table-cell">Slug</th>
                    <th className="px-4 py-3 hidden md:table-cell">Date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(p => (
                    <tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-medium text-navy">{p.title}</td>
                      <td className="px-4 py-3 text-slate-500 hidden sm:table-cell">/{p.slug}</td>
                      <td className="px-4 py-3 text-slate-500 hidden md:table-cell">{new Date(p.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                      <td className="px-4 py-3">{p.published ? <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 font-semibold">Published</span> : <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-500 font-semibold">Draft</span>}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <a href={`/blog/${p.slug}`} target="_blank" className="text-slate-400 hover:text-blue transition p-1" title="View"><Eye size={15} /></a>
                          <button onClick={() => editPost(p)} className="text-slate-400 hover:text-blue transition p-1" title="Edit"><Pencil size={15} /></button>
                          <button onClick={() => deletePost(p.id)} className="text-slate-400 hover:text-red-500 transition p-1" title="Delete"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}

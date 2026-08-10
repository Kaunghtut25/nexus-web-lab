export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-blue rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-400 text-sm">Loading…</p>
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="relative text-center max-w-md">
        <div className="text-8xl font-extrabold bg-gradient-to-r from-blue to-cyan bg-clip-text text-transparent mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
        <p className="text-slate-400 mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue to-cyan text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition">
            <ArrowLeft size={18} /> Back to Home
          </Link>
          <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

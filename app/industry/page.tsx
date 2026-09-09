import Link from "next/link";
import { Building2 } from "lucide-react";

export default function IndustryPage() {
  return (
    <main className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* Radial violet glow background */}
      <div
        className="absolute inset-0 z-0 opacity-90 pointer-events-none"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #000000 40%, #8C6BFA 100%)",
        }}
      />

      <div className="relative z-10 max-w-xl flex flex-col items-center">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-violet-500/15 border border-violet-400/20 mb-6 text-violet-300">
          <Building2 className="w-6 h-6" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
          Industry Dashboard
        </h1>
        <p className="text-neutral-400 text-base sm:text-lg leading-relaxed mb-8">
          Hire from a pipeline of students with verified, up-to-date skills and real-world project portfolios.
        </p>
        <Link
          href="/"
          className="inline-flex items-center text-sm text-white/60 hover:text-white border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}

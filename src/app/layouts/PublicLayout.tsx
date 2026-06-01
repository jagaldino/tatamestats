import { Outlet } from "react-router-dom";

export function PublicLayout() {
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col justify-center overflow-hidden bg-slate-950 px-4 py-8 text-slate-100">
      <div className="pointer-events-none absolute -left-16 top-10 h-48 w-48 rounded-full bg-emerald-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-12 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="relative z-10 mb-6 px-1">
        <p className="text-xs uppercase tracking-[0.22em] text-emerald-300">
          TatameStats
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-white">
          Area do atleta
        </h1>
        <p className="mt-1 text-sm text-slate-300">
          Controle sua evolucao no tatame com consistencia.
        </p>
      </div>

      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
}

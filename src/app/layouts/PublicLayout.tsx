import { Outlet } from "react-router-dom";
import { Activity } from "lucide-react"; // Sugestão de ícone (lucide-react é ótimo com Tailwind)

export function PublicLayout() {
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col justify-center overflow-hidden bg-slate-950 px-6 py-8 text-slate-100 font-sans">
      
      {/* Fundo com Grid Sutil (Traz uma textura tática/tecnológica) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Iluminação de fundo ajustada para tons mais imersivos */}
      <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-emerald-600/15 blur-3xl" />

      {/* Cabeçalho / Branding */}
      <div className="relative z-10 mb-8 flex flex-col items-center text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
           <Activity className="h-6 w-6 text-emerald-400" />
        </div>

        <p className="text-xs uppercase tracking-[0.25em] text-emerald-400 font-bold">
          TatameStats
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
          Área do Atleta
        </h1>
        <p className="mt-2 text-sm text-slate-400 max-w-[280px]">
          Domine seu peso, mapeie suas finalizações e controle sua evolução no tatame.
        </p>
      </div>

      {/* Container do Formulário (Glassmorphism sutil para destacar o Outlet) */}
      <div className="relative z-10 w-full rounded-2xl border border-slate-800/60 bg-slate-900/50 p-6 shadow-xl backdrop-blur-sm">
        <Outlet />
      </div>

      {/* Rodapé minimalista */}
      <div className="relative z-10 mt-8 text-center text-xs text-slate-600 font-medium tracking-wide">
        FOCO NA CONSISTÊNCIA. OSS.
      </div>
    </div>
  );
}
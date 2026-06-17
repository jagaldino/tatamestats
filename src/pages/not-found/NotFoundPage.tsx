import { Link } from "react-router-dom";
import { PATHS } from "@/app/router/paths";
import { ShieldAlert, MoveLeft } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 py-8 text-slate-100 font-sans text-center">
      {/* Luzes de fundo táticas (Remete ao PublicLayout) */}
      <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-rose-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-emerald-600/10 blur-3xl" />

      {/* Ícone de Alerta Estilizado */}
      <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-500/20 bg-rose-500/5 text-rose-400 shadow-xl shadow-rose-950/20">
        <ShieldAlert className="h-8 w-8" />
      </div>

      {/* Textos de Erro */}
      <div className="relative z-10 space-y-2">
        <h1 className="text-6xl font-extrabold tracking-tighter bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-xl font-bold tracking-tight text-white">
          Fora do Tatame!
        </h2>
        <p className="mx-auto max-w-[280px] text-sm text-slate-400 leading-relaxed">
          Parece que você tomou uma raspagem de um link quebrado ou essa posição
          não existe no nosso manual.
        </p>
      </div>

      {/* Botão de Retorno */}
      <div className="relative z-10 mt-8 w-full">
        <Link
          to={PATHS.app.dashboard}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 transition hover:brightness-110 active:scale-[0.99] shadow-md shadow-emerald-950/20"
        >
          <MoveLeft className="h-4 w-4 stroke-[2.5]" />
          Voltar para o Painel
        </Link>
      </div>

      {/* Nota de rodapé sutil */}
      <div className="relative z-10 mt-12 text-[10px] uppercase tracking-widest text-slate-600 font-semibold">
        TatameStats • Erro de Percurso
      </div>
    </div>
  );
}

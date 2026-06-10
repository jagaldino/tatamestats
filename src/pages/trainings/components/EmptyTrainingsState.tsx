import { Link } from "react-router-dom";
import { PATHS } from "@/app/router/paths";

export function EmptyTrainingsState() {
  return (
    <section className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/10 p-6 text-center backdrop-blur-sm">
      <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-400 font-bold">
        Histórico vazio
      </p>
      <h2 className="mt-2 text-lg font-bold tracking-tight text-white">
        Nenhum treino registrado
      </h2>
      <p className="mt-1 text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
        Monte sua rotina de consistência. Crie seu primeiro registro de treino
        para mapear sua evolução.
      </p>
      <Link
        to={PATHS.app.trainingNew}
        className="mt-5 inline-flex rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 transition hover:bg-emerald-400 active:scale-95 shadow-md shadow-emerald-950/20"
      >
        Começar Primeiro Treino
      </Link>
    </section>
  );
}

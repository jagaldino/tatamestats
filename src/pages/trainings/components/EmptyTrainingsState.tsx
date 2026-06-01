import { Link } from "react-router-dom";
import { PATHS } from "@/app/router/paths";

export function EmptyTrainingsState() {
  return (
    <section className="rounded-3xl border border-dashed border-emerald-200 bg-emerald-50 p-5 text-emerald-950 shadow-sm">
      <p className="text-xs uppercase tracking-[0.18em] text-emerald-700">
        Historico vazio
      </p>
      <h2 className="mt-2 text-xl font-semibold">Nenhum treino registrado</h2>
      <p className="mt-2 text-sm text-emerald-900/80">
        Crie seu primeiro treino para ver o historico por aqui.
      </p>
      <Link
        to={PATHS.app.trainingNew}
        className="mt-4 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white"
      >
        Novo treino
      </Link>
    </section>
  );
}

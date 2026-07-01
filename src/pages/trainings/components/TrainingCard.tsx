import { Link } from "react-router-dom";
import { PATHS } from "@/app/router/paths";
import type { Training } from "@/shared/types/domain";
import { formatDateBR } from "@/shared/utils/date";

type TrainingCardProps = {
  training: Training;
};

export function TrainingCard({ training }: TrainingCardProps) {
  return (
    <Link
      to={PATHS.app.trainingDetail.replace(":trainingId", training.id)}
      className="block rounded-2xl border border-slate-900/60 bg-slate-900/40 p-4 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-800 hover:bg-slate-900/60 active:scale-[0.99]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="inline-block rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
            {training.type === "Gi" ? "Kimono" : "No-Gi"}
          </span>
          <h3 className="mt-2 text-base font-bold tracking-tight text-white">
            {formatDateBR(training.date)}
          </h3>
        </div>
        <span className="rounded-lg bg-slate-950/60 border border-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-400">
          {training.durationMinutes} min
        </span>
      </div>

      {/* Grid de Submissões Simplificado */}
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl border border-slate-950 bg-slate-950/40 p-3">
          <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-medium">
            Aplicadas 🥋
          </p>
          <p
            className={`mt-0.5 text-base font-bold ${training.submissionsApplied > 0 ? "text-emerald-400" : "text-slate-400"}`}
          >
            {training.submissionsApplied}
          </p>
        </div>
        <div className="rounded-xl border border-slate-950 bg-slate-950/40 p-3">
          <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-medium">
            Sofridas 🤕
          </p>
          <p
            className={`mt-0.5 text-base font-bold ${training.submissionsReceived > 0 ? "text-amber-500" : "text-slate-400"}`}
          >
            {training.submissionsReceived}
          </p>
        </div>
      </div>

      {/* Prévia das notas se houver */}
      {training.notes ? (
        <p className="mt-3 line-clamp-1 text-xs text-slate-500 italic leading-relaxed">
          "{training.notes}"
        </p>
      ) : null}
    </Link>
  );
}

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
      className="block rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-emerald-600">
            {training.type}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-950">
            {formatDateBR(training.date)}
          </h3>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {training.durationMinutes} min
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Aplicadas
          </p>
          <p className="mt-1 text-lg font-semibold text-slate-900">
            {training.submissionsApplied}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Sofridas
          </p>
          <p className="mt-1 text-lg font-semibold text-slate-900">
            {training.submissionsReceived}
          </p>
        </div>
      </div>

      {training.notes ? (
        <p className="mt-4 line-clamp-2 text-sm text-slate-600">
          {training.notes}
        </p>
      ) : null}
    </Link>
  );
}

import { Link } from "react-router-dom";
import { PATHS } from "@/app/router/paths";
import { useAuthStore } from "@/domains/auth/store/useAuthStore";
import {
  selectUserTrainings,
  useTrainingStore,
} from "@/domains/training/store/useTrainingStore";
import { EmptyTrainingsState } from "@/pages/trainings/components/EmptyTrainingsState";
import { TrainingCard } from "@/pages/trainings/components/TrainingCard";

export function TrainingHistoryPage() {
  const currentUserId = useAuthStore((state) => state.currentUserId);
  const trainings = useTrainingStore((state) =>
    currentUserId ? selectUserTrainings(state, currentUserId) : [],
  );

  if (!currentUserId || trainings.length === 0) {
    return <EmptyTrainingsState />;
  }

  return (
    <div className="space-y-4 pb-6">
      <header className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-emerald-600">
            Historico
          </p>
          <h2 className="text-2xl font-semibold text-slate-950">Treinos</h2>
        </div>
        <Link
          to={PATHS.app.trainingNew}
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Novo treino
        </Link>
      </header>

      <div className="space-y-3">
        {trainings.map((training) => (
          <TrainingCard key={training.id} training={training} />
        ))}
      </div>
    </div>
  );
}

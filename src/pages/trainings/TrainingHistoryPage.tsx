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
    <div className="space-y-5 pb-24">
      <header className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-emerald-400 font-bold">
            Histórico
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Treinos
          </h2>
        </div>
        <Link
          to={PATHS.app.trainingNew}
          className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-800 active:scale-95 shadow-lg"
        >
          + Novo Treino
        </Link>
      </header>

      {/* Lista de Cards de Treino */}
      <div className="space-y-3">
        {trainings.map((training) => (
          <TrainingCard key={training.id} training={training} />
        ))}
      </div>
    </div>
  );
}

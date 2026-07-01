import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PATHS } from "@/app/router/paths";
import { useAuthStore } from "@/domains/auth/store/useAuthStore";
import {
  selectTrainingById,
  useTrainingStore,
} from "@/domains/training/store/useTrainingStore";
import { TrainingForm } from "@/pages/trainings/components/TrainingForm";
import type { TrainingFormValues } from "@/pages/trainings/types";
import { TrainingType } from "@/shared/types/domain";

export function TrainingEditPage() {
  const navigate = useNavigate();
  const { trainingId = "" } = useParams();
  const currentUserId = useAuthStore((state) => state.currentUserId);
  const training = useTrainingStore((state) =>
    selectTrainingById(state, trainingId),
  );
  const upsertTraining = useTrainingStore((state) => state.upsertTraining);
  const [error, setError] = useState<string | null>(null);
  const [values, setValues] = useState<TrainingFormValues>({
    date: "",
    durationMinutes: "",
    type: TrainingType.Gi,
    submissionsApplied: "",
    submissionsReceived: "",
    notes: "",
  });

  useEffect(() => {
    if (!training) return;

    setValues({
      date: training.date,
      durationMinutes: String(training.durationMinutes),
      type: training.type,
      submissionsApplied: String(training.submissionsApplied),
      submissionsReceived: String(training.submissionsReceived),
      notes: training.notes ?? "",
    });
  }, [training]);

  if (!training || training.userId !== currentUserId) {
    return (
      <section className="rounded-2xl border border-slate-900 bg-slate-900/40 p-6 backdrop-blur-sm text-center">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Treino não encontrado
        </h2>
      </section>
    );
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const durationMinutes = Number(values.durationMinutes);
    const submissionsApplied = Number(values.submissionsApplied);
    const submissionsReceived = Number(values.submissionsReceived);

    if (
      Number.isNaN(durationMinutes) ||
      durationMinutes <= 0 ||
      Number.isNaN(submissionsApplied) ||
      submissionsApplied < 0 ||
      Number.isNaN(submissionsReceived) ||
      submissionsReceived < 0
    ) {
      setError("Preencha os campos numéricos corretamente.");
      return;
    }

    upsertTraining({
      id: training.id,
      userId: currentUserId ?? training.userId,
      date: values.date,
      durationMinutes,
      type: values.type,
      submissionsApplied,
      submissionsReceived,
      notes: values.notes.trim() || undefined,
    });

    navigate(PATHS.app.trainingDetail.replace(":trainingId", training.id), {
      replace: true,
    });
  };

  return (
    <div className="space-y-5 pb-24">
      <div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-emerald-400 font-bold">
          Modificação
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Editar treino
        </h2>
      </div>

      <TrainingForm
        title="Editar treino"
        subtitle="Atualize os dados da sessão salva no app."
        submitLabel="Salvar alterações"
        values={values}
        onChange={setValues}
        onSubmit={handleSubmit}
        error={error}
        readOnlyDate={false}
      />
    </div>
  );
}

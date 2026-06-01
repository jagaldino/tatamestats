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
    type: "Gi",
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
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-950">
          Treino nao encontrado
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
      setError("Preencha os campos numericos corretamente.");
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
    <TrainingForm
      title="Editar treino"
      subtitle="Atualize os dados da sessao salva no app."
      submitLabel="Salvar alterações"
      values={values}
      onChange={setValues}
      onSubmit={handleSubmit}
      error={error}
      readOnlyDate={false}
    />
  );
}

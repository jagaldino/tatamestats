import { FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "@/shared/ui/BackButton";
import { PATHS } from "@/app/router/paths";
import { useAuthStore } from "@/domains/auth/store/useAuthStore";
import { useTrainingStore } from "@/domains/training/store/useTrainingStore";
import { TrainingForm } from "@/pages/trainings/components/TrainingForm";
import type { TrainingFormValues } from "@/pages/trainings/types";
import { createLocalDateISO } from "@/shared/utils/date";

export function NewTrainingPage() {
  const navigate = useNavigate();
  const currentUserId = useAuthStore((state) => state.currentUserId);
  const createTraining = useTrainingStore((state) => state.createTraining);

  const today = useMemo(() => createLocalDateISO(new Date()), []);
  const [values, setValues] = useState<TrainingFormValues>({
    date: today,
    durationMinutes: "",
    type: "Gi",
    submissionsApplied: "",
    submissionsReceived: "",
    notes: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!currentUserId) {
      setError("Usuário não autenticado.");
      return;
    }

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

    const trainingId = createTraining({
      userId: currentUserId,
      date: values.date,
      durationMinutes,
      type: values.type,
      submissionsApplied,
      submissionsReceived,
      notes: values.notes.trim() || undefined,
    });

    navigate(PATHS.app.trainingDetail.replace(":trainingId", trainingId), {
      replace: true,
    });
  };

  return (
    <div className="space-y-5 pb-24">
      <div className="flex items-center gap-3">
        <BackButton fallbackPath={PATHS.app.trainings} />
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-emerald-400 font-bold">
            Registro
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-white">Novo treino</h2>
        </div>
      </div>

      <TrainingForm
        title="Novo treino"
        submitLabel="Salvar treino"
        subtitle="Registre a sessão com data automática e acompanhe a evolução."
        values={values}
        onChange={setValues}
        onSubmit={handleSubmit}
        error={error}
        readOnlyDate
      />
    </div>
  );
}
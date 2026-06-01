import { Link, useNavigate, useParams } from "react-router-dom";
import { PATHS } from "@/app/router/paths";
import { useAuthStore } from "@/domains/auth/store/useAuthStore";
import {
  selectTrainingById,
  useTrainingStore,
} from "@/domains/training/store/useTrainingStore";
import { formatDateBR } from "@/shared/utils/date";
import { useState } from "react";
import { BackButton } from "@/shared/ui/BackButton";

export function TrainingDetailPage() {
  const navigate = useNavigate();
  const { trainingId = "" } = useParams();
  const currentUserId = useAuthStore((state) => state.currentUserId);
  const training = useTrainingStore((state) =>
    selectTrainingById(state, trainingId),
  );
  const removeTraining = useTrainingStore((state) => state.removeTraining);
  const [copyMsg, setCopyMsg] = useState<string | null>(null);

  if (!training || training.userId !== currentUserId) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-950">
          Treino nao encontrado
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          O registro solicitado pode ter sido removido ou nao pertence ao
          usuario atual.
        </p>
        <Link
          to={PATHS.app.trainings}
          className="mt-4 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          Voltar ao historico
        </Link>
      </section>
    );
  }

  const handleDelete = () => {
    removeTraining(training.id);
    navigate(PATHS.app.trainings, { replace: true });
  };

  return (
    <div className="space-y-4 pb-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <BackButton fallbackPath={PATHS.app.trainings} />
        </div>
        <p className="text-xs uppercase tracking-[0.22em] text-emerald-600">
          Detalhe do treino
        </p>
        <h2 className="mt-1 text-2xl font-semibold text-slate-950">
          {training.type}
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          {formatDateBR(training.date)}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <InfoBox label="Duração" value={`${training.durationMinutes} min`} />
          <InfoBox
            label="Aplicadas"
            value={String(training.submissionsApplied)}
          />
          <InfoBox
            label="Sofridas"
            value={String(training.submissionsReceived)}
          />
          <InfoBox label="Tipo" value={training.type} />
        </div>

        {training.notes ? (
          <div className="mt-4 rounded-2xl bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Observações
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {training.notes}
            </p>
          </div>
        ) : null}

        <div className="mt-5 flex gap-3">
          <Link
            to={PATHS.app.trainingEdit.replace(":trainingId", training.id)}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Editar
          </Link>
          <button
            type="button"
            onClick={async () => {
              const shareText = `Treino: ${training.type}\nData: ${formatDateBR(training.date)}\nDuração: ${training.durationMinutes} min\nFinalizações aplicadas: ${training.submissionsApplied}\nFinalizações sofridas: ${training.submissionsReceived}`;

              if (navigator.share) {
                try {
                  await navigator.share({
                    title: `Treino — ${training.type}`,
                    text: shareText,
                  });
                } catch (err) {
                  // usuário cancelou ou ocorreu erro; não bloquear
                }
                return;
              }

              // Fallback: copiar para a área de transferência
              try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                  await navigator.clipboard.writeText(shareText);
                  setCopyMsg("Conteúdo copiado para a área de transferência");
                } else {
                  // última alternativa: prompt com o texto para o usuário copiar manualmente
                  // eslint-disable-next-line no-alert
                  window.prompt("Copie o conteúdo abaixo:", shareText);
                }
              } catch (err) {
                // eslint-disable-next-line no-alert
                window.alert(
                  "Não foi possível compartilhar este treino neste navegador.",
                );
              }
            }}
            className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950"
          >
            Compartilhar treino
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-full bg-rose-600 px-4 py-2 text-sm font-medium text-white"
          >
            Excluir
          </button>
        </div>
        {copyMsg ? (
          <p className="mt-2 text-sm text-slate-500">{copyMsg}</p>
        ) : null}
      </section>
    </div>
  );
}

type InfoBoxProps = {
  label: string;
  value: string;
};

function InfoBox({ label, value }: InfoBoxProps) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold text-slate-950">{value}</p>
    </div>
  );
}

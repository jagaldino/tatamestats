import { Link, useNavigate, useParams } from "react-router-dom";
import { PATHS } from "@/app/router/paths";
import { useAuthStore } from "@/domains/auth/store/useAuthStore";
import {
  selectTrainingById,
  useTrainingStore,
} from "@/domains/training/store/useTrainingStore";
import { formatDateBR } from "@/shared/utils/date";
import { useState } from "react";

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
      <section className="rounded-2xl border border-slate-900 bg-slate-900/40 p-6 backdrop-blur-sm text-center">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Treino não encontrado
        </h2>
        <p className="mt-2 text-sm text-slate-400 leading-relaxed">
          O registro solicitado pode ter sido removido ou não pertence ao
          usuário atual.
        </p>
      </section>
    );
  }

  const handleDelete = () => {
    removeTraining(training.id);
    navigate(PATHS.app.trainings, { replace: true });
  };

  return (
    <div className="space-y-5 pb-24">
      <section className="rounded-2xl border border-slate-900 bg-slate-900/30 p-5 backdrop-blur-sm">
        <p className="text-[10px] uppercase tracking-[0.22em] text-emerald-400 font-bold">
          Detalhes do treino
        </p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
          Treino {training.type}
        </h2>
        <p className="mt-1 text-xs text-slate-400 font-medium">
          {formatDateBR(training.date)}
        </p>

        {/* Métricas em Grid */}
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <InfoBox label="Duração" value={`${training.durationMinutes} min`} />
          <InfoBox
            label="Tipo de Treino"
            value={training.type === "Gi" ? "Com Kimono" : "No-Gi"}
          />
          <InfoBox
            label="Aplicadas 🥋"
            value={String(training.submissionsApplied)}
            isSuccess={training.submissionsApplied > 0}
          />
          <InfoBox
            label="Sofridas 🤕"
            value={String(training.submissionsReceived)}
            isWarning={training.submissionsReceived > 0}
          />
        </div>

        {/* Bloco de Observações / Notas */}
        {training.notes ? (
          <div className="mt-4 rounded-xl border border-slate-900 bg-slate-950/60 p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
              Observações do rola
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300 whitespace-pre-wrap">
              {training.notes}
            </p>
          </div>
        ) : null}

        {/* Ações principais */}
        <div className="mt-6 flex flex-col gap-2.5">
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
                  // Abafado intencionalmente
                }
                return;
              }

              try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                  await navigator.clipboard.writeText(shareText);
                  setCopyMsg("Copiado para a área de transferência! 🥋");
                  setTimeout(() => setCopyMsg(null), 3000);
                } else {
                  window.prompt("Copie o conteúdo abaixo:", shareText);
                }
              } catch (err) {
                window.alert("Não foi possível compartilhar neste navegador.");
              }
            }}
            className="w-full rounded-xl bg-emerald-500 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 transition hover:bg-emerald-400 active:scale-[0.99]"
          >
            Compartilhar treino
          </button>

          <div className="flex gap-2">
            <Link
              to={PATHS.app.trainingEdit.replace(":trainingId", training.id)}
              className="flex-1 text-center rounded-xl bg-slate-900 border border-slate-800 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-800"
            >
              Editar dados
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 rounded-xl bg-rose-950/30 border border-rose-900/40 py-2.5 text-xs font-semibold text-rose-400 transition hover:bg-rose-900/20 active:scale-[0.98]"
            >
              Excluir treino
            </button>
          </div>
        </div>

        {copyMsg ? (
          <p className="mt-3 text-center text-xs font-medium text-emerald-400 animate-pulse">
            {copyMsg}
          </p>
        ) : null}
      </section>
    </div>
  );
}

type InfoBoxProps = {
  label: string;
  value: string;
  isSuccess?: boolean;
  isWarning?: boolean;
};

function InfoBox({ label, value, isSuccess, isWarning }: InfoBoxProps) {
  let borderClass = "border-slate-900 bg-slate-950/40";
  let valueClass = "text-white";

  if (isSuccess) {
    borderClass = "border-emerald-950 bg-emerald-950/10";
    valueClass = "text-emerald-400";
  } else if (isWarning) {
    borderClass = "border-amber-950 bg-amber-950/10";
    valueClass = "text-amber-400";
  }

  return (
    <div className={`rounded-xl border p-4 backdrop-blur-sm ${borderClass}`}>
      <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-semibold">
        {label}
      </p>
      <p className={`mt-1.5 text-base font-bold tracking-tight ${valueClass}`}>
        {value}
      </p>
    </div>
  );
}

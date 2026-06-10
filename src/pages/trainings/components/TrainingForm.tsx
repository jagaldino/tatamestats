import type { FormEvent, Dispatch, SetStateAction } from "react";
import { TrainingType } from "@/shared/types/domain";
import type { TrainingFormValues } from "@/pages/trainings/types";

type TrainingFormProps = {
  title: string;
  subtitle: string;
  submitLabel: string;
  values: TrainingFormValues;
  onChange: Dispatch<SetStateAction<TrainingFormValues>>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  error?: string | null;
  readOnlyDate?: boolean;
};

export function TrainingForm({
  title,
  subtitle,
  submitLabel,
  values,
  onChange,
  onSubmit,
  error,
  readOnlyDate = false,
}: TrainingFormProps) {
  return (
    <section className="rounded-2xl border border-slate-900 bg-slate-900/30 p-5 backdrop-blur-sm">
      <p className="text-[10px] uppercase tracking-[0.22em] text-emerald-400 font-bold">
        {title}
      </p>
      <p className="mt-1 text-sm text-slate-400 leading-relaxed">{subtitle}</p>

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        {/* Campo: Data */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-400">
            Data do rola
          </label>
          <input
            name="date"
            type="date"
            value={values.date}
            readOnly={readOnlyDate}
            className="w-full rounded-xl border border-slate-900 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 read-only:cursor-not-allowed read-only:opacity-60"
            onChange={(event) =>
              onChange((current) => ({ ...current, date: event.target.value }))
            }
          />
        </div>

        {/* Campo: Duração */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-400">
            Duração (minutos)
          </label>
          <input
            name="durationMinutes"
            type="number"
            min="1"
            step="1"
            value={values.durationMinutes}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                durationMinutes: event.target.value,
              }))
            }
            className="w-full rounded-xl border border-slate-900 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
            placeholder="Ex.: 90"
          />
        </div>

        {/* Campo: Tipo (Gi / No-Gi) */}
        <div>
          <p className="mb-2 block text-xs font-semibold text-slate-400">
            Tipo de treino
          </p>
          <div className="grid grid-cols-2 gap-3">
            {([TrainingType.Gi, TrainingType.NoGi] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => onChange((current) => ({ ...current, type }))}
                className={`rounded-xl border py-3 text-xs font-bold uppercase tracking-wider transition active:scale-[0.98] ${
                  values.type === type
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                    : "border-slate-900 bg-slate-950/40 text-slate-400 hover:bg-slate-900/50"
                }`}
              >
                {type === "Gi" ? "🥋 Com Kimono" : "🤼‍♂️ No-Gi"}
              </button>
            ))}
          </div>
        </div>

        {/* Campos: Finalizações em Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-400">
              Finalizações aplicadas
            </label>
            <input
              name="submissionsApplied"
              type="number"
              min="0"
              step="1"
              value={values.submissionsApplied}
              onChange={(event) =>
                onChange((current) => ({
                  ...current,
                  submissionsApplied: event.target.value,
                }))
              }
              className="w-full rounded-xl border border-slate-900 bg-slate-950/60 px-4 py-3 text-sm text-emerald-400 placeholder-slate-700 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 font-semibold"
              placeholder="0"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-400">
              Finalizações sofridas
            </label>
            <input
              name="submissionsReceived"
              type="number"
              min="0"
              step="1"
              value={values.submissionsReceived}
              onChange={(event) =>
                onChange((current) => ({
                  ...current,
                  submissionsReceived: event.target.value,
                }))
              }
              className="w-full rounded-xl border border-slate-900 bg-slate-950/60 px-4 py-3 text-sm text-amber-500 placeholder-slate-700 outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 font-semibold"
              placeholder="0"
            />
          </div>
        </div>

        {/* Campo: Observações */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-400">
            Observações e feedbacks do rola
          </label>
          <textarea
            name="notes"
            value={values.notes}
            onChange={(event) =>
              onChange((current) => ({ ...current, notes: event.target.value }))
            }
            rows={3}
            className="w-full resize-none rounded-xl border border-slate-900 bg-slate-950/60 px-4 py-3 text-sm text-slate-300 placeholder-slate-600 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 leading-relaxed"
            placeholder="Mencionou alguma raspagem? Ajuste de lapela?"
          />
        </div>

        {/* Caixa de Erro Interno */}
        {error ? (
          <p className="rounded-xl border border-rose-950 bg-rose-950/20 px-4 py-3 text-xs font-medium text-rose-400">
            ⚠️ {error}
          </p>
        ) : null}

        {/* Botão de Envio */}
        <button
          type="submit"
          className="w-full mt-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 transition hover:brightness-110 active:scale-[0.99] shadow-md shadow-emerald-950/20"
        >
          {submitLabel}
        </button>
      </form>
    </section>
  );
}

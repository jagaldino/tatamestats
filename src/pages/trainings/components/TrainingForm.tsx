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
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs uppercase tracking-[0.22em] text-emerald-600">
        {title}
      </p>
      <h2 className="mt-1 text-2xl font-semibold text-slate-950">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">{subtitle}</p>

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Data
          </label>
          <input
            name="date"
            type="date"
            value={values.date}
            readOnly={readOnlyDate}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none ring-emerald-400 transition focus:ring-2 read-only:cursor-not-allowed"
            onChange={(event) =>
              onChange((current) => ({ ...current, date: event.target.value }))
            }
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
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
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none ring-emerald-400 transition focus:ring-2"
            placeholder="Ex.: 90"
          />
        </div>

        <div>
          <p className="mb-2 block text-sm font-medium text-slate-700">Tipo</p>
          <div className="grid grid-cols-2 gap-3">
            {([TrainingType.Gi, TrainingType.NoGi] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => onChange((current) => ({ ...current, type }))}
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                  values.type === type
                    ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                    : "border-slate-200 bg-slate-50 text-slate-700"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
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
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none ring-emerald-400 transition focus:ring-2"
              placeholder="0"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
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
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none ring-emerald-400 transition focus:ring-2"
              placeholder="0"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Observações
          </label>
          <textarea
            name="notes"
            value={values.notes}
            onChange={(event) =>
              onChange((current) => ({ ...current, notes: event.target.value }))
            }
            rows={4}
            className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none ring-emerald-400 transition focus:ring-2"
            placeholder="Como foi o treino?"
          />
        </div>

        {error ? (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="w-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-105"
        >
          {submitLabel}
        </button>
      </form>
    </section>
  );
}

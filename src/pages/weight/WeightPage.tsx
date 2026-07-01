import { FormEvent, useMemo, useState } from "react";
import { useAuthStore } from "@/domains/auth/store/useAuthStore";
import {
  selectProfileByUserId,
  useAthleteStore,
} from "@/domains/athlete/store/useAthleteStore";
import { DEFAULT_WEIGHT_LIMIT_KG } from "@/shared/types/domain";
import { Scale, Target, Trophy } from "lucide-react";

export function WeightPage() {
  const currentUserId = useAuthStore((state) => state.currentUserId);
  const profile = useAthleteStore((state) =>
    currentUserId ? selectProfileByUserId(state, currentUserId) : null,
  );
  const upsertProfile = useAthleteStore((state) => state.upsertProfile);

  const [currentWeight, setCurrentWeight] = useState(
    profile?.currentWeight ? String(profile.currentWeight) : "",
  );
  const [weightLimit, setWeightLimit] = useState(
    profile?.weightLimit
      ? String(profile.weightLimit)
      : String(DEFAULT_WEIGHT_LIMIT_KG),
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Cálculo dinâmico de status da categoria
  const weightStatus = useMemo(() => {
    const weight = Number(currentWeight);
    const limit = Number(weightLimit);

    if (
      Number.isNaN(weight) ||
      weight <= 0 ||
      Number.isNaN(limit) ||
      limit <= 0
    ) {
      return null;
    }

    const diff = weight - limit;
    return {
      isOver: diff > 0,
      diffAbs: Math.abs(diff).toFixed(1),
    };
  }, [currentWeight, weightLimit]);

  const isFormValid = useMemo(() => {
    return Number(currentWeight) > 0 && Number(weightLimit) > 0;
  }, [currentWeight, weightLimit]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess(false);

    if (!currentUserId) {
      setError("Usuário não autenticado.");
      return;
    }

    const weightValue = Number(currentWeight);
    const limitValue = Number(weightLimit);

    if (
      Number.isNaN(weightValue) ||
      weightValue <= 0 ||
      Number.isNaN(limitValue) ||
      limitValue <= 0
    ) {
      setError("Informe valores de peso válidos.");
      return;
    }

    upsertProfile({
      userId: currentUserId,
      currentWeight: weightValue,
      weightLimit: limitValue,
    });

    setError(null);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-5 pb-24">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-900 bg-slate-900/40 text-emerald-400">
          <Scale className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-emerald-400 font-bold">
            Metas
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Controle de Peso
          </h2>
        </div>
      </div>

      {/* Card de Análise de Peso em Tempo Real */}
      {weightStatus && (
        <div
          className={`rounded-2xl border p-5 backdrop-blur-sm transition-all ${
            weightStatus.isOver
              ? "border-amber-500/20 bg-amber-950/10 text-amber-400"
              : "border-emerald-500/20 bg-emerald-950/10 text-emerald-400"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950/50">
              <Trophy className="h-4 w-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Status da Categoria
              </p>
              <p className="mt-0.5 text-base font-bold text-white">
                {weightStatus.isOver
                  ? `Acima do limite por ${weightStatus.diffAbs} kg`
                  : "Peso batido! Dentro do limite"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Formulário de Configuração de Peso */}
      <section className="rounded-2xl border border-slate-900 bg-slate-900/30 p-5 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input: Peso Atual */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-400">
              Peso Atual Balança (kg)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={currentWeight}
              onChange={(event) => setCurrentWeight(event.target.value)}
              className="w-full rounded-xl border border-slate-900 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder-slate-700 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
              placeholder="Ex.: 94.0"
            />
          </div>

          {/* Input: Limite da Categoria */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-400">
              Limite da Categoria Desejada (kg)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="0"
                value={weightLimit}
                onChange={(event) => setWeightLimit(event.target.value)}
                className="w-full rounded-xl border border-slate-900 bg-slate-950/60 pl-4 pr-12 py-3 text-sm text-white placeholder-slate-700 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
                placeholder="Ex.: 100.0"
              />
              <Target className="absolute right-4 top-3.5 h-4 w-4 text-slate-600" />
            </div>
          </div>

          {/* Feedbacks Lógicos */}
          {error && (
            <p className="rounded-xl border border-rose-950 bg-rose-950/20 px-4 py-3 text-xs font-medium text-rose-400">
              ⚠️ {error}
            </p>
          )}

          {success && (
            <p className="rounded-xl border border-emerald-950 bg-emerald-950/20 px-4 py-3 text-xs font-medium text-emerald-400">
              ✓ Peso e categoria atualizados com sucesso!
            </p>
          )}

          {/* Botão de Envio */}
          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full mt-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 shadow-md"
          >
            Atualizar Peso
          </button>
        </form>
      </section>
    </div>
  );
}

import { FormEvent, useMemo, useState } from "react";
import { BackButton } from "@/shared/ui/BackButton";
import { PATHS } from "@/app/router/paths";
import { useAuthStore } from "@/domains/auth/store/useAuthStore";
import {
  selectProfileByUserId,
  useAthleteStore,
} from "@/domains/athlete/store/useAthleteStore";
import { DEFAULT_WEIGHT_LIMIT_KG } from "@/shared/types/domain";

export function ProfilePage() {
  const currentUser = useAuthStore((state) =>
    state.currentUserId ? (state.usersById[state.currentUserId] ?? null) : null,
  );
  const currentUserId = useAuthStore((state) => state.currentUserId);
  const updateUser = useAuthStore((state) => state.updateUser);
  const profile = useAthleteStore((state) =>
    currentUserId ? selectProfileByUserId(state, currentUserId) : null,
  );
  const upsertProfile = useAthleteStore((state) => state.upsertProfile);

  const [name, setName] = useState(currentUser?.name ?? "");
  const [currentWeight, setCurrentWeight] = useState(
    profile?.currentWeight ? String(profile.currentWeight) : "",
  );
  const [error, setError] = useState<string | null>(null);

  const isFormValid = useMemo(
    () => name.trim().length >= 2 && Number(currentWeight) > 0,
    [name, currentWeight],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!currentUserId) {
      setError("Usuário não autenticado.");
      return;
    }

    const weightValue = Number(currentWeight);

    if (name.trim().length < 2) {
      setError("Informe um nome válido.");
      return;
    }

    if (Number.isNaN(weightValue) || weightValue <= 0) {
      setError("Informe um peso válido.");
      return;
    }

    const userResult = updateUser(currentUserId, { name: name.trim() });
    if (!userResult.ok) {
      setError(userResult.message ?? "Não foi possível atualizar o nome.");
      return;
    }

    upsertProfile({
      userId: currentUserId,
      currentWeight: weightValue,
      weightLimit: profile?.weightLimit ?? DEFAULT_WEIGHT_LIMIT_KG,
    });

    setError(null);
  };

  return (
    <div className="space-y-5 pb-24">
      {/* Cabeçalho de Página Unificado */}
      <div className="flex items-center gap-3">
        <BackButton fallbackPath={PATHS.app.dashboard} />
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-emerald-400 font-bold">
            Perfil
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Atualizar dados
          </h2>
        </div>
      </div>

      {/* Formulário do Atleta */}
      <section className="rounded-2xl border border-slate-900 bg-slate-900/30 p-5 backdrop-blur-sm">
        <p className="text-xs text-slate-400 leading-relaxed">
          Edite seu nome de competidor e peso atual usando apenas armazenamento
          local.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Campo: Nome */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-400">
              Nome Completo
            </label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-xl border border-slate-900 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
              placeholder="Seu nome"
            />
          </div>

          {/* Campo: Peso */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-400">
              Peso Atual (kg)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={currentWeight}
              onChange={(event) => setCurrentWeight(event.target.value)}
              className="w-full rounded-xl border border-slate-900 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 font-medium"
              placeholder="Ex.: 82.5"
            />
          </div>

          {/* Tratamento de Erros Visual */}
          {error ? (
            <p className="rounded-xl border border-rose-950 bg-rose-950/20 px-4 py-3 text-xs font-medium text-rose-400">
              ⚠️ {error}
            </p>
          ) : null}

          {/* Ação de Submissão */}
          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full mt-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 shadow-md shadow-emerald-950/20"
          >
            Salvar perfil
          </button>
        </form>
      </section>
    </div>
  );
}

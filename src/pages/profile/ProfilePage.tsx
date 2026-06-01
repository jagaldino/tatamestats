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
      setError("Usuario nao autenticado.");
      return;
    }

    const weightValue = Number(currentWeight);

    if (name.trim().length < 2) {
      setError("Informe um nome valido.");
      return;
    }

    if (Number.isNaN(weightValue) || weightValue <= 0) {
      setError("Informe um peso valido.");
      return;
    }

    const userResult = updateUser(currentUserId, { name: name.trim() });
    if (!userResult.ok) {
      setError(userResult.message ?? "Nao foi possivel atualizar o nome.");
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
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3">
        <BackButton fallbackPath={PATHS.app.dashboard} />
      </div>
      <p className="text-xs uppercase tracking-[0.22em] text-emerald-600">
        Perfil
      </p>
      <h2 className="mt-1 text-2xl font-semibold text-slate-950">
        Atualizar dados
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Edite seu nome e peso atual usando apenas armazenamento local.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Nome
          </label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none ring-emerald-400 transition focus:ring-2"
            placeholder="Seu nome"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Peso atual
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            value={currentWeight}
            onChange={(event) => setCurrentWeight(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none ring-emerald-400 transition focus:ring-2"
            placeholder="Ex.: 82.5"
          />
        </div>

        {error ? (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={!isFormValid}
          className="w-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 text-sm font-semibold text-slate-950 transition enabled:hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Salvar perfil
        </button>
      </form>
    </section>
  );
}

import { FormEvent, useMemo, useState } from "react";
import { BackButton } from "@/shared/ui/BackButton";
import { PATHS } from "@/app/router/paths";
import { useAuthStore } from "@/domains/auth/store/useAuthStore";
import { Camera, User } from "lucide-react";

export function ProfilePage() {
  const currentUser = useAuthStore((state) =>
    state.currentUserId ? (state.usersById[state.currentUserId] ?? null) : null,
  );
  const currentUserId = useAuthStore((state) => state.currentUserId);
  const updateUser = useAuthStore((state) => state.updateUser);

  const [name, setName] = useState(currentUser?.name ?? "");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Validação focada apenas no tamanho do nome do competidor
  const isFormValid = useMemo(() => name.trim().length >= 2, [name]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess(false);

    if (!currentUserId) {
      setError("Usuário não autenticado.");
      return;
    }

    if (name.trim().length < 2) {
      setError("Informe um nome válido.");
      return;
    }

    const userResult = updateUser(currentUserId, { name: name.trim() });
    if (!userResult.ok) {
      setError(userResult.message ?? "Não foi possível atualizar o nome.");
      return;
    }

    setError(null);
    setSuccess(true);

    // Timer para suavizar o feedback de sucesso na tela
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-5 pb-24">
      {/* Cabeçalho de Página */}
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

      {/* Card Principal de Configuração */}
      <section className="rounded-2xl border border-slate-900 bg-slate-900/30 p-5 backdrop-blur-sm flex flex-col items-center text-center">
        {/* Componente de Foto de Perfil (Placeholder Avançado com Hover) */}
        <div className="relative mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-slate-950 border border-slate-800 shadow-inner group">
          <User className="h-10 w-10 text-slate-700 transition-colors group-hover:text-slate-500" />
          <button
            type="button"
            className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-not-allowed"
            title="Upload de imagem indisponível no MVP"
          >
            <Camera className="h-5 w-5 text-slate-200" />
          </button>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed max-w-[280px] mb-5">
          Edite seu nome de competidor e foto de perfil utilizando apenas
          armazenamento local.
        </p>

        <form onSubmit={handleSubmit} className="w-full text-left space-y-4">
          {/* Campo Único: Nome */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-400">
              Nome Completo
            </label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-xl border border-slate-900 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
              placeholder="Seu nome de atleta"
            />
          </div>

          {/* Estado de Erro */}
          {error && (
            <p className="rounded-xl border border-rose-950 bg-rose-950/20 px-4 py-3 text-xs font-medium text-rose-400">
              ⚠️ {error}
            </p>
          )}

          {/* Estado de Sucesso */}
          {success && (
            <p className="rounded-xl border border-emerald-950 bg-emerald-950/20 px-4 py-3 text-xs font-medium text-emerald-400">
              ✓ Dados do perfil atualizados com sucesso!
            </p>
          )}

          {/* Botão de Envio Simplificado */}
          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full mt-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 shadow-md shadow-emerald-950/20"
          >
            Salvar Perfil
          </button>
        </form>
      </section>
    </div>
  );
}

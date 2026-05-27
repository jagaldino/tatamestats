import type { ReactNode } from "react";
import { navigateTo } from "../../lib/navigation";
import { logout } from "../../lib/auth";

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  const handleLogout = () => {
    logout();
    navigateTo("/login");
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-6 text-zinc-100">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-green-500">
            TatameStats
          </p>
          <p className="mt-2 text-sm text-zinc-400">Área protegida</p>

          <nav className="mt-6 space-y-2 text-sm">
            <button
              className="block w-full rounded-xl border border-zinc-800 px-4 py-3 text-left text-zinc-300 hover:border-green-600 hover:text-white"
              onClick={() => navigateTo("/app/dashboard")}
            >
              Dashboard
            </button>
            <button
              className="block w-full rounded-xl border border-zinc-800 px-4 py-3 text-left text-zinc-300 hover:border-green-600 hover:text-white"
              onClick={() => navigateTo("/app/treinos")}
            >
              Treinos
            </button>
            <button
              className="block w-full rounded-xl border border-zinc-800 px-4 py-3 text-left text-zinc-300 hover:border-green-600 hover:text-white"
              onClick={() => navigateTo("/app/treinos/novo")}
            >
              Novo treino
            </button>
            <button
              className="block w-full rounded-xl border border-zinc-800 px-4 py-3 text-left text-zinc-300 hover:border-green-600 hover:text-white"
              onClick={() => navigateTo("/app/perfil")}
            >
              Perfil
            </button>
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-6 w-full rounded-xl border border-red-500/40 px-4 py-3 text-sm font-semibold text-red-400 transition hover:border-red-500 hover:text-red-300"
          >
            Sair
          </button>
        </aside>

        <section className="flex flex-col gap-6">{children}</section>
      </div>
    </main>
  );
}

import { navigateTo } from "../lib/navigation";

export function TopBar() {
  return (
    <header className="rounded-3xl border border-zinc-800 bg-zinc-900/80 px-5 py-4 backdrop-blur">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-green-500">
            TatameStats
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            Jiu-Jitsu, peso e evolução em um só fluxo.
          </p>
        </div>

        <nav className="flex flex-wrap gap-2 text-sm">
          <button
            onClick={() => navigateTo("/")}
            className="rounded-full border border-zinc-700 px-4 py-2 text-zinc-300 transition hover:border-green-600 hover:text-white"
          >
            Home
          </button>
          <button
            onClick={() => navigateTo("/login")}
            className="rounded-full border border-zinc-700 px-4 py-2 text-zinc-300 transition hover:border-green-600 hover:text-white"
          >
            Login
          </button>
          <button
            onClick={() => navigateTo("/cadastro")}
            className="rounded-full border border-zinc-700 px-4 py-2 text-zinc-300 transition hover:border-green-600 hover:text-white"
          >
            Cadastro
          </button>
        </nav>
      </div>
    </header>
  );
}

import { PageShell } from "../components/PageShell";
import { SectionCard } from "../components/SectionCard";
import { TopBar } from "../components/TopBar";
import { navigateTo } from "../lib/navigation";

export function DashboardPage() {
  return (
    <PageShell>
      <TopBar />

      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-2xl shadow-black/30">
        <p className="text-sm uppercase tracking-[0.24em] text-zinc-400">
          Dashboard
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
          Área do atleta
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-400 sm:text-base">
          Visão rápida do diário de tatame com foco em consistência, evolução
          técnica e controle do peso para competição.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-sm text-zinc-400">Treinos do mês</p>
          <p className="mt-3 text-4xl font-bold text-green-500">15</p>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-sm text-zinc-400">Finalizações</p>
          <p className="mt-3 text-4xl font-bold text-green-500">38%</p>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-sm text-zinc-400">Peso atual</p>
          <p className="mt-3 text-4xl font-bold text-red-500">98.7kg</p>
        </div>
      </section>

      <SectionCard title="Resumo do mês">
        <p>
          Você registrou <span className="text-white">15 treinos</span>, manteve
          o peso dentro da faixa e acumulou evolução nos rolas com
          acompanhamento centralizado.
        </p>
      </SectionCard>

      <button
        type="button"
        onClick={() => navigateTo("/")}
        className="w-full rounded-xl border border-green-600 px-4 py-3 text-sm font-semibold text-green-500 transition active:scale-[0.99]"
      >
        Voltar para a home
      </button>
    </PageShell>
  );
}

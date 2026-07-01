import { Navigate, Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Clock3,
  ShieldCheck,
  Target,
  Trophy,
} from "lucide-react";
import { PATHS } from "@/app/router/paths";
import { useAuthStore } from "@/domains/auth/store/useAuthStore";

const highlights = [
  {
    icon: Activity,
    title: "Evolução em tempo real",
    description: "Acompanhe treinos, peso e consistência sem perder o ritmo.",
  },
  {
    icon: ShieldCheck,
    title: "Dados organizados",
    description:
      "Centralize seu histórico em um painel simples e rápido de acessar.",
  },
  {
    icon: BarChart3,
    title: "Leitura clara de progresso",
    description:
      "Enxergue padrões, ajuste a rotina e treine com mais intenção.",
  },
];

const steps = [
  "Crie sua conta e salve seu perfil de atleta.",
  "Registre treinos, peso e evolução ao longo da semana.",
  "Use os dados para ajustar o foco e evoluir com consistência.",
];

export function LandingPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={PATHS.app.dashboard} replace />;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      {/* Background dinâmico em gradiente e malha de grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.15),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_30%),linear-gradient(to_bottom,_rgba(15,23,42,0.95),_rgba(2,6,23,1))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 [mask-image:radial-gradient(circle_at_center,black_60%,transparent_100%)]" />
      <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-4 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-6 py-8">
        {/* Header / Branding */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-900 bg-slate-900/80 shadow-lg">
              <Activity className="h-5 w-5 text-emerald-400" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-emerald-400">
                TatameStats
              </p>
              <p className="text-xs text-slate-400">
                Seu painel pessoal de evolução
              </p>
            </div>
          </div>

          <Link
            to={PATHS.auth.login}
            className="rounded-xl border border-slate-900 bg-slate-900/40 px-4 py-2 text-xs font-semibold text-slate-200 backdrop-blur transition hover:bg-slate-900 hover:text-white active:scale-95"
          >
            Entrar
          </Link>
        </header>

        {/* Seção Principal / Hero */}
        <section className="flex flex-1 flex-col justify-center py-8 text-left">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
            Plataforma pública para atletas
          </div>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white">
            Organize treino, peso e progresso em um único lugar.
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Monitore suas categorias de campeonato, mapeie finalizações
            aplicadas e domine sua consistência.
          </p>

          {/* Chamadas para Ação */}
          <div className="mt-6 flex flex-col gap-3">
            <Link
              to={PATHS.auth.register}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-md shadow-emerald-950/20 transition hover:brightness-110 active:scale-[0.99]"
            >
              Criar minha conta
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </Link>
            <Link
              to={PATHS.auth.login}
              className="inline-flex items-center justify-center rounded-xl border border-slate-900 bg-slate-900/30 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-300 transition hover:bg-slate-900/50 hover:text-white"
            >
              Já tenho acesso
            </Link>
          </div>

          {/* Destaques (Cards) */}
          <div className="mt-8 grid gap-3">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-900 bg-slate-900/40 p-4 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-white tracking-tight">
                        {item.title}
                      </h2>
                      <p className="mt-1 text-xs leading-relaxed text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Pilares Rápidos */}
        <section className="grid grid-cols-3 gap-3 pb-5">
          <article className="rounded-2xl border border-slate-900 bg-slate-900/40 p-3 flex flex-col justify-between backdrop-blur-sm text-left">
            <Clock3 className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="mt-2 text-lg font-bold text-white leading-none">
                24/7
              </p>
              <p className="mt-1 text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                Acesso
              </p>
            </div>
          </article>
          <article className="rounded-2xl border border-slate-900 bg-slate-900/40 p-3 flex flex-col justify-between backdrop-blur-sm text-left">
            <Target className="h-4 w-4 text-emerald-400" />
            <div>
              <p className="mt-2 text-lg font-bold text-white leading-none">
                Foco
              </p>
              <p className="mt-1 text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                Objetivo
              </p>
            </div>
          </article>
          <article className="rounded-2xl border border-slate-900 bg-slate-900/40 p-3 flex flex-col justify-between backdrop-blur-sm text-left">
            <Trophy className="h-4 w-4 text-amber-400" />
            <div>
              <p className="mt-2 text-lg font-bold text-white leading-none">
                Evolução
              </p>
              <p className="mt-1 text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                Constância
              </p>
            </div>
          </article>
        </section>

        {/* Bloco explicativo: Como Funciona */}
        <section className="rounded-2xl border border-slate-900 bg-slate-900/30 p-5 text-left backdrop-blur-sm">
          <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-bold">
            Como funciona
          </p>
          <div className="mt-4 space-y-3.5">
            {steps.map((step, index) => (
              <div key={step} className="flex gap-3 items-start">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-[11px] font-bold text-emerald-400 border border-emerald-500/10">
                  {index + 1}
                </div>
                <p className="text-xs leading-relaxed text-slate-300 pt-0.5">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

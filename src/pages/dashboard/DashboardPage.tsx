import { Link } from "react-router-dom";
import { PATHS } from "@/app/router/paths";
import {
  selectCurrentUser,
  useAuthStore,
} from "@/domains/auth/store/useAuthStore";
import { useDashboardStats } from "@/domains/dashboard/selectors/dashboardSelectors";
import { CardStat } from "@/pages/dashboard/components/CardStat";
import { EmptyDashboardState } from "@/pages/dashboard/components/EmptyDashboardState";

export function DashboardPage() {
  const currentUser = useAuthStore(selectCurrentUser);
  const currentUserId = useAuthStore((state) => state.currentUserId);
  const stats = useDashboardStats(currentUserId ?? "");

  const hasData =
    stats.monthlyTrainings > 0 ||
    stats.monthlySubmissions > 0 ||
    stats.currentWeight > 0;

  return (
    <div className="space-y-5 pb-6">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 p-5 text-white shadow-xl shadow-slate-900/10">
        <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">
          Visao geral
        </p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight">
          Bem-vindo{currentUser?.name ? `, ${currentUser.name}` : ""}
        </h2>
        <p className="mt-2 max-w-sm text-sm text-slate-300">
          Acompanhe seus treinos, seu peso e seu status atual sem sair do app.
        </p>
      </section>

      {!hasData ? <EmptyDashboardState /> : null}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <CardStat
          title="Treinos no mes"
          value={String(stats.monthlyTrainings)}
          subtitle="Quantidade de treinos registrados no mes atual"
        />
        <CardStat
          title="Finalizacoes aplicadas"
          value={String(stats.monthlySubmissions)}
          subtitle="Soma das finalizacoes aplicadas no mes atual"
        />
        <CardStat
          title="Peso atual"
          value={
            stats.currentWeight > 0
              ? `${stats.currentWeight.toFixed(1)} kg`
              : "--"
          }
          subtitle="Ultimo peso salvo no perfil"
        />
        <CardStat
          title="Status da categoria"
          value={
            stats.isOverWeightLimit ? "Acima do limite" : "Dentro do limite"
          }
          subtitle={
            stats.isOverWeightLimit
              ? "Reduza o peso para entrar na categoria"
              : "Peso dentro do limite de 100kg"
          }
          tone={stats.isOverWeightLimit ? "warning" : "success"}
        />
      </section>

      <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-600 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-medium text-slate-900">Navegacao rapida</p>
            <p className="mt-1 text-sm text-slate-600">
              O Dashboard esta pronto para evoluir com graficos e mais detalhes.
            </p>
          </div>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            MVP
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to={PATHS.app.trainings}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Treinos
          </Link>
          <Link
            to={PATHS.app.profile}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
          >
            Perfil
          </Link>
        </div>
      </section>
    </div>
  );
}

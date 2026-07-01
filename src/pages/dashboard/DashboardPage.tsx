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
    <div className="space-y-5 pb-24">
      {/* Banner de Boas-vindas Superior */}
      <section className="overflow-hidden rounded-2xl border border-slate-900 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 p-5 text-white shadow-xl">
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-emerald-400 font-bold">
            Visão Geral
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
            Bem-vindo{currentUser?.name ? `, ${currentUser.name}` : ""}
          </h2>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">
            Acompanhe seus treinos, seu peso e seu status atual de categoria sem
            sair do app.
          </p>
        </div>
      </section>

      {!hasData ? <EmptyDashboardState /> : null}

      {/* Grid de Estatísticas */}
      <section className="grid grid-cols-2 gap-4">
        <CardStat
          title="Treinos no mês"
          value={String(stats.monthlyTrainings)}
          subtitle="Registrados no mês atual"
        />
        <CardStat
          title="Finalizações"
          value={String(stats.monthlySubmissions)}
          subtitle="Aplicadas no mês atual"
        />
        <CardStat
          title="Peso atual"
          value={
            stats.currentWeight > 0
              ? `${stats.currentWeight.toFixed(1)} kg`
              : "--"
          }
          subtitle="Último peso salvo"
        />
        <CardStat
          title="Categoria (100kg)"
          value={
            stats.isOverWeightLimit ? "Acima do limite" : "Dentro do limite"
          }
          subtitle={
            stats.isOverWeightLimit
              ? "Reduza para o campeonato"
              : "Peso alinhado e pronto"
          }
          tone={stats.isOverWeightLimit ? "warning" : "success"}
        />
      </section>
    </div>
  );
}

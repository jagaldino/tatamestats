export function EmptyDashboardState() {
  return (
    <section className="rounded-3xl border border-dashed border-emerald-200 bg-emerald-50 p-5 text-emerald-950 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
        Sem dados ainda
      </p>
      <h3 className="mt-2 text-lg font-semibold">Seu dashboard esta vazio</h3>
      <p className="mt-2 text-sm text-emerald-900/80">
        Cadastre seu perfil e registre treinos para visualizar seus indicadores.
      </p>
    </section>
  );
}

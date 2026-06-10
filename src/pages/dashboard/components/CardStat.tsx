// Exemplo de estrutura interna do seu CardStat para combinar com o tema escuro:
interface CardStatProps {
  title: string;
  value: string;
  subtitle: string;
  tone?: "success" | "warning" | "default";
}

export function CardStat({
  title,
  value,
  subtitle,
  tone = "default",
}: CardStatProps) {
  // Define cores de borda ou texto dinâmicas com base no status da categoria (peso)
  const toneClasses = {
    success: "border-emerald-500/30 bg-emerald-950/10 text-emerald-400",
    warning: "border-amber-500/30 bg-amber-950/10 text-amber-400",
    default: "border-slate-900 bg-slate-900/40 text-white",
  };

  return (
    <div
      className={`rounded-2xl border p-4 backdrop-blur-sm flex flex-col justify-between min-h-[130px] transition ${toneClasses[tone]}`}
    >
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </p>
        <p
          className={`mt-2 text-2xl font-bold tracking-tight ${tone === "default" ? "text-white" : ""}`}
        >
          {value}
        </p>
      </div>
      <p className="mt-2 text-[11px] text-slate-500 leading-tight">
        {subtitle}
      </p>
    </div>
  );
}

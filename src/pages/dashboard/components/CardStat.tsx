type CardStatProps = {
  title: string;
  value: string;
  subtitle: string;
  tone?: "default" | "success" | "warning";
};

const toneClasses = {
  default: "from-white to-slate-50 border-slate-200",
  success: "from-emerald-50 to-white border-emerald-200",
  warning: "from-amber-50 to-white border-amber-200",
} as const;

export function CardStat({
  title,
  value,
  subtitle,
  tone = "default",
}: CardStatProps) {
  return (
    <article
      className={`rounded-3xl border bg-gradient-to-br p-4 shadow-sm ${toneClasses[tone]}`}
    >
      <p className="text-sm font-medium text-slate-600">{title}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
        {value}
      </p>
      <p className="mt-2 text-sm leading-5 text-slate-500">{subtitle}</p>
    </article>
  );
}

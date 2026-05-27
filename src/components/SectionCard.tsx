import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function SectionCard({
  title,
  children,
  className = "",
}: SectionCardProps) {
  return (
    <section
      className={`rounded-3xl border border-zinc-800 bg-zinc-900 p-6 ${className}`}
    >
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <div className="mt-4 text-sm leading-6 text-zinc-400">{children}</div>
    </section>
  );
}

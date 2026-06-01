type ScreenPlaceholderProps = {
  title: string;
};

export function ScreenPlaceholder({ title }: ScreenPlaceholderProps) {
  return (
    <section className="rounded-xl border border-brand-200 bg-white p-6 shadow-sm">
      <h1 className="text-lg font-semibold text-brand-900">{title}</h1>
      <p className="mt-2 text-sm text-brand-600">
        Estrutura inicial pronta. Implementacao da pagina pendente.
      </p>
    </section>
  );
}

import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-6 text-zinc-100">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        {children}
      </div>
    </main>
  );
}

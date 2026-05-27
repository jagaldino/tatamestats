import { PageShell } from "../components/PageShell";
import { PrimaryButton } from "../components/PrimaryButton";
import { SectionCard } from "../components/SectionCard";
import { TopBar } from "../components/TopBar";
import { navigateTo } from "../lib/navigation";

export function NotFoundPage() {
  return (
    <PageShell>
      <TopBar />

      <SectionCard
        title="404 - Página não encontrada"
        className="bg-zinc-900/90"
      >
        <p>A rota que você tentou acessar não existe ou foi movida.</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <PrimaryButton
            onClick={() => navigateTo("/")}
            className="w-full sm:w-auto"
          >
            Voltar para a home
          </PrimaryButton>
          <PrimaryButton
            variant="outline"
            onClick={() => navigateTo("/login")}
            className="w-full sm:w-auto"
          >
            Ir para o login
          </PrimaryButton>
        </div>
      </SectionCard>
    </PageShell>
  );
}

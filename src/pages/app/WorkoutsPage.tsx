import { navigateTo } from "../../lib/navigation";
import { PrimaryButton } from "../../components/PrimaryButton";
import { SectionCard } from "../../components/SectionCard";

export function WorkoutsPage() {
  return (
    <SectionCard title="/app/treinos" className="bg-zinc-900/90">
      <p>
        Lista de treinos registrada no app. Aqui entram os treinos do dia,
        filtros e histórico.
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <PrimaryButton
          onClick={() => navigateTo("/app/treinos/novo")}
          className="w-full sm:w-auto"
        >
          Novo treino
        </PrimaryButton>
        <PrimaryButton
          variant="outline"
          onClick={() => navigateTo("/app/treinos/123")}
          className="w-full sm:w-auto"
        >
          Abrir exemplo de treino
        </PrimaryButton>
      </div>
    </SectionCard>
  );
}

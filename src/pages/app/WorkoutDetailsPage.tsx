import { SectionCard } from "../../components/SectionCard";

type WorkoutDetailsPageProps = {
  workoutId: string;
};

export function WorkoutDetailsPage({ workoutId }: WorkoutDetailsPageProps) {
  return (
    <SectionCard title={`/app/treinos/${workoutId}`} className="bg-zinc-900/90">
      <p>
        Detalhes do treino {workoutId}. Esta é a rota dinâmica protegida para o
        MUST-06.
      </p>
    </SectionCard>
  );
}

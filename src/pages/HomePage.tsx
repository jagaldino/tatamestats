import { navigateTo } from "../lib/navigation";
import { PageShell } from "../components/PageShell";
import { SectionCard } from "../components/SectionCard";
import { PrimaryButton } from "../components/PrimaryButton";
import { TopBar } from "../components/TopBar";

const colors = [
  { name: "Fundo principal", className: "bg-zinc-950" },
  { name: "Surface/Cards", className: "bg-zinc-900" },
  { name: "Destaque/Primária", className: "bg-green-600" },
  { name: "Destaque/Primária (claro)", className: "bg-green-500" },
  { name: "Alerta de Peso", className: "bg-red-500" },
  { name: "Texto principal", className: "text-zinc-100 bg-zinc-950" },
  { name: "Texto secundário", className: "text-zinc-400 bg-zinc-950" },
  { name: "Texto alerta", className: "text-red-500 bg-zinc-950" },
];

const typography = [
  {
    label: "H1",
    className: "text-3xl font-bold sm:text-4xl",
    sample: "Título principal",
  },
  { label: "H2", className: "text-2xl font-bold", sample: "Seção de apoio" },
  { label: "H3", className: "text-xl font-medium", sample: "Card e detalhe" },
  {
    label: "p",
    className: "text-base font-normal text-zinc-300",
    sample: "Parágrafo de leitura",
  },
];

export function HomePage() {
  return (
    <PageShell>
      <TopBar />

      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-2xl shadow-black/30">
        <p className="text-sm uppercase tracking-[0.24em] text-green-500">
          TatameStats
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Diário de tatame para atletas de BJJ
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-400 sm:text-base">
          Registre treinos, acompanhe finalizações e monitore peso de forma
          rápida, privada e pensada para o pós-treino imediato.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <PrimaryButton
            onClick={() => navigateTo("/register")}
            className="w-full sm:w-auto"
          >
            Criar conta
          </PrimaryButton>
          <PrimaryButton
            variant="outline"
            onClick={() => navigateTo("/login")}
            className="w-full sm:w-auto"
          >
            Entrar
          </PrimaryButton>
        </div>
      </section>

      <SectionCard title="1. Descrição Geral">
        <p>
          O TatameStats é uma aplicação web em React (SPA) para praticantes e
          competidores de Jiu-Jitsu Brasileiro acompanharem rendimento,
          finalizações e flutuações de peso em um só lugar.
        </p>
      </SectionCard>

      <section className="grid gap-4 md:grid-cols-2">
        <SectionCard title="2. Problema">
          <p>
            Registros espalhados e memória cansada após o treino fazem com que
            detalhes importantes se percam. Para quem compete, enxergar o peso
            com clareza é tão importante quanto medir a técnica.
          </p>
        </SectionCard>
        <SectionCard title="3. Proposta & Não-objetivos">
          <p>
            O sistema oferece um diário de tatame com entrada rápida de dados e
            foco em usabilidade mobile. Não buscamos rede social, vídeos
            instrucionais ou backend complexo de gestão financeira.
          </p>
        </SectionCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="4. Público-alvo & Persona">
          <p>
            João, 21 anos, estudante universitário e competidor amador, treina
            às 6h antes da faculdade e precisa manter-se entre 98 e 99kg na
            categoria Super Pesado.
          </p>
          <p className="mt-4">
            Ele sai do treino exausto e precisa registrar rapidamente com quem
            treinou, quais posições usou e como o peso está oscilando.
          </p>
        </SectionCard>

        <SectionCard title="5. MUST-01: Autenticação">
          <ul className="space-y-3">
            <li>Criação de conta com e-mail e senha.</li>
            <li>Validação de formato de e-mail no cliente.</li>
            <li>Redirecionamento automático para /app/dashboard após login.</li>
          </ul>
        </SectionCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="6. Paleta de Cores">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {colors.map((color) => (
              <div
                key={color.name}
                className="flex flex-col items-center gap-2 text-center"
              >
                <div
                  className={`h-14 w-14 rounded-xl border border-zinc-800 ${color.className}`}
                />
                <span className="text-xs text-zinc-400">{color.name}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="7. Tipografia">
          <div className="space-y-4">
            {typography.map((item) => (
              <div key={item.label}>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  {item.label}
                </p>
                <p className={`mt-1 text-white ${item.className}`}>
                  {item.sample}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="8. Botões">
          <div className="space-y-4">
            <PrimaryButton className="w-full">Primário</PrimaryButton>
            <PrimaryButton variant="outline" className="w-full">
              Secundário
            </PrimaryButton>
            <div className="flex gap-4">
              <button className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-3xl font-bold text-white shadow-lg shadow-green-600/20">
                +
              </button>
              <button className="flex h-16 w-16 items-center justify-center rounded-full border border-green-600 bg-zinc-950 text-3xl font-bold text-green-500">
                -
              </button>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="9. Card Exemplo">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-center">
            <p className="text-sm text-zinc-400">Resumo do Mês</p>
            <p className="mt-3 text-5xl font-bold text-green-500">15</p>
            <p className="mt-2 text-lg font-medium text-zinc-100">Treinos</p>
          </div>
        </SectionCard>
      </section>
    </PageShell>
  );
}

import { navigateTo } from "../lib/navigation";
import { PageShell } from "../components/PageShell";
import { SectionCard } from "../components/SectionCard";
import { PrimaryButton } from "../components/PrimaryButton";
import { TopBar } from "../components/TopBar";

const mustItems = [
  "MUST-01 - Autenticação e cadastro com validação de e-mail e login protegido.",
  "MUST-02 - Registro rápido de treino com data, duração e alternância Gi / No-Gi.",
  "MUST-03 - Apontamento de rolas com botões de incremento e decremento pensados para smartphone.",
  "MUST-04 - Registro de peso no perfil e alerta vermelho no dashboard acima de 100kg.",
  "MUST-05 - Dashboard com total de treinos e finalizações do mês.",
  "MUST-06 - Histórico cronológico com rota dinâmica para detalhes de cada treino.",
];

const niceItems = [
  "NICE-01 - Gráfico simples de flutuação de peso.",
  "NICE-02 - Controle de fadiga e dores pós-treino.",
  "NICE-03 - Compartilhamento rápido via Web Share API.",
];

const sitemapItems = [
  "/login - pública",
  "/cadastro - pública",
  "/404 - página de erro",
  "/app/dashboard - protegida",
  "/app/treinos - protegida",
  "/app/treinos/novo - protegida",
  "/app/treinos/:id - dinâmica e protegida",
  "/app/perfil - protegida",
];

const stackItems = [
  "React 18+ com componentização",
  "React Router para navegação SPA",
  "Vite como ferramenta de build",
  "TypeScript para tipagem forte",
  "Tailwind CSS para layout mobile-first",
  "Zustand para estado global leve",
  "Lucide React para ícones",
  "LocalStorage e JSON local como fonte de dados",
];

export function HomePage() {
  return (
    <PageShell>
      <TopBar />

      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-2xl shadow-black/30">
        <div className="flex flex-col gap-8">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-green-500">
                TatameStats
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Sua evolução no tatame, em dados.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                Aplicação web em React para registro de treinos, controle de peso
                e acompanhamento de evolução técnica no Jiu-Jitsu Brasileiro.
                Pensada para funcionar como uma vitrine institucional do projeto e
                como ponto de entrada para o atleta.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton
                  onClick={() => navigateTo("/cadastro")}
                  className="w-full sm:w-auto"
                >
                  Começar agora
                </PrimaryButton>
                <PrimaryButton
                  variant="outline"
                  onClick={() => navigateTo("/login")}
                  className="w-full sm:w-auto"
                >
                  Entrar
                </PrimaryButton>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                Informações do projeto
              </p>
              <div className="mt-4 space-y-3 text-sm leading-6 text-zinc-300">
                <p>Universidade Federal do Rio Grande do Norte</p>
                <p>Escola de Ciência e Tecnologia</p>
                <p>Bacharelado em Ciências e Tecnologia</p>
                <p className="pt-2 text-zinc-400">
                  João Arthur Galdino das Neves
                  <br />
                  20240040026
                  <br />
                  Desenvolvimento Front End - T01 - 35T1234
                </p>
                <p className="pt-2 text-lg font-semibold text-white">
                  TatameStats
                </p>
                <p className="text-zinc-400">
                  &quot;Sua evolução no tatame, em dados.&quot;
                </p>
                <p className="pt-2 text-zinc-500">Natal/2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <SectionCard title="Descrição Geral">
          <p>
            O TatameStats centraliza o registro de treinos diários, estatísticas
            de finalizações e monitoramento de peso em uma experiência mobile
            fluida, rápida e privada.
          </p>
        </SectionCard>

        <SectionCard title="Problema e proposta">
          <p>
            Atletas amadores perdem informações importantes por dependerem da
            memória ou de anotações soltas. O projeto resolve isso com entrada
            rápida, foco em pós-treino imediato e sem backend próprio.
          </p>
        </SectionCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="Público-alvo e persona">
          <p>
            João, 21 anos, estudante universitário e competidor amador, treina
            às 6h da manhã e precisa se manter na faixa de 98 a 99kg para a
            categoria Super Pesado.
          </p>
          <p className="mt-4">
            Sai do treino cansado e com pouco tempo. Por isso, a interface é
            pensada para uso imediato no celular, sem etapas desnecessárias.
          </p>
        </SectionCard>

        <SectionCard title="O que o projeto vai ter">
          <ul className="space-y-3">
            {mustItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SectionCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Funcionalidades desejáveis">
          <ul className="space-y-3">
            {niceItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Mapa do site">
          <ul className="space-y-3">
            {sitemapItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SectionCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Stack técnica">
          <ul className="space-y-3">
            {stackItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Fontes de dados">
          <p>
            Os dados do usuário são salvos no LocalStorage para manter a
            aplicação standalone e offline-first. As categorias oficiais são
            simuladas com JSON local para alimentar os formulários.
          </p>
        </SectionCard>
      </section>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Acesso rápido</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Entre ou crie sua conta para acessar a área protegida.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <PrimaryButton onClick={() => navigateTo("/cadastro")}>
              Cadastro
            </PrimaryButton>
            <PrimaryButton variant="outline" onClick={() => navigateTo("/login")}>
              Login
            </PrimaryButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

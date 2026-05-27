import React, { useEffect, useMemo, useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getCurrentPath() {
  if (typeof window === "undefined") {
    return "/";
  }

  return window.location.pathname;
}

function navigateTo(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export const DesignSystemDemo: React.FC = () => {
  const [pathname, setPathname] = useState(getCurrentPath);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const handlePopState = () => setPathname(getCurrentPath());

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const isEmailValid = useMemo(() => emailRegex.test(email), [email]);
  const isLoginEnabled = isEmailValid && password.trim().length >= 6;
  const showEmailError = touched && email.length > 0 && !isEmailValid;

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);

    if (!isLoginEnabled) {
      return;
    }

    navigateTo("/app/dashboard");
  };

  if (pathname === "/app/dashboard") {
    return (
      <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-6">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
          <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl shadow-black/30">
            <p className="text-sm uppercase tracking-[0.24em] text-zinc-400">
              TatameStats
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Dashboard do atleta
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
              Visão rápida do diário de tatame, com foco em consistência,
              evolução técnica e controle do peso para competições.
            </p>
          </section>

          <section className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
              <p className="text-sm text-zinc-400">Treinos do mês</p>
              <p className="mt-3 text-4xl font-bold text-green-500">15</p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
              <p className="text-sm text-zinc-400">Finalizações</p>
              <p className="mt-3 text-4xl font-bold text-green-500">38%</p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
              <p className="text-sm text-zinc-400">Peso atual</p>
              <p className="mt-3 text-4xl font-bold text-red-500">98.7kg</p>
            </div>
          </section>

          <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-bold text-white">Resumo do mês</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Você registrou{" "}
              <span className="font-semibold text-zinc-100">15 treinos</span>,
              manteve o peso dentro da faixa para Super Pesado e acumulou
              evolução nos rolas com acompanhamento centralizado.
            </p>
          </section>

          <button
            type="button"
            onClick={() => navigateTo("/")}
            className="rounded-xl border border-green-600 px-4 py-3 text-sm font-semibold text-green-500 transition active:scale-[0.99]"
          >
            Voltar para a área pública
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-6 text-zinc-100">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-2xl shadow-black/30">
          <p className="text-sm uppercase tracking-[0.24em] text-green-500">
            TatameStats
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Diário de tatame para atletas de BJJ
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            Registre treinos, acompanhe finalizações e monitore peso de forma
            rápida, privada e pensada para o pós-treino imediato.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-bold text-white">Resumo</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              O TatameStats é uma aplicação web em React (SPA) para praticantes
              e competidores de Jiu-Jitsu Brasileiro registrarem rendimento,
              finalizações e flutuações de peso em um só lugar.
            </p>
          </article>
          <article className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-bold text-white">Problema</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Registros espalhados e memória cansada após o treino fazem com que
              detalhes importantes se percam. Para quem compete, enxergar o peso
              com clareza é tão importante quanto medir a técnica.
            </p>
          </article>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-bold text-white">
              Proposta & não-objetivos
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              O sistema oferece um diário de tatame com entrada rápida de dados,
              focado em usabilidade mobile fluida nos minutos logo após sair do
              tatame. Não buscamos rede social, vídeo instrucional ou backend
              complexo de gestão financeira.
            </p>
          </article>

          <article className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-bold text-white">Persona</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              João, 21 anos, estudante universitário e competidor amador, treina
              às 6h antes da faculdade e precisa manter-se entre 98 e 99kg na
              categoria Super Pesado.
            </p>
          </article>
        </section>

        <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-bold text-white">Dor principal</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Exausto após o treino, João esquece com quem rolou, quais posições
            aplicou e se o peso está oscilando de forma que prejudique sua
            performance.
          </p>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-bold text-white">
              MUST-01: autenticação
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-400">
              <li>Criação de conta com e-mail e senha.</li>
              <li>Validação de formato de e-mail no cliente.</li>
              <li>
                Redirecionamento automático para /app/dashboard após login.
              </li>
            </ul>
          </article>

          <article className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-bold text-white">Acesso rápido</h2>
            <form className="mt-4 space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onBlur={() => setTouched(true)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-green-600 focus:ring-2 focus:ring-green-600/30"
                  placeholder="joao@tatamestats.com"
                />
                {showEmailError ? (
                  <p className="mt-2 text-sm text-red-500">
                    Informe um e-mail válido.
                  </p>
                ) : null}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Senha
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  onBlur={() => setTouched(true)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-green-600 focus:ring-2 focus:ring-green-600/30"
                  placeholder="Mínimo de 6 caracteres"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-green-600 px-4 py-4 font-semibold text-white transition active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-green-600/40"
                disabled={!isLoginEnabled}
              >
                Entrar e ir para o dashboard
              </button>
            </form>
          </article>
        </section>
      </div>
    </main>
  );
};

export default DesignSystemDemo;

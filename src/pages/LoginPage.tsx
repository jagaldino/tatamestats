import { useMemo, useState } from "react";
import { PrimaryButton } from "../components/PrimaryButton";
import { PageShell } from "../components/PageShell";
import { SectionCard } from "../components/SectionCard";
import { TextField } from "../components/TextField";
import { TopBar } from "../components/TopBar";
import { navigateTo } from "../lib/navigation";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);

  const isEmailValid = useMemo(() => emailRegex.test(email), [email]);
  const isPasswordValid = password.trim().length >= 6;
  const canSubmit = isEmailValid && isPasswordValid;

  const emailError =
    touched && email.length > 0 && !isEmailValid
      ? "Informe um e-mail válido."
      : undefined;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);

    if (!canSubmit) {
      return;
    }

    navigateTo("/app/dashboard");
  };

  return (
    <PageShell>
      <TopBar />

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <SectionCard title="Entrar na conta" className="bg-zinc-900/90">
          <p>
            Acesse sua área privada para registrar treinos, peso e evolução
            técnica.
          </p>
          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <TextField
              label="E-mail"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="joao@tatamestats.com"
              error={emailError}
            />

            <TextField
              label="Senha"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="Mínimo de 6 caracteres"
            />

            <PrimaryButton
              type="submit"
              className="w-full"
              disabled={!canSubmit}
            >
              Entrar e ir para o dashboard
            </PrimaryButton>
          </form>

          <div className="mt-4 flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
            <button
              className="text-left text-zinc-400 hover:text-white"
              onClick={() => navigateTo("/forgot-password")}
              type="button"
            >
              Esqueci a senha
            </button>
            <button
              className="text-left text-zinc-400 hover:text-white"
              onClick={() => navigateTo("/register")}
              type="button"
            >
              Criar conta
            </button>
          </div>
        </SectionCard>

        <SectionCard title="Resumo do acesso">
          <p>
            Validação de e-mail no cliente, fluxo mobile-first e navegação
            simples para o dashboard após login bem-sucedido.
          </p>
          <p className="mt-4 text-zinc-300">
            Dica: use o login para simular a rota{" "}
            <span className="text-white">/app/dashboard</span>.
          </p>
        </SectionCard>
      </section>
    </PageShell>
  );
}

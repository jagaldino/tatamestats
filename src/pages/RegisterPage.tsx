import { useMemo, useState } from "react";
import { PrimaryButton } from "../components/PrimaryButton";
import { PageShell } from "../components/PageShell";
import { SectionCard } from "../components/SectionCard";
import { TextField } from "../components/TextField";
import { TopBar } from "../components/TopBar";
import { navigateTo } from "../lib/navigation";
import { setAuthenticated } from "../lib/auth";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [touched, setTouched] = useState(false);

  const isEmailValid = useMemo(() => emailRegex.test(email), [email]);
  const isPasswordValid = password.trim().length >= 6;
  const passwordsMatch = password === confirmPassword;
  const canSubmit =
    name.trim().length >= 2 &&
    isEmailValid &&
    isPasswordValid &&
    passwordsMatch;

  const emailError =
    touched && email.length > 0 && !isEmailValid
      ? "Informe um e-mail válido."
      : undefined;
  const confirmError =
    touched && confirmPassword.length > 0 && !passwordsMatch
      ? "As senhas precisam ser iguais."
      : undefined;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);

    if (!canSubmit) {
      return;
    }

    setAuthenticated(true);
    navigateTo("/app/dashboard");
  };

  return (
    <PageShell>
      <TopBar />

      <section className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <SectionCard title="Criar conta" className="bg-zinc-900/90">
          <p>
            Registre-se com e-mail e senha para manter seu histórico de treinos
            e evolução de forma privada.
          </p>

          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <TextField
              label="Nome"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="João da Silva"
            />

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

            <TextField
              label="Confirmar senha"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="Repita sua senha"
              error={confirmError}
            />

            <PrimaryButton
              type="submit"
              className="w-full"
              disabled={!canSubmit}
            >
              Criar conta
            </PrimaryButton>
          </form>

          <div className="mt-4 text-sm text-zinc-400">
            Já tem conta?{" "}
            <button
              type="button"
              className="text-white"
              onClick={() => navigateTo("/login")}
            >
              Entrar
            </button>
          </div>
        </SectionCard>

        <SectionCard title="O que você ganha">
          <ul className="space-y-3">
            <li>Histórico centralizado de treinos.</li>
            <li>Controle visual de peso por categoria.</li>
            <li>Registro rápido pensado para o pós-treino imediato.</li>
          </ul>
        </SectionCard>
      </section>
    </PageShell>
  );
}

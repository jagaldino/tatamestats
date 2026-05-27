import { useMemo, useState } from "react";
import { PrimaryButton } from "../components/PrimaryButton";
import { PageShell } from "../components/PageShell";
import { SectionCard } from "../components/SectionCard";
import { TextField } from "../components/TextField";
import { TopBar } from "../components/TopBar";
import { navigateTo } from "../lib/navigation";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [sent, setSent] = useState(false);

  const isEmailValid = useMemo(() => emailRegex.test(email), [email]);
  const emailError =
    touched && email.length > 0 && !isEmailValid
      ? "Informe um e-mail válido."
      : undefined;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);

    if (!isEmailValid) {
      return;
    }

    setSent(true);
  };

  return (
    <PageShell>
      <TopBar />

      <section className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <SectionCard title="Recuperar senha" className="bg-zinc-900/90">
          <p>Envie o link de redefinição para o e-mail cadastrado na conta.</p>

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

            <PrimaryButton type="submit" className="w-full">
              Enviar link
            </PrimaryButton>
          </form>

          {sent ? (
            <p className="mt-4 rounded-xl border border-green-600/40 bg-green-600/10 p-4 text-sm text-green-500">
              Se o e-mail existir, você receberá as instruções para redefinição.
            </p>
          ) : null}

          <div className="mt-4 text-sm text-zinc-400">
            Lembrou a senha?{" "}
            <button
              type="button"
              className="text-white"
              onClick={() => navigateTo("/login")}
            >
              Voltar para login
            </button>
          </div>
        </SectionCard>

        <SectionCard title="Fluxo simples">
          <p>
            Essa tela cobre o caminho básico de recuperação sem backend
            complexo, mantendo a experiência leve para o mobile.
          </p>
        </SectionCard>
      </section>
    </PageShell>
  );
}

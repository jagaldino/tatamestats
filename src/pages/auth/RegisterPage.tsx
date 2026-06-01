import { FormEvent, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "@/app/router/paths";
import { useAuthStore } from "@/domains/auth/store/useAuthStore";

type RegisterErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  form?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RegisterPage() {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});

  const isFormValid = useMemo(
    () =>
      name.trim().length >= 2 &&
      EMAIL_REGEX.test(email.trim()) &&
      password.trim().length >= 6 &&
      confirmPassword === password,
    [name, email, password, confirmPassword],
  );

  const validate = (): RegisterErrors => {
    const nextErrors: RegisterErrors = {};

    if (!name.trim()) {
      nextErrors.name = "Informe seu nome.";
    } else if (name.trim().length < 2) {
      nextErrors.name = "Nome deve ter pelo menos 2 caracteres.";
    }

    if (!email.trim()) {
      nextErrors.email = "Informe seu email.";
    } else if (!EMAIL_REGEX.test(email.trim())) {
      nextErrors.email = "Email invalido.";
    }

    if (!password) {
      nextErrors.password = "Informe sua senha.";
    } else if (password.trim().length < 6) {
      nextErrors.password = "A senha deve ter pelo menos 6 caracteres.";
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Confirme sua senha.";
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = "As senhas nao conferem.";
    }

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const result = register({
      name,
      email,
      password,
    });

    if (!result.ok) {
      setErrors({
        form: result.message ?? "Nao foi possivel concluir o cadastro.",
      });
      return;
    }

    navigate(PATHS.app.dashboard, { replace: true });
  };

  return (
    <section className="rounded-3xl border border-slate-700/60 bg-slate-900/80 p-5 shadow-2xl shadow-emerald-900/10 backdrop-blur">
      <h2 className="text-xl font-semibold text-white">Criar conta</h2>
      <p className="mt-1 text-sm text-slate-300">
        Comece a registrar sua evolucao no tatame.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div>
          <label
            htmlFor="register-name"
            className="mb-1 block text-sm text-slate-200"
          >
            Nome
          </label>
          <input
            id="register-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-3 text-sm text-white outline-none ring-emerald-400 transition focus:ring-2"
            placeholder="Seu nome"
          />
          {errors.name ? (
            <p className="mt-1 text-xs text-rose-300">{errors.name}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="register-email"
            className="mb-1 block text-sm text-slate-200"
          >
            Email
          </label>
          <input
            id="register-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-3 text-sm text-white outline-none ring-emerald-400 transition focus:ring-2"
            placeholder="voce@exemplo.com"
          />
          {errors.email ? (
            <p className="mt-1 text-xs text-rose-300">{errors.email}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="register-password"
            className="mb-1 block text-sm text-slate-200"
          >
            Senha
          </label>
          <input
            id="register-password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-3 text-sm text-white outline-none ring-emerald-400 transition focus:ring-2"
            placeholder="Minimo 6 caracteres"
          />
          {errors.password ? (
            <p className="mt-1 text-xs text-rose-300">{errors.password}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="register-confirm-password"
            className="mb-1 block text-sm text-slate-200"
          >
            Confirmar senha
          </label>
          <input
            id="register-confirm-password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-3 text-sm text-white outline-none ring-emerald-400 transition focus:ring-2"
            placeholder="Repita sua senha"
          />
          {errors.confirmPassword ? (
            <p className="mt-1 text-xs text-rose-300">
              {errors.confirmPassword}
            </p>
          ) : null}
        </div>

        {errors.form ? (
          <p className="rounded-lg border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
            {errors.form}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={!isFormValid}
          className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 text-sm font-semibold text-slate-900 transition enabled:hover:brightness-105 enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Criar conta
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-300">
        Ja tem conta?{" "}
        <Link to={PATHS.auth.login} className="font-semibold text-emerald-300">
          Entrar
        </Link>
      </p>
    </section>
  );
}

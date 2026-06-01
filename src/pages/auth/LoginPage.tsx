import { FormEvent, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "@/app/router/paths";
import { useAuthStore } from "@/domains/auth/store/useAuthStore";

type LoginErrors = {
  email?: string;
  password?: string;
  form?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});

  const isFormValid = useMemo(
    () => EMAIL_REGEX.test(email.trim()) && password.trim().length >= 6,
    [email, password],
  );

  const validate = (): LoginErrors => {
    const nextErrors: LoginErrors = {};

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

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const result = login({
      email,
      password,
    });

    if (!result.ok) {
      setErrors({
        form: result.message ?? "Nao foi possivel entrar.",
      });
      return;
    }

    navigate(PATHS.app.dashboard, { replace: true });
  };

  return (
    <section className="rounded-3xl border border-slate-700/60 bg-slate-900/80 p-5 shadow-2xl shadow-emerald-900/10 backdrop-blur">
      <h2 className="text-xl font-semibold text-white">Entrar</h2>
      <p className="mt-1 text-sm text-slate-300">
        Acesse seu historico e acompanhe seus treinos.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div>
          <label
            htmlFor="login-email"
            className="mb-1 block text-sm text-slate-200"
          >
            Email
          </label>
          <input
            id="login-email"
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
            htmlFor="login-password"
            className="mb-1 block text-sm text-slate-200"
          >
            Senha
          </label>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-3 text-sm text-white outline-none ring-emerald-400 transition focus:ring-2"
            placeholder="••••••••"
          />
          {errors.password ? (
            <p className="mt-1 text-xs text-rose-300">{errors.password}</p>
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
          Entrar
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-300">
        Nao tem conta?{" "}
        <Link
          to={PATHS.auth.register}
          className="font-semibold text-emerald-300"
        >
          Cadastre-se
        </Link>
      </p>
    </section>
  );
}

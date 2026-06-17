import { FormEvent, useState } from "react";
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

  const validate = (): LoginErrors => {
    const nextErrors: LoginErrors = {};

    if (!email.trim()) {
      nextErrors.email = "Informe seu e-mail.";
    } else if (!EMAIL_REGEX.test(email.trim())) {
      nextErrors.email = "E-mail inválido.";
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
      email: email.trim(),
      password,
    });

    if (!result.ok) {
      setErrors({
        form: result.message ?? "Não foi possível entrar.",
      });
      return;
    }

    navigate(PATHS.app.dashboard, { replace: true });
  };

  return (
    <div>
      {/* Título e subtítulo integrados diretamente ao container do PublicLayout */}
      <h2 className="text-xl font-bold text-white tracking-tight">Entrar</h2>
      <p className="mt-1 text-xs text-slate-400">
        Acesse seu histórico e acompanhe seus treinos no tatame.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Campo: E-mail */}
        <div>
          <label
            htmlFor="login-email"
            className="mb-1.5 block text-xs font-semibold text-slate-400"
          >
            E-mail
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            className="w-full rounded-xl border border-slate-900 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
            placeholder="voce@exemplo.com"
          />
          {errors.email ? (
            <p className="mt-1.5 text-xs font-medium text-rose-400">{errors.email}</p>
          ) : null}
        </div>

        {/* Campo: Senha */}
        <div>
          <label
            htmlFor="login-password"
            className="mb-1.5 block text-xs font-semibold text-slate-400"
          >
            Senha
          </label>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            className="w-full rounded-xl border border-slate-900 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder-slate-700 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
            placeholder="••••••••"
          />
          {errors.password ? (
            <p className="mt-1.5 text-xs font-medium text-rose-400">{errors.password}</p>
          ) : null}
        </div>

        {/* Mensagem de erro global do formulário */}
        {errors.form ? (
          <p className="rounded-xl border border-rose-950 bg-rose-950/20 px-4 py-3 text-xs font-medium text-rose-400">
            ⚠️ {errors.form}
          </p>
        ) : null}

        {/* Botão de submissão sempre ativo para guiar o feedback */}
        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 transition hover:brightness-110 active:scale-[0.99] shadow-md shadow-emerald-950/20"
        >
          Entrar no Painel
        </button>
      </form>

      {/* Link de Navegação Externa */}
      <p className="mt-6 text-center text-xs text-slate-400 font-medium">
        Não tem uma conta?{" "}
        <Link
          to={PATHS.auth.register}
          className="font-bold text-emerald-400 hover:text-emerald-300 transition underline-offset-4 hover:underline"
        >
          Cadastre-se
        </Link>
      </p>
    </div>
  );
}
import { FormEvent, useState } from "react";
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

  const validate = (): RegisterErrors => {
    const nextErrors: RegisterErrors = {};

    if (!name.trim()) {
      nextErrors.name = "Informe seu nome.";
    } else if (name.trim().length < 2) {
      nextErrors.name = "O nome deve ter pelo menos 2 caracteres.";
    }

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

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Confirme sua senha.";
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = "As senhas não conferem.";
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
      name: name.trim(),
      email: email.trim(),
      password,
    });

    if (!result.ok) {
      setErrors({
        form: result.message ?? "Não foi possível concluir o cadastro.",
      });
      return;
    }

    navigate(PATHS.app.dashboard, { replace: true });
  };

  return (
    <div>
      {/* Título e Subtítulo */}
      <h2 className="text-xl font-bold text-white tracking-tight">Criar conta</h2>
      <p className="mt-1 text-xs text-slate-400">
        Comece a registrar sua evolução e consistência no tatame.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Campo: Nome */}
        <div>
          <label
            htmlFor="register-name"
            className="mb-1.5 block text-xs font-semibold text-slate-400"
          >
            Nome Completo
          </label>
          <input
            id="register-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            className="w-full rounded-xl border border-slate-900 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
            placeholder="Seu nome"
          />
          {errors.name ? (
            <p className="mt-1.5 text-xs font-medium text-rose-400">{errors.name}</p>
          ) : null}
        </div>

        {/* Campo: E-mail */}
        <div>
          <label
            htmlFor="register-email"
            className="mb-1.5 block text-xs font-semibold text-slate-400"
          >
            E-mail
          </label>
          <input
            id="register-email"
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
            htmlFor="register-password"
            className="mb-1.5 block text-xs font-semibold text-slate-400"
          >
            Senha
          </label>
          <input
            id="register-password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            className="w-full rounded-xl border border-slate-900 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
            placeholder="Mínimo 6 caracteres"
          />
          {errors.password ? (
            <p className="mt-1.5 text-xs font-medium text-rose-400">{errors.password}</p>
          ) : null}
        </div>

        {/* Campo: Confirmar Senha */}
        <div>
          <label
            htmlFor="register-confirm-password"
            className="mb-1.5 block text-xs font-semibold text-slate-400"
          >
            Confirmar Senha
          </label>
          <input
            id="register-confirm-password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
              if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
            }}
            className="w-full rounded-xl border border-slate-900 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder-slate-700 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
            placeholder="Repita sua senha"
          />
          {errors.confirmPassword ? (
            <p className="mt-1.5 text-xs font-medium text-rose-400">
              {errors.confirmPassword}
            </p>
          ) : null}
        </div>

        {/* Mensagem de Erro Geral */}
        {errors.form ? (
          <p className="rounded-xl border border-rose-950 bg-rose-950/20 px-4 py-3 text-xs font-medium text-rose-400">
            ⚠️ {errors.form}
          </p>
        ) : null}

        {/* Botão de Cadastro Ativo */}
        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 transition hover:brightness-110 active:scale-[0.99] shadow-md shadow-emerald-950/20"
        >
          Criar minha conta
        </button>
      </form>

      {/* Link para Login */}
      <p className="mt-6 text-center text-xs text-slate-400 font-medium">
        Já tem uma conta?{" "}
        <Link
          to={PATHS.auth.login}
          className="font-bold text-emerald-400 hover:text-emerald-300 transition underline-offset-4 hover:underline"
        >
          Entrar
        </Link>
      </p>
    </div>
  );
}
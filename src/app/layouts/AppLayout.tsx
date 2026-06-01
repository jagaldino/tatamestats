import { Outlet, useNavigate } from "react-router-dom";
import { PATHS } from "@/app/router/paths";
import {
  selectCurrentUser,
  useAuthStore,
} from "@/domains/auth/store/useAuthStore";

export function AppLayout() {
  const navigate = useNavigate();
  const currentUser = useAuthStore(selectCurrentUser);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate(PATHS.auth.login, { replace: true });
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-slate-50 shadow-xl shadow-slate-900/10">
      <header className="sticky top-0 z-20 border-b border-emerald-100 bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-4 text-white">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-emerald-100">
              TatameStats
            </p>
            <h1 className="text-base font-semibold leading-tight">
              {currentUser?.name ?? "Atleta"}
            </h1>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/25 active:scale-[0.98]"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}

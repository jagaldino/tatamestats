import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { PATHS } from "@/app/router/paths";
import {
  selectCurrentUser,
  useAuthStore,
} from "@/domains/auth/store/useAuthStore";
import { 
  Dumbbell, 
  Scale, 
  BarChart2, 
  User, 
  LogOut 
} from "lucide-react";

export function AppLayout() {
  const navigate = useNavigate();
  const currentUser = useAuthStore(selectCurrentUser);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate(PATHS.auth.login, { replace: true });
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-slate-950 text-slate-100 shadow-2xl shadow-black">
      
      {/* Header Escuro e Compacto */}
      <header className="sticky top-0 z-20 border-b border-slate-900 bg-slate-950/80 px-4 py-4 backdrop-blur-md">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Avatar Dinâmico */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 font-semibold text-white uppercase">
              {currentUser?.name?.charAt(0) ?? "A"}
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-bold">
                TatameStats
              </p>
              <h1 className="text-sm font-semibold text-white leading-tight">
                {currentUser?.name ?? "Atleta"}
              </h1>
            </div>
          </div>

          {/* Botão Sair Minimalista */}
          <button
            type="button"
            onClick={handleLogout}
            title="Sair do aplicativo"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition hover:bg-slate-800 hover:text-red-400 active:scale-95"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Conteúdo Dinâmico (Páginas do Painel, Treinos, Peso e Perfil) */}
      <main className="flex-1 p-4 pb-24">
        <Outlet />
      </main>

      {/* Bottom Navigation Bar Unificada com as Rotas reais */}
      <nav className="fixed bottom-0 left-1/2 z-20 h-16 w-full max-w-md -translate-x-1/2 border-t border-slate-900 bg-slate-950/90 px-6 backdrop-blur-lg">
        <div className="flex h-full items-center justify-between">
          
          {/* Aba: Painel Geral */}
          <NavLink 
            to={PATHS.app.dashboard} 
            className={({ isActive }) => 
              `flex flex-col items-center gap-1 text-xs font-medium transition ${isActive ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'}`
            }
          >
            <BarChart2 className="h-5 w-5" />
            <span>Painel</span>
          </NavLink>

          {/* Aba: Histórico de Treinos */}
          <NavLink 
            to={PATHS.app.trainings} 
            className={({ isActive }) => 
              `flex flex-col items-center gap-1 text-xs font-medium transition ${isActive ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'}`
            }
          >
            <Dumbbell className="h-5 w-5" />
            <span>Treinos</span>
          </NavLink>

          {/* Aba: Controle de Peso */}
          <NavLink 
            to={PATHS.app.weight} 
            className={({ isActive }) => 
              `flex flex-col items-center gap-1 text-xs font-medium transition ${isActive ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'}`
            }
          >
            <Scale className="h-5 w-5" />
            <span>Peso</span>
          </NavLink>

          {/* Aba: Dados do Perfil */}
          <NavLink 
            to={PATHS.app.profile} 
            className={({ isActive }) => 
              `flex flex-col items-center gap-1 text-xs font-medium transition ${isActive ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'}`
            }
          >
            <User className="h-5 w-5" />
            <span>Perfil</span>
          </NavLink>

        </div>
      </nav>

    </div>
  );
}
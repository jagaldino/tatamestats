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
            {/* Avatar Provisório com a Inicial do Atleta */}
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

          {/* Botão Sair Minimalista com Ícone */}
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

      {/* Conteúdo Principal (Páginas internas) */}
      <main className="flex-1 p-4 pb-24"> {/* pb-24 garante que o conteúdo não fique escondido atrás do menu inferior */}
        <Outlet />
      </main>

      {/* Bottom Navigation Bar (Menu Inferior do PWA) */}
      <nav className="fixed bottom-0 left-1/2 z-20 h-16 w-full max-w-md -translate-x-1/2 border-t border-slate-900 bg-slate-950/90 px-6 backdrop-blur-lg">
        <div className="flex h-full items-center justify-between">
          
          <NavLink 
            to="/dashboard" // Ajuste para as suas rotas reais baseadas no PATHS
            className={({ isActive }) => 
              `flex flex-col items-center gap-1 text-xs font-medium transition ${isActive ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'}`
            }
          >
            <BarChart2 className="h-5 w-5" />
            <span>Painel</span>
          </NavLink>

          <NavLink 
            to="/trainings" 
            className={({ isActive }) => 
              `flex flex-col items-center gap-1 text-xs font-medium transition ${isActive ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'}`
            }
          >
            <Dumbbell className="h-5 w-5" />
            <span>Treinos</span>
          </NavLink>

          <NavLink 
            to="/weight" 
            className={({ isActive }) => 
              `flex flex-col items-center gap-1 text-xs font-medium transition ${isActive ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'}`
            }
          >
            <Scale className="h-5 w-5" />
            <span>Peso</span>
          </NavLink>

          <NavLink 
            to="/profile" 
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
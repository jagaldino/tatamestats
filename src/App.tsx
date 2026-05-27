import { useMemo } from "react";
import { usePathname } from "./hooks/usePathname";
import { navigateTo } from "./lib/navigation";
import { isAuthenticated } from "./lib/auth";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AppLayout } from "./pages/app/AppLayout";
import { DashboardPage } from "./pages/app/DashboardPage";
import { WorkoutsPage } from "./pages/app/WorkoutsPage";
import { NewWorkoutPage } from "./pages/app/NewWorkoutPage";
import { WorkoutDetailsPage } from "./pages/app/WorkoutDetailsPage";
import { ProfilePage } from "./pages/app/ProfilePage";

function normalizePath(pathname: string) {
  return pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
}

function App() {
  const pathname = normalizePath(usePathname());

  const route = useMemo(() => {
    if (pathname === "/") {
      return <HomePage />;
    }

    if (pathname === "/login") {
      return <LoginPage />;
    }

    if (pathname === "/cadastro" || pathname === "/register") {
      return <RegisterPage />;
    }

    if (pathname === "/esqueci-a-senha" || pathname === "/forgot-password") {
      return <ForgotPasswordPage />;
    }

    if (pathname === "/404") {
      return <NotFoundPage />;
    }

    if (pathname.startsWith("/app")) {
      if (!isAuthenticated()) {
        navigateTo("/login");
        return null;
      }

      return (
        <AppLayout>
          {pathname === "/app" || pathname === "/app/dashboard" ? (
            <DashboardPage />
          ) : null}
          {pathname === "/app/treinos" ? <WorkoutsPage /> : null}
          {pathname === "/app/treinos/novo" ? <NewWorkoutPage /> : null}
          {pathname.startsWith("/app/treinos/") &&
          pathname !== "/app/treinos/novo" ? (
            <WorkoutDetailsPage
              workoutId={pathname.replace("/app/treinos/", "")}
            />
          ) : null}
          {pathname === "/app/perfil" ? <ProfilePage /> : null}
        </AppLayout>
      );
    }

    return <NotFoundPage />;
  }, [pathname]);

  return route;
}

export default App;

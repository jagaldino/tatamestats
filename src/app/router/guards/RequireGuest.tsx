import { Navigate, Outlet } from "react-router-dom";
import { PATHS } from "@/app/router/paths";
import { useAuthStore } from "@/domains/auth/store/useAuthStore";

export function RequireGuest() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={PATHS.app.dashboard} replace />;
  }

  return <Outlet />;
}

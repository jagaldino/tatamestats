import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PATHS } from "@/app/router/paths";
import { useAuthStore } from "@/domains/auth/store/useAuthStore";

export function RequireAuth() {
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <Navigate to={PATHS.auth.login} replace state={{ from: location }} />
    );
  }

  return <Outlet />;
}

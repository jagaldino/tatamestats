import { DashboardPage } from "./pages/DashboardPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { usePathname } from "./hooks/usePathname";

function App() {
  const pathname = usePathname();

  if (pathname === "/login") {
    return <LoginPage />;
  }

  if (pathname === "/register") {
    return <RegisterPage />;
  }

  if (pathname === "/forgot-password") {
    return <ForgotPasswordPage />;
  }

  if (pathname === "/app/dashboard") {
    return <DashboardPage />;
  }

  return <HomePage />;
}

export default App;

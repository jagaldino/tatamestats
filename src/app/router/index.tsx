import { Navigate, createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/app/layouts/AppLayout";
import { PublicLayout } from "@/app/layouts/PublicLayout";
import { RequireAuth } from "@/app/router/guards/RequireAuth";
import { RequireGuest } from "@/app/router/guards/RequireGuest";
import { PATHS } from "@/app/router/paths";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { NewTrainingPage } from "@/pages/trainings/NewTrainingPage";
import { TrainingDetailPage } from "@/pages/trainings/TrainingDetailPage";
import { TrainingEditPage } from "@/pages/trainings/TrainingEditPage";
import { TrainingHistoryPage } from "@/pages/trainings/TrainingHistoryPage";
import { ProfilePage } from "@/pages/profile/ProfilePage";
import { ScreenPlaceholder } from "@/shared/ui/organisms/ScreenPlaceholder";

export const router = createBrowserRouter([
  {
    path: PATHS.root,
    element: <Navigate to={PATHS.auth.login} replace />,
  },
  {
    element: <RequireGuest />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            path: PATHS.auth.login,
            element: <LoginPage />,
          },
          {
            path: PATHS.auth.register,
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: PATHS.app.dashboard,
            element: <DashboardPage />,
          },
          {
            path: PATHS.app.trainings,
            element: <TrainingHistoryPage />,
          },
          {
            path: PATHS.app.trainingNew,
            element: <NewTrainingPage />,
          },
          {
            path: PATHS.app.trainingDetail,
            element: <TrainingDetailPage />,
          },
          {
            path: PATHS.app.trainingEdit,
            element: <TrainingEditPage />,
          },
          {
            path: PATHS.app.profile,
            element: <ProfilePage />,
          },
          {
            path: PATHS.app.weight,
            element: <ScreenPlaceholder title="Controle de peso" />,
          },
          {
            path: PATHS.app.submissionStats,
            element: <ScreenPlaceholder title="Estatisticas de finalizacoes" />,
          },
          {
            path: "/app/*",
            element: <Navigate to={PATHS.app.dashboard} replace />,
          },
        ],
      },
    ],
  },
  {
    path: PATHS.notFound,
    element: <ScreenPlaceholder title="Pagina nao encontrada" />,
  },
  {
    path: "*",
    element: <Navigate to={PATHS.notFound} replace />,
  },
]);

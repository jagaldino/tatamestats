export const PATHS = {
  root: "/",
  auth: {
    login: "/login",
    register: "/register",
  },
  app: {
    root: "/app",
    dashboard: "/app/dashboard",
    trainings: "/app/trainings",
    trainingNew: "/app/trainings/new",
    trainingDetail: "/app/trainings/:trainingId",
    trainingEdit: "/app/trainings/:trainingId/edit",
    profile: "/app/profile",
    weight: "/app/weight",
    submissionStats: "/app/stats/submissions",
  },
  notFound: "/404",
} as const;

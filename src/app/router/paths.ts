export const PATHS = {
  root: "/",
  auth: {
    login: "/login",
    register: "/register",
  },
  app: {
    root: "/app",
    dashboard: "/app/dashboard",
    trainings: "/app/treinos",
    trainingNew: "/app/treinos/novo",
    trainingDetail: "/app/treinos/:trainingId",
    trainingEdit: "/app/treinos/:trainingId/editar",
    profile: "/app/perfil",
    weight: "/app/peso",
    submissionStats: "/app/estatisticas/finalizacoes",
  },
  notFound: "/404",
} as const;

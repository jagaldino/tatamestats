import {
  type DashboardStats,
  DEFAULT_WEIGHT_LIMIT_KG,
  type EntityId,
} from "@/shared/types/domain";
import {
  selectMonthlySubmissionsCount,
  selectMonthlyTrainingsCount,
  useTrainingStore,
} from "@/domains/training/store/useTrainingStore";
import { useAthleteStore } from "@/domains/athlete/store/useAthleteStore";

export const selectDashboardStats = (
  userId: EntityId,
  referenceDate = new Date(),
): DashboardStats => {
  const trainingState = useTrainingStore.getState();
  const athleteState = useAthleteStore.getState();

  const profile = athleteState.profilesByUserId[userId];
  const currentWeight = profile?.currentWeight ?? 0;
  const weightLimit = profile?.weightLimit ?? DEFAULT_WEIGHT_LIMIT_KG;

  return {
    monthlyTrainings: selectMonthlyTrainingsCount(
      trainingState,
      userId,
      referenceDate,
    ),
    monthlySubmissions: selectMonthlySubmissionsCount(
      trainingState,
      userId,
      referenceDate,
    ),
    currentWeight,
    isOverWeightLimit: currentWeight > weightLimit,
  };
};

export const useDashboardStats = (
  userId: EntityId,
  referenceDate = new Date(),
): DashboardStats => {
  const monthlyTrainings = useTrainingStore((state) =>
    selectMonthlyTrainingsCount(state, userId, referenceDate),
  );

  const monthlySubmissions = useTrainingStore((state) =>
    selectMonthlySubmissionsCount(state, userId, referenceDate),
  );

  const profile = useAthleteStore((state) => state.profilesByUserId[userId]);

  const currentWeight = profile?.currentWeight ?? 0;
  const weightLimit = profile?.weightLimit ?? DEFAULT_WEIGHT_LIMIT_KG;

  return {
    monthlyTrainings,
    monthlySubmissions,
    currentWeight,
    isOverWeightLimit: currentWeight > weightLimit,
  };
};

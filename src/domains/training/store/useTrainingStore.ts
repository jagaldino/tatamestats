import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/shared/lib/storage/keys";
import { safeStorage } from "@/shared/lib/storage/localStorage";
import type {
  CreateTrainingInput,
  EntityId,
  Training,
} from "@/shared/types/domain";

type TrainingState = {
  trainingsById: Record<EntityId, Training>;
  trainingIds: EntityId[];
};

type TrainingActions = {
  createTraining: (input: CreateTrainingInput) => EntityId;
  upsertTraining: (training: Training) => void;
  removeTraining: (trainingId: EntityId) => void;
};

type TrainingStore = TrainingState & TrainingActions;

const createId = () =>
  globalThis.crypto?.randomUUID?.() ??
  `training_${Date.now()}_${Math.random()}`;

const isSameMonth = (dateIso: string, referenceDate: Date) => {
  const parsed = new Date(dateIso);

  return (
    parsed.getFullYear() === referenceDate.getFullYear() &&
    parsed.getMonth() === referenceDate.getMonth()
  );
};

export const selectUserTrainings = (state: TrainingState, userId: EntityId) =>
  state.trainingIds
    .map((id) => state.trainingsById[id])
    .filter((training): training is Training => Boolean(training))
    .filter((training) => training.userId === userId)
    .sort((a, b) => b.date.localeCompare(a.date));

export const selectMonthlyTrainingsCount = (
  state: TrainingState,
  userId: EntityId,
  referenceDate = new Date(),
) =>
  selectUserTrainings(state, userId).filter((training) =>
    isSameMonth(training.date, referenceDate),
  ).length;

export const selectMonthlySubmissionsCount = (
  state: TrainingState,
  userId: EntityId,
  referenceDate = new Date(),
) =>
  selectUserTrainings(state, userId)
    .filter((training) => isSameMonth(training.date, referenceDate))
    .reduce((acc, training) => acc + training.submissionsApplied, 0);

export const useTrainingStore = create<TrainingStore>()(
  persist(
    (set) => ({
      trainingsById: {},
      trainingIds: [],
      createTraining: (input) => {
        const id = input.id ?? createId();

        set((state) => {
          const exists = Boolean(state.trainingsById[id]);
          const training: Training = {
            ...input,
            id,
          };

          return {
            trainingsById: {
              ...state.trainingsById,
              [id]: training,
            },
            trainingIds: exists
              ? state.trainingIds
              : [id, ...state.trainingIds],
          };
        });

        return id;
      },
      upsertTraining: (training) =>
        set((state) => {
          const exists = Boolean(state.trainingsById[training.id]);

          return {
            trainingsById: {
              ...state.trainingsById,
              [training.id]: training,
            },
            trainingIds: exists
              ? state.trainingIds
              : [training.id, ...state.trainingIds],
          };
        }),
      removeTraining: (trainingId) =>
        set((state) => {
          const { [trainingId]: _, ...rest } = state.trainingsById;

          return {
            trainingsById: rest,
            trainingIds: state.trainingIds.filter((id) => id !== trainingId),
          };
        }),
    }),
    {
      name: STORAGE_KEYS.training,
      storage: createJSONStorage(() => safeStorage),
      version: 1,
    },
  ),
);

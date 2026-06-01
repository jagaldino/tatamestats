import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/shared/lib/storage/keys";
import { safeStorage } from "@/shared/lib/storage/localStorage";
import {
  DEFAULT_WEIGHT_LIMIT_KG,
  type EntityId,
  type Profile,
  type UpsertProfileInput,
} from "@/shared/types/domain";

type AthleteState = {
  profilesByUserId: Record<EntityId, Profile>;
};

type AthleteActions = {
  upsertProfile: (input: UpsertProfileInput) => void;
  setCurrentWeight: (userId: EntityId, currentWeight: number) => void;
  setWeightLimit: (userId: EntityId, weightLimit: number) => void;
};

type AthleteStore = AthleteState & AthleteActions;

const normalizeWeightLimit = (value?: number) => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return DEFAULT_WEIGHT_LIMIT_KG;
  }

  return Math.min(Math.max(value, 0), DEFAULT_WEIGHT_LIMIT_KG);
};

const normalizeWeight = (value: number) => Math.max(value, 0);

export const useAthleteStore = create<AthleteStore>()(
  persist(
    (set) => ({
      profilesByUserId: {},
      upsertProfile: (input) =>
        set((state) => ({
          profilesByUserId: {
            ...state.profilesByUserId,
            [input.userId]: {
              userId: input.userId,
              currentWeight: normalizeWeight(input.currentWeight),
              weightLimit: normalizeWeightLimit(input.weightLimit),
            },
          },
        })),
      setCurrentWeight: (userId, currentWeight) =>
        set((state) => {
          const currentProfile = state.profilesByUserId[userId];
          return {
            profilesByUserId: {
              ...state.profilesByUserId,
              [userId]: {
                userId,
                currentWeight: normalizeWeight(currentWeight),
                weightLimit:
                  currentProfile?.weightLimit ?? DEFAULT_WEIGHT_LIMIT_KG,
              },
            },
          };
        }),
      setWeightLimit: (userId, weightLimit) =>
        set((state) => {
          const currentProfile = state.profilesByUserId[userId];
          return {
            profilesByUserId: {
              ...state.profilesByUserId,
              [userId]: {
                userId,
                currentWeight: currentProfile?.currentWeight ?? 0,
                weightLimit: normalizeWeightLimit(weightLimit),
              },
            },
          };
        }),
    }),
    {
      name: STORAGE_KEYS.athlete,
      storage: createJSONStorage(() => safeStorage),
      version: 1,
    },
  ),
);

export const selectProfileByUserId = (state: AthleteState, userId: EntityId) =>
  state.profilesByUserId[userId] ?? null;

export const selectIsOverWeightLimit = (
  state: AthleteState,
  userId: EntityId,
) => {
  const profile = selectProfileByUserId(state, userId);

  if (!profile) {
    return false;
  }

  return profile.currentWeight > profile.weightLimit;
};

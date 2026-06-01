export type EntityId = string;

export enum TrainingType {
  Gi = "Gi",
  NoGi = "NoGi",
}

export const DEFAULT_WEIGHT_LIMIT_KG = 100;

export type User = {
  id: EntityId;
  name: string;
  email: string;
  password: string;
};

export type Profile = {
  userId: EntityId;
  currentWeight: number;
  weightLimit: number;
};

export type Training = {
  id: EntityId;
  userId: EntityId;
  date: string;
  durationMinutes: number;
  type: TrainingType;
  submissionsApplied: number;
  submissionsReceived: number;
  notes?: string;
};

export type DashboardStats = {
  monthlyTrainings: number;
  monthlySubmissions: number;
  currentWeight: number;
  isOverWeightLimit: boolean;
};

export type AuthResult = {
  ok: boolean;
  message?: string;
  userId?: EntityId;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type UpsertProfileInput = {
  userId: EntityId;
  currentWeight: number;
  weightLimit?: number;
};

export type CreateTrainingInput = Omit<Training, "id"> & {
  id?: EntityId;
};

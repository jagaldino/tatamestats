import type { TrainingType } from "@/shared/types/domain";

export type TrainingFormValues = {
  date: string;
  durationMinutes: string;
  type: TrainingType;
  submissionsApplied: string;
  submissionsReceived: string;
  notes: string;
};

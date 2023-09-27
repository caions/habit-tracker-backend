import { HabitCompletionDate } from '../entities/HabitCompletionDate';

export interface HabitCompletionDateRepositoryProtocol {
  create: (habit: HabitCompletionDate) => Promise<HabitCompletionDate>;
  findByHabitIdAndDate: (
    habitId: string,
    compareDate: string,
  ) => Promise<HabitCompletionDate | undefined>;
  list: () => Promise<HabitCompletionDate[]>;
  delete: (habitId: string, completedDate: string) => Promise<void>;
}

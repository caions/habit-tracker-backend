import { HabitCompletionDate } from "../entities/HabitCompletionDate"

export interface HabitCompletionDateRepositoryProtocol {
  create: (habit: HabitCompletionDate) => Promise<HabitCompletionDate>
  findByHabitId: (habitId: string) => Promise<HabitCompletionDate | undefined>
  list: () => Promise<HabitCompletionDate[]>
  delete: (habitId: string) => Promise<void>
}
import { Habit } from "../entities/Habit"

export interface HabitRepositoryProtocol {
  create: (habit: Habit) => Promise<void>
  list: () => Promise<Habit[]>
  update: (habit: Habit) => Promise<void>
  findById: (id: string) => Promise<Habit | undefined>
  findByName: (name: string) => Promise<Habit | undefined>
  delete: (id: string) => Promise<void>
}
export interface HabitRepositoryProtocol {
  create: (habit: Habit) => void
  list: () => Habit[]
  update: (habit: Habit) => void
  findById: (id: string) => Habit
  delete: (id: string) => void
}
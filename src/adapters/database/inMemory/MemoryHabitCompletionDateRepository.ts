import { HabitCompletionDate } from '../../../domain/entities/HabitCompletionDate'
import { HabitCompletionDateRepositoryProtocol } from '../../../domain/repositories/HabitCompletionDateRepositoryProtocol'

export class MemoryHabitCompletionDateRepository implements HabitCompletionDateRepositoryProtocol {
  habitCompletionDates: HabitCompletionDate[] = []

  constructor() { }

  async create(habitCompletionDate: HabitCompletionDate) {
    this.habitCompletionDates.push(habitCompletionDate)
    return habitCompletionDate
  }

  async findByHabitIdAndDate(habitId: string, completedDate: string) {
    return this.habitCompletionDates.find(habit => habit.habitId === habitId && habit.completedDate === completedDate)
  }

  async list() {
    return this.habitCompletionDates
  }

  async delete(habitId: string, completedDate: string) {
    this.habitCompletionDates = this.habitCompletionDates.filter(habit => !(habit.habitId === habitId && habit.completedDate === completedDate))
  }
}
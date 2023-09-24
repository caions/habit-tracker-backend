import { HabitCompletionDate } from '../../../domain/entities/HabitCompletionDate'
import { HabitCompletionDateRepositoryProtocol } from '../../../domain/repositories/HabitCompletionDateRepositoryProtocol'

export class MemoryHabitCompletionDateRepository implements HabitCompletionDateRepositoryProtocol {
  habitCompletionDates = new Map<string, HabitCompletionDate>()

  constructor() { }

  async create(habitCompletionDate: HabitCompletionDate) {
    this.habitCompletionDates.set(habitCompletionDate.habitId, { ...habitCompletionDate, completedDate: new Date().toISOString() })
    return this.habitCompletionDates.get(habitCompletionDate.habitId) as HabitCompletionDate
  }

  async findByHabitId(habitId: string) {
    return this.habitCompletionDates.get(habitId)
  }

  async list() {
    return Array.from(this.habitCompletionDates.values())
  }

  async delete(habitId: string) {
    this.habitCompletionDates.delete(habitId)
  }
}
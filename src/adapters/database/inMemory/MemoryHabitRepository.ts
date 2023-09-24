import { Habit } from '../../../domain/entities/Habit'
import { HabitRepositoryProtocol } from '../../../domain/repositories/HabitRepositoryProtocol'

export class MemoryHabitRepository implements HabitRepositoryProtocol {
  habits = new Map<string, Habit>()

  constructor() {
  }

  async create(habit: Habit) {
    this.habits.set(habit.id, habit)
  }

  async list() {
    return Array.from(this.habits.values())
  }

  async update(habit: Habit) {
    this.habits.set(habit.id, habit)
  }

  async findById(id: string) {
    return this.habits.get(id)
  }

  async findByName(name: string) {
    for (const [, habit] of this.habits.entries()) {
      if (habit.name === name) {
        return habit;
      }
    }
  }

  async delete(id: string) {
    this.habits.delete(id)
  }
}
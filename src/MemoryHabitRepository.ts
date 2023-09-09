import { HabitRepositoryProtocol } from './HabitRepositoryProtocol'

export class MemoryHabitRepository implements HabitRepositoryProtocol {
  habits = new Map()

  constructor() {
  }

  create(habit: Habit) {
    this.habits.set(habit.id, habit)
  }

  list() {
    return Array.from(this.habits.values())
  }

  update(habit: Habit) {
    this.habits.set(habit.id, habit)
  }

  findById(id: string) {
    return this.habits.get(id)
  }

  delete(id: string) {
    this.habits.delete(id)
  }
}
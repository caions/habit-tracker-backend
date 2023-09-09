import { randomUUID } from 'node:crypto'
import { HabitRepositoryProtocol } from "./HabitRepositoryProtocol";

export class CreateHabitUseCase {

  constructor(private habitRepository: HabitRepositoryProtocol) {
  }

  execute(name: string) {
    const habitId = randomUUID()
    const habit = {
      id: habitId,
      name,
      completed: false
    }
    if (habit.name === "") {
      throw new Error('empty name are not allowed')
    }
    this.habitRepository.create(habit)
  }
}
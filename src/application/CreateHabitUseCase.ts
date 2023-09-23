import { randomUUID } from 'node:crypto'
import { HabitRepositoryProtocol } from "../domain/repositories/HabitRepositoryProtocol";
import { AppError } from '../shared/errors/AppError';

export class CreateHabitUseCase {

  constructor(private habitRepository: HabitRepositoryProtocol) {
  }

  async execute(name: string) {
    const habitId = randomUUID()
    const habit = {
      id: habitId,
      name,
      completed: false
    }
    if (habit.name === "") {
      throw new AppError('empty name are not allowed')
    }
    const checkHabitNameAlreadyExist = await this.habitRepository.findByName(habit.name)
    if (checkHabitNameAlreadyExist) {
      throw new AppError('habit already exist')
    }
    await this.habitRepository.create(habit)
  }
}
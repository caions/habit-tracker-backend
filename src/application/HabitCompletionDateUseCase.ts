import { randomUUID } from 'node:crypto'
import { HabitCompletionDateRepositoryProtocol } from "../domain/repositories/HabitCompletionDateRepositoryProtocol";
import { HabitRepositoryProtocol } from '../domain/repositories/HabitRepositoryProtocol';
import { AppError } from '../shared/errors/AppError';

export class HabitCompletionDateUseCase {
  constructor(
    private habitRepository: HabitRepositoryProtocol,
    private habitCompletionDateRepository: HabitCompletionDateRepositoryProtocol
  ) { }

  async execute(habitId: string) {
    const id = randomUUID()
    const habitCompletionDate = {
      id,
      habitId
    }

    const findHabit = await this.habitRepository.findById(habitId)

    if (!findHabit) {
      throw new AppError('habit not found')
    }

    const findHabitCompletionDate = await this.habitCompletionDateRepository.findByHabitId(findHabit.id)
    if (findHabitCompletionDate) {
      return await this.habitCompletionDateRepository.delete(findHabit.id)
    }

    return await this.habitCompletionDateRepository.create(habitCompletionDate)
  }
}
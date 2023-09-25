import { randomUUID } from 'node:crypto'
import { HabitCompletionDateRepositoryProtocol } from "../domain/repositories/HabitCompletionDateRepositoryProtocol";
import { HabitRepositoryProtocol } from '../domain/repositories/HabitRepositoryProtocol';
import { AppError } from '../shared/errors/AppError';
import { HabitCompletionDate } from '../domain/entities/HabitCompletionDate';
import { isSameDate } from '../shared/utils/isSameDate';

export class HabitCompletionDateUseCase {
  constructor(
    private habitRepository: HabitRepositoryProtocol,
    private habitCompletionDateRepository: HabitCompletionDateRepositoryProtocol
  ) { }

  async execute(habitId: string, completedDate: string) {
    const id = randomUUID()
    const habitCompletionDate: HabitCompletionDate = {
      id,
      habitId,
      completedDate
    }
    const findHabit = await this.habitRepository.findById(habitId)

    if (!findHabit) {
      throw new AppError('habit not found')
    }

    const findHabitCompletionDate = await this.habitCompletionDateRepository.findByHabitIdAndDate(findHabit.id, completedDate)

    if (isSameDate(completedDate, findHabitCompletionDate?.completedDate)) {
      return await this.habitCompletionDateRepository.delete(findHabit.id, completedDate)
    }
    return await this.habitCompletionDateRepository.create(habitCompletionDate)
  }
}
import { HabitCompletionDate } from '../../../domain/entities/HabitCompletionDate';
import { HabitCompletionDateRepositoryProtocol } from '../../../domain/repositories/HabitCompletionDateRepositoryProtocol';

export class MemoryHabitCompletionDateRepository
  implements HabitCompletionDateRepositoryProtocol
{
  habitCompletionDates: HabitCompletionDate[] = [];

  constructor() {}

  async create(habitCompletionDate: HabitCompletionDate) {
    this.habitCompletionDates.push(habitCompletionDate);
    return habitCompletionDate;
  }

  async findByHabitIdAndDate(habitId: string, completedDate: string) {
    const completeDateWithoutHour = new Date(completedDate)
      .toISOString()
      .substring(0, 10);

    return this.habitCompletionDates.find(habit => {
      const storeCompletedDateWithoutHour = new Date(habit.completedDate)
        .toISOString()
        .substring(0, 10);

      return (
        habit.habitId === habitId &&
        completeDateWithoutHour === storeCompletedDateWithoutHour
      );
    });
  }

  async list() {
    return this.habitCompletionDates;
  }

  async delete(habitId: string, completedDate: string) {
    const completedDateWithoutHour = new Date(completedDate)
      .toISOString()
      .substring(0, 10);

    this.habitCompletionDates = this.habitCompletionDates.filter(habit => {
      const storedCompletedDateWithouHour = new Date(habit.completedDate)
        .toISOString()
        .substring(0, 10);
      return !(
        habit.habitId === habitId &&
        storedCompletedDateWithouHour === completedDateWithoutHour
      );
    });
  }
}

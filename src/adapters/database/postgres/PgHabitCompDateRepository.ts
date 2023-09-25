import { HabitCompletionDate } from "../../../domain/entities/HabitCompletionDate";
import { HabitCompletionDateRepositoryProtocol } from "../../../domain/repositories/HabitCompletionDateRepositoryProtocol";
import pool from '../../../infra/db/connection'

export class PgHabitCompDateRepository implements HabitCompletionDateRepositoryProtocol {
  constructor() { }

  async create(habitCompDate: HabitCompletionDate) {
    await pool.query('INSERT INTO habit_completion_dates(id, completed_id, completed_date) VALUES($1, $2, $3)',
      [habitCompDate.id, habitCompDate.habitId, habitCompDate.completedDate]);
    return habitCompDate
  };

  async list() {
    const result = await pool.query<HabitCompletionDate>('SELECT * FROM habit_completion_dates')
    return result.rows
  };

  async findByHabitIdAndDate(habitId: string, completedDate: string) {
    const [habit] = (await pool.query('SELECT * FROM habit_completion_dates WHERE completed_id = $1 AND completed_date = $2', [habitId, completedDate])).rows;
    return { ...habit, completedId: habit?.completed_id, completedDate: habit?.completed_date }
  };

  async delete(habitId: string, completedDate: string) {
    await pool.query('DELETE FROM habit_completion_dates WHERE completed_id = $1 AND completed_date = $2', [habitId, completedDate])
  }
}
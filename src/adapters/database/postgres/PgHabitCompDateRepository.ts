import { HabitCompletionDate } from "../../../domain/entities/HabitCompletionDate";
import { HabitCompletionDateRepositoryProtocol } from "../../../domain/repositories/HabitCompletionDateRepositoryProtocol";
import pool from '../../../infra/db/connection'

export class PgHabitCompDateRepository implements HabitCompletionDateRepositoryProtocol {
  constructor() { }

  async create(habitCompDate: HabitCompletionDate) {
    await pool.query('INSERT INTO habit_completion_dates(id, completed_id, completed_date) VALUES($1, $2, NOW())', [habitCompDate.id, habitCompDate.habitId]);
    return habitCompDate
  };

  async list() {
    const result = await pool.query<HabitCompletionDate>('SELECT * FROM habit_completion_dates')
    return result.rows
  };

  async findByHabitId(habitId: string) {
    const [habit] = (await pool.query<HabitCompletionDate>('SELECT * FROM habit_completion_dates WHERE completed_id = $1', [habitId])).rows;
    return habit
  };

  async delete(habitId: string) {
    await pool.query('DELETE FROM habit_completion_dates WHERE completed_id = $1', [habitId])
  }
}
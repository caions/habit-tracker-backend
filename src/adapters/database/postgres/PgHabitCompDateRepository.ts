import { HabitCompletionDate } from '../../../domain/entities/HabitCompletionDate';
import { HabitCompletionDateRepositoryProtocol } from '../../../domain/repositories/HabitCompletionDateRepositoryProtocol';
import pool from '../../../infra/db/connection';

interface PgHabitCompletionDate {
  id: string;
  habit_id: string;
  completed_date: string;
}

export class PgHabitCompDateRepository
  implements HabitCompletionDateRepositoryProtocol
{
  constructor() {}

  async create(habitCompDate: HabitCompletionDate) {
    await pool.query(
      'INSERT INTO habit_completion_dates(id, habit_id, completed_date) VALUES($1, $2, $3)',
      [habitCompDate.id, habitCompDate.habitId, habitCompDate.completedDate],
    );
    return habitCompDate;
  }

  async list() {
    const result = await pool.query<PgHabitCompletionDate>(
      'SELECT * FROM habit_completion_dates',
    );
    return result.rows.map(row => ({
      id: row.id,
      habitId: row.habit_id,
      completedDate: row.completed_date,
    }));
  }

  async findByHabitIdAndDate(habitId: string, completedDate: string) {
    const [habit] = (
      await pool.query<PgHabitCompletionDate>(
        'SELECT * FROM habit_completion_dates WHERE habit_id = $1 AND completed_date = $2',
        [habitId, completedDate],
      )
    ).rows;
    return {
      id: habit?.id,
      habitId: habit?.habit_id,
      completedDate: habit?.completed_date,
    };
  }

  async delete(habitId: string, completedDate: string) {
    await pool.query(
      'DELETE FROM habit_completion_dates WHERE habit_id = $1 AND completed_date = $2',
      [habitId, completedDate],
    );
  }
}

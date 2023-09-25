CREATE TABLE IF NOT EXISTS habits (
  id UUID NOT NULL UNIQUE,
  name VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS habit_completion_dates (
  id UUID NOT NULL UNIQUE,
  habit_id UUID NOT NULL,
  completed_date TIMESTAMP NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_habit
    FOREIGN KEY (habit_id)
    REFERENCES habits (id) ON DELETE CASCADE
);

/* Revert */
/* 
DROP TABLE IF EXISTS habit_completion_dates;
DROP TABLE IF EXISTS habits; 
*/


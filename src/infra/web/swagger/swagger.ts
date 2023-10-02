import 'dotenv/config';
import swaggerAutogen from 'swagger-autogen';
import { version } from '../../../../package.json';

const isProduction = process.env.ENVIRONMENT === 'PROD';

const host = isProduction
  ? 'habit-tracker-backend.vercel.app'
  : 'localhost:8000';

const doc = {
  info: {
    version,
    title: 'Habit Tracker API',
    description: 'Api to manage habits',
  },
  host,
  schemes: ['http', 'https'],
  definitions: {
    HabitBodyId: {
      $id: 'habit uuid',
    },
    HabitBodyName: {
      $name: 'habit name',
    },
    CompleteHabitBody: {
      $habitId: 'habit uuid',
      $completedDate: '2023-09-26T00:00:00.000Z',
    },
  },
};

const outputFile = 'src/infra/web/swagger/habits-document.json';
const endpointsFiles = ['src/infra/web/routes/index.ts'];

swaggerAutogen()(outputFile, endpointsFiles, doc);

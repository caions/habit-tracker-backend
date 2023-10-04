import swaggerAutogen from 'swagger-autogen';
import { version } from '../../../../package.json';

const doc = {
  info: {
    version,
    title: 'Habit Tracker API',
    description: 'Api to manage habits',
  },
  host: 'localhost:8000',
  schemes: ['http'],
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

const outputFile = 'habits-document.json';
const endpointsFiles = ['src/infra/web/routes/index.ts'];

swaggerAutogen()(outputFile, endpointsFiles, doc);

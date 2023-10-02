import 'dotenv/config';
import swaggerAutogen from 'swagger-autogen';

const isProduction = process.env.ENVIRONMENT === 'PROD';

const host = isProduction
  ? 'habit-tracker-backend.vercel.app'
  : 'localhost:8000';

const doc = {
  info: {
    title: 'Habit Tracker API',
    description: 'Api to manage habits',
  },
  host,
  schemes: ['http', 'https'],
};

const outputFile = 'src/infra/web/swagger/habits-document.json';
const endpointsFiles = ['src/infra/web/routes/index.ts'];

swaggerAutogen()(outputFile, endpointsFiles, doc);

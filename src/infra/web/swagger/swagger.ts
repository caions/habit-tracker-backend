import 'dotenv/config';
import swaggerAutogen from 'swagger-autogen';

const isProduction = process.env.ENVIRONMENT === 'PROD';

const host = isProduction
  ? 'habit-tracker-backend.vercel.app'
  : 'localhost:8000';

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host,
  schemes: ['http', 'https'],
};

const outputFile = 'src/infra/web/swagger/output.json';
const endpointsFiles = ['src/infra/web/routes/index.ts'];

swaggerAutogen()(outputFile, endpointsFiles, doc);

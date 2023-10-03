import 'dotenv/config';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, prettyPrint, simple, colorize } = format;
const isDevelopoment = process.env.NODE_ENV === 'development';

const loggerFormat = isDevelopoment
  ? combine(colorize(), simple())
  : combine(timestamp(), prettyPrint({ colorize: true }));

const logger = createLogger({
  format: loggerFormat,
  transports: [new transports.Console()],
});

export { logger };

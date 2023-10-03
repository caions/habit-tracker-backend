import 'dotenv/config';
import { LoggerServiceProtocol } from '../../shared/services/LoggerServiceProtocol';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, prettyPrint, simple, colorize } = format;
const isDevelopoment = process.env.NODE_ENV === 'development';

export class WinstonLogger implements LoggerServiceProtocol {
  loggerFormat;
  logger;
  constructor() {
    this.loggerFormat = isDevelopoment
      ? combine(colorize(), simple())
      : combine(timestamp(), prettyPrint({ colorize: true }));

    this.logger = createLogger({
      format: this.loggerFormat,
      transports: [new transports.Console()],
    });
  }

  info(data: string | object): void {
    this.logger.info(data);
  }
  warn(data: string | object): void {
    this.logger.warn(data);
  }
  error(data: string | object): void {
    this.logger.error(data);
  }
}

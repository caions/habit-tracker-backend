export interface LoggerServiceProtocol {
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
}

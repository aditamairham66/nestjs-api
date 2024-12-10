import * as winston from 'winston';

export const errorFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${stack || message}`;
  }),
);

export const jsonFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
);

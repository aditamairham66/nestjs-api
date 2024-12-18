import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {
  WinstonModule,
  // utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';
import { ConfigModule } from '@nestjs/config';
import 'winston-daily-rotate-file';
import { errorFormat, jsonFormat } from './winston.logger';
import { PrismaService } from './prisma.service';
import { ValidationService } from './validation.service';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './error.filter';
import { AuthMiddleware } from './auth/auth.middleware';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot({
      level: 'debug',
      format: winston.format.json(),
      transports: [
        new (winston.transports as any).DailyRotateFile({
          level: 'error',
          filename: 'logs/log-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.timestamp(),
            errorFormat(),
            jsonFormat,
          ),
        }),
        // new winston.transports.Console({
        //   format: winston.format.combine(
        //     winston.format.colorize(),
        //     winston.format.timestamp(),
        //     nestWinstonModuleUtilities.format.nestLike('MyApp', {
        //       prettyPrint: true,
        //     }),
        //   ),
        // }),
        new winston.transports.Console(),
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    PrismaService,
    ValidationService,
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
  exports: [PrismaService, ValidationService],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/api/*');
  }
}

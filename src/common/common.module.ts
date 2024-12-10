import { Module } from '@nestjs/common';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';
import { ConfigModule } from '@nestjs/config';
import 'winston-daily-rotate-file';
import { errorFormat, jsonFormat } from './winston.logger';
import { PrismaService } from './prisma.service';
import { ValidationService } from './validation.service';

@Module({
  imports: [
    WinstonModule.forRoot({
      level: 'debug',
      format: winston.format.json(),
      transports: [
        // Transport untuk error (seperti format Laravel)
        new (winston.transports as any).DailyRotateFile({
          level: 'error',
          filename: 'logs/log-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: errorFormat,
        }),

        // Transport untuk log JSON
        new (winston.transports as any).Console({
          level: 'info',
          format: jsonFormat,
        }),

        // Console logs untuk debugging
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [PrismaService, ValidationService],
  exports: [PrismaService, ValidationService],
})
export class CommonModule {}

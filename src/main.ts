import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionFilter } from './lib/filter/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,

    // logger: process.env.NODE_ENV === 'production'
    //   ? ['error', 'warn', 'log']
    //   : ['error', 'warn', 'log', 'verbose', 'debug']
    // logger: ['debug']
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
  });
  app.enableCors({
    origin: ['http://localhost:8100'],
    credentials: true,
  });
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(3100);
}
bootstrap();

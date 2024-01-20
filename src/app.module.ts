import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { MemosModule } from './memos/memos.module';
import authConfig from './config/authConfig';
import { ExceptionModule } from './exception/exception.module';
import { SseController } from './sse/sse.controller';
import { LoggingModule } from './logging/logging.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig, authConfig], // ConfigFactory 지정
      isGlobal: true,
      validationSchema, // 환경변수 값에 대해 유효성 검사 수행하도록 joi를 이용하여 유효성 검사 객체 작성
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3307,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true', // true로 지정하면 서비스 실행되고 DB 연결 될 때마다 DB 초기화 되므로 운영에서는 false 해야함
    }),
    AuthModule,
    MemosModule,
    ExceptionModule,
    LoggingModule,
  ],
  controllers: [SseController],
  providers: [AuthService],
})
export class AppModule {}

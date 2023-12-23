import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';
@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig], // ConfigFactory 지정
      isGlobal: true,
      validationSchema, // 환경변수 값에 대해 유효성 검사 수행하도록 joi를 이용하여 유효성 검사 객체 작성
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

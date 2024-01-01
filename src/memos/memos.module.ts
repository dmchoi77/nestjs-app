import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MemosService } from './memos.service';
import { MemosController } from './memos.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoEntity } from './entities/memo.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([MemoEntity])],
  controllers: [MemosController],
  providers: [MemosService],
})
export class MemosModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/memos');
  }
}

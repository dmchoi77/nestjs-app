import { Module } from '@nestjs/common';
import { MemosService } from './memos.service';
import { MemosController } from './memos.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoEntity } from './entities/memo.entity';
import { AuthGuard } from 'src/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([MemoEntity])],
  controllers: [MemosController],
  providers: [
    MemosService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class MemosModule {}

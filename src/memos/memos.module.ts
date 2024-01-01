import { Module } from '@nestjs/common';
import { MemosService } from './memos.service';
import { MemosController } from './memos.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoEntity } from './entities/memo.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([MemoEntity])],
  controllers: [MemosController],
  providers: [MemosService],
})
export class MemosModule {}

import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { EmailModule } from 'src/email/email.module';
import { MemoEntity } from 'src/memos/entities/memo.entity';
import { UserEntity } from './entity/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([UserEntity, MemoEntity]),
    AuthModule,
  ], // Users Module에서 사용할 저장소 등록
  controllers: [UsersController],
  providers: [UsersService, Logger],
})
export class UsersModule {}

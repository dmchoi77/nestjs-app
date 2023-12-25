import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from 'src/email/email.module';
import { UserEntity } from './entity/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [EmailModule, TypeOrmModule.forFeature([UserEntity])], // Users Module에서 사용할 저장소 등록
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

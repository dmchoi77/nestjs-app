import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
  imports: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}

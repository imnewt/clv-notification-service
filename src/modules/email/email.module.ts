import { Module } from '@nestjs/common';

import { EmailController } from './infrastructure/controllers/email.controller';
import { EmailService } from './services/email.service';

@Module({
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}

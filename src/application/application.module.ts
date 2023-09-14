import { Module } from '@nestjs/common';

import { EmailController } from './controllers/email.controller';
import { DomainModule } from '@domain/domain.module';
import { IEmailService, EmailService } from '@domain/use-cases/email';

@Module({
  imports: [DomainModule],
  controllers: [EmailController],
  providers: [
    {
      provide: IEmailService,
      useClass: EmailService,
    },
  ],
})
export class ApplicationModule {}

import { Module } from '@nestjs/common';

import { EmailController } from './controllers/email.controller';
import { DomainModule } from '@domain/domain.module';
import { IEmailService } from '@domain/services/email.service.interface';
import { EmailService } from '@domain/implementations/email.service.implementation';

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

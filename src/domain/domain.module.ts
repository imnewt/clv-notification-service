import { Module } from '@nestjs/common';

import { MailerModule } from '@infrastructure/persistence/nodemailer/mailer.module';

@Module({
  imports: [MailerModule],
  exports: [MailerModule],
})
export class DomainModule {}
